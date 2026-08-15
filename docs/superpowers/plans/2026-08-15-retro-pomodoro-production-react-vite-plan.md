# Retro Pomodoro Workstation - Production Vite + React + Tailwind Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready, enterprise-grade Retro Pomodoro Workstation web application using Vite, React 19, Tailwind CSS, Lucide React, and Web Audio API.

**Architecture:** A modular React application structured around decoupled custom hooks (`usePomodoroTimer`, `useAudioEngine`, `useTaskManager`, `useAlarmManager`, `useWakeLock`, `useLocalStorage`), tactile retro UI primitives, SVG-based visual assets (no raw emojis), 5 switchable retro themes, zero-latency Web Audio ambient synthesizers, and PWA offline support.

**Tech Stack:** React 19, Vite, Tailwind CSS, Lucide React, Web Audio API, PWA Service Worker.

## Global Constraints
- 100% SVG icons via Lucide React and custom pixel SVGs (zero emoji placeholders as UI buttons).
- Zero external runtime framework dependencies outside React, Lucide, Tailwind.
- Offline-first architecture with PWA service worker and LocalStorage persistence.
- High accessibility standards (WCAG contrast > 4.5:1 across all 5 themes, `:focus-visible` outlines, screen reader aria attributes).

---

### Task 1: Environment & Project Scaffolding
**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `public/manifest.json`
- Create: `public/sw.js`
- Modify: `index.html`

- [ ] **Step 1: Write `package.json` with React, Vite, Tailwind, and Lucide dependencies**
- [ ] **Step 2: Write `vite.config.js`, `tailwind.config.js`, and `postcss.config.js`**
- [ ] **Step 3: Create PWA `public/manifest.json` and `public/sw.js`**
- [ ] **Step 4: Update `index.html` to mount React root (`#root`) with PWA and Google Fonts preconnects**
- [ ] **Step 5: Run `npm install` to install dependencies**

---

### Task 2: Global Design Tokens, Typography & Constants
**Files:**
- Create: `src/index.css`
- Create: `src/types/index.js`
- Create: `src/utils/formatters.js`

- [ ] **Step 1: Write `src/types/index.js` defining default settings, themes, audio tracks, and initial states**
- [ ] **Step 2: Write `src/utils/formatters.js` with time formatting helpers**
- [ ] **Step 3: Write `src/index.css` with 5 retro theme CSS custom property tokens, scanlines, CRT screen glare, and pixel borders**

---

### Task 3: Web Audio Synthesizer & Procedural Sound Engine
**Files:**
- Create: `src/utils/audioSynth.js`
- Create: `src/hooks/useAudioEngine.js`

- [ ] **Step 1: Write `src/utils/audioSynth.js` containing Web Audio procedural synthesis (mechanical clicks, level-up arpeggios, chimes, and ambient noise generators)**
- [ ] **Step 2: Write `src/hooks/useAudioEngine.js` uniting Lo-Fi background tracks, volume control, and ambient channels**

---

### Task 4: Custom Business Logic Hooks
**Files:**
- Create: `src/hooks/useLocalStorage.js`
- Create: `src/hooks/useWakeLock.js`
- Create: `src/hooks/usePomodoroTimer.js`
- Create: `src/hooks/useTaskManager.js`
- Create: `src/hooks/useAlarmManager.js`

- [ ] **Step 1: Write `src/hooks/useLocalStorage.js` with reactive storage, migration, and export/import helpers**
- [ ] **Step 2: Write `src/hooks/useWakeLock.js` managing Screen Wake Lock API**
- [ ] **Step 3: Write `src/hooks/usePomodoroTimer.js` with drift-proof timestamp calculations and circular progress**
- [ ] **Step 4: Write `src/hooks/useTaskManager.js` with CRUD, priority tagging, and progress tracking**
- [ ] **Step 5: Write `src/hooks/useAlarmManager.js` with continuous clock checks and alarm notifications**

---

### Task 5: Common Reusable UI Primitives
**Files:**
- Create: `src/components/common/RetroButton.jsx`
- Create: `src/components/common/PixelCheckbox.jsx`
- Create: `src/components/common/SvgIcon.jsx`
- Create: `src/components/common/Modal.jsx`

