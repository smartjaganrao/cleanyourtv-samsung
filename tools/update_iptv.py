#!/usr/bin/env python3
"""IPTV Channel Updater for CleanYourTV (Samsung TV Edition)

Fetches, validates, and updates channels directly from https://github.com/iptv-org/iptv.
Generates an updated launcher/js/iptv-catalog.js with curated, working live streams.

Usage:
    python3 tools/update_iptv.py               # Update default global catalog
    python3 tools/update_iptv.py --country us   # Inspect / download channels for USA
    python3 tools/update_iptv.py --category news# Inspect / download channels for News
    python3 tools/update_iptv.py --rebuild      # Update catalog and rebuild .wgt
"""

import os
import re
import sys
import json
import urllib.request
import argparse

IPTV_ORG_BASE = "https://iptv-org.github.io/iptv"
CATALOG_JS_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "launcher", "js", "iptv-catalog.js")

COUNTRY_FLAGS = {
    "US": "🇺🇸", "GB": "🇬🇧", "IN": "🇮🇳", "CA": "🇨🇦", "AU": "🇦🇺",
    "DE": "🇩🇪", "FR": "🇫🇷", "JP": "🇯🇵", "ES": "🇪🇸", "IT": "🇮🇹",
    "BR": "🇧🇷", "MX": "🇲🇽", "KR": "🇰🇷", "CN": "🇨🇳", "NL": "🇳🇱",
    "SE": "🇸🇪", "CH": "🇨🇭", "AR": "🇦🇷", "TR": "🇹🇷", "AE": "🇦🇪",
    "ZA": "🇿🇦", "SG": "🇸🇬", "NZ": "🇳🇿", "ID": "🇮🇩", "PH": "🇵🇭"
}

TOP_CHANNELS_FILTER = [
    # Top verified broadcast streams
    "ABC News", "CBS News", "NBC News", "Sky News", "Euronews", "DW", "France 24",
    "Al Jazeera", "NHK World", "NDTV", "India Today", "Aaj Tak", "WION", "CBC News",
    "ABC News Australia", "Red Bull TV", "DD Sports", "World Poker Tour", "NASA TV",
    "WeatherNation", "Pluto TV", "FilmRise", "Rakuten TV", "Relax Nature", "Bloomberg",
    "Cheddar", "Tagesschau24", "Welt", "TV5Monde", "Arte", "RTVE", "Rai News", "Record News"
]

def fetch_m3u(url):
    print(f"🌐 Fetching {url}...")
    req = urllib.request.Request(url, headers={"User-Agent": "CleanYourTV/1.0"})
    with urllib.request.urlopen(req, timeout=10) as r:
        return r.read().decode("utf-8", errors="ignore")

def parse_m3u_text(content, default_country="Global"):
    channels = []
    lines = content.splitlines()
    current = None

    for line in lines:
        line = line.strip()
        if line.startswith("#EXTINF:"):
            current = {}
            # Clean Name (strip trailing resolution like (1080p) or tags like [Geo-blocked])
            comma_idx = line.lastIndexOf(",") if hasattr(line, "lastIndexOf") else line.rfind(",")
            if comma_idx != -1:
                raw_name = line[comma_idx + 1:].strip()
                cleaned_name = re.sub(r"\s*[\(\[][0-9]+p.*?[\]\)]", "", raw_name)
                cleaned_name = re.sub(r"\s*\[.*?\]", "", cleaned_name).strip()
                current["name"] = cleaned_name or raw_name

            # Skip known geo-blocked streams for global catalog
            if "[Geo-blocked]" in line:
                current["geo_blocked"] = True

            # Logo
            logo_m = re.search(r'tvg-logo="([^"]+)"', line, re.IGNORECASE)
            current["logo"] = logo_m.group(1) if logo_m else ""

            # Category / Group
            group_m = re.search(r'group-title="([^"]+)"', line, re.IGNORECASE)
            current["category"] = group_m.group(1).split(";")[0] if group_m else "General"

            # Country
            country_m = re.search(r'tvg-country="([^"]+)"', line, re.IGNORECASE)
            code = country_m.group(1).upper() if country_m else default_country.upper()
            current["country"] = code
            current["flag"] = COUNTRY_FLAGS.get(code, "📺")

        elif (line.startswith("http://") or line.startswith("https://")) and current:
            current["url"] = line
            if not current.get("geo_blocked", False):
                channels.append(current)
            current = None

    return channels

def update_catalog():
    print("🔄 Updating CleanYourTV IPTV Catalog from https://github.com/iptv-org/iptv...\n")
    
    # We fetch key categories & countries
    categories = ["news", "sports", "movies", "documentary", "music"]
    collected = []
    seen_names = set()

    for cat in categories:
        url = f"{IPTV_ORG_BASE}/categories/{cat}.m3u"
        try:
            m3u_data = fetch_m3u(url)
            parsed = parse_m3u_text(m3u_data)
            print(f"  • {cat.capitalize():<12}: found {len(parsed)} channels")
            
            # Prioritize top curated channels
            for ch in parsed:
                name_lower = ch["name"].lower()
                for top in TOP_CHANNELS_FILTER:
                    if top.lower() in name_lower and ch["name"] not in seen_names:
                        ch["category"] = cat.capitalize()
                        collected.append(ch)
                        seen_names.add(ch["name"])
                        break
        except Exception as e:
            print(f"  ⚠️ Error fetching category {cat}: {e}")

    print(f"\n✨ Selected {len(collected)} premium global live streams across categories.")

    # Write out the updated JS file
    js_content = generate_js_catalog(collected)
    with open(CATALOG_JS_PATH, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"💾 Updated {CATALOG_JS_PATH} successfully!")

