# Implementation Plan: Retro Pomodoro v2 (PRD Specification)

Upgrade Retro Pomodoro into v2 according to the exact PRD specification: **Live Clock**, **Todo List**, **Time-of-Day Alarms**, and **Background Music Player**, preserving the vanilla JS, zero-dependency, single-page architecture.

---

## Architecture & Implementation Principles

- **No framework, no build step, no dependencies**: Pure Vanilla JS, HTML5, and CSS.
- **Drift-proof & Independent Loops**:
  - Live clock and alarm checker run on their own 1-second interval (`clockInterval = setInterval(updateLiveClockAndCheckAlarms, 1000)`), completely decoupled from the Pomodoro `timerInterval`.
- **Consistent Modal UI Pattern**:
  - All new panels (`#todos-modal`, `#alarms-modal`, `#music-modal`) reuse the exact `.modal` / `.modal-content` / `.show` overlay and backdrop-click pattern established by `#settings-modal`.
- **Chiptune Audio Design**:
  - SFX continue to use Web Audio API (`AudioContext`, square/triangle waves). Alarms use a distinct 3-tone repetitive alert pattern.
  - Background music uses a dedicated `<audio id="bg-music" loop>` element with independent volume persistence (`retro_pomodoro_music`).
- **Local Storage Schemas**:
  - `retro_pomodoro_settings`: Pomodoro durations, sound toggle, SFX volume.
  - `retro_pomodoro_todos`: `[{ id, text, done, createdAt }]`
  - `retro_pomodoro_alarms`: `[{ id, time, label, enabled, firedToday }]`
  - `retro_pomodoro_music`: `{ enabled, trackIndex, volume }`

---

## Proposed Changes

### Feature 1: Live Clock (`index.html`, `styles.css`, `app.js`)
1. **Markup (`index.html`)**:
   - Add `<div class="live-clock" id="live-clock">00:00:00</div>` inside `.console-header`.
2. **Styling (`styles.css`)**:
   - Style `.live-clock` using `font-family: var(--font-digital)`, glowing amber color, letter-spacing, and responsive alignment so it sits neatly in `.console-header` alongside `.indicator-led` and `.console-title`.
3. **Script (`app.js`)**:
   - Add `updateLiveClockAndCheckAlarms()` running every 1,000ms.
   - Format 24-hour time `HH:MM:SS` from `new Date()` and update `#live-clock`.

---

### Feature 2: Todo List (`index.html`, `styles.css`, `app.js`)
1. **Markup (`index.html`)**:
   - Add `#btn-todos` (`📝 TASKS`) in `.console-footer`.
   - Add `#todos-modal` with task input form, ADD button, scrollable task container `#todos-list`, and empty state message.
2. **Styling (`styles.css`)**:
   - Custom pixel-art checkbox `.pixel-checkbox` (matching `.tally-dot` retro aesthetic).
   - Task item with `.task-text`, completed strikethrough/dim style, and retro delete button `&times;`.
3. **Script (`app.js`)**:
   - `appState.todos` loaded from / saved to `localStorage['retro_pomodoro_todos']`.
   - Functions: `renderTodos()`, `addTodo()`, `toggleTodo(id)`, `deleteTodo(id)`.
   - Play `triggerClickSound()` on interactions.

---

### Feature 3: Time-of-Day Alarms (`index.html`, `styles.css`, `app.js`)
1. **Markup (`index.html`)**:
   - Add `#btn-alarms` (`⏰ ALARMS`) in `.console-footer`.
   - Add `#alarms-modal` with `<input type="time" id="input-alarm-time">`, `<input type="text" id="input-alarm-label">`, ADD button, and list container `#alarms-list`.
   - Informational note: *"Note: Alarms only fire while this tab is open."*
   - Add `#alarm-alert-modal` for the active in-app alarm banner with alarm label and "DISMISS" button.
2. **Script (`app.js`)**:
   - `appState.alarms` loaded from / saved to `localStorage['retro_pomodoro_alarms']`.
   - In the 1-second clock loop:
     - Detect local midnight rollover (compare `lastCheckedDate` against current date string) and reset all `firedToday = false`.
     - Check if current `HH:MM` matches any enabled alarm where `firedToday === false`.
     - When matched: set `firedToday = true`, show `#alarm-alert-modal`, and play the alarm sound loop/alert.
   - Synthesize distinct chiptune alarm alert sound (3 high, rapid repeated square-wave beeps: E6 1318Hz).

---

### Feature 4: Background Music Player & CC0 Tracks (`sounds/music/`, `index.html`, `styles.css`, `app.js`)
1. **Track Sourcing & Assets**:
   - Create `sounds/music/` directory.
   - Place CC0-licensed lo-fi tracks (e.g. from Holizna CC0 library or public domain procedural loops normalized to clean 128kbps `.mp3`).
   - Create `sounds/music/CREDITS.md` documenting track title, artist, license (CC0 1.0 Universal), and provenance.
2. **Markup (`index.html`)**:
   - Add `#btn-music` (`🎵 MUSIC`) in `.console-footer`.
   - Add `<audio id="bg-music" loop></audio>`.
   - Add `#music-modal` with track selector/buttons, Play/Pause button, current track status, and independent volume slider `#music-volume`.
3. **Script (`app.js`)**:
   - Track list definition: `[ { name: 'Morning Coffee', src: 'sounds/music/morning-coffee.mp3' }, ... ]`.
   - State management with `localStorage['retro_pomodoro_music']`.
   - Gated user gesture playback (no autoplay error), volume sync, play/pause controls.

---

### Feature 5: Documentation & Polish (`README.md`)
- Update `README.md` with descriptions of the Live Clock, Todo List, Time-of-day Alarms, and Background Music features in "Instructions to Use" and "Definitions".

---

## Verification Plan

### Automated / Code Quality
- Validate that all JavaScript syntax is error-free with zero broken references.
- Verify file sizes, HTML markup semantic compliance, and CSS variable reuse.

### Manual Verification
1. **Live Clock**:
   - Verify that the clock ticks once per second matching local time.
   - Start and pause Pomodoro timer; verify clock is completely unaffected.
2. **Todo List**:
   - Add tasks, toggle completed, delete tasks. Reload page to verify persistence in `localStorage`.
3. **Alarms**:
   - Set an alarm 1 minute in the future.
   - Verify that when the clock minute rolls over, the alarm sounds, the in-app dismiss modal appears, and clicking "DISMISS" stops the alert.
   - Verify it does not re-fire within the same minute.
4. **Music Player**:
   - Open Music modal, select a track, press Play, adjust volume slider, and pause.
   - Trigger Pomodoro session and button clicks to verify simultaneous SFX and music playback without glitching.
