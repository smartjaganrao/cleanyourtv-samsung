# 📺 Ad-Free YouTube for Samsung Smart TVs (TizenTube)

Unlike standard banner ads or tracking telemetry, YouTube in-stream video ads cannot be blocked using DNS tools like Pi-hole or AdGuard alone, because Google serves video advertisements from the same dynamic CDN endpoints (`*.googlevideo.com`) as actual video content.

CleanYourTV integrates **Ad-Free YouTube with SponsorBlock (TizenTube)**, bringing the complete ad-free SmartTube experience to Samsung Tizen OS without needing an Android TV box or Fire Stick.

---

## ✨ Features

- **🚫 Zero Video Ads:**  
  Blocks all video pre-roll ads, mid-roll interruptions, and post-roll advertisements.
- **⏩ SponsorBlock Integration:**  
  Automatically detects and skips sponsored segments, subscriber reminders, intros, and non-music sections inside videos.
- **🎬 4K HDR 60fps Playback:**  
  Full hardware-accelerated playback supporting VP9 Profile 2 and AV1 codecs on Samsung TVs.
- **🎵 Background Playback / Screen-Off Mode:**  
  Listen to music, podcasts, or video essays while turning off the TV screen to save power.
- **🔑 Google Account Login:**  
  Sign into your standard Google/YouTube account to preserve your subscriptions, history, and playlists.

---

## 🚀 1-Click Wi-Fi Sideload Installation

You can install Ad-Free YouTube directly to your Samsung TV over local Wi-Fi:

### Prerequisites:
1. Ensure your Samsung TV is in **Developer Mode** (press `1` `2` `3` `4` `5` in TV Apps menu).
2. Ensure you have restarted the TV by **holding the remote Power button for 3 seconds** (opens port 26101).

### Installation Command:
From your computer terminal inside the repository:
```bash
python3 tools/install_tizentube.py <TV_IP>
```
*Example:* `python3 tools/install_tizentube.py 192.168.1.100`

### What the installer does:
1. Verifies that your TV is reachable on SDB Developer Port 26101.
2. Fetches the latest verified TizenTube `.wgt` package from GitHub.
3. Automatically sideloads and registers the application on your TV.
4. Seamlessly adds the **"Ad-Free YouTube"** card to your CleanYourTV home dock!

---

## 🌐 Instant Web Ad-Free Player (No Install Needed)

If you prefer not to sideload an extra application, CleanYourTV also includes a **Web Ad-Free Player** option:
1. Click the **Ad-Free YouTube** tile on your CleanYourTV home screen.
2. Select **`🌐 Launch Web Ad-Free Player (Piped)`**.
3. It opens an ad-free, privacy-respecting YouTube client directly in the TV browser.

---

## ❓ Frequently Asked Questions

<details>
<summary><b>Is TizenTube safe for my Samsung TV?</b></summary>

Yes. TizenTube is an open-source client packaged as a standard Tizen Web Application (`.wgt`). It runs within Samsung's application sandbox and does not root, modify firmware, or invalidate your warranty.
</details>

<details>
<summary><b>Can I still keep the original YouTube app?</b></summary>

Yes. Both apps coexist peacefully. You can launch either Ad-Free YouTube or the standard YouTube app at any time from your CleanYourTV dashboard.
</details>

<details>
<summary><b>Does SponsorBlock work in all languages?</b></summary>

Yes. SponsorBlock is community-powered and supports video segments submitted worldwide across English, Spanish, German, Hindi, French, Japanese, and more.
</details>
