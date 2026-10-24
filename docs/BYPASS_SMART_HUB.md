# Bypassing Samsung Smart Hub (Auto-Boot CleanYourTV)

On retail Samsung Smart TVs, Samsung does not allow unprivileged users to delete or replace the system launcher binary (`Smart Hub`) using root commands. However, **Samsung built-in TV settings provide a native, official method to completely bypass Smart Hub on boot!**

By configuring two specific system settings, your Samsung TV will power on directly into **CleanYourTV**, giving you an instant Apple TV-style home screen without sponsored ads or video trailers.

---

## 2-Step TV Configuration

### Step 1: Turn OFF "Autorun Smart Hub"
1. Press the **Settings** button or navigate to **All Settings** on your TV.
2. Go to:
   * **Tizen 7.0 / 8.0 / 9.0 (2022–2026+):**  
     `Settings → All Settings → General & Privacy → Start Screen Option`  
     Uncheck **Start with Smart Hub Home**.
   * **Tizen 3.0 / 4.0 / 5.0 / 6.0 (2017–2021):**  
     `Settings → General → Smart Features`  
     Toggle **Autorun Smart Hub** to **OFF**.

### Step 2: Turn ON "Autorun Last App"
1. In the same menu (`Start Screen Option` or `Smart Features`):
2. Toggle **Autorun Last App** to **ON**.

---

## How It Works in Everyday Use

1. Launch **Clean Your TV** from your TV's app bar once.
2. From Clean Your TV, launch Netflix, YouTube, Prime, Plex, or switch to your HDMI inputs.
3. Whenever you turn off your TV and turn it back on, Samsung Tizen OS will **automatically restore CleanYourTV full screen**.
4. You never have to see the ad-filled Smart Hub home screen again!

---

## Returning to Factory Hub
If you ever want to return to default behavior:
* Simply go back to `Settings → General → Smart Features` and toggle **Autorun Smart Hub** to **ON**.