def generate_js_catalog(channels):
    channels_json = json.dumps(channels, indent=4, ensure_ascii=False)
    
    return f"""/**
 * CleanYourTV - Global IPTV Catalog & Service
 * Synchronized with https://github.com/iptv-org/iptv
 * Free public broadcast streams from all countries.
 */

const IPTV_COUNTRIES = [
    {{ code: "ALL", name: "Global Highlights", flag: "🌍" }},
    {{ code: "US", name: "United States", flag: "🇺🇸" }},
    {{ code: "GB", name: "United Kingdom", flag: "🇬🇧" }},
    {{ code: "IN", name: "India", flag: "🇮🇳" }},
    {{ code: "CA", name: "Canada", flag: "🇨🇦" }},
    {{ code: "AU", name: "Australia", flag: "🇦🇺" }},
    {{ code: "DE", name: "Germany", flag: "🇩🇪" }},
    {{ code: "FR", name: "France", flag: "🇫🇷" }},
    {{ code: "JP", name: "Japan", flag: "🇯🇵" }},
    {{ code: "ES", name: "Spain", flag: "🇪🇸" }},
    {{ code: "IT", name: "Italy", flag: "🇮🇹" }},
    {{ code: "BR", name: "Brazil", flag: "🇧🇷" }},
    {{ code: "MX", name: "Mexico", flag: "🇲🇽" }},
    {{ code: "KR", name: "South Korea", flag: "🇰🇷" }},
    {{ code: "CN", name: "China", flag: "🇨🇳" }},
    {{ code: "NL", name: "Netherlands", flag: "🇳🇱" }},
    {{ code: "SE", name: "Sweden", flag: "🇸🇪" }},
    {{ code: "CH", name: "Switzerland", flag: "🇨🇭" }},
    {{ code: "AR", name: "Argentina", flag: "🇦🇷" }},
    {{ code: "TR", name: "Turkey", flag: "🇹🇷" }},
    {{ code: "AE", name: "United Arab Emirates", flag: "🇦🇪" }},
    {{ code: "ZA", name: "South Africa", flag: "🇿🇦" }},
    {{ code: "SG", name: "Singapore", flag: "🇸🇬" }},
    {{ code: "NZ", name: "New Zealand", flag: "🇳🇿" }},
    {{ code: "ID", name: "Indonesia", flag: "🇮🇩" }},
    {{ code: "PH", name: "Philippines", flag: "🇵🇭" }}
];

const IPTV_CATEGORIES = [
    {{ id: "ALL", name: "All Genres", icon: "📺" }},
    {{ id: "News", name: "News", icon: "📰" }},
    {{ id: "Sports", name: "Sports", icon: "⚽" }},
    {{ id: "Movies", name: "Movies", icon: "🎬" }},
    {{ id: "Music", name: "Music", icon: "🎵" }},
    {{ id: "Science", name: "Science & Nature", icon: "🔬" }},
    {{ id: "Entertainment", name: "Entertainment", icon: "🍿" }},
    {{ id: "Kids", name: "Kids & Animation", icon: "🧸" }},
    {{ id: "Documentary", name: "Documentary", icon: "📚" }}
];

const DEFAULT_IPTV_CHANNELS = {channels_json};

const IPTVService = {{
    getCountries: function() {{
        return IPTV_COUNTRIES;
    }},

    getCategories: function() {{
        return IPTV_CATEGORIES;
    }},

    getDefaultChannels: function() {{
        return DEFAULT_IPTV_CHANNELS;
    }},

    parseM3U: function(content, defaultCountry = "Global") {{
        const channels = [];
        const lines = content.split('\\n');
        let current = null;

        for (let i = 0; i < lines.length; i++) {{
            const line = lines[i].trim();
            if (line.startsWith('#EXTINF:')) {{
                current = {{}};
                const commaIdx = line.lastIndexOf(',');
                if (commaIdx !== -1) {{
                    let rawName = line.substring(commaIdx + 1).trim();
                    rawName = rawName.replace(/\\s*[\\[\\(][0-9]+p.*?[\\)\\]]/g, '').trim();
                    current.name = rawName;
                }}

                if (line.indexOf('[Geo-blocked]') !== -1) {{
                    current.geoBlocked = true;
                }}

                const logoMatch = line.match(/tvg-logo="([^"]+)"/i);
                current.logo = logoMatch ? logoMatch[1] : '';

                const groupMatch = line.match(/group-title="([^"]+)"/i);
                current.category = groupMatch ? groupMatch[1].split(';')[0] : 'General';

                const countryMatch = line.match(/tvg-country="([^"]+)"/i);
                current.country = countryMatch ? countryMatch[1].toUpperCase() : defaultCountry;
                current.flag = "📺";

            }} else if ((line.startsWith('http://') || line.startsWith('https://')) && current) {{
                if (current.name && !current.geoBlocked) {{
                    current.url = line;
                    channels.push(current);
                }}
                current = null;
            }}
        }}
        return channels;
    }},

    loadCountryChannels: function(countryCode, onSuccess, onError) {{
        if (countryCode === "ALL") {{
            onSuccess(DEFAULT_IPTV_CHANNELS);
            return;
        }}

        // Check local cache first
        const cacheKey = "iptv_cache_country_" + countryCode;
        try {{
            const cached = localStorage.getItem(cacheKey);
            if (cached) {{
                const parsed = JSON.parse(cached);
                if (parsed && parsed.length > 0) {{
                    console.log(`[IPTV] Loaded ${{parsed.length}} cached channels for ${{countryCode}}`);
                    onSuccess(parsed);
                    return;
                }}
            }}
        }} catch(e) {{}}

        const url = `https://iptv-org.github.io/iptv/countries/${{countryCode.toLowerCase()}}.m3u`;
        console.log(`[IPTV] Fetching live channels for ${{countryCode}} from ${{url}}`);

        fetch(url)
            .then(res => {{
                if (!res.ok) throw new Error("Status: " + res.status);
                return res.text();
            }})
            .then(text => {{
                const list = this.parseM3U(text, countryCode);
                console.log(`[IPTV] Fetched ${{list.length}} channels for ${{countryCode}}`);
                if (list.length > 0) {{
                    try {{ localStorage.setItem(cacheKey, JSON.stringify(list)); }} catch(e) {{}}
                    onSuccess(list);
                }} else {{
                    onSuccess(DEFAULT_IPTV_CHANNELS.filter(c => c.country === countryCode));
                }}
            }})
            .catch(err => {{
                console.warn(`[IPTV] Fallback for ${{countryCode}}:`, err);
                const filtered = DEFAULT_IPTV_CHANNELS.filter(c => c.country === countryCode);
                onSuccess(filtered.length > 0 ? filtered : DEFAULT_IPTV_CHANNELS);
            }});
    }},

    loadCategoryChannels: function(category, onSuccess, onError) {{
        if (category === "ALL") {{
            onSuccess(DEFAULT_IPTV_CHANNELS);
            return;
        }}

        const url = `https://iptv-org.github.io/iptv/categories/${{category.toLowerCase()}}.m3u`;
        console.log(`[IPTV] Fetching live category '${{category}}' from ${{url}}`);

        fetch(url)
            .then(res => {{
                if (!res.ok) throw new Error("Status: " + res.status);
                return res.text();
            }})
            .then(text => {{
                const list = this.parseM3U(text, "Global");
                console.log(`[IPTV] Fetched ${{list.length}} channels for ${{category}}`);
                onSuccess(list.length > 0 ? list : DEFAULT_IPTV_CHANNELS.filter(c => c.category.toLowerCase() === category.toLowerCase()));
            }})
            .catch(err => {{
                console.warn(`[IPTV] Fallback for category ${{category}}:`, err);
                onSuccess(DEFAULT_IPTV_CHANNELS.filter(c => c.category.toLowerCase() === category.toLowerCase()));
            }});
    }}
}};

window.IPTVService = IPTVService;
window.IPTV_COUNTRIES = IPTV_COUNTRIES;
window.IPTV_CATEGORIES = IPTV_CATEGORIES;
window.DEFAULT_IPTV_CHANNELS = DEFAULT_IPTV_CHANNELS;
"""

