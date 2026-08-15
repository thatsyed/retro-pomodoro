# Design Specification: Retro Pomodoro Workstation (v2.0)

**Date:** 2026-08-15  
**Status:** Validated Design Spec (Awaiting Implementation Plan)  
**Architecture:** React 19 + Vite 6 + Tailwind CSS v4 + Web Audio API  

---

## 1. Executive Summary & Product Vision

**Retro Pomodoro Workstation** is a focused, distraction-free 8-bit / cyberpunk desktop focus console. It merges vintage CRT aesthetics (phosphor glow, scanlines, physical cassette tape decks) with modern productivity essentials: a customizable Pomodoro timer, a clean task todo manager, a dedicated interval reminders panel, high-fidelity royalty-free lo-fi focus music, and a synthesized ambient soundscape mixer.

### Core Guiding Principles:
1. **Zero Distraction & No Shenanigans:** No gamification, no XP, no leveling, no streaks. Pure, calming productivity.
2. **Strict SVG Iconography:** **Zero emojis**. All iconography strictly uses crisp, retro-styled SVG icons (`lucide-react`).
3. **Single Unified Cassette Player:** One central cassette deck with dual spinning reels for royalty-free lo-fi music + an independent 4-channel ambient sound generator.
4. **Dedicated Reminders Section:** Clear distinction between Pomodoro timer alarms and interval reminders (Hydration, Stretch, Posture, Custom timers).
5. **Smart Notifications:** Browser tab title sync (`[24:59] Focus // Retro Pomodoro`) and native desktop notifications.
6. **Full Local Persistence:** Zero accounts or backend needed; all tasks, custom reminders, volume preferences, and theme settings persist locally.

---

## 2. Design System & Visual Tokens (UI/UX Pro Max)

### Typography
* **Digital Timer & Large Digits:** `'VT323', monospace` (Authentic 1980s CRT digital terminal display)
* **Pixel Badges & Section Headers:** `'Press Start 2P', monospace` (Retro 8-bit arcade headers)
* **Body, Tasks & Reminders:** `'JetBrains Mono', 'Courier Prime', monospace` (High legibility, tabular numbers)

### Theme Color Palettes

| Theme Name | Background | CRT Surface | Primary Neon / Text | Accent Glow | Border / Bevel |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Cyberpunk Neon (Default)** | `#0a0a12` | `#121124` | `#00ffcc` (Cyan) | `#ff007f` (Hot Magenta) | `#2d2254` |
| **Amber Phosphor** | `#140d04` | `#1c1308` | `#ffb000` (Warm Amber)| `#ff7700` (Deep Orange) | `#3d280e` |
| **Emerald Matrix** | `#041108` | `#081a0e` | `#33ff66` (Matrix Green)| `#00ff88` (Mint Green) | `#133b1e` |
| **Synthwave Night** | `#0e0918` | `#171128` | `#e0aaff` (Lavender) | `#ff71ce` (Pink Neon) | `#3c2462` |
| **Classic Warm** | `#1a1614` | `#241e1b` | `#e6c280` (Warm Ochre) | `#d97736` (Terracotta) | `#3e342f` |

### CRT & Surface Shaders
* **Scanlines:** CSS `repeating-linear-gradient` with subtle opacity overlay.
* **Phosphor Glow:** Text shadow tokens `--glow-primary: 0 0 10px var(--primary), 0 0 20px var(--primary)`.
* **Bevels & Inset Panels:** Retro mechanical chiseled inset borders (`border: 2px solid`, `box-shadow: inset 2px 2px 0px rgba(255,255,255,0.08), inset -2px -2px 0px rgba(0,0,0,0.6)`).
* **Toggle Controls:** User can toggle CRT Scanlines and Glow on/off at any time.

---

## 3. Cockpit Layout (3-Column Desktop Console)

```
+-----------------------------------------------------------------------------------------+
| [RETRO POMODORO // v2.0]        [Theme: Cyberpunk v]  [CRT: ON]  [🔔 Alerts]  [⚙ Settings]  |
+-----------------------------------------------------------------------------------------+
|  LEFT DECK: TASKS (TODO)   |  CENTER HERO DECK: POMODORO & TAPE  |  RIGHT DECK: REMINDERS & MIX |
|                            |                                     |                              |
|  [+] [Add new task...    ] |   [ WORK (25m) ] [ SHORT ] [ LONG ] |  [ REMINDERS ]               |
|  Filter: [All][Act][Done]  |   +-------------------------------+ |  [+] Hydration (Every 30m)   |
|                            |   |          24 : 59              | |  [+] Stretch (Every 45m)     |
|  [ ] Design system spec    |   |     [ FOCUS SPRINT #1 ]       | |  [+] Posture Check (20m)     |
|      [High] [SVG Trash]    |   +-------------------------------+ |  [+] Custom Chime...         |
|  [x] Clean project caches  |   [ > START ]  [ >> SKIP ]  [ R ]   |                              |
|      [Med]  [SVG Trash]    |                                     |  --------------------------  |
|  [ ] Audio engine setup    |   +-------------------------------+ |  [ AMBIENT SOUNDSCAPES ]     |
|      [High] [SVG Trash]    |   | [O] CASSETTE TAPE DECK    [O] | |  Vinyl Crackle   [==|====]   |
|                            |   | Track: "Lo-Fi Chill Focus"    | |  Rain on Window  [====|==]   |
|                            |   | [|<] [ > PLAY ] [>|] [Loop]   | |  White Noise     [=|=====]   |
|  Clear Completed (1)       |   | Vol: [=======|==] 80%         | |  Cafe Ambience   [===|===]   |
+-----------------------------------------------------------------------------------------+
|  [Space]: Start/Pause  |  [Alt+S]: Skip  |  [Alt+R]: Reset  |  [Alt+M]: Mute  |  [Alt+T]: Task  |
+-----------------------------------------------------------------------------------------+
```

