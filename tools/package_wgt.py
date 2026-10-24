#!/usr/bin/env python3
"""Packages the CleanYourTV HTML5/JS/CSS app into a Samsung Tizen .wgt (widget) archive.

Usage:
    python3 tools/package_wgt.py [--output cleanyourtv-samsung.wgt]
"""

import os
import sys
import zipfile
import argparse

def package_wgt(src_dir, output_path):
    print(f"📦 Packaging Tizen Web Application from '{src_dir}' into '{output_path}'...")
    
    if not os.path.exists(src_dir):
        sys.exit(f"Error: Source directory '{src_dir}' does not exist.")
        
    config_xml = os.path.join(src_dir, "config.xml")
    if not os.path.exists(config_xml):
        sys.exit(f"Error: 'config.xml' missing in '{src_dir}'. Invalid Tizen project.")

    total_files = 0
    with zipfile.ZipFile(output_path, 'w', compression=zipfile.ZIP_DEFLATED) as zip_out:
        for root, dirs, files in os.walk(src_dir):
            for file in files:
                if file.startswith('.') or file.endswith('.DS_Store'):
                    continue
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, src_dir)
                zip_out.write(file_path, arcname=rel_path)
                total_files += 1

    file_size_kb = os.path.getsize(output_path) / 1024
    print(f"✨ Successfully created '{output_path}' ({total_files} files, {file_size_kb:.1f} KB)")
    
    # Also create backward compatibility copy if generating cleanhub-samsung.wgt
    if os.path.basename(output_path) == "cleanhub-samsung.wgt":
        legacy_path = os.path.join(os.path.dirname(output_path), "cleanyourtv-samsung.wgt")
        try:
            import shutil
            shutil.copyfile(output_path, legacy_path)
            print(f"🔗 Also created legacy '{legacy_path}' for backward compatibility.")
        except Exception:
            pass

    print("👉 Next step: Install to TV via 'python3 tools/sdb_install.py <TV_IP>'")

def main():
    parser = argparse.ArgumentParser(description="Package CleanHub into a Tizen .wgt file")
    parser.add_argument("--src", default=os.path.join(os.path.dirname(os.path.dirname(__file__)), "launcher"),
                        help="Path to launcher directory (default: launcher/)")
    parser.add_argument("--output", default="cleanhub-samsung.wgt",
                        help="Output .wgt file name (default: cleanhub-samsung.wgt)")
    args = parser.parse_args()

    package_wgt(os.path.abspath(args.src), os.path.abspath(args.output))

if __name__ == "__main__":
    main()
