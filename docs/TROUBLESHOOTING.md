# Troubleshooting: CleanYourTV for Samsung Smart TV (Tizen OS)

Common issues, why they happen on Samsung TVs, and how to resolve them.

---

### 1. `sdb connect <TV_IP>:26101` fails or times out
- **Cause 1: Developer Mode is not enabled on the TV.**  
  *Fix:* Go to `Apps` on your TV, press `1-2-3-4-5` on your remote, turn Developer Mode ON, enter your PC's IP, and click OK.
- **Cause 2: TV was not power-cycled after enabling Developer Mode.**  
  *Fix:* Hold the remote's **Power** button for 3–5 seconds until the screen turns off and the Samsung logo re-appears. A simple press only puts the TV into standby.
- **Cause 3: Host PC IP mismatch.**  
  *Fix:* If your computer's IP address changed on your router (DHCP renewal), re-open the `1-2-3-4-5` menu in Apps and update the Host PC IP.

---

### 2. SDB install fails with `Author signature invalid` or `Certificate error`
- **Cause:** Retail Samsung TV firmware requires a valid developer certificate for sideloading.
- **Fix:**
  - Option A: Open Tizen Studio or Samsung Device Manager, go to `Tools → Certificate Manager`, create a free Samsung Certificate (Author & Distributor), and sign the widget.
  - Option B: Use the pre-packaged unsigned dev widget: ensure your TV's developer mode is set to your computer's active IP, which permits local dev sideloading without strict store verification.

---

### 3. The TV does not auto-boot into CleanYourTV
- **Check 1: "Autorun Last App" setting.**  
  Ensure `Settings → General → Smart Features → Autorun Last App` is toggled **ON**. (On Tizen 7/8/9, this is under `Settings → All Settings → General & Privacy → Start Screen Option`).
- **Check 2: "Start with Smart Hub Home" / "Autorun Smart Hub".**  
  Ensure this toggle is set to **OFF**.
- **Check 3: Launch CleanYourTV once manually.**  
  Open CleanYourTV from your TV's Apps bar once. Once it has been opened, Samsung Tizen treats it as the "Last App" and will restore it every time the TV powers on.

---

### 4. HDMI Inputs do not switch from the Inputs modal
- **Cause:** Tizen application deep link syntax can vary across firmware versions.
- **Fix:** You can switch inputs via the standard Source button on your remote, or send the direct remote key using the CLI:
  ```bash
  python3 tools/samsung_tv.py <TV_IP> --key KEY_SOURCE
  ```

---

### 5. An app like Netflix or YouTube shows "Network Error" after applying DNS blocklists
- **Cause:** Some aggressive ad blocklists accidentally include required video CDN endpoints.
- **Fix:** The provided `blocklists/samsung-ads-telemetry.txt` is strictly scoped to Samsung ad engines (`samsungads.com`, `samsungacr.com`). If you used a third-party list, whitelist:
  - `netflix.com`, `nflxvideo.net`, `nflxso.net`
  - `youtube.com`, `googlevideo.com`, `ytimg.com`
