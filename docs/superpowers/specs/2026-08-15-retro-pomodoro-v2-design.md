# Retro Pomodoro v2 — Design Specification
**Repo:** `thatsyed/retro-pomodoro`  
**Stack:** Vanilla JS, HTML5, CSS3. No build step, no framework, no dependencies.  

---

## 0. Overview & Context
Retro Pomodoro is an 8-bit styled desktop widget / handheld timer running completely client-side.
v2 expands the core timer with four modular features:
1. **Live Clock**: Independent wall clock in `console-header`.
2. **Todo List**: Standalone retro modal task log with custom pixel checkboxes and `localStorage` persistence.
3. **Background Music Player**: Local CC0-licensed lo-fi tracks in `sounds/music/` with looping `<audio>` and separate volume control.
4. **Time-of-Day Alarms**: Scheduler modal checked by the 1-second clock loop with distinct chiptune alert sound, in-app dismiss modal, and midnight reset.

---

## 1. Data Models & LocalStorage Schema

### 1.1 Settings (`retro_pomodoro_settings`)
```json
{
  "workDuration": 25,
  "shortBreakDuration": 5,
  "longBreakDuration": 15,
  "soundEnabled": true,
  "volume": 0.6
}
```

### 1.2 Todos (`retro_pomodoro_todos`)
```json
[
  {
    "id": "todo_1723700000000",
    "text": "Finish chem lab report",
    "done": false,
    "createdAt": 1723700000000
  }
]
```

### 1.3 Alarms (`retro_pomodoro_alarms`)
```json
[
  {
    "id": "alarm_1723700000000",
    "time": "21:00",
    "label": "Start homework",
    "enabled": true,
    "firedToday": false
  }
]
```

### 1.4 Music (`retro_pomodoro_music`)
```json
{
  "enabled": false,
  "trackIndex": 0,
  "volume": 0.4
}
```

---

## 2. Feature Specifications

### 2.1 Live Clock
- **Display**: 24-hour `HH:MM:SS` format using font `VT323` inside `#live-clock`.
- **Loop**: Independent 1,000ms `setInterval`.
- **Decoupling**: Never touches `appState.timerState`.

### 2.2 Todo List
- **Modal**: `#todos-modal` toggled via `#btn-todos` (`📝 TASKS`).
- **UI**: Custom `.pixel-checkbox`, `.task-text` with strike-through when completed, `.task-delete-btn` (`&times;`), and empty state message `"NO TASKS YET"`.
- **Direct Persistence**: Saves immediately to `localStorage` on add, toggle, and delete.
- **Audio Feedback**: Invokes `triggerClickSound()` on all actions.

### 2.3 Background Music Player
- **Modal**: `#music-modal` toggled via `#btn-music` (`🎵 MUSIC`).
- **Audio Element**: `<audio id="bg-music" loop>`.
- **Controls**: Track selection buttons, Play/Pause toggle, separate volume range slider `#music-volume`.
- **Tracks**: Local CC0-licensed tracks placed in `sounds/music/` documented in `sounds/music/CREDITS.md`.
- **Autoplay Handling**: User gesture gated; does not attempt autoplay on reload.

### 2.4 Time-of-Day Alarms
- **Modal**: `#alarms-modal` toggled via `#btn-alarms` (`⏰ ALARMS`).
- **Inputs**: `<input type="time">`, text label input, ADD button.
- **Checker**: Integrated into the 1-second clock loop.
- **Alert**: In-app `#alarm-alert-modal` with alarm label and "DISMISS" button + distinct repetitive 3-beep chiptune alert (E6 1318Hz square wave).
- **Midnight Rollover**: Resets `firedToday = false` at local midnight.
- **Copy**: Highlights that alarms fire while the browser tab is open.

---

## 3. UI Consistency & Design Tokens
Reuses existing CSS design tokens:
- `--color-bg`: `#2c1e1c`
- `--color-console`: `#ebd8b7`
- `--color-screen`: `#3c2421`
- `--color-text-screen`: `#ebd8b7`
- `--color-text-glow`: `#e5b060`
- `--color-border`: `#4d312c`
- `--color-btn-shadow`: `#4d312c`
- `--color-white`: `#f7f1e3`
- `--font-digital`: `'VT323', monospace`
- `--font-text`: `'Courier Prime', monospace`