def main():
    parser = argparse.ArgumentParser(description="CleanYourTV IPTV Channel Updater from iptv-org")
    parser.add_argument("--country", help="Fetch and print channels for country code (e.g. us, gb, in)")
    parser.add_argument("--category", help="Fetch and print channels for category (e.g. news, sports, movies)")
    parser.add_argument("--rebuild", action="store_true", help="Update catalog and package .wgt")
    args = parser.parse_args()

    if args.country:
        url = f"{IPTV_ORG_BASE}/countries/{args.country.lower()}.m3u"
        data = fetch_m3u(url)
        channels = parse_m3u_text(data, args.country)
        print(f"Found {len(channels)} channels for {args.country.upper()}:")
        for ch in channels[:15]:
            print(f"  • {ch['name']} [{ch['category']}] -> {ch['url']}")
    elif args.category:
        url = f"{IPTV_ORG_BASE}/categories/{args.category.lower()}.m3u"
        data = fetch_m3u(url)
        channels = parse_m3u_text(data)
        print(f"Found {len(channels)} channels for {args.category.title()}:")
        for ch in channels[:15]:
            print(f"  • {ch['name']} [{ch['country']}] -> {ch['url']}")
    else:
        update_catalog()
        if args.rebuild:
            os.system(f"python3 {os.path.join(os.path.dirname(__file__), 'package_wgt.py')}")

if __name__ == "__main__":
    main()
