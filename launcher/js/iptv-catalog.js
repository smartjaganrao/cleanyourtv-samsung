/**
 * CleanYourTV IPTV Catalog & Parser
 * Provides free, public, legal broadcast streams from around the world.
 * Powered by open-source IPTV database (iptv-org) with instant offline fallback.
 */

const IPTV_COUNTRIES = [
    { code: "ALL", name: "Global Highlights", flag: "🌍" },
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "ES", name: "Spain", flag: "🇪🇸" },
    { code: "IT", name: "Italy", flag: "🇮🇹" },
    { code: "BR", name: "Brazil", flag: "🇧🇷" },
    { code: "MX", name: "Mexico", flag: "🇲🇽" },
    { code: "KR", name: "South Korea", flag: "🇰🇷" }
];

const DEFAULT_IPTV_CHANNELS = [
    // --- GLOBAL NEWS ---
    {
        name: "ABC News Live",
        category: "News",
        country: "US",
        flag: "🇺🇸",
        logo: "https://i.imgur.com/L79CqV4.png",
        url: "https://content.uplynk.com/channel/3324f2467c414329b3b0cc5cd987b6be.m3u8"
    },
    {
        name: "CBS News 24/7",
        category: "News",
        country: "US",
        flag: "🇺🇸",
        logo: "https://i.imgur.com/uR2iZ3t.png",
        url: "https://cbsn-us.cbsnstream.cbsnews.com/out/v1/55a8648e8f13459e981f5401b1be9c8a/master.m3u8"
    },
    {
        name: "Sky News Live",
        category: "News",
        country: "GB",
        flag: "🇬🇧",
        logo: "https://i.imgur.com/w9UoNfG.png",
        url: "https://linear017-gb-dash1-prd-cf.cdn.sky.com/13210/16_9/sdr/hls/channel.m3u8"
    },
    {
        name: "Euronews English",
        category: "News",
        country: "FR",
        flag: "🇪🇺",
        logo: "https://i.imgur.com/00t48f5.png",
        url: "https://euronews-euronews-world-1-au.samsung.wurl.tv/playlist.m3u8"
    },
    {
        name: "DW English",
        category: "News",
        country: "DE",
        flag: "🇩🇪",
        logo: "https://i.imgur.com/7123jYI.png",
        url: "https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8"
    },
    {
        name: "France 24 English",
        category: "News",
        country: "FR",
        flag: "🇫🇷",
        logo: "https://i.imgur.com/X4y16oF.png",
        url: "https://static.france24.com/live/F24_EN_LO_HLS/live_tv.m3u8"
    },
    {
        name: "Al Jazeera English",
        category: "News",
        country: "QA",
        flag: "🌍",
        logo: "https://i.imgur.com/7TqW8yA.png",
        url: "https://live-hls-web-aje.getaj.net/AJE/01.m3u8"
    },
    {
        name: "NHK World-Japan",
        category: "News",
        country: "JP",
        flag: "🇯🇵",
        logo: "https://i.imgur.com/y1vO901.png",
        url: "https://nhkwlive-ojp.akamaized.net/hls/live/2003459/nhkwlive-ojp-en/index.m3u8"
    },
    {
        name: "NDTV 24x7",
        category: "News",
        country: "IN",
        flag: "🇮🇳",
        logo: "https://i.imgur.com/T0TqW3f.png",
        url: "https://ndtv24x7elemadmin.akamaized.net/hls/live/2003678-b/ndtv24x7/master.m3u8"
    },
    {
        name: "India Today",
        category: "News",
        country: "IN",
        flag: "🇮🇳",
        logo: "https://i.imgur.com/hXhYw4K.png",
        url: "https://feeds.intoday.in/livetv/indiatoday/master.m3u8"
    },
    {
        name: "Aaj Tak",
        category: "News",
        country: "IN",
        flag: "🇮🇳",
        logo: "https://i.imgur.com/QkZJ8sA.png",
        url: "https://feeds.intoday.in/livetv/aajtak/master.m3u8"
    },
    {
        name: "WION",
        category: "News",
        country: "IN",
        flag: "🇮🇳",
        logo: "https://i.imgur.com/Qe6oW5h.png",
        url: "https://d35j504z0x2vu2.cloudfront.net/v1/manifest/0bc8e83029fed245312f23437f1594c2193da416/wion-linear-partner/8a9fa661-d703-4f9e-aa78-028a3875323e/3.m3u8"
    },
    {
        name: "CBC News",
        category: "News",
        country: "CA",
        flag: "🇨🇦",
        logo: "https://i.imgur.com/UfS155d.png",
        url: "https://cbclive5-lh.akamaihd.net/i/cbcfvnews_1@401925/master.m3u8"
    },
    {
        name: "ABC News Australia",
        category: "News",
        country: "AU",
        flag: "🇦🇺",
        logo: "https://i.imgur.com/vHqLqL7.png",
        url: "https://abclivestream2-lh.akamaihd.net/i/abcnews_1@402008/master.m3u8"
    },

    // --- SPORTS & OUTDOORS ---
    {
        name: "Red Bull TV",
        category: "Sports",
        country: "US",
        flag: "🌍",
        logo: "https://i.imgur.com/6Uqg56c.png",
        url: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8"
    },
    {
        name: "DD Sports",
        category: "Sports",
        country: "IN",
        flag: "🇮🇳",
        logo: "https://i.imgur.com/d9jJ6pL.png",
        url: "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/DDSports/default/index.m3u8"
    },
    {
        name: "World Poker Tour",
        category: "Sports",
        country: "US",
        flag: "🇺🇸",
        logo: "https://i.imgur.com/8Qp2F6g.png",
        url: "https://wpt-wpt-1-us.samsung.wurl.tv/playlist.m3u8"
    },

    // --- SCIENCE, TECH & NATURE ---
    {
        name: "NASA TV",
        category: "Science",
        country: "US",
        flag: "🇺🇸",
        logo: "https://i.imgur.com/5wQ2p6A.png",
        url: "https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8"
    },
    {
        name: "WeatherNation",
        category: "Weather",
        country: "US",
        flag: "🇺🇸",
        logo: "https://i.imgur.com/6xLqK4A.png",
        url: "https://weathernation-linear.amagi.tv/playlist.m3u8"
    },
    {
        name: "Relax Nature 4K",
        category: "Nature",
        country: "US",
        flag: "🌍",
        logo: "https://i.imgur.com/3YpXW2L.png",
        url: "https://stream.ecable.tv/nature/tracks-v1a1/mono.m3u8"
    },

    // --- ENTERTAINMENT & MOVIES ---
    {
        name: "Pluto TV Movies",
        category: "Movies",
        country: "US",
        flag: "🇺🇸",
        logo: "https://i.imgur.com/hY1aB5m.png",
        url: "https://jmp2.uk/plu-5ca688f1181249767f3329f6.m3u8"
    },
    {
        name: "FilmRise Classic TV",
        category: "Entertainment",
        country: "US",
        flag: "🇺🇸",
        logo: "https://i.imgur.com/w2YxV6F.png",
        url: "https://filmrise-classictv-1-us.samsung.wurl.tv/playlist.m3u8"
    },
    {
        name: "Rakuten TV Action",
        category: "Movies",
        country: "GB",
        flag: "🇪🇺",
        logo: "https://i.imgur.com/00t48f5.png",
        url: "https://rakuten-actionmovies-1-eu.rakuten.wurl.tv/playlist.m3u8"
    }
];

