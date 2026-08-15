# Retro Pomodoro Workstation — Project Architecture & Changelog

**Project Directory**: `D:\projects\retro pomodoro`  
**Generated Date**: 2026-08-15  
**Version**: 2.0.0 (Clean Analog Hi-Fi Edition)  

---

## 1. Project Overview & Core Concept

**Retro Pomodoro Workstation** is a desktop focus and productivity console that combines:
- **Classic Pomodoro Timer Engine** with custom work/break intervals, session cycle dots, and live digital clock.
- **Task Management System** with real-time progress calculation, active/done filters, and priority flags.
- **Lo-Fi Audio Suite & Ambient Generator** featuring tape reel audio playback, volume faders, synthesized ambient soundscapes (Rain, Vinyl, Pink Noise, Cafe), and customizable alarm timers.
- **Pixel Companion Sprites** (Mug, Cat, Plant, Cassette, Ghost, Robot) that animate during focus sessions.
- **Multi-Theme Retro Hardware Visuals** including Classic Amber CRT, Game Boy DMG, Cyberpunk Neon, Arcade Green, and Lo-Fi Brown themes with authentic scanline overlays.

---

## 2. Architecture & File Structure

```
retro-pomodoro/
├── .agent/
│   └── PROJECT_SUMMARY.md            # Complete project documentation & changelog (this file)
├── docs/
│   └── superpowers/
│       ├── specs/                    # Design specifications
│       │   └── 2026-08-15-retro-pomodoro-declutter-design.md
│       └── plans/                    # Step-by-step implementation plans
│           └── 2026-08-15-retro-pomodoro-declutter-plan.md
├── public/                           # Static assets, manifests, icons
├── sounds/                           # Audio files for music and sound effects
├── src/
│   ├── components/
│   │   ├── audio/                    # Lo-Fi tape deck, equalizer, ambient generator, alarm list
│   │   │   ├── AlarmList.jsx
│   │   │   ├── AmbientGen.jsx
│   │   │   ├── AudioDeck.jsx
│   │   │   └── Equalizer.jsx
│   │   ├── common/                   # Shared UI primitives
│   │   │   ├── RetroButton.jsx
│   │   │   └── SvgIcon.jsx
│   │   ├── header/                   # Station top bar & branding
│   │   │   ├── StationHeader.jsx
│   │   │   └── ThemeSelector.jsx
│   │   ├── modals/                   # Popups and configuration dialogs
│   │   │   ├── AlarmAlertModal.jsx
│   │   │   ├── SettingsModal.jsx
│   │   │   └── ShortcutsModal.jsx
│   │   ├── tasks/                    # Task operations, task list, progress bar
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── TaskDeck.jsx
│   │   │   └── TaskList.jsx
│   │   └── timer/                    # Hero timer display, mode tabs, sprite stage
│   │       ├── ModeTabs.jsx
│   │       ├── SpriteStage.jsx
│   │       ├── TimerDeck.jsx
│   │       └── TimerDisplay.jsx
│   ├── hooks/                        # Core application business logic
│   │   ├── useAlarmManager.js        # Alarms scheduler & sound alerts
│   │   ├── useAudioEngine.js         # Web Audio API ambient sound mixer & tape player
│   │   ├── useLocalStorage.js        # Persistent state synchronization
│   │   ├── usePomodoroTimer.js       # Interval timing, tick synthesis, cycle tracking
│   │   ├── useTaskManager.js         # Task CRUD, filters, statistics
│   │   └── useWakeLock.js            # Screen wake lock during active sessions
│   ├── types/
│   │   └── index.js                  # Data constants, default settings, themes, tracks
│   ├── utils/
│   │   └── formatters.js             # Time formatting utilities
│   ├── App.jsx                       # Root application orchestration
│   ├── index.css                     # Design tokens, theme variables, full-height grid
│   └── main.jsx                      # React 19 entry point
├── package.json                      # Dependencies & build scripts
└── vite.config.js                    # Vite server configuration (Port 3000)
```

---

## 3. The Decluttering & Redesign Initiative

### Problems Identified in Previous Design:
1. **Empty Dead Space Voids**: The Task Deck and Timer Deck had awkward blank gaps at the bottom because the inner CRT screens had fixed/truncated heights while the outer chassis columns stretched tall.
2. **Visual & Label Clutter**: Verbose hardware lore text (`ANALOG FOCUS WORKSTATION WS-8080 PRO`, `TASK OPERATIONS LOG`, `LO-FI TAPE DECK HIGH BIAS STEREO 60`, `CLEAR DONE`).
3. **Overcrowded Main Screen**: Direct customization options (theme selector, companion sprite arrow toggles, preset duration chips `25/5`, `50/10`) cluttered the dashboard instead of allowing distraction-free focus.
4. **Heavy Border & Scanline Noise**: Aggressive faux screw graphics, heavy dashed border divides, and intense scanline opacity made text hard to read.

---

## 4. What Was Done: Comprehensive Changelog

