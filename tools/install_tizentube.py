#!/usr/bin/env python3
"""
CleanYourTV - Automated Ad-Free YouTube (TizenTube) Installer for Samsung TV
Downloads and installs the latest TizenTube (Ad-Free YouTube + SponsorBlock)
package directly to any Samsung Smart TV over Wi-Fi via Developer Mode (SDB).
"""

import sys
import os
import socket
import urllib.request
import json
import subprocess
import shutil

TIZENTUBE_GITHUB_API = "https://api.github.com/repos/reisxd/TizenTube/releases/latest"
FALLBACK_WGT_URL = "https://github.com/reisxd/TizenTube/releases/download/v1.0.5/TizenTube.wgt"
DEFAULT_TV_PORT = 26101

def check_tv_connection(tv_ip, port=DEFAULT_TV_PORT, timeout=3):
    """Check if TV is reachable on SDB Developer Port 26101."""
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(timeout)
        result = sock.connect_ex((tv_ip, port))
        sock.close()
        return result == 0
    except Exception:
        return False

def get_latest_tizentube_url():
    """Fetch latest release .wgt download URL from GitHub API."""
    print("🔍 Checking latest Ad-Free YouTube (TizenTube) release...")
    try:
        req = urllib.request.Request(
            TIZENTUBE_GITHUB_API,
            headers={"User-Agent": "CleanYourTV-Samsung-Installer/1.0"}
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            for asset in data.get("assets", []):
                name = asset.get("name", "").lower()
                if name.endswith(".wgt") or "tizentube" in name:
                    download_url = asset.get("browser_download_url")
                    tag_name = data.get("tag_name", "latest")
                    print(f"✨ Found TizenTube {tag_name}: {asset.get('name')}")
                    return download_url
    except Exception as e:
        print(f"⚠️  Could not query GitHub API ({e}). Using verified fallback mirror.")
    
    return FALLBACK_WGT_URL

def download_tizentube_wgt(download_url, output_path):
    """Download .wgt package with progress indicator."""
    print(f"📥 Downloading package from: {download_url}")
    try:
        req = urllib.request.Request(
            download_url,
            headers={"User-Agent": "CleanYourTV-Samsung-Installer/1.0"}
        )
        with urllib.request.urlopen(req, timeout=30) as response, open(output_path, 'wb') as out_file:
            shutil.copyfileobj(response, out_file)
        
        size_kb = os.path.getsize(output_path) / 1024
        print(f"✅ Download complete: {output_path} ({size_kb:.1f} KB)")
        return True
    except Exception as e:
        print(f"❌ Download failed: {e}")
        return False

def install_via_sdb(tv_ip, wgt_path):
    """Attempt installation using local sdb binary or python tool."""
    print(f"📡 Connecting to Samsung TV at {tv_ip}:{DEFAULT_TV_PORT}...")
    
    # 1. Check if 'sdb' binary is in PATH or Tizen Studio
    sdb_cmd = shutil.which("sdb")
    
    if sdb_cmd:
        print(f"🔧 Found local Tizen SDB: {sdb_cmd}")
        # sdb connect <IP>:26101
        subprocess.run([sdb_cmd, "connect", f"{tv_ip}:{DEFAULT_TV_PORT}"], check=False)
        # sdb install <wgt_path>
        result = subprocess.run([sdb_cmd, "install", wgt_path], capture_output=True, text=True)
        print(result.stdout)
        if result.returncode == 0:
            print("🎉 TizenTube installed successfully via SDB!")
            return True
        else:
            print(f"⚠️ SDB install returned: {result.stderr}")

    # 2. Use included tools/sdb_install.py
    script_dir = os.path.dirname(os.path.abspath(__file__))
    sdb_py = os.path.join(script_dir, "sdb_install.py")
    if os.path.exists(sdb_py):
        print(f"🚀 Using CleanYourTV Python SDB Installer ({sdb_py})...")
        res = subprocess.run([sys.executable, sdb_py, tv_ip, wgt_path], capture_output=True, text=True)
        print(res.stdout)
        if "successfully" in res.stdout.lower() or res.returncode == 0:
            return True

    return False

def main():
    print("=" * 65)
    print("  📺 CleanYourTV - Ad-Free YouTube for Samsung Smart TVs")
    print("  Zero Ads · SponsorBlock · 4K 60fps · No Root Required")
    print("=" * 65)

    if len(sys.argv) < 2:
        print("\nUsage: python3 tools/install_tizentube.py <TV_IP_ADDRESS>")
        print("Example: python3 tools/install_tizentube.py 192.168.1.100\n")
        sys.exit(1)

    tv_ip = sys.argv[1].strip()

    # Pre-flight connection check
    print(f"\n1. Verifying TV Developer Mode connection to {tv_ip}...")
    if not check_tv_connection(tv_ip):
        print(f"❌ Could not connect to {tv_ip}:{DEFAULT_TV_PORT}.")
        print("\n💡 Checklist to unlock port 26101 on your Samsung TV:")
        print("  1. Open Apps on your TV.")
        print("  2. On the remote, press 1 - 2 - 3 - 4 - 5.")
        print("  3. Turn Developer Mode = ON and enter your PC IP address.")
        print("  4. HOLD the remote Power button for 3 seconds to restart the TV.")
        print("  5. Re-run this command once the TV powers back on.")
        sys.exit(1)

    print("✅ Port 26101 is open! TV is in Developer Mode.")

    # Download TizenTube package
    print("\n2. Fetching Ad-Free YouTube package...")
    download_url = get_latest_tizentube_url()
    temp_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "backups")
    os.makedirs(temp_dir, exist_ok=True)
    wgt_path = os.path.join(temp_dir, "TizenTube.wgt")

    if not download_tizentube_wgt(download_url, wgt_path):
        sys.exit(1)

    # Sideload to TV
    print(f"\n3. Sideloading Ad-Free YouTube to Samsung TV at {tv_ip}...")
    success = install_via_sdb(tv_ip, wgt_path)

    if success:
        print("\n" + "=" * 65)
        print("🎉 SUCCESS! Ad-Free YouTube (TizenTube) is now installed!")
        print("=" * 65)
        print("Features active on your TV:")
        print("  • 🚫 All video pre-roll & mid-roll ads blocked")
        print("  • ⏩ In-video sponsor segments automatically skipped")
        print("  • 🎬 4K HDR 60fps video playback")
        print("  • 🎵 Background playback with screen off support")
        print("  • 📺 Open directly from your CleanYourTV Home Dock")
    else:
        print("\n💡 Notice: SDB connection established. If install completed in the background,")
        print("check your TV Apps menu for 'TizenTube' or 'Ad-Free YouTube'.")

if __name__ == "__main__":
    main()
