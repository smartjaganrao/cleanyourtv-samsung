# The Prompt: Clean Your TV (Samsung TV OS / Tizen Edition)

Paste this into your AI coding assistant (Gemini, Claude, or Codex with shell access) on a computer that is on the same Wi-Fi network as your Samsung Smart TV. Works on Samsung Smart TVs running Tizen OS (Neo QLED, OLED, The Frame, QLED, UHD Crystal, Series 7/8/9, 2016–2026+).

Before you start, on your Samsung TV:
1. Open the **Apps** menu from the Smart Hub bar.
2. On your remote control, press `1` `2` `3` `4` `5`.
3. Toggle **Developer Mode** to **ON**, enter your computer's local IP address as **Host PC IP**, and click **OK**.
4. Hold the remote's **Power** button for 3 seconds to restart the TV. Keep the TV on.

---

I want to debloat my Samsung Smart TV (Tizen OS), eliminate the sponsored Smart Hub ads and telemetry, and replace the home screen with a clean Apple TV style launcher.
My TV IP or Model is: <ENTER TV IP OR MODEL HERE>.

Work with me step-by-step on my local device over Wi-Fi:

1. **Discovery & Connection:**
   - Scan my local network or test the provided IP using `python3 tools/samsung_tv.py --probe <TV_IP>`.
   - Verify that the Samsung REST API (port 8001) and Tizen Developer port (26101) respond.
   - If SDB port 26101 is closed, guide me through the `1-2-3-4-5` Developer Mode unlock.

2. **Backup First:**
   - Run `python3 tools/backup.py <TV_IP>` to back up the current device profile, network state, and list of installed applications before changing anything.

3. **Remote Pairing:**
   - Run `python3 tools/samsung_tv.py --pair <TV_IP>` to establish secure WebSocket pairing with the TV. Tell me when the "Allow CleanYourTV" popup appears on my TV screen so I can click Allow.

4. **Package & Sideload CleanYourTV Launcher:**
   - Build the W3C Tizen Web Application using `python3 tools/package_wgt.py`.
   - Install the package onto my TV using `python3 tools/sdb_install.py <TV_IP>`.
   - Confirm that "Clean Your TV" appears in my TV apps list.

5. **Bypass the Bloated Smart Hub:**
   - Guide me through setting the native TV auto-boot behavior:
     - `Settings → General → Smart Features → Autorun Smart Hub` = **OFF**
     - `Settings → General → Smart Features → Autorun Last App` = **ON**
   - Confirm that when the TV turns on, it opens CleanYourTV directly with zero ads!

6. **Block Samsung Ads & Telemetry (ACR):**
   - Run `python3 tools/debloat_dns.py --check` to verify whether Samsung tracking servers (`samsungads.com`, `samsungacr.com`, `gpm.samsungqbe.com`) are active on my network.
   - Guide me on disabling "Viewing Information Services" (ACR) and "Interest-based Ads" in TV Privacy Terms.
   - Provide the DNS blocklist from `blocklists/` to block all sponsored ad rows on my router or Pi-hole.

7. **Preferences & Customization:**
   - Ask me which apps I want pinned to my bottom dock (e.g. Netflix, YouTube, Prime, Plex, Disney+, Apple TV, or HDMI console).
   - Ask if I prefer the OLED Pitch Black theme or Aurora theme.
   - Check that my remote control's Left, Right, Up, Down, Enter, and Return buttons navigate the launcher smoothly.
