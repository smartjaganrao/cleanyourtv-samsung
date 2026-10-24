/**
 * Curated metadata, known Tizen App IDs, SVG icons and brand glow colors
 * for major streaming apps on Samsung Smart TVs.
 */

// SVG Icon Data URIs for offline, crystal-clear 4K rendering
const APP_ICONS = {
    livetv: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%230F172A"/><circle cx="50" cy="50" r="8" fill="%2338BDF8"/><path d="M66 34a23 23 0 0 1 0 32m-32 0a23 23 0 0 1 0-32m44-11a38 38 0 0 1 0 54m-54 0a38 38 0 0 1 0-54" stroke="%2338BDF8" stroke-width="4.5" fill="none" stroke-linecap="round"/></svg>',
    netflix: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%23000"/><path d="M28 20h12v60H28z" fill="%23E50914"/><path d="M60 20h12v60H60z" fill="%23E50914"/><path d="M28 20h12l32 60H60z" fill="%23B81D24"/></svg>',
    youtube: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%23FF0000"/><path d="M42 36l22 14-22 14z" fill="%23FFF"/></svg>',
    prime: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%2300A8E1"/><path d="M25 60c18 12 36 12 50 0M68 56l7 4-5 6" stroke="%23FFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
    disney: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%23113CCF"/><path d="M50 24c-14 0-24 12-24 26 0 16 14 26 24 26 10 0 24-10 24-26 0-14-10-26-24-26z" fill="none" stroke="%23FFF" stroke-width="4"/><path d="M36 50h28" stroke="%23FFF" stroke-width="4"/></svg>',
    appletv: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%231C1C1E"/><text x="50" y="62" font-family="-apple-system, sans-serif" font-size="34" font-weight="600" fill="%23FFF" text-anchor="middle">tv</text><path d="M50 26c2-4 6-5 6-5s-1 4-3 6c-2 2-6 1-6 1s0-4 3-6z" fill="%23FFF"/></svg>',
    plex: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%23282A2D"/><path d="M34 26l18 24-18 24h15l18-24-18-24z" fill="%23E5A00D"/></svg>',
    spotify: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%231ED760"/><path d="M28 42c16-4 32-2 44 5M32 54c13-3 26-1 36 5M36 66c10-2 20 0 28 4" stroke="%23000" stroke-width="5" stroke-linecap="round" fill="none"/></svg>',
    twitch: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%239146FF"/><path d="M26 24h48v34l-12 12H50l-8 8v-8H26z" fill="%23FFF"/><path d="M42 38v14M58 38v14" stroke="%239146FF" stroke-width="5" stroke-linecap="round"/></svg>',
    jellyfin: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%23000B25"/><path d="M50 22C32 22 22 42 22 62c8-8 18-12 28-12s20 4 28 12c0-20-10-40-28-40z" fill="%2300A4DC"/></svg>',
    moonlight: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%231B2838"/><circle cx="50" cy="50" r="28" fill="%2358A6FF"/></svg>',
    browser: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%231A73E8"/><circle cx="50" cy="50" r="26" fill="none" stroke="%23FFF" stroke-width="4"/><ellipse cx="50" cy="50" rx="14" ry="26" fill="none" stroke="%23FFF" stroke-width="4"/><line x1="24" y1="50" x2="76" y2="50" stroke="%23FFF" stroke-width="4"/></svg>',
    hdmi: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%2330363D"/><rect x="28" y="38" width="44" height="26" rx="4" fill="none" stroke="%23FFF" stroke-width="4"/><text x="50" y="56" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="%23FFF" text-anchor="middle">HDMI</text></svg>'
};

const DEFAULT_CATALOG = [
    {
        id: "cleanyourtv.livetv",
        aliasId: "livetv",
        name: "Live World TV",
        desc: "Free Public Broadcasts from All Countries · News, Sports & Entertainment",
        icon: APP_ICONS.livetv,
        color: "rgba(56, 189, 248, 0.45)",
        isDock: true
    },
    {
        id: "11101200001",
        aliasId: "org.tizen.netflix-app",
        name: "Netflix",
        desc: "Watch TV Shows and Movies Anytime, Anywhere",
        icon: APP_ICONS.netflix,
        color: "rgba(229, 9, 20, 0.4)",
        isDock: true
    },
    {
        id: "111299001912",
        aliasId: "youtube",
        name: "YouTube",
        desc: "Videos, Music and Live Streams",
        icon: APP_ICONS.youtube,
        color: "rgba(255, 0, 0, 0.4)",
        isDock: true
    },
    {
        id: "3201512006785",
        aliasId: "3201910019365",
        name: "Prime Video",
        desc: "Amazon Originals, Movies and Series",
        icon: APP_ICONS.prime,
        color: "rgba(0, 168, 225, 0.4)",
        isDock: true
    },
    {
        id: "3201907018807",
        aliasId: "disneyplus",
        name: "Disney+",
        desc: "Disney, Pixar, Marvel, Star Wars & Nat Geo",
        icon: APP_ICONS.disney,
        color: "rgba(17, 60, 207, 0.4)",
        isDock: false
    },
    {
        id: "3201807016597",
        aliasId: "appletv",
        name: "Apple TV",
        desc: "Apple Originals, MLB and MLS Season Pass",
        icon: APP_ICONS.appletv,
        color: "rgba(255, 255, 255, 0.25)",
        isDock: false
    },
    {
        id: "3201512006963",
        aliasId: "plex",
        name: "Plex",
        desc: "Stream Your Personal Media, Free Live TV & Movies",
        icon: APP_ICONS.plex,
        color: "rgba(229, 160, 13, 0.4)",
        isDock: false
    },
    {
        id: "3201606009684",
        aliasId: "spotify",
        name: "Spotify",
        desc: "Music for Every Moment",
        icon: APP_ICONS.spotify,
        color: "rgba(30, 215, 96, 0.4)",
        isDock: false
    },
    {
        id: "3201710015037",
        aliasId: "twitch",
        name: "Twitch",
        desc: "Live Gaming, Esports and Creative Broadcasts",
        icon: APP_ICONS.twitch,
        color: "rgba(145, 70, 255, 0.4)",
        isDock: false
    },
    {
        id: "org.tizen.browser",
        aliasId: "samsung_browser",
        name: "Internet",
        desc: "Samsung Smart TV Web Browser",
        icon: APP_ICONS.browser,
        color: "rgba(26, 115, 232, 0.4)",
        isDock: false
    },
    {
        id: "org.jellyfin.tizen",
        aliasId: "jellyfin",
        name: "Jellyfin",
        desc: "Free Software Media System",
        icon: APP_ICONS.jellyfin,
        color: "rgba(0, 164, 220, 0.4)",
        isDock: false
    },
    {
        id: "com.moonlight.stream",
        aliasId: "moonlight",
        name: "Moonlight",
        desc: "GameStream Client for 4K 60FPS PC Gaming",
        icon: APP_ICONS.moonlight,
        color: "rgba(88, 166, 255, 0.4)",
        isDock: false
    }
];

window.DEFAULT_CATALOG = DEFAULT_CATALOG;
window.APP_ICONS = APP_ICONS;
