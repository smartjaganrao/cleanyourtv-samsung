#!/usr/bin/env python3
"""Backs up Samsung Smart TV configuration, device information, and app list.

Usage:
    python3 tools/backup.py <TV_IP>
"""

import os
import sys
import json
import time
import urllib.request
import argparse

BACKUP_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "backups")

def backup_tv(ip):
    timestamp = time.strftime("%Y%m%d_%H%M%S")
    target_dir = os.path.join(BACKUP_DIR, f"samsung_{ip}_{timestamp}")
    os.makedirs(target_dir, exist_ok=True)
    
    print(f"📦 Backing up Samsung TV at {ip} to '{target_dir}'...")

    # 1. Device Info
    info_file = os.path.join(target_dir, "device_info.json")
    try:
        url = f"http://{ip}:8001/api/v2/"
        req = urllib.request.Request(url, headers={"User-Agent": "CleanYourTV/1.0"})
        with urllib.request.urlopen(req, timeout=5.0) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            with open(info_file, "w") as f:
                json.dump(data, f, indent=2)
            print(f"✅ Saved device info: {info_file}")
    except Exception as e:
        print(f"⚠️ Could not backup device info: {e}")

    # 2. Installed Apps
    apps_file = os.path.join(target_dir, "installed_apps.json")
    try:
        url = f"http://{ip}:8001/api/v2/applications"
        req = urllib.request.Request(url, headers={"User-Agent": "CleanYourTV/1.0"})
        with urllib.request.urlopen(req, timeout=5.0) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            with open(apps_file, "w") as f:
                json.dump(data, f, indent=2)
            print(f"✅ Saved installed applications list: {apps_file}")
    except Exception as e:
        print(f"⚠️ Could not backup apps list over HTTP: {e}")

    print(f"\n🎉 Backup complete! Location: {target_dir}")

def main():
    parser = argparse.ArgumentParser(description="Backup Samsung Smart TV configuration and app lists")
    parser.add_argument("ip", help="Samsung TV IP address")
    args = parser.parse_args()

    backup_tv(args.ip)

if __name__ == "__main__":
    main()
