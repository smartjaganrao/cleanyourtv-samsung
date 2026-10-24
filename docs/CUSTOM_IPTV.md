# 📺 Custom M3U Playlists & Favorites Guide

CleanYourTV includes a built-in IPTV player with **350+ curated world channels**, but you can also load your own custom M3U / M3U8 playlists, Xtream codes streams, and manage channel favorites.

---

## ⭐ Channel Favorites

Mark your favorite live streams for 1-click access:

1. While playing any channel, press **`Yellow`** or **`F`** (or Green / Tools) on your remote.
2. The OSD will confirm: **`★ Favorited`**.
3. In the EPG Guide (press **`◄ Left`**), switch to the **`★ Favorites`** tab to view your saved lineup.
4. Favorites are automatically persisted in local TV storage (`localStorage`).

---

## 🔗 Adding Custom M3U / M3U8 Playlists

You can load your own private or public M3U streaming playlist into CleanYourTV:

### Method 1: In-Browser / Developer Console
Open your TV browser or developer session at `http://<TV_IP>:26101` and run:
```javascript
IPTVService.addCustomPlaylist("My Sports Streams", "https://example.com/playlist.m3u");
```

### Method 2: Custom M3U Tab in EPG
1. Press **`◄ Left`** during playback to open the EPG Channel Guide.
2. Navigate to the Countries column and select **`Custom M3U`**.
3. If no URL is saved, you can load popular free legal community playlists like:
   - **Free-TV (English):** `https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8`
   - **Samsung TV Plus (US Public Streams):** `https://i.mjh.nz/SamsungTVPlus/us.m3u8`
   - **Pluto TV (All Genres):** `https://i.mjh.nz/PlutoTV/all.m3u8`
   - **Plex Free Live TV:** `https://i.mjh.nz/Plex/all.m3u8`

---

## 🛠️ Remote Controls Summary

| Remote Button | Action |
| :--- | :--- |
| **▲ Up / CH ▲** | Next Channel (Surfing) |
| **▼ Down / CH ▼** | Previous Channel (Surfing) |
| **◄ Left** | Open Sliding EPG Guide |
| **► Right** | Close EPG Guide / Return to full screen |
| **OK / Enter** | Select Channel / Show OSD Banner |
| **Yellow / F / Tools** | **Toggle Channel Favorite (★)** |
| **Return / Back** | Exit Live TV mode to Home Screen |
