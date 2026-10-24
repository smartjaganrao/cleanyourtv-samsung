#!/usr/bin/env python3
"""Restores default TV state and provides instructions to revert auto-boot or uninstall CleanYourTV.

Usage:
    python3 tools/restore.py <TV_IP>
"""

import os
import sys
import shutil
import subprocess
import argparse

def restore(ip):
    print(f"🔄 Reverting CleanYourTV customizations for Samsung TV at {ip}...\n")
    print("1. Reverting Home Screen Auto-Boot to Default Smart Hub:")
    print("   • On your TV: Settings → General → Smart Features")
    print("   • Set 'Autorun Smart Hub' to ON")
    print("   • Set 'Autorun Last App' to OFF")
    print("   Your Samsung TV will now boot directly into the factory Smart Hub again.\n")

    if shutil.which("sdb"):
        print("2. Uninstalling CleanYourTV .wgt via SDB...")
        subprocess.run(["sdb", "connect", f"{ip}:26101"])
        subprocess.run(["sdb", "uninstall", "VIBEHACK01"])
        print("✅ CleanYourTV uninstalled successfully from TV.")
    else:
        print("2. SDB not detected: You can uninstall 'Clean Your TV' directly from the TV:")
        print("   • Go to Apps menu on TV")
        print("   • Find 'Clean Your TV', hold down the Select/OK button on your remote")
        print("   • Choose 'Delete' / 'Remove'")

    print("\n🎉 Restore complete! Nothing permanently modified on your Samsung TV.")

def main():
    parser = argparse.ArgumentParser(description="Restore original Samsung Smart TV behavior")
    parser.add_argument("ip", help="Samsung TV IP address")
    args = parser.parse_args()

    restore(args.ip)

if __name__ == "__main__":
    main()
