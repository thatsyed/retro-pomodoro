# Retro Pomodoro Workstation v2.0 (Production Edition)

![Retro Pomodoro](https://images2.imgbox.com/7b/ca/XXHAyRVF_o.png)

## Overview

**Retro Pomodoro Workstation** is an authentic, production-grade 3-Deck Modular Focus Console built with **Vite, React 19, Tailwind CSS, Lucide React**, and the **Web Audio API**.

Designed for deep focus and flow state, it combines a high-precision drift-proof Pomodoro timer, 5 switchable retro hardware CRT themes, interactive pixel companions, daily focus analytics, task operations log with priority tags, scheduled alarms, real-time ambient noise synthesizer, Lo-Fi tape deck with a 10-bar equalizer, PWA offline capability, and Screen Wake Lock support.

---

## 🚀 Key Highlights & Tech Stack

- **Modern Tech Stack**: Vite + React 19 + Tailwind CSS + Lucide Icons + bespoke retro pixel SVGs.
- **100% SVG Visuals**: Zero raw emoji placeholders for buttons or UI controls.
- **5 Curated Themes**:
  1. ☕ **Classic Amber** – Warm cozy coffee shop console with amber phosphor CRT glow.
  2. 👾 **Game Boy LCD** – Nintendo DMG-01 olive matrix LCD with burgundy button accents.
  3. 🌌 **Cyberpunk '84** – Midnight terminal with neon cyan (`#00f0ff`) & hot pink (`#ff007f`) phosphor bloom.
  4. 🕹️ **8-Bit Arcade** – Charcoal cabinet with NES crimson red & cobalt blue accents.
  5. 📼 **Vapor Sunset** – Aesthetic pastel lilac chassis with sunset peach and mint teal glow.
- **Zero-Bandwidth Web Audio Ambient Synthesizer**: Procedural focus sound generator for _Rain_, _Vinyl Crackle_, _Pink Noise_, and _Cafe Murmur_.
- **Lo-Fi Tape Deck**: Seamless looping audio tracks (_Morning Coffee_, _Lo-Fi Chill_, _Starlit Focus_) paired with an animated 10-bar reactive pixel equalizer.
- **Interactive Focus Companions**: Switch between **Cozy Steaming Mug**, **Pixel Cat**, **Growing Bonsai**, and **Lo-Fi Cassette Tape**.
- **PWA & 100% Offline Capability**: Web App Manifest (`manifest.json`) + Service Worker (`sw.js`) allowing installation on desktop/mobile and 100% offline usage.
- **Hardware Integration**: Screen Wake Lock API keeps your display alive during active focus sprints.
- **Data Portability**: Full JSON backup Export and Import for all settings, tasks, and alarm history.

---

## 3-Deck Architecture

```
+----------------------------------------------------------------------------------------------------+
|                                    GLOBAL WORKSTATION BAR                                          |
|  [WS-8080 PRO] [🍅 4 SESSIONS | ⏱️ 100m]  [THEME SELECTOR] [⌨️ GUIDE] [⚡ ZEN] [⚙️ CONFIG]       |
+------------------------------------+----------------------------------+----------------------------+
|        LEFT DECK: TASK LOG         |       CENTER DECK: POMODORO      |      RIGHT DECK: AUX       |
|                                    |                                  |                            |
|  • 📋 TASK LOG (X/Y DONE badge)    |  • Status LED + Mode Status      |  [📻 LO-FI TAPE DECK]      |
|  • Stepped Pixel Progress Gauge    |  • Live Digital Clock (HH:MM:SS) |  • 10-Bar Animated Pixel EQ|
|  • Filter: ALL | ACTIVE | DONE     |  • Circular SVG Progress Ring    |  • Lo-Fi Music Player      |
|  • Priority Tags: 🔴 High|⚪ Mid|🟢 Low |  • Mode Tabs: WORK|SHORT|LONG    |  • Volume Slider (% level) |
|  • Quick Task Input + Clear Done   |  • Big CRT Countdown Display     |  • [🌧️ AMBIENT GENERATOR]  |
|  • Custom Pixel Checkboxes         |  • ☕🐱🪴📼 Pixel Companions      |    Rain | Vinyl | PinkNoise|
|  • Strikethrough & Delete Actions  |  • Session Tallies & Daily Goal  |  [⏰ SCHEDULED ALARMS]     |
|                                    |  • Arcade Buttons: START/PAUSE/R |  • Daily Alarms + Label    |
|                                    |  • Quick Presets: 25/5|50/10|15/3|  • Active Toggleable List  |
+------------------------------------+----------------------------------+----------------------------+
```

---

## ⌨️ Keyboard Shortcuts

| Key              | Action                                |
| ---------------- | ------------------------------------- |
| <kbd>SPACE</kbd> | Start / Pause Pomodoro Timer          |
| <kbd>R</kbd>     | Reset Timer to initial duration       |
| <kbd>W</kbd>     | Switch to Work Mode                   |
| <kbd>S</kbd>     | Switch to Short Break Mode            |
| <kbd>L</kbd>     | Switch to Long Break Mode             |
| <kbd>Z</kbd>     | Toggle Zen Focus Mode                 |
| <kbd>M</kbd>     | Toggle Lo-Fi Music Play / Pause       |
| <kbd>?</kbd>     | Open / Close Keyboard Shortcuts Guide |
| <kbd>ESC</kbd>   | Close any active modal dialog         |

---

## 🛠️ Development & Production Scripts

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Local Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### 3. Production Build

```bash
npm run build
```

Creates an optimized, tree-shaken, and minified production bundle in the `dist/` directory (~78 kB gzipped).

### 4. Preview Production Build

```bash
npm run preview
```

---

Made with 🩷 by Owais.
