# Retro Pomodoro Workstation Deck (v2 Widescreen Revamp) — Design Specification

**Repo:** `thatsyed/retro-pomodoro`  
**Date:** 2026-08-15  
**Stack:** Vanilla JavaScript, HTML5, CSS3. Zero dependencies, offline-ready, no build step.

---

## 1. Overview & Vision
Retro Pomodoro is expanding from a single compact handheld box (`420px`) into a modular **3-Column Retro Workstation Deck** (`~1180px` max-width). The new layout takes full advantage of desktop screen real estate by providing persistent side decks for **Task Management** and **Lo-Fi Music / Alarms**, while maintaining seamless responsiveness and collapsible adaptability across tablets and mobile viewports.

---

## 2. Layout & Architectural Hierarchy

```
+----------------------------------------------------------------------------------------------------+
|                                    GLOBAL WORKSTATION BAR                                          |
|  [⚡ ZEN / FOCUS MODE]                                                      [⚙️ GLOBAL SETTINGS]   |
+------------------------------------+----------------------------------+----------------------------+
|        LEFT DECK: TASK LOG         |       CENTER DECK: POMODORO      |      RIGHT DECK: AUX       |
|                                    |                                  |                            |
|  • Header: 📝 TASK LOG (2/5)       |  • Header: LED + Title + Clock   |  [🎵 LO-FI TAPE DECK]      |
|  • Quick Entry: [Input...] [ADD]   |  • Mode Tabs: WORK | SHORT | LONG|  • Equalizer Bar Anim      |
|  • Filter: ALL | ACTIVE | DONE     |  • Digital Timer (VT323 5.5rem)  |  • Track Selector Buttons  |
|  • Stepped Pixel Progress Bar      |  • Cozy Steaming Coffee Mug SVG  |  • Play/Pause + Vol Slider |
|  • Scrollable Task Items list      |  • Session Tallies (1 to 4 dots) |                            |
|    - Pixel checkboxes [✔]          |  • Arcade Buttons:               |  [⏰ SCHEDULED ALARMS]     |
|    - Text + Strikethrough          |    [START] [PAUSE] [RESET]       |  • Time Picker + Label + ADD|
|    - Delete [×]                    |  • Quick Presets: [25/5] [50/10] |  • Scrollable Alarms List  |
+------------------------------------+----------------------------------+----------------------------+
```

### 2.1 Viewport Breakpoints & Responsive Behavior
- **Desktop (Widescreen `> 1024px`)**:
  - CSS Grid / Flexbox 3-column layout (`minmax(300px, 340px)` left, `420px` center, `minmax(300px, 340px)` right).
- **Tablet (`768px - 1023px`)**:
  - Center timer prominently at top, side decks flow in a balanced 2-column grid beneath.
- **Mobile (`< 768px`)**:
  - Full-width stacked layout with quick tab navigation shortcuts to jump smoothly between Timer, Tasks, and Audio/Alarms.

---

## 3. Modular Deck Specifications

### 3.1 Left Deck: Task Operations (`#deck-tasks`)
- **Title & Stats**: `📝 TASK LOG` with real-time completion counter (`X/Y DONE`).
- **Retro Stepped Progress Bar**: Segmented 8-bit fill meter displaying percentage of completed tasks.
- **Filter Tabs**: `ALL`, `ACTIVE`, `COMPLETED` buttons with active highlight.
- **Inline Input**: Text input (`maxlength="60"`) with tactile `ADD` button.
- **Task Item List**:
  - Custom pixel-art checkbox toggle (`.pixel-checkbox`).
  - Strikethrough & dimmed state when done.
  - Delete `&times;` button.
  - Audio feedback via `triggerClickSound()`.
- **Storage**: Direct synchronization with `localStorage['retro_pomodoro_todos']`.

### 3.2 Center Deck: Primary Pomodoro Engine (`#deck-timer`)
- **Header**:
  - Pulsing Status LED (`.indicator-led` with work/break/paused classes).
  - Main title `RETRO POMODORO`.
  - Amber digital wall clock (`#live-clock`) running on independent 1,000ms loop.
- **Screen Display**:
  - Work / Short Break / Long Break tab buttons.
  - Big 7-segment digital timer countdown display in glowing amber (`VT323`).
  - Animated steaming coffee mug sprite.
  - 4-session tally dot indicators.
- **Controls**:
  - Chunky mechanical arcade buttons: `START` (green), `PAUSE` (yellow), `RESET` (red).
  - Quick Presets: `25/5` (Standard) and `50/10` (Deep Focus) for instant duration adjustments.
- **Chiptune Melodies**: Web Audio API upbeat NES sequence on work complete, relaxing chime on break complete.

### 3.3 Right Deck: Audio Deck & Alarms (`#deck-aux`)
- **Upper Sub-Deck: Lo-Fi Music Player**:
  - Header: `🎵 LO-FI TAPE DECK`.
  - **Animated Pixel Equalizer**: 8 visual frequency bars with rhythmic bouncing keyframes active when music is playing.
  - Track Buttons: *Morning Coffee*, *Lo-Fi Chill*, *Starlit Focus* with active status indicators.
  - `PLAY / PAUSE` arcade toggle button.
  - Independent smooth volume slider (`#music-volume`).
  - Audio persistence in `localStorage['retro_pomodoro_music']`.
- **Lower Sub-Deck: Time-of-Day Alarms**:
  - Header: `⏰ SCHEDULED ALARMS`.
  - Form: `<input type="time">` + `<input type="text">` label + `ADD` button.
  - List of active alarms with on/off checkboxes and delete buttons.
  - Midnight rollover detection in the 1-second clock loop.
  - In-app `#alarm-alert-modal` banner + rapid 3-beep chiptune alert (E6 1318Hz).

### 3.4 Global Workstation Header & Zen Mode
- **Zen / Fullscreen Mode (`#btn-zen-mode`)**:
  - Toggles `.zen-mode` on body / workstation container, hiding side decks and putting full focus on the central timer with subtle atmospheric backdrop.
- **Global Settings (`#btn-settings`)**:
  - Opens the custom settings modal for minute durations, sound toggle, and master SFX volume.

---

## 4. Visual Design Tokens & Aesthetics
- **Chassis Background**: `#2c1e1c` (rich espresso walnut) with `20px` wallpaper grid.
- **Console Faceplate**: `#ebd8b7` (warm vintage hardware cream).
- **Recessed Screens**: `#3c2421` (deep dark phosphor).
- **Text & Digital Glow**: `#e5b060` (amber phosphor).
- **Borders & Shadows**: `#4d312c` with hard pixel dropshadows (`4px 4px 0px`, `8px 8px 0px`).
- **Accent Colors**: `#8aa882` (tactile green), `#c26f63` (arcade red), `#e5b060` (arcade yellow).
- **Typography**:
  - Primary Display / Digits: `'VT323', monospace`
  - Body & Buttons: `'Courier Prime', monospace`

---

## 5. Verification & Testing Criteria
1. **Responsiveness**: Verify 3-column layout on widescreen (>1024px), 2-column on tablet (768px-1023px), and 1-column stacked on mobile (<768px).
2. **Audio & Equalizer**: Verify EQ bars animate during playback and freeze when paused; test independent music volume slider.
3. **Task Deck**: Verify task additions, completions, filter switching (All/Active/Done), progress bar fill, and `localStorage` persistence.
4. **Alarms**: Verify scheduling, midnight rollover, chiptune alarm trigger, and dismiss button.
5. **Zen Mode**: Verify toggling Zen mode smoothly minimizes side decks and focuses central console.