const IPTVService = {
    getCountries: function() {
        return IPTV_COUNTRIES;
    },

    getDefaultChannels: function() {
        return DEFAULT_IPTV_CHANNELS;
    },

    parseM3U: function(content, defaultCountry = "Global") {
        const channels = [];
        const lines = content.split('\n');
        let current = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('#EXTINF:')) {
                current = {};
                // Name (after last comma)
                const commaIdx = line.lastIndexOf(',');
                if (commaIdx !== -1) {
                    current.name = line.substring(commaIdx + 1).trim();
                }

                // Logo
                const logoMatch = line.match(/tvg-logo="([^"]+)"/i);
                current.logo = logoMatch ? logoMatch[1] : '';

                // Group / Category
                const groupMatch = line.match(/group-title="([^"]+)"/i);
                current.category = groupMatch ? groupMatch[1].split(';')[0] : 'General';

                // Country
                const countryMatch = line.match(/tvg-country="([^"]+)"/i);
                current.country = countryMatch ? countryMatch[1].toUpperCase() : defaultCountry;
                current.flag = "📺";

            } else if (line.startsWith('http://') || line.startsWith('https://')) {
                if (current && current.name) {
                    current.url = line;
                    channels.push(current);
                    current = null;
                }
            }
        }
        return channels;
    },

    loadCountryChannels: function(countryCode, onSuccess, onError) {
        if (countryCode === "ALL") {
            onSuccess(DEFAULT_IPTV_CHANNELS);
            return;
        }

        const url = `https://iptv-org.github.io/iptv/countries/${countryCode.toLowerCase()}.m3u`;
        console.log(`[IPTV] Fetching live channels for country: ${countryCode} from ${url}`);

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Network response error: " + res.status);
                return res.text();
            })
            .then(text => {
                const list = this.parseM3U(text, countryCode);
                console.log(`[IPTV] Loaded ${list.length} channels for ${countryCode}`);
                if (list.length === 0) {
                    onSuccess(DEFAULT_IPTV_CHANNELS.filter(c => c.country === countryCode));
                } else {
                    onSuccess(list);
                }
            })
            .catch(err => {
                console.warn(`[IPTV] Fallback to default catalog for ${countryCode}:`, err);
                const filtered = DEFAULT_IPTV_CHANNELS.filter(c => c.country === countryCode);
                onSuccess(filtered.length > 0 ? filtered : DEFAULT_IPTV_CHANNELS);
            });
    }
};

window.IPTVService = IPTVService;
window.IPTV_COUNTRIES = IPTV_COUNTRIES;
window.DEFAULT_IPTV_CHANNELS = DEFAULT_IPTV_CHANNELS;
