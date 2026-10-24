# 🖼️ Ambient Art Mode ("The Frame" for Any Samsung TV)

Samsung charges **\$4.99/month** for the Art Store subscription on "The Frame" TVs. Standard Samsung Crystal, QLED, and OLED owners don't even have access to Art Mode.

**CleanYourTV Ambient Art Mode** brings the complete 4K museum experience to **every Samsung Tizen Smart TV (2016–2026)** for free, with zero ads and zero subscriptions.

---

## ✨ Features

- **🏛️ 4K Public Domain Museum Masterpieces:**  
  Curated from the world's most prestigious institutions:
  - **The Starry Night** (Vincent van Gogh, 1889 – MoMA New York)
  - **Water Lilies** (Claude Monet, 1916 – Musée Marmottan Paris)
  - **The Great Wave off Kanagawa** (Katsushika Hokusai, 1831 – Met New York)
  - **Girl with a Pearl Earring** (Johannes Vermeer, 1665 – Mauritshuis The Hague)
  - **The Kiss** (Gustav Klimt, 1908 – Belvedere Vienna)
  - **Wanderer above the Sea of Fog** (Caspar David Friedrich, 1818 – Kunsthalle Hamburg)
  - **A Sunday on La Grande Jatte** (Georges Seurat, 1884 – Art Institute of Chicago)
  - **Cosmic Cliffs in Carina Nebula** (James Webb Space Telescope – NASA / ESA)

- **🛡️ OLED Burn-in Protection (Pixel-Shift Algorithm):**  
  Every 30 seconds, HUD elements, clocks, and plaques shift subtly by $\pm 6\text{px}$ to prevent static image retention on OLED and QD-OLED displays.

- **🕰️ Minimalist Floating HUD:**  
  Displays the museum curation plaque (Artist, Title, Year, Medium, Museum) and an elegant ambient digital clock.

- **⏯️ Auto-Slideshow:**  
  Gently transitions between paintings every 45 seconds with Ken Burns subtle scaling.

---

## 🎮 Samsung Remote Shortcuts in Art Mode

| Button | Action |
| :--- | :--- |
| **◄ Left** | Previous Masterpiece |
| **► Right** | Next Masterpiece |
| **▲ Up / ▼ Down** | Toggle HUD (Clock & Museum Plaque visibility) |
| **OK / Enter / Play / Pause** | Toggle Auto-Slideshow (Pause on your favorite painting) |
| **Return / Back** | Exit back to CleanYourTV Home Dashboard |

---

## 🛠️ How to Add Custom Artwork or Family Photos

To display your own photography, family portraits, or high-res wallpapers:
1. Open [`launcher/js/art-mode.js`](file:///Users/jaganrao/.gemini/antigravity/scratch/cleanyourtv-samsung/launcher/js/art-mode.js).
2. Append your image object to the `ART_CATALOG` array:
   ```javascript
   {
       id: 'my-custom-photo',
       title: 'Alps Sunset',
       artist: 'Family Vacation',
       year: '2026',
       medium: 'Digital Photograph',
       museum: 'Personal Gallery',
       accent: 'rgba(251, 146, 60, 0.5)',
       imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920'
   }
   ```
3. Re-package via `python3 tools/package_wgt.py` and install to your TV!
