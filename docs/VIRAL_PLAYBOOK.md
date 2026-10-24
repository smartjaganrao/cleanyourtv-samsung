# 🚀 CleanHub TV Viral Growth Playbook

This playbook contains ready-to-post templates, talking points, and distribution channels to make **`cleanhub-tv`** trend on GitHub, Reddit, Hacker News, and YouTube/TikTok.

---

## 🎯 Target Audiences & Subreddits

| Platform / Subreddit | Angle | Why It Works |
| :--- | :--- | :--- |
| **r/tizen** | Developer & power user replacement for Smart Hub | Only modern open-source launcher for Tizen |
| **r/samsung** | Eliminating banner ads & getting "The Frame" Art Mode for free | Replaces $4.99/mo Art Store fee on cheap TVs |
| **r/cordcutters** | 350+ free live channels worldwide without hardware boxes | Direct savings on cable and streaming devices |
| **r/Piracy** | Ad-blocking telemetry + free IPTV player without activation fees | Replaces \$15-$30 paid IPTV apps (Smart IPTV, IBO) |
| **r/selfhosted** | Dumb TV conversion, local web remote, private DNS blocklists | True offline-first smart TV autonomy |
| **Hacker News (Show HN)** | Minimalist glassmorphic web launcher running on Tizen WebKit | Tech community loves fast, bloatware-free hacks |

---

## 📝 Ready-to-Post Templates

### 1. Reddit: r/samsung & r/tizen
**Title:**  
> *I built a 100% free, open-source launcher for Samsung TVs: CleanHub TV (No ads, 60fps Retro Arcade, "The Frame" Art Mode, and 350+ free live channels).*

**Body:**  
```markdown
Hey everyone!

Like many of you, I was sick and tired of Samsung Smart Hub injecting sponsored ads, auto-playing video trailers, and lagging on my TV. Samsung also charges $4.99/month just to display art on "The Frame".

So I built and open-sourced **CleanHub TV (Samsung Edition)**:
🔗 https://github.com/smartjaganrao/cleanhub-tv

### What it does:
1. **Ad-Free Home Screen:** Lightweight 60fps glassmorphic dashboard with instant app launching.
2. **60fps Retro Arcade & Controller Diagnostics:** Built-in retro games with stick drift radar and trigger gauges for Xbox/PS controllers.
3. **"The Frame" Ambient Art Mode:** 4K public domain museum masterpieces (Van Gogh, Monet, Hokusai, NASA JWST) with OLED pixel-shift burn-in protection—completely free.
4. **Built-in World Live IPTV:** 350+ legal, active live streams across 26 countries (News, Sports, Movies, Kids) synced from iptv-org with an EPG guide.
5. **Custom M3U & Favorites:** Load your own playlists with zero activation fees.
6. **No Root Required:** Sideloads directly via Developer Mode (1-2-3-4-5).

Pre-built `.wgt` releases and 1-click Python installer scripts are available in the repo. Would love your feedback!
```

---

### 2. Reddit: r/cordcutters & r/Piracy
**Title:**  
> *Stop paying $15-$30 activation fees for IPTV apps on Samsung TVs. Here is CleanHub TV — free open-source Tizen launcher with built-in world IPTV and zero telemetry.*

**Body:**  
```markdown
Most Samsung TV users get stuck paying one-time or yearly fees for apps like Smart IPTV or IBO Player just to stream M3U playlists, while Samsung's stock OS logs every HDMI device you plug in.

I open-sourced **CleanHub TV Samsung Edition**:
- 350+ curated free global channels built right in (News, Sports, Movies).
- Custom M3U / M3U8 support and channel favorites (Yellow/F button).
- Adblock blocklists blocking 70+ Samsung ad/telemetry domains.
- Works on any Samsung Tizen TV from 2016 through 2026.

GitHub: https://github.com/smartjaganrao/cleanhub-tv
```

---

### 3. Hacker News (Show HN)
**Title:**  
> *Show HN: CleanHub TV – Ad-free 60fps Smart Hub replacement with Retro Arcade, Art Mode, and live IPTV for Samsung Tizen*

**Body:**  
```text
CleanHub TV is an open-source W3C Web widget for Samsung Tizen OS (2016–2026).

Modern smart TVs suffer from significant bloatware, telemetry, and sponsored banners. CleanHub TV replaces the Smart Hub launcher with a vanilla HTML5/CSS3/ES6 interface that runs at a locked 60fps on low-end TV chipsets.

Features:
- Sub-50ms cold-start via Tizen Web Runtime
- Zero npm or framework dependencies
- Built-in 60fps Retro Arcade & Gamepad Stick Drift Radar
- 4K Public Domain Art Mode with OLED anti-burn-in pixel shifting
- Integrated HLS streaming engine with 350+ live streams from iptv-org
- Automated SDB deployment script and blocklists for 70+ Samsung tracking domains

Source code: https://github.com/smartjaganrao/cleanhub-tv
```

---

### 4. TikTok / YouTube Shorts / Instagram Reels Script (45 Seconds)

**Visual 1 (0:00 - 0:08):**  
Point phone camera at a cluttered Samsung Smart Hub with sponsored banner ads.  
*Voiceover:* "Did you know your expensive Samsung TV is showing you ads and tracking everything you watch?"

**Visual 2 (0:08 - 0:18):**  
Show Samsung remote pressing `1 - 2 - 3 - 4 - 5` in the Apps menu.  
*Voiceover:* "You can unlock Developer Mode in 5 seconds with this hidden remote code: 1-2-3-4-5."

**Visual 3 (0:18 - 0:32):**  
Show terminal running `python3 tools/sdb_install.py <TV_IP>` and the TV instantly transforming into CleanHub TV with glassmorphic cards and Art Mode.  
*Voiceover:* "Now install CleanHub TV. It completely wipes out all ads, gives you the Samsung Frame art mode for free, and gives you 350+ free live TV channels from around the world."

**Visual 4 (0:32 - 0:45):**  
Surf through ABC News, Sky News, and show Van Gogh's Starry Night on screen.  
*Voiceover:* "It's 100% free and open-source on GitHub. Link in bio or search CleanHub TV Samsung!"
