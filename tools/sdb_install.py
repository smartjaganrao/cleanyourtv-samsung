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
    ok, out = run_cmd(["sdb", "install", wgt_path])
    if ok:
        print("\n🎉 SUCCESS! CleanYourTV installed on your Samsung TV!")
        print("👉 You will find 'Clean Your TV' inside your TV's Apps bar.")
        print("👉 Next: To make it auto-launch on power up, see docs/BYPASS_SMART_HUB.md")
        return True
    return False

def show_tizen_guide(tv_ip, wgt_path):
    print("\n" + "="*70)
    print("ℹ️  SDB CLI (Smart Development Bridge) not found in system PATH.")
    print("="*70)
    print("To install CleanYourTV onto your Samsung TV, you have two quick options:\n")
    print("Option 1: Using Official Tizen Studio CLI (Recommended)")
    print("   1. Download lightweight Tizen CLI from: https://developer.samsung.com/smarttv/develop/getting-started/setup-sdk.html")
    print("   2. Run: sdb connect " + tv_ip + ":26101")
    print("   3. Run: sdb install " + wgt_path + "\n")
    print("Option 2: Using Docker (Zero local install)")
    print("   Run this single command:")
    print(f"   docker run --rm -v $(pwd):/workspace ghcr.io/dweomer/tizen-studio sdb connect {tv_ip}:26101 && sdb install /workspace/{wgt_path}\n")
    print("Option 3: Use Samsung Device Manager / Tizen Studio GUI")
    print("   Connect to TV IP, drag-and-drop the .wgt file.")
    print("="*70)

def main():
    parser = argparse.ArgumentParser(description="Install CleanHub .wgt on Samsung Smart TV via SDB")
    parser.add_argument("ip", help="Samsung TV IP address")
    parser.add_argument("--wgt", default=None, help="Path to .wgt file (default: cleanhub-samsung.wgt or cleanyourtv-samsung.wgt)")
    args = parser.parse_args()

    target_wgt = args.wgt
    if not target_wgt:
        if os.path.exists("cleanhub-samsung.wgt"):
            target_wgt = "cleanhub-samsung.wgt"
        elif os.path.exists("cleanyourtv-samsung.wgt"):
            target_wgt = "cleanyourtv-samsung.wgt"
        else:
            target_wgt = "cleanhub-samsung.wgt"

    wgt_file = os.path.abspath(target_wgt)
    if not os.path.exists(wgt_file):
        # Auto-build if missing
        print(f"'{wgt_file}' not found. Building it automatically...")
        pkg_script = os.path.join(os.path.dirname(__file__), "package_wgt.py")
        subprocess.run([sys.executable, pkg_script, "--output", wgt_file], check=True)

    if check_sdb_installed():
        install_via_sdb(args.ip, wgt_file)
    else:
        show_tizen_guide(args.ip, os.path.basename(wgt_file))

if __name__ == "__main__":
    main()
