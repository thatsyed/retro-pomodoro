# Retro Pomodoro Workstation - Production Architecture & Design Spec

**Date:** 2026-08-15  
**Status:** Approved  
**Author:** Pair Programming Agent  

---

## 1. Overview & Objectives

Transform the **Retro Pomodoro Workstation** into an enterprise-grade, high-performance, production-ready web application built on **Vite + React 19 + Tailwind CSS**.

### Key Deliverables
1. **Modern Tech Stack**: Vite + React 19 + Tailwind CSS + Lucide React icons + bespoke pixel SVGs (100% SVG, zero raw emoji placeholders).
2. **Audio & Sound Profile Engine**: High-quality offline looping soundscapes + real-time Web Audio API synthesized ambient noise generators (Rain, Vinyl, Pink Noise, Cafe) + tactile retro SFX (mechanical clicks, level-up arpeggios, alarm chimes).
3. **5 Retro Theme Systems**: Classic Amber, Game Boy DMG-01, Cyberpunk '84, 8-Bit Arcade, and Vapor Sunset with customizable CRT scanlines.
4. **PWA & Offline Capability**: Service Worker (`sw.js`) and Web App Manifest (`manifest.json`) for installability and offline execution.
5. **Hardware Utilities**: Screen Wake Lock API to prevent device sleep during active focus sessions.
6. **Data Portability**: LocalStorage persistence with JSON Export and Import capabilities.

---

## 2. Directory & Component Architecture

```
retro-pomodoro/
├── index.html                   # HTML entry point with meta tags, Google Fonts, & PWA manifest
├── vite.config.js               # Vite config with React & Tailwind plugins
├── tailwind.config.js           # Custom Tailwind theme tokens mapping to CSS variables
├── postcss.config.js            # PostCSS configuration
├── package.json                 # Project dependencies & scripts (dev, build, preview)
├── public/
│   ├── manifest.json            # PWA Web App Manifest
│   ├── sw.js                    # Service Worker for 100% offline caching
│   ├── icons/                   # Favicons & PWA app icons (192px, 512px, SVG)
│   └── sounds/                  # High-quality audio loops (morning-coffee, lofi-chill, starlit-focus)
├── src/
│   ├── main.jsx                 # React root render
│   ├── App.jsx                  # Main Workstation layout & state coordination
│   ├── index.css                # Global styles, Tailwind directives, CRT scanlines, theme tokens
│   ├── types/
│   │   └── index.js             # Data interfaces & default settings
│   ├── hooks/
│   │   ├── usePomodoroTimer.js  # Drift-proof delta countdown, circular progress, cycle tracker
│   │   ├── useAudioEngine.js    # Lo-Fi player, Web Audio SFX synth, & ambient noise generator
│   │   ├── useTaskManager.js    # Task list CRUD, priorities, filtering, stepped progress
│   │   ├── useAlarmManager.js   # Daily alarms checker, loop alerts, trigger modals
│   │   ├── useWakeLock.js       # Screen Wake Lock API handler
│   │   └── useLocalStorage.js  # Reactive local persistence with JSON export/import
│   ├── components/
│   │   ├── common/              # Reusable UI primitives:
│   │   │   ├── RetroButton.jsx  # 3D tactile arcade buttons
│   │   │   ├── PixelCheckbox.jsx# Custom retro SVG checkbox
│   │   │   ├── SvgIcon.jsx      # SVG icon wrapper (Lucide React & bespoke pixel SVGs)
│   │   │   └── Modal.jsx        # Accessible dialog wrapper with ESC / backdrop handlers
│   │   ├── header/
│   │   │   ├── StationHeader.jsx# Brand badge, live clock, stats pill, theme select, zen toggle
│   │   │   └── ThemeSelector.jsx# 5 retro themes dropdown
│   │   ├── timer/
│   │   │   ├── TimerDeck.jsx    # Center console deck
│   │   │   ├── TimerDisplay.jsx # Circular SVG gauge + digital countdown
│   │   │   ├── SpriteStage.jsx  # Interactive companions (Mug, Cat, Bonsai, Cassette)
│   │   │   └── ModeTabs.jsx     # WORK, SHORT BREAK, LONG BREAK tabs
│   │   ├── tasks/
│   │   │   ├── TaskDeck.jsx     # Left task console deck
│   │   │   ├── TaskList.jsx     # Task items with priority badges & delete actions
│   │   │   └── ProgressBar.jsx  # Stepped 8-bit visual progress meter
│   │   ├── audio/
│   │   │   ├── AudioDeck.jsx    # Right deck (Lo-Fi tape player & alarms)
│   │   │   ├── Equalizer.jsx    # Animated 10-bar pixel equalizer
│   │   │   ├── AmbientGen.jsx   # Ambient noise channels (Rain, Vinyl, Pink Noise, Cafe)
│   │   │   └── AlarmList.jsx    # Scheduled alarms list & input form
│   │   └── modals/
│   │       ├── SettingsModal.jsx# Custom durations, auto-start, sound toggles, export/import data
│   │       ├── ShortcutsModal.jsx# Keyboard shortcuts guide
│   │       └── AlarmAlertModal.jsx# Active alarm fullscreen alert dialog
│   └── utils/
│       ├── audioSynth.js        # Web Audio API procedural synthesis (clicks, victory fanfare, chimes, noise)
│       └── formatters.js        # Time & date formatting helpers
```

