# Design Spec: Retro Pomodoro Workstation Declutter & Copy Polish

**Date**: 2026-08-15  
**Topic**: Workstation Declutter, Copy Simplification, Full-Height Intentional Layout & Settings Centralization  
**Status**: Pending Review  

---

## 1. Overview & Goals

The current Retro Pomodoro Workstation suffers from visual crowding, redundant hardware lore/labels, multiple clashing retro fonts, too many direct customization controls on the main screen, and **awkward dead empty space at the bottom of the Task and Timer decks**.

### Primary Objectives:
1. **Full-Height & Intentional Proportions (Fix Dead Space)**:
   * Eliminate all bottom chassis dead voids in the Task Deck and Timer Deck.
   * Make the inner CRT screen panels (`deck-screen`, `crt-main-screen`) fill 100% of their parent deck height (`flex-1`).
   * The Task List / empty-state area will expand dynamically (`flex-1 overflow-y-auto`) to utilize the full height of the console.
   * The Center Timer deck will distribute vertical space cleanly and anchor controls intentionally to the bottom with balanced padding and zero dead gutters.
2. **Declutter the Interface**: Transition from a noisy 3-column dashboard to a balanced, clean retro-minimalist workstation with generous whitespace, reduced chassis clutter (removal of faux screws, aggressive dashed borders, redundant badges), and refined CRT glow.
3. **Streamline All Copy**: Replace verbose, repetitive text (`ANALOG FOCUS WORKSTATION`, `TASK OPERATIONS LOG`, `LO-FI TAPE DECK HIGH BIAS STEREO 60`) with concise, elegant retro-analog labels (`RETRO POMO`, `FOCUS`, `TASKS`, `AUDIO`).
4. **Centralize Customization into Settings**: Move themes, sprite companion pickers, interval presets, and detailed alarm setup into a tabbed, comprehensive Settings modal, leaving the main dashboard dedicated 100% to distraction-free focus.
5. **Unify Typography**: Restrict fonts to a clear hierarchy—`VT323` for phosphor time readouts/headers, `Press Start 2P` sparingly for micro-badges, and `JetBrains Mono` for all task lists, inputs, and controls.

---

## 2. Layout & Information Architecture

```
+-------------------------------------------------------------------------+
| [●] RETRO POMO              [ 4/8 POMOS ]            [ZEN] [?] [CONFIG] |
+-------------------------------------------------------------------------+
|                      WORKSTATION STUDIO GRID (EQUAL HEIGHTS)             |
|                                                                         |
|  +------------------+  +----------------------+  +-------------------+  |
|  | TASKS (3/5)      |  | [FOCUS] [BREAK] [LONG] |  | AUDIO             |  |
|  |                  |  |                      |  |                   |  |
|  | [All Active Done]|  |       24 : 58        |  | 🎵 Lofi Chill Beat|  |
|  |                  |  |                      |  | [⏮] [▶/❚❚] [⏭]     |  |
|  | [ ] Design Spec  |  |      ( ^ _ ^ )       |  | ───●───── 60%     |  |
|  | [x] Code Review  |  |   [Active Companion] |  |                   |  |
|  | [ ] Deploy v2    |  |                      |  | AMBIENT           |  |
|  |                  |  |  ● ● ○ ○  Round 1/4  |  | [Rain] [Cafe]     |  |
|  | (Full-height     |  |                      |  | [Fire] [Noise]    |  |
|  |  expanded task   |  |                      |  |                   |  |
|  |  screen area)    |  |                      |  | ALARMS            |  |
|  |                  |  |                      |  | 09:00 Standup     |  |
|  | [+ New task...]  |  |  [ START ]  [ RESET ]|  |                   |  |
|  +------------------+  +----------------------+  +-------------------+  |
+-------------------------------------------------------------------------+
|             [SPACE] Start/Pause   [R] Reset   [Z] Zen Mode              |
+-------------------------------------------------------------------------+
```

### A. Header Bar
* **Left**: Power LED (`emerald-500`) + clean title `RETRO POMO`.
* **Center**: Single clean streak badge: `X/Y POMOS` with subtle fire icon.
* **Right**: 3 minimalist action buttons:
  * `ZEN`: Fullscreen focused timer mode.
  * `?`: Keyboard shortcuts modal.
  * `CONFIG`: Opens Settings modal.