### 3.1 Left Deck: Task & Todo Manager
* **Purpose:** Clean, uncluttered task checklist to track items during work sessions.
* **Features:**
  * Fast inline input field with `Enter` hotkey to add tasks.
  * Priority selector badge (`Low` [Cyan/Dim], `Med` [Amber], `High` [Magenta]).
  * Custom SVG checkbox toggles task completion state.
  * Filter pills: `All`, `Active`, `Completed`.
  * Task count indicator & `Clear Completed` button.
  * LocalStorage auto-save.

### 3.2 Center Hero Deck: Pomodoro Timer & Cassette Player
* **Pomodoro Timer Component:**
  * Mode tabs: **Focus Work (25m)**, **Short Break (5m)**, **Long Break (15m)** (all intervals customizable in Settings).
  * Ultra-crisp digital countdown display with active mode indicator.
  * Progress ring / horizontal retro progress bar.
  * Large tactile mechanical buttons: **Start/Pause** (`Space`), **Skip Session** (`Alt+S`), **Reset** (`Alt+R`).
  * Session indicator: Tracks consecutive completed Pomodoros (e.g. `CYCLE: 3 / 4`).
* **Animated Lo-Fi Cassette Tape Deck:**
  * Realistic mechanical cassette tape casing with clear acrylic window.
  * Dual rotating 8-spoke tape reels with magnetic tape band moving between left and right spools.
  * Reel animation speed dynamically tracks playback state (smooth spinning when playing, stopped when paused).
  * Display: Current Track Title, Artist, Elapsed / Total Duration counter.
  * Controls: Previous Track, Play/Pause, Next Track, Seamless Looping Toggle, Volume Fader.
  * Pre-loaded with royalty-free Lo-Fi focus tracks:
    1. *Lo-Fi Chill* (Smooth ambient beats)
    2. *Morning Coffee* (Warm acoustic vinyl focus)
    3. *Starlit Focus* (Dreamy synth chords)
    4. *Midnight Terminal* (Deep focus flow)

### 3.3 Right Deck: Reminders & Ambient Soundscape Mixer
* **Reminders Panel:**
  * Independent interval timers specifically designed for healthy focus routines.
  * Built-in presets:
    * **Hydration Reminder:** Drink water every 30 mins.
    * **Stretch & Move:** Stand up and stretch every 45 mins.
    * **Posture Check:** Straighten spine every 20 mins.
    * **Eye Rest (20-20-20 rule):** Look away for 20s every 20 mins.
  * Ability to add custom reminders with customizable interval and title.
  * Toggle switches to enable/disable each reminder independently.
  * Countdown timer display showing time until next alert.
  * Retro synth chime sound played when a reminder expires.
* **Ambient Soundscape Mixer:**
  * 4 procedural / sampled background noise channels:
    1. **Vinyl Crackle:** Warm analog record needle pops.
    2. **Rain on Window:** Calming rain storm and soft thunder.
    3. **White / Pink Noise:** Steady focus frequency masking.
    4. **Cafe Ambience:** Soft distant background chatter & coffeehouse hum.
  * Independent volume sliders for each ambient layer with master mute toggle.

---

## 4. Audio Engine & Sound Synthesis

1. **Music Player Engine:**
   * Uses HTML5 `Audio` with Web Audio API `MediaElementSourceNode` routed through a master gain node and visualizer analyzer.
   * Zero audio latency, automatic looping, and track playlist management.
2. **Ambient Sound Generator:**
   * Synthesized using Web Audio API procedural audio nodes (Bandpass-filtered White Noise buffer for rain/waves, randomized click generator for vinyl crackle) for infinite looping with zero file buffering stalls.