### Phase 1: Full-Height Studio Grid & CSS Tokens (`src/index.css`)
- **Equal-Height 3-Deck Grid**: Implemented `grid-template-columns: 320px 1fr 340px; align-items: stretch;` on desktop so all three columns stretch uniformly.
- **Eliminated Dead Space**: Configured `.console-deck`, `.deck-screen`, and `.crt-main-screen` with `flex: 1`, `height: 100%`, and `min-height: 0` to fill all chassis height without voids.
- **Cleaned Visual Noise**: Removed faux screw elements (`.chassis-screw`), reduced border nesting, and softened scanline opacity (from 0.6 to 0.35) for crisp text legibility.

### Phase 2: Streamlined Station Header (`src/components/header/StationHeader.jsx`)
- Replaced bulky slogan headers with clean, punchy `RETRO POMO` branding and an active pulsing emerald power LED.
- Streamlined session stats into a single compact `X / Y POMOS` streak pill.
- Simplified action controls to three minimalist ghost buttons: `ZEN` (Zen focus mode), `?` (Shortcuts modal), and `CONFIG` (Settings modal).
- Removed inline theme dropdowns from the top bar (centralized into Settings).

### Phase 3: Full-Height Task Deck & Copy (`src/components/tasks/TaskDeck.jsx`, `TaskList.jsx`)
- Set `TaskDeck` container to `h-full flex flex-col` and inner CRT display to `flex-1 flex flex-col min-h-0`.
- Updated `TaskList` container with `flex-1 min-h-0 overflow-y-auto` so both task items and the empty state span the full height of the console.
- Streamlined header copy to `TASKS • X/Y`, filter tabs to `ALL` | `ACTIVE` | `DONE`, clear action to `CLEAR`, and simplified the empty state message.

### Phase 4: Hero Timer Deck & Sprite Polish (`src/components/timer/TimerDeck.jsx`, `SpriteStage.jsx`)
- Configured `.crt-main-screen` with `flex-1 flex flex-col justify-between` to eliminate all bottom dead space.
- Streamlined mode labels to clean `FOCUS` / `SHORT BREAK` / `LONG BREAK`.
- Removed arrow selector controls from the live `SpriteStage` so the pixel companion sits peacefully on stage without UI noise (sprite chosen in Settings).
- Added new companion sprites: **Ghost** and **Robot** in addition to Mug, Cat, Plant, and Cassette.
- Simplified bottom arcade controls to a 2-button layout: `START / PAUSE` toggle and `RESET`.
- Moved the duration preset bar out of the hero deck into Settings.

### Phase 5: Streamline Audio Deck (`src/components/audio/AudioDeck.jsx`)
- Set container to `h-full flex flex-col justify-between` to balance height across all 3 studio decks.
- Simplified header to `AUDIO` with mini animated equalizer.
- Lo-Fi tape deck: cleaned up labels to a sleek cassette aesthetic (`SIDE A`, track name, time readout, `⏮ PREV`, `▶/❚❚ PLAY/PAUSE`, `NEXT ⏭`, volume slider).
- Ambient sounds: 4 clean toggle cards (`Rain`, `Vinyl`, `Pink Noise`, `Cafe`) with active glowing states.
- Alarms section: compact alarm summary showing active alarm count and direct toggle/delete controls.

### Phase 6: Centralized Tabbed Settings Hub (`src/components/modals/SettingsModal.jsx`)
Created a comprehensive, structured 5-tab configuration modal:
1. **`[APPEARANCE]`**: Live theme selector (Classic Amber, Game Boy, Cyberpunk, Arcade Green, Lo-Fi Brown), CRT scanlines toggle, and 6-companion sprite picker.
2. **`[TIMER]`**: Focus, Short Break, Long Break durations, cycle interval, daily goal, auto-start breaks toggle, and quick preset buttons (`25 / 5`, `50 / 10`, `15 / 3`).
3. **`[SOUND]`**: SFX volume slider, mechanical ticking sound toggle, sound audition buttons for Alarm Chime, Fanfare, and Task completion.
4. **`[ALARMS]`**: Built-in alarm creator (time + label) and scheduler with toggle ON/OFF and delete.
5. **`[DATA]`**: Export JSON backup, Import JSON backup, Reset stats, and Factory reset.

### Phase 7: Application Integration & Clean Footer (`src/App.jsx`)
- Wired updated state and props cleanly between all decks and modals.
- Cleaned up obsolete handlers and props.
- Replaced marketing footer with a clean keyboard shortcut cheatsheet:
  `<kbd>SPACE</kbd> Start/Pause • <kbd>R</kbd> Reset • <kbd>Z</kbd> Zen • <kbd>W/S/L</kbd> Modes • <kbd>M</kbd> Music • <kbd>?</kbd> Shortcuts`

---

## 5. Keyboard Shortcuts Reference

| Key | Action |
|---|---|
| `Space` | Start / Pause Timer |
| `R` | Reset Current Timer |
| `Z` | Toggle Zen Mode (Fullscreen minimal focus) |
| `W` | Switch to Focus (Work) Mode |
| `S` | Switch to Short Break Mode |
| `L` | Switch to Long Break Mode |
| `M` | Toggle Lo-Fi Background Music |
| `?` or `Shift + /` | Open Keyboard Shortcuts Modal |

---

## 6. Development & Build Commands

- **Run Dev Server**: `npm run dev` (Runs on `http://localhost:3000`)
- **Build Production Bundle**: `npm run build`
- **Preview Production Build**: `npm run preview`