### B. Left Deck — Task Queue (`TaskDeck`)
* Full-height container: `flex flex-col h-full`.
* Inner screen expands to full height: `deck-screen flex-1 flex flex-col`.
* Header: `TASKS` with progress counter `X/Y`.
* Clean status filter: text-only toggles `ALL` | `ACTIVE` | `DONE`.
* Task list area: `flex-1 min-h-0 overflow-y-auto` spanning the full vertical space gracefully.
* Task input: positioned cleanly at the bottom or top of the task screen with auto-priority default and enter-to-submit.

### C. Center Deck — Hero Timer (`TimerDeck`)
* Full-height container: `flex flex-col h-full justify-between`.
* Inner CRT screen expands seamlessly to host Mode Tabs, Phosphor Timer, Companion Sprite, and Session Dots without empty bottom gaps.
* Action buttons: 2 clean high-contrast arcade buttons: `START` (swaps to `PAUSE` when running) and `RESET` anchored cleanly at the deck base.
* Presets row & companion switcher moved into Settings Modal.

### D. Right Deck — Audio & Ambience (`AudioDeck`)
* Full-height matching side deck: `flex flex-col h-full`.
* Tape player: minimalist cassette card with track name, mini-equalizer, playback controls, and volume slider.
* Ambient generator: 4 tactile sound toggles (`Rain`, `Campfire`, `Cafe`, `White Noise`) with glowing active state.
* Compact Alarms summary at bottom.

### E. Settings Modal Tabs (`SettingsModal`)
1. **Appearance**: Theme switcher (Classic, Game Boy, Cyberpunk, Arcade, Lo-Fi Brown), CRT scanlines toggle, Sprite companion selector.
2. **Timer**: Focus duration, short break duration, long break duration, cycle interval, and preset buttons (`25/5`, `50/10`, `15/3`).
3. **Sound**: SFX volume, ambient mix, ticking audio toggle, alarm sound picker.
4. **Alarms**: Full alarm creator and scheduler.
5. **Backup**: Export/Import JSON data, reset all stats.

---

## 3. Copy Streamlining Matrix

| Component | Current Copy | New Streamlined Copy |
|---|---|---|
| Header Logo | `RETRO POMODORO - ANALOG FOCUS WORKSTATION WS-8080 PRO` | `RETRO POMO` |
| Header Stats | `X SESSIONS \| Ym FOCUSED` | `X / Y POMOS` |
| Timer Header | `READY TO WORK / FOCUS SESSION / REST BREAK` | `FOCUS` / `SHORT BREAK` / `LONG BREAK` |
| Presets Bar | `PRESETS: 25/5, 50/10, 15/3, CUSTOM...` | Moved to Settings Modal |
| Task Header | `TASK LOG - X/Y DONE` | `TASKS • X/Y` |
| Task Clear | `CLEAR DONE` | `CLEAR` |
| Audio Header | `LO-FI TAPE DECK HIGH BIAS STEREO 60` | `AUDIO` |
| Audio Badge | `SIDE-A • HIGH BIAS STEREO 60` | `SIDE A` |
| Footer | `RETRO WORKSTATION v2.0 • BUILT WITH VITE, REACT & TAILWIND` | Clean shortcut hotkeys only |

---

## 4. Non-Functional & Quality Requirements

1. **Responsive Behavior**:
   * Desktop (≥1024px): 3-column balanced studio grid with equal-height stretch cards.
   * Tablet (768px - 1023px): Center timer with collapsible side drawer tabs.
   * Mobile (<768px): Single active deck with top segmented tab buttons (`⏱ TIMER`, `📝 TASKS`, `🎵 AUDIO`).
2. **Accessibility (a11y)**:
   * Maintain high contrast color ratios across all retro themes.
   * Full keyboard navigation (`Space`, `R`, `Z`, `W`, `S`, `L`, `M`, `?`).
   * ARIA tablists and live regions for timer status.
3. **Zero Broken Dependencies**:
   * Preserve all hooks (`usePomodoroTimer`, `useAudioEngine`, `useTaskManager`, `useAlarmManager`, `useWakeLock`).
   * Preserve local storage backward compatibility.

---

## 5. Verification Plan

1. **Visual & Layout Inspection**: Build and inspect in browser to verify zero dead space in Task/Timer decks, full-height dark screens, decluttered spacing, clean borders, crisp typography, and unified styling.
2. **Feature Parity**: Verify timer countdown, audio playback, ambient generators, task CRUD, keyboard shortcuts, and settings persistence all function seamlessly.
3. **Settings Verification**: Test theme selection, sprite companion changing, timer duration adjustments, and alarm configuration inside the new Settings modal.
