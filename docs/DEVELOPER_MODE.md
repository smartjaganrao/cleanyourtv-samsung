# How to Enable Developer Mode on Samsung Smart TV (Tizen OS)

Samsung Smart TVs (Tizen OS 2.4 through 9.0+, covering 2016–2026+ models) have a built-in developer mode that can be unlocked directly with your standard TV remote.

No special cable or hardware is needed—only your TV and computer on the same Wi-Fi network.

---

## Step 1: Open the Apps Menu
1. Turn on your Samsung TV.
2. Press the **Home** button on your remote.
3. Navigate to and open the **Apps** icon.

---

## Step 2: Enter the Secret Remote Code
Once inside the Apps screen:
1. On your standard Samsung remote, press the number buttons in sequence:
   ```
   1  →  2  →  3  →  4  →  5
   ```
   *(If you have the minimalist Samsung Solar / Smart remote without number keys: press the `123` / Num button on the remote to bring up the on-screen number pad, then select 1, 2, 3, 4, 5).*

---

## Step 3: Turn Developer Mode ON
A dialog titled **Developer Mode Configuration** will immediately appear:
1. Toggle **Developer Mode** to **ON**.
2. In the **Host PC IP** field, enter your computer's local IP address (e.g. `192.168.1.15`).
   * *Tip:* To find your computer's IP:
     * **macOS:** System Settings → Wi-Fi → Details... or run `ipconfig getifaddr en0` in Terminal.
     * **Windows:** Run `ipconfig` in Command Prompt.
     * **Linux:** Run `hostname -I` or `ip a`.
3. Select **OK**.

---

## Step 4: Restart the TV (Important!)
For the developer port (`26101`) to open, you must power-cycle the TV:
1. Hold down the **Power** button on your Samsung remote for **3 to 5 seconds** until the screen turns black and the Samsung startup logo reappears.
2. Or unplug the TV power cord for 10 seconds and plug it back in.

---

## Step 5: Verify the Connection
Run this command from your computer:
```bash
python3 tools/samsung_tv.py --probe <TV_IP>
```
You should see:
```
SDB Developer Port (26101): 🟢 OPEN (Developer Mode Active)
```
Your Samsung TV is now ready for CleanYourTV sideloading!
