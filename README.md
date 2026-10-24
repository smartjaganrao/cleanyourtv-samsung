# Clean Your TV — Samsung TV OS (Tizen) Edition

> **Debloat your Samsung Smart TV over Wi-Fi, silence sponsored ads & telemetry, and get a blazing-fast, Apple TV-style home screen.**

Adapted from the viral project [Gathin23/cleanyourtv](https://github.com/Gathin23/cleanyourtv) specifically for **Samsung Smart TVs running Tizen OS** (Neo QLED, OLED, The Frame, QLED, UHD Crystal, Series 6/7/8/9 from 2016 to 2026+).

---

## Why this exists

While Android TVs use ADB (`adb shell pm disable-user`), **Samsung Smart TVs run Samsung Tizen OS**, which is locked down against shell package removal. Retail Samsung TVs force unskippable video ads in Samsung TV Plus, sponsored banner rows in Smart Hub, and continuous ACR (Automated Content Recognition) tracking.

**This project solves it cleanly on Samsung TV OS:**
1. **Bypasses Smart Hub on boot:** Uses Samsung's native system settings (`Autorun Last App = ON` + `Autorun Smart Hub = OFF`) to boot directly into a custom launcher.
2. **Apple TV-style Home Screen:** A native Tizen Web Application (`.wgt`) with a deep OLED black background, frosted glass dock, top shelf with brand ambient glow, smooth D-pad remote navigation, and instant app launching.
3. **Stops Ads & Telemetry:** Network DNS blocklists and in-TV privacy opt-outs that eliminate sponsored tiles, ACR viewing tracking, and analytics.
4. **No root, no cable, zero brick risk, and 100% reversible.**

---

## What you get

| Feature | Description |
|---|---|
| **Pitch-black OLED Home** | Deep black (`#07080b`) aesthetic that saves power on OLED panels and eliminates visual clutter. |
| **Apple TV Glass Dock** | A rounded frosted-glass band holding your 4 to 6 favorite apps (Netflix, YouTube, Prime, Plex, Disney+, HDMI consoles). |
| **Top Shelf & Ambient Glow** | Names the focused app in large 72px Outfit typography over a soft ambient radial glow in the app's brand color. |
| **Full App Grid** | Slides up smoothly when pressing **Down** on your remote to browse all installed apps. |
| **Inputs Switcher** | Sleek glass modal to switch between HDMI 1, HDMI 2 (eARC), HDMI 3, HDMI 4, and Live TV. |
| **OLED Clock Screensaver** | Drifting minimalist clock with soft ambient glow that shifts position every 60 seconds to prevent OLED burn-in. |
| **Zero Sponsored Rows** | No sponsored banners, no forced video trailers, and no tracking. |

---

## Quick Start (3 Steps)

### 1. On your Samsung TV: Unlock Developer Mode
1. Open the **Apps** menu from your Smart Hub bar.
2. On your TV remote, press:
   ```
   1  →  2  →  3  →  4  →  5
   ```
   *(If your remote has no number buttons, press the `123` button to open the on-screen keypad and select 1-2-3-4-5).*
3. Toggle **Developer Mode** to **ON**, enter your computer's local Wi-Fi IP in **Host PC IP**, and click **OK**.
4. Hold the remote's **Power** button for 3 seconds to restart the TV.

*Detailed walkthrough: [docs/DEVELOPER_MODE.md](docs/DEVELOPER_MODE.md)*

---

### 2. On your Computer: Package & Install
Clone this repo and install to your TV over Wi-Fi:

```bash
# 1. Probe your Samsung TV
python3 tools/samsung_tv.py --probe <TV_IP>

# 2. Pair remote authentication (click 'Allow' on TV screen)
python3 tools/samsung_tv.py --pair <TV_IP>

# 3. Back up installed apps & info
python3 tools/backup.py <TV_IP>

# 4. Package the launcher into a .wgt archive
python3 tools/package_wgt.py

# 5. Sideload to TV via SDB
python3 tools/sdb_install.py <TV_IP>
```

---

### 3. Bypass Smart Hub (Auto-Boot CleanYourTV)
On your TV:
1. Open **Settings → General → Smart Features** (or `General & Privacy → Start Screen Option` on newer models).
2. Set **Autorun Smart Hub** to **OFF**.
3. Set **Autorun Last App** to **ON**.
4. Launch **Clean Your TV** from your Apps list once.

Now whenever your TV powers on, it **boots directly into CleanYourTV**, completely bypassing the factory Smart Hub!

---

## AI Coding Assistant Automated Flow

If using **Gemini CLI**, **Claude Code**, or **Codex**:
Simply copy [`PROMPT.md`](PROMPT.md), paste it into your assistant, provide your TV IP, and let the assistant guide the backup, build, deployment, and verification automatically.

---

## Ad & Telemetry Debloating

Samsung Smart TVs continuously contact ad servers (`samsungads.com`) and ACR viewing trackers (`samsungacr.com`).

### Check network status:
```bash
python3 tools/debloat_dns.py --check
```

### Block Samsung Ad & Tracker Domains:
- **Pi-hole / AdGuard Home:** Add [blocklists/pihole-blocklist.txt](blocklists/pihole-blocklist.txt) to your Adlists.
- **Router DNS:** Point your TV's DNS in Network Settings to an ad-blocking resolver (e.g. AdGuard DNS `94.140.14.14` or NextDNS).
- **In-TV Privacy Opt-Out:**
  Go to `Settings → All Settings → General & Privacy → Privacy Terms` and turn **OFF**:
  - *Viewing Information Services* (ACR HDMI/TV scanning)
  - *Interest-based Advertisements*

---

## Repository Structure

```
cleanyourtv-samsung/
├── PROMPT.md                  # Guided prompt for AI coding assistants
├── README.md                  # Project overview & documentation
├── config.json                # User launcher configuration
├── launcher/                  # Native Tizen Web App (HTML5/CSS3/JS)
│   ├── config.xml             # Tizen W3C Widget manifest & privileges
│   ├── index.html             # High-performance 4K Apple TV interface
│   ├── css/
│   │   ├── style.css          # Glassmorphism, dock, focus zoom, ambient glow
│   │   └── fonts.css          # Typography & system font stack
│   ├── js/
│   │   ├── app.js             # Spatial D-pad navigation, clock, screensaver
│   │   ├── tizen-api.js       # Samsung Tizen API (launchApp, remote keys)
│   │   ├── mock-apps.js       # App catalog, 4K vector icons & brand colors
│   │   └── config.js          # Settings & theme manager
│   └── assets/
│       └── icon.png           # 512x512 launcher icon
├── tools/                     # Command-line tools
│   ├── samsung_tv.py          # Discovery, pairing, remote keys, app launching
│   ├── package_wgt.py         # Packages launcher into .wgt archive
│   ├── sdb_install.py         # SDB connector and package installer
│   ├── debloat_dns.py         # Verifies and exports DNS ad blocklists
│   ├── backup.py              # Backs up TV state & installed apps
│   └── restore.py             # Reverts TV settings & uninstalls launcher
├── blocklists/                # Domain blocklists for Pi-hole and routers
│   ├── samsung-ads-telemetry.txt
│   └── pihole-blocklist.txt
├── docs/                      # In-depth technical guides
│   ├── DEVELOPER_MODE.md      # Samsung TV Developer Mode unlock guide
│   ├── BYPASS_SMART_HUB.md    # Auto-boot setup guide
│   ├── TIZEN_APP_IDS.md       # Reference list of Tizen App IDs
│   └── ARCHITECTURE.md        # Android TV vs Samsung Tizen OS architecture
└── themes/                    # Visual themes (OLED black, aurora, midnight, minimal)
```

---

## Remote Control Navigation

The launcher is designed for 100% remote control operation:

- **Arrow Keys (Left / Right / Up / Down):** Navigate between dock apps, top shelf buttons, and full grid.
- **Select / OK (Enter):** Launch the focused app or activate input.
- **Return / Back:** Close modals or return from grid to dock.
- **Auto-Screensaver:** If untouched for 5 minutes, an ambient drifting clock starts to protect your OLED screen.

---

## Reversing / Restoring

If you ever wish to revert:
```bash
python3 tools/restore.py <TV_IP>
```
On your TV, toggle `Autorun Smart Hub` back to **ON** under `Settings → General → Smart Features`. Nothing is permanently altered on your TV firmware.

---

## License

MIT License. Inspired by [Gathin23/cleanyourtv](https://github.com/Gathin23/cleanyourtv).