- [ ] **Step 1: Write `RetroButton.jsx` with 3D tactile arcade button styles and sound triggers**
- [ ] **Step 2: Write `PixelCheckbox.jsx` with bespoke SVG pixel checked state**
- [ ] **Step 3: Write `SvgIcon.jsx` wrapping Lucide icons with consistent stroke and scaling**
- [ ] **Step 4: Write `Modal.jsx` with ESC keyboard listener, backdrop click, and focus trapping**

---

### Task 6: Station Header & Theme Selector
**Files:**
- Create: `src/components/header/ThemeSelector.jsx`
- Create: `src/components/header/StationHeader.jsx`

- [ ] **Step 1: Write `ThemeSelector.jsx` supporting the 5 themes with live CSS root updates**
- [ ] **Step 2: Write `StationHeader.jsx` displaying hardware chip, stats pill, live digital clock, and action buttons**

---

### Task 7: Center Deck (Timer, Circular Gauge, Sprite Stage & Controls)
**Files:**
- Create: `src/components/timer/ModeTabs.jsx`
- Create: `src/components/timer/TimerDisplay.jsx`
- Create: `src/components/timer/SpriteStage.jsx`
- Create: `src/components/timer/TimerDeck.jsx`

- [ ] **Step 1: Write `ModeTabs.jsx` for WORK, SHORT, and LONG break modes**
- [ ] **Step 2: Write `TimerDisplay.jsx` with circular SVG perimeter gauge and digital countdown**
- [ ] **Step 3: Write `SpriteStage.jsx` supporting Mug, Cat, Bonsai, and Tape companions**
- [ ] **Step 4: Write `TimerDeck.jsx` bringing together mode tabs, display, sprite stage, tallies, arcade controls, and presets**

---

### Task 8: Left Deck (Task Operations Log)
**Files:**
- Create: `src/components/tasks/ProgressBar.jsx`
- Create: `src/components/tasks/TaskList.jsx`
- Create: `src/components/tasks/TaskDeck.jsx`

- [ ] **Step 1: Write `ProgressBar.jsx` with stepped 8-bit visual meter**
- [ ] **Step 2: Write `TaskList.jsx` with priority indicator badges and delete actions**
- [ ] **Step 3: Write `TaskDeck.jsx` with input form, priority picker, filters, and clear done**

---

### Task 9: Right Deck (Lo-Fi Audio, Equalizer & Alarms)
**Files:**
- Create: `src/components/audio/Equalizer.jsx`
- Create: `src/components/audio/AmbientGen.jsx`
- Create: `src/components/audio/AlarmList.jsx`
- Create: `src/components/audio/AudioDeck.jsx`

- [ ] **Step 1: Write `Equalizer.jsx` with 10 animated reactive pixel equalizer bars**
- [ ] **Step 2: Write `AmbientGen.jsx` with Rain, Vinyl, Pink Noise, and Cafe buttons**
- [ ] **Step 3: Write `AlarmList.jsx` with time input, label, and alarm toggle controls**
- [ ] **Step 4: Write `AudioDeck.jsx` integrating tape player, ambient generator, and daily alarms**

---

### Task 10: System Modals (Settings, Shortcuts, Alarm Alert)
**Files:**
- Create: `src/components/modals/SettingsModal.jsx`
- Create: `src/components/modals/ShortcutsModal.jsx`
- Create: `src/components/modals/AlarmAlertModal.jsx`

- [ ] **Step 1: Write `SettingsModal.jsx` with durations, auto-start, volume, scanlines, and JSON export/import**
- [ ] **Step 2: Write `ShortcutsModal.jsx` with keyboard cheat-sheet**
- [ ] **Step 3: Write `AlarmAlertModal.jsx` with active alarm modal dialog and dismiss action**

---

### Task 11: Main App Coordination & Entry Point
**Files:**
- Create: `src/App.jsx`
- Create: `src/main.jsx`

- [ ] **Step 1: Write `src/App.jsx` coordinating all 3 decks, global shortcuts (<kbd>Space</kbd>, <kbd>R</kbd>, <kbd>W</kbd>, <kbd>S</kbd>, <kbd>L</kbd>, <kbd>Z</kbd>, <kbd>M</kbd>, <kbd>?</kbd>), and mobile tab switcher**
- [ ] **Step 2: Write `src/main.jsx` mounting the app and registering the Service Worker**

---

### Task 12: Production Build & Verification
**Files:**
- Verify: `dist/` production bundle
- Test: Build commands and assets

- [ ] **Step 1: Run `npm run build` to verify clean compilation with zero warnings or errors**
- [ ] **Step 2: Verify production assets, PWA manifest, and audio files**
