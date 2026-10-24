#!/usr/bin/env python3
"""Theme Manager for CleanYourTV Samsung Edition

Allows previewing, switching, and generating theme configurations without rebuilding the launcher.

Usage:
    python3 tools/theme.py --list
    python3 tools/theme.py --apply aurora
"""

import os
import sys
import json
import argparse

THEMES_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "themes")
CONFIG_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "config.json")

def list_themes():
    print("🎨 Available Themes for CleanYourTV:\n")
    for f in os.listdir(THEMES_DIR):
        if f.endswith(".json"):
            theme_path = os.path.join(THEMES_DIR, f)
            with open(theme_path) as tf:
                data = json.load(tf)
                name = data.get("name", f)
                tid = data.get("id", f[:-5])
                bg = data.get("background_color", "#000")
                glow = "Enabled" if data.get("ambient_glow") else "Disabled"
                print(f"  • {tid:<12} : {name:<24} (BG: {bg}, Glow: {glow})")

def apply_theme(theme_id):
    target = os.path.join(THEMES_DIR, f"{theme_id}.json")
    if not os.path.exists(target):
        sys.exit(f"❌ Theme '{theme_id}' not found in {THEMES_DIR}")

    with open(target) as f:
        theme_data = json.load(f)

    with open(CONFIG_FILE, "r") as f:
        cfg = json.load(f)

    cfg["theme"] = theme_id
    cfg["ambient_glow"] = theme_data.get("ambient_glow", True)
    cfg["dock_size"] = theme_data.get("dock_size", 4)

    with open(CONFIG_FILE, "w") as f:
        json.dump(cfg, f, indent=2)

    print(f"✨ Applied theme '{theme_data.get('name')}' ({theme_id}) to config.json.")
    print("👉 Re-package with: python3 tools/package_wgt.py")

def main():
    parser = argparse.ArgumentParser(description="CleanYourTV Theme Manager")
    parser.add_argument("--list", action="store_true", help="List available themes")
    parser.add_argument("--apply", help="Apply a theme by ID (e.g. aurora, midnight, minimal)")
    args = parser.parse_args()

    if args.list:
        list_themes()
    elif args.apply:
        apply_theme(args.apply)
    else:
        list_themes()

if __name__ == "__main__":
    main()