3. **Retro Reminder & Timer Chimes:**
   * Procedurally generated FM synthesized chimes via Web Audio API `OscillatorNode` + `GainNode` envelopes:
     * *Timer Finish:* 3-note ascending 8-bit arpeggio (`C5 -> E5 -> G5 -> C6`).
     * *Reminder Alert:* Soft double-ping bell (`A5 -> D6`).
     * *Button Click:* Subtle tactile mechanical switch click (`120Hz click transient`).

---

## 5. Notifications & Tab Title Architecture

1. **Browser Tab Title Synchronization:**
   * While Timer is running: `[24:59] Focus // Retro Pomodoro` or `[04:45] Break // Retro Pomodoro`.
   * While Timer is paused: `[PAUSED 24:59] Focus // Retro Pomodoro`.
   * When session completes: `(🔔 COMPLETE!) Time for a break! // Retro Pomodoro` (flashes alternating every 1s until user refocuses tab).
2. **Native HTML5 Desktop Notifications API:**
   * Explicit user permission request toggle in top navigation / settings modal.
   * Sends desktop notification with custom icon when:
     * Pomodoro Focus period ends.
     * Break period ends.
     * Any active interval Reminder triggers.

---

## 6. Component Hierarchy & File Structure

```
d:/Projects/retro pomodoro/
├── public/
│   ├── favicon.svg
│   ├── manifest.json
│   └── sounds/
│       └── music/
│           ├── lofi-chill.wav
│           ├── morning-coffee.wav
│           └── starlit-focus.wav
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── BevelCard.jsx
│   │   │   ├── RetroButton.jsx
│   │   │   ├── RetroSlider.jsx
│   │   │   ├── RetroToggle.jsx
│   │   │   └── SvgIcon.jsx
│   │   ├── header/
│   │   │   ├── HeaderBar.jsx
│   │   │   ├── ThemeSelector.jsx
│   │   │   └── CrtToggle.jsx
│   │   ├── tasks/
│   │   │   ├── TaskDeck.jsx
│   │   │   ├── TaskInput.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskFilters.jsx
│   │   ├── timer/
│   │   │   ├── HeroTimerDeck.jsx
│   │   │   ├── DigitalDisplay.jsx
│   │   │   ├── TimerControls.jsx
│   │   │   └── ModeSelector.jsx
│   │   ├── cassette/
│   │   │   ├── CassettePlayer.jsx
│   │   │   ├── CassetteReels.jsx
│   │   │   └── TrackInfo.jsx
│   │   ├── reminders/
│   │   │   ├── RemindersDeck.jsx
│   │   │   ├── ReminderItem.jsx
│   │   │   └── AddReminderModal.jsx
│   │   ├── ambient/
│   │   │   ├── AmbientMixer.jsx
│   │   │   └── AmbientChannel.jsx
│   │   ├── settings/
│   │   │   ├── SettingsModal.jsx
│   │   │   └── KeyboardShortcutsModal.jsx
│   │   └── crt/
│   │       └── CrtOverlay.jsx
│   ├── hooks/
│   │   ├── useTimer.js
│   │   ├── useAudioPlayer.js
│   │   ├── useAmbientSound.js
│   │   ├── useReminders.js
│   │   ├── useNotifications.js
│   │   ├── useKeyboardHotkeys.js
│   │   └── useLocalStorage.js
│   ├── services/
│   │   ├── soundSynth.js
│   │   ├── notificationService.js
│   │   └── storageService.js
│   ├── styles/
│   │   ├── index.css
│   │   ├── crt.css
│   │   └── cassette.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 7. Keyboard Shortcuts Map

| Key Combination | Action |
| :--- | :--- |
| `Space` | Start / Pause Pomodoro Timer |
| `Alt + S` | Skip to next Timer period (Work ↔ Break) |
| `Alt + R` | Reset current Timer countdown |
| `Alt + M` | Master Audio Mute / Unmute |
| `Alt + T` | Focus Add Task input field |
| `Alt + N` | Open Add Reminder dialog |
| `Alt + C` | Toggle CRT Scanlines & Glow on/off |
| `Alt + K` | Open Keyboard Shortcuts Cheat-Sheet |
| `Esc` | Close any open modal / overlay |

---

## 8. Verification & QA Plan

1. **Automated Unit & Build Verification:**
   * Vite build check (`npm run build`) ensuring zero bundle errors, clean asset packaging, and valid syntax.
2. **Browser QA & Audio Testing (Playwright / Browser QA Skill):**
   * Visual verification across desktop resolutions (1920x1080, 1440x900, 1280x800) and responsive mobile (375px).
   * Verify Timer countdown precision (1-second intervals, accurate switch between Work and Breaks).
   * Verify Cassette dual reel animation spins during playback and halts when paused.
   * Verify Ambient mixer volume sliders adjust Web Audio gain nodes without clipping or audio popping.
   * Verify Reminders countdown, toggle switches, and synthesized alert audio firing.
   * Verify dynamic browser tab title updates.
   * Verify LocalStorage persistence across page reloads (Tasks, Reminders, Timer custom intervals, Audio volumes).
