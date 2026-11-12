#!/usr/bin/env python3
"""SDB (Smart Development Bridge) Sideload Installer for Samsung Tizen TV

Automates connecting to Samsung TV over Wi-Fi and sideloading the CleanYourTV .wgt package.

Usage:
    python3 tools/sdb_install.py <TV_IP> [--wgt cleanyourtv-samsung.wgt]
"""

import os
import sys
import shutil
import subprocess
import argparse
import shlex

def check_sdb_installed():
    return shutil.which("sdb") is not None

def run_cmd(cmd):
    print(f"⚙️  Executing: {' '.join(cmd)}")
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if result.returncode != 0:
        print(f"❌ Command failed: {result.stderr.strip()}")
        return False, result.stderr
    print(f"✅ {result.stdout.strip()}")
    return True, result.stdout

def install_via_sdb(tv_ip, wgt_path):
    if not shutil.which("tizen"):
        show_tizen_guide(tv_ip, wgt_path)
        return False
    print(f"🔌 Connecting SDB to Samsung TV at {tv_ip}:26101...")
    
    # 1. SDB connect
    ok, out = run_cmd(["sdb", "connect", f"{tv_ip}:26101"])
    if not ok or "connected" not in out.lower():
        print("\n⚠️  Could not connect via SDB. Please verify:")
        print("   1. Samsung TV is turned ON and on the same Wi-Fi.")
        print("   2. Developer Mode is ON (Apps menu -> press 1-2-3-4-5 -> ON -> Host IP).")
        print("   3. The TV was rebooted after enabling Developer Mode.")
        return False

    # 2. Check connected devices
    ok, out = run_cmd(["sdb", "devices"])
    if tv_ip not in out:
        print(f"⚠️  TV {tv_ip} not listed in 'sdb devices'.")
        return False

    # 3. SDB Install
    print(f"📦 Installing '{wgt_path}' to TV...")
    ok, out = run_cmd(["tizen", "install", "-s", f"{tv_ip}:26101",
                       "-n", os.path.basename(wgt_path), "--", os.path.dirname(wgt_path)])
    if ok and "Tizen application is successfully installed." in out:
        print("\n🎉 SUCCESS! CleanYourTV installed on your Samsung TV!")
        print("👉 You will find 'Clean Your TV' inside your TV's Apps bar.")
        print("👉 Next: To make it auto-launch on power up, see docs/BYPASS_SMART_HUB.md")
        return True
    return False

def show_tizen_guide(tv_ip, wgt_path):
    print("\n" + "="*70)
    print("ℹ️  SDB CLI (Smart Development Bridge) not found in system PATH.")
    print("="*70)
    print("The widget must be signed with your Samsung TV certificate profile before installation.")
    print("Probe and back up the TV before applying changes (see PROMPT.md).")
    print("To install CleanYourTV onto your Samsung TV, you have three options:\n")
    print("Option 1: Using Official Tizen Studio CLI (Recommended)")
    print("   1. Download lightweight Tizen CLI from: https://developer.samsung.com/smarttv/develop/getting-started/setup-sdk.html")
    print("   2. Run: sdb connect " + tv_ip + ":26101")
    print("   3. Sign with your Samsung certificate profile, then install the signed widget:")
    print("      " + shlex.join(["tizen", "install", "-s", f"{tv_ip}:26101", "-n",
                                  os.path.basename(wgt_path), "--", os.path.dirname(os.path.abspath(wgt_path))]) + "\n")
    print("Option 2: Using Docker (Zero local install)")
    print("   One-time Samsung certificate setup: docs/DOCKER_INSTALL.md")
    print("   From the repository root (builds, signs, backs up, installs and verifies):")
    print("   " + shlex.join(["./tools/tv-install.sh", "doctor", tv_ip]))
    print("   " + shlex.join(["./tools/tv-install.sh", "deploy", tv_ip]))
    print("   Deploy rebuilds the launcher source; it does not install a custom --wgt file.\n")
    print("Option 3: Use Samsung Device Manager / Tizen Studio GUI")
    print("   Connect to TV IP, drag-and-drop the .wgt file.")
    print("="*70)

def main():
    parser = argparse.ArgumentParser(description="Install CleanHub TV .wgt on Samsung Smart TV via SDB")
    parser.add_argument("ip", help="Samsung TV IP address")
    parser.add_argument("--wgt", default=None, help="Path to .wgt file (default: cleanhub-tv-samsung.wgt, cleanhub-samsung.wgt, or cleanyourtv-samsung.wgt)")
    args = parser.parse_args()

    target_wgt = args.wgt
    if not target_wgt:
        if os.path.exists("cleanhub-tv-samsung.wgt"):
            target_wgt = "cleanhub-tv-samsung.wgt"
        elif os.path.exists("cleanhub-samsung.wgt"):
            target_wgt = "cleanhub-samsung.wgt"
        elif os.path.exists("cleanyourtv-samsung.wgt"):
            target_wgt = "cleanyourtv-samsung.wgt"
        else:
            target_wgt = "cleanhub-tv-samsung.wgt"

    wgt_file = os.path.abspath(target_wgt)
    if not os.path.exists(wgt_file):
        # Auto-build if missing
        print(f"'{wgt_file}' not found. Building it automatically...")
        pkg_script = os.path.join(os.path.dirname(__file__), "package_wgt.py")
        subprocess.run([sys.executable, pkg_script, "--output", wgt_file], check=True)

    if check_sdb_installed():
        sys.exit(0 if install_via_sdb(args.ip, wgt_file) else 1)
    else:
        show_tizen_guide(args.ip, wgt_file)

if __name__ == "__main__":
    main()