---

## 3. Detailed Component & Feature Specifications

### 3.1 Station Header (`StationHeader.jsx`)
- **Brand Hardware Badge**: Industrial status chip `WS-8080 PRO` with pulsating LED dot.
- **Daily Focus Stats Pill**: Displays today's completed pomodoro count and total minutes focused.
- **Theme Selector**: Dropdown to toggle between the 5 themes live without reloads.
- **Action Buttons**: Keyboard shortcuts guide (<kbd>?</kbd>), Zen Focus mode toggle (<kbd>Z</kbd>), and Settings modal.

### 3.2 Center Deck (`TimerDeck.jsx`)
- **Mode Navigation**: Tabs for `WORK`, `SHORT BREAK`, and `LONG BREAK` with active indicators.
- **Timer Display (`TimerDisplay.jsx`)**:
  - High-precision drift-proof interval using delta time stamps (`Date.now()`).
  - Circular SVG progress ring ($r = 90$, circumference $\approx 565.48$) tracking elapsed percentage.
  - Large digital 7-segment style countdown display.
- **Sprite Stage (`SpriteStage.jsx`)**:
  - Switchable interactive companions:
    1. ☕ **Cozy Mug**: Animated rising steam particles during work mode.
    2. 🐱 **Pixel Cat**: Breathing motion and wagging tail.
    3. 🪴 **Pixel Bonsai**: Swaying foliage.
    4. 📼 **Lo-Fi Cassette**: Smooth rotating tape reels during music playback.
- **Session Tallies**: 4-dot round cycle indicators with daily goal progress.
- **Arcade Controls & Presets**: Tactile `START`, `PAUSE`, `RESET` buttons, plus quick chips (`25/5`, `50/10`, `15/3`, and `CUSTOM`).

### 3.3 Task Deck (`TaskDeck.jsx`)
- **Stepped Pixel Progress Meter**: Scaled 8-bit fill gauge and percentage readout.
- **Filter Tabs**: `ALL`, `ACTIVE`, `DONE`, and a `CLEAR DONE` action.
- **Input Form**: Title input + Priority Selector (🔴 High, ⚪ Normal, 🟢 Low).
- **Task List (`TaskList.jsx`)**: Custom SVG pixel checkbox with strike-through and delete actions.

### 3.4 Audio Deck & Ambient Generator (`AudioDeck.jsx`)
- **Lo-Fi Tape Player**: Selectable tracks with play/pause, volume slider, and animated 10-bar equalizer.
- **Ambient Noise Channels (`AmbientGen.jsx`)**: Zero-bandwidth Web Audio synthesized focus noises:
  - 🌧️ *Rain / Thunder* (lowpass filtered noise)
  - 📻 *Vinyl Crackle* (random transient crackles)
  - 🌊 *Pink Noise* (1/f soothing focus noise)
  - ☕ *Cafe Ambience* (room murmur filter)
- **Daily Alarms (`AlarmList.jsx`)**: Set time-of-day alarms that fire chiptune alerts and popup modals.

### 3.5 System Modals
- **Settings Modal (`SettingsModal.jsx`)**: Custom durations, auto-start options, sound effects toggles, volume slider, CRT scanlines toggle, and JSON Export / Import.
- **Shortcuts Modal (`ShortcutsModal.jsx`)**: Interactive quick reference of keyboard controls.
- **Alarm Alert Modal (`AlarmAlertModal.jsx`)**: Fullscreen retro alert modal with audio chime and dismiss action.

---

## 4. Production Engineering

1. **Vite Build Optimization**: Tree-shaking, asset minification, CSS purging with Tailwind.
2. **PWA Integration**: Service worker caching app shell and static assets for 100% offline usage.
3. **Screen Wake Lock**: Activates during active timer/music playback and releases on pause/reset.
4. **Keyboard Accessibility**: Full keyboard support (<kbd>Space</kbd>, <kbd>R</kbd>, <kbd>W</kbd>, <kbd>S</kbd>, <kbd>L</kbd>, <kbd>Z</kbd>, <kbd>M</kbd>, <kbd>?</kbd>, <kbd>Esc</kbd>).
5. **WCAG Compliance**: High contrast ratios across all 5 colorways and reduced-motion media query support.
