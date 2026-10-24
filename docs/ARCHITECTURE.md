# CleanYourTV Architecture: Android TV vs Samsung Tizen OS

This document explains the technical architectural differences between the original Android TV implementation ([Gathin23/cleanyourtv](https://github.com/Gathin23/cleanyourtv)) and this **Samsung TV OS (Tizen OS)** edition.

---

## Architectural Comparison

| Dimension | Android TV / Google TV | Samsung Smart TV (Tizen OS) |
|---|---|---|
| **Underlying OS** | Android (Linux kernel + ART runtime) | Tizen OS (Linux kernel + EFL / WebKit / Chromium runtime) |
| **Debug Bridge** | ADB (Android Debug Bridge) on port 5555 | SDB (Smart Development Bridge) on port 26101 |
| **Package Format** | Android Package (`.apk`) | W3C Tizen Web Widget (`.wgt`) |
| **Application Runtime** | Native Android Java / Kotlin / Compose | Web Application (HTML5, CSS3, ES6 JavaScript) |
| **System Launcher Debloat** | `pm disable-user com.google.android.tvlauncher` | Bypassed via native TV setting: `Autorun Smart Hub = OFF` + `Autorun Last App = ON` |
| **App Launching Mechanism** | Intent (`am start -n ...`) | Tizen Web API (`tizen.application.launch(appId)`) & REST API |
| **Remote Control Protocol** | ADB keyevent (`input keyevent <CODE>`) | Samsung WebSocket API (port 8001 / 8002 WSS) & Tizen D-Pad API |
| **Ad & Telemetry Removal** | Disabling OEM packages (`com.google.android.leanbacklauncher.recommendations`) | Router/Pi-hole DNS blocking of Samsung ACR/Ad domains + in-TV privacy opt-outs |
| **Root Required?** | No (Standard user ADB) | No (Standard user SDB & Developer Mode) |
| **Risk of Bricking** | Low | **Zero** (All customizations run in user space; 100% reversible) |

---

## Why SDB / Web Widget Architecture on Samsung TV?

1. **Native Performance:**  
   Samsung Smart TVs have dedicated hardware acceleration for Tizen Web Applications. HTML5 glassmorphism, CSS transforms, and SVG icons render in native 60fps 4K without bogging down the TV's processor.

2. **Cross-Year Compatibility:**  
   Samsung changes the Smart Hub UI every 2–3 firmware generations. A native Web Widget launcher utilizing `tizen.application.launch` and `tvinputdevice` runs uniformly across **Tizen 2.4 (2016) up to Tizen 9.0+ (2026)**.

3. **No Root or Cable Required:**  
   Everything connects over your existing Wi-Fi network. Developer Mode is unlocked via the remote control (`1-2-3-4-5`), and SDB communicates wirelessly over TCP port 26101.
