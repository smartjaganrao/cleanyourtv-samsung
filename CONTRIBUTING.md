# Contributing to CleanYourTV Samsung Edition

Thank you for contributing! The most valuable contribution you can make is submitting your Samsung TV model's verified debloat profile and app list so the next person with your TV model can set it up instantly.

---

## Adding Your TV Model to `examples/`

1. Create a folder under `examples/` named in kebab-case:
   ```
   examples/samsung-<series>-<model>-<year>/
   ```
   *Example: `examples/samsung-neo-qled-qn90d-2024/`*

2. Add a `tv.json` file inside it:
   ```json
   {
     "tv": "Samsung Neo QLED 65\" QN90D 4K (2024)",
     "os": "Tizen OS 8.0",
     "brand": "Samsung",
     "model_code": "QN65QN90DAFXZA",
     "notes": "Smart Hub bypass via Autorun Last App; ACR disabled"
   }
   ```

3. Add a `debloat.txt` documenting the tested in-TV toggles and verified App IDs.

4. Submit a Pull Request!

---

## Coding Standards

- The launcher is written in vanilla HTML5, CSS3, and ES6 JavaScript. No heavy frontend frameworks or node_modules runtime overhead—this ensures it runs at native 60fps even on entry-level Samsung Crystal UHD processors.
- Keep assets lightweight: vector SVGs are strongly preferred over large raster bitmaps.
- Preserve full remote-control (D-pad) accessibility for all screens and modals.
