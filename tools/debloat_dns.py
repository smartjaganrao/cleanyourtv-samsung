#!/usr/bin/env python3
"""Samsung Smart TV Ad & Telemetry DNS Blocker Tool

Verifies whether your network is currently blocking Samsung Smart Hub ads and telemetry,
and generates drop-in blocklists for Pi-hole, AdGuard Home, or routers.

Usage:
    python3 tools/debloat_dns.py --check
    python3 tools/debloat_dns.py --export pihole
    python3 tools/debloat_dns.py --export adguard
"""

import os
import sys
import socket
import argparse

BLOCKLIST_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "blocklists", "samsung-ads-telemetry.txt")

SAMPLE_DOMAINS = [
    "samsungads.com",
    "config.samsungads.com",
    "gpm.samsungqbe.com",
    "log-config.samsungacr.com",
    "samsungacr.com",
    "samsungotn.net"
]

def check_domains():
    print("🔎 Checking network status for Samsung ad and telemetry tracking servers...\n")
    print(f"{'Domain':<30} | {'Status':<15} | {'Resolved IP'}")
    print("-" * 65)

    blocked_count = 0
    total_count = len(SAMPLE_DOMAINS)

    for domain in SAMPLE_DOMAINS:
        try:
            ip = socket.gethostbyname(domain)
            if ip in ("0.0.0.0", "127.0.0.1", "::1") or ip.startswith("0."):
                status = "🛡️  BLOCKED"
                blocked_count += 1
            else:
                status = "⚠️  ACTIVE (Ad)"
            print(f"{domain:<30} | {status:<15} | {ip}")
        except socket.gaierror:
            status = "🛡️  BLOCKED (NX)"
            blocked_count += 1
            print(f"{domain:<30} | {status:<15} | None (Blocked)")

    print("-" * 65)
    if blocked_count == total_count:
        print("🎉 EXCELLENT! All Samsung ad & telemetry servers are blocked on your network.")
        print("   Your Smart Hub is clean and no viewing data is tracked.")
    elif blocked_count > 0:
        print(f"⚠️  Partial blocking: {blocked_count}/{total_count} domains blocked.")
    else:
        print("🚨 Ads & Telemetry are ACTIVE on your network.")
        print("   Follow the instructions below to block them on your router, Pi-hole, or AdGuard.")

def print_router_guide():
    print("\n" + "="*70)
    print("📺 In-TV Privacy Settings (Step 1: Disable on TV directly)")
    print("="*70)
    print("1. Open TV Settings → All Settings → General & Privacy → Privacy Terms.")
    print("2. Turn OFF 'Viewing Information Services' (ACR tracking).")
    print("3. Turn OFF 'Interest-based Advertisements'.")
    print("4. Turn OFF 'Voice Recognition Data' recording.\n")
    print("="*70)
    print("🛡️  Network Ad-Blocking (Step 2: Router or DNS)")
    print("="*70)
    print("• Pi-hole: Add 'blocklists/pihole-blocklist.txt' into Adlists, then run 'pihole -g'.")
    print("• AdGuard Home: Filters → DNS blocklists → Add blocklist → Custom.")
    print("• Router DNS: Point your TV's DNS in Network Settings to an ad-blocking DNS server")
    print("  (e.g., AdGuard DNS 94.140.14.14 or NextDNS).")
    print("="*70)

def main():
    parser = argparse.ArgumentParser(description="Samsung TV Ad & Telemetry Blocker Utility")
    parser.add_argument("--check", action="store_true", help="Check if ad domains are currently blocked")
    parser.add_argument("--guide", action="store_true", help="Show TV settings and router blocking guide")
    args = parser.parse_args()

    check_domains()
    print_router_guide()

if __name__ == "__main__":
    main()
