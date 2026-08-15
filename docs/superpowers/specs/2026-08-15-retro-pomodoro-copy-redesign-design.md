# Design Specification: Ultra-Minimalist Copy Redesign for Retro Pomodoro

**Date:** 2026-08-15  
**Topic:** Clean Title Case & Ultra-Minimalist Copy Overhaul  
**Status:** Approved Design Spec  

---

## 1. Overview & Goal
Streamline and polish all user-facing copy across the Retro Pomodoro Workstation. Transition from uppercase pseudo-technical terminal jargon (e.g. `EXEC // FOCUS SPRINT`, `TASKS // TODO`, `CYCLE: 1 / 4`) to clean, legible, human-friendly **Standard Title Case & Ultra-Minimalist Monospace** (e.g. `Focus`, `Short Break`, `Tasks`, `Round 1 of 4`, `Reminders`, `Ambient Sounds`, `Settings`).

---

## 2. Copy Matrix & Component Map

### 2.1 Header & Top Navigation Bar (`src/components/header/`)
* **App Title:** `Retro Pomodoro`
* **Subtitle:** `Focus console`
* **CRT Toggle Button:** `CRT: On` / `CRT: Off`
* **Theme Names:** `Cyberpunk`, `Amber`, `Matrix`, `Synthwave`, `Classic`
* **Header Button Tooltips:** `Shortcuts [Alt + K]`, `Settings`

### 2.2 Left Deck: Tasks & Todo (`src/components/tasks/`)
* **Header:** `Tasks`
* **Active Counter:** `{count} active` (e.g. `3 active`)
* **Input Placeholder:** `Add a task...`
* **Add Button:** `Add`
* **Priority Selector:** `Priority:` with options `Low`, `Med`, `High`
* **Filter Pills:** `All ({count})`, `Active ({count})`, `Done ({count})`
* **Footer Summary:** `{completed} of {total} completed`
* **Clear Action:** `Clear done`
* **Empty State:** `No tasks here. Press Alt + T to add one.`

### 2.3 Center Hero Deck: Pomodoro & Cassette (`src/components/timer/`, `src/components/cassette/`)
* **Mode Tabs:** `Focus ({m}m)`, `Short Break ({m}m)`, `Long Break ({m}m)`
* **Digital Display Badges:** `Focus`, `Short Break`, `Long Break`
* **Cycle Tracker:** `Round {current} of 4`
* **Progress Percentage:** `{percent}% done`
* **Timer Controls:** `Start`, `Pause`, `Skip`, `Reset`
* **Cassette Header:** `Cassette Player`
* **Cassette Status Badge:** `Playing` / `Paused`
* **Cassette Tape Label:** `Side A`, `Lo-Fi Focus`, `Tape 1`
* **Track Details:** `I Don't Understand A Thing` · `HoliznaCC0`
* **Cassette Buttons:** `Play`, `Pause`, `Prev`, `Next`, `Loop`

### 2.4 Right Deck: Reminders & Ambient Sounds (`src/components/reminders/`, `src/components/ambient/`)
* **Reminders Header:** `Reminders`
* **New Button:** `New`
* **Default Reminders:**
  * `Drink water` (every 30m)
  * `Stretch and move` (every 45m)
  * `Check posture` (every 20m)
  * `Rest eyes (20-20-20)` (every 20m)
* **Countdown Format:** `Every {interval}m · In {mins}m {secs}s`
* **Ambient Header:** `Ambient Sounds`
* **Mute All Button:** `Mute all` / `Unmute`
* **Channel Labels:** `Vinyl crackle`, `Rain storm`, `White noise`, `Cafe background`

### 2.5 Modals, Notifications & Footer (`src/components/settings/`, `src/services/`)
* **Settings Modal Title:** `Settings`
  * `Timer durations` (`Focus`, `Short break`, `Long break`)
  * `Automation` (`Auto-start breaks after focus`, `Auto-start focus after breaks`)
  * `Desktop notifications` (`Status: Active` / `Enable`)
  * `Save settings`, `Cancel`
* **Add Reminder Modal Title:** `New Reminder`
  * `Reminder name`
  * `Repeat every (minutes)`
  * `Presets: 15m, 20m, 30m, 45m, 60m`
  * `Create reminder`, `Cancel`
* **Keyboard Shortcuts Modal:** `Keyboard Shortcuts`
* **Tab Title Format:**
  * Active: `[{mm}:{ss}] Focus · Retro Pomodoro`
  * Paused: `[Paused {mm}:{ss}] Focus · Retro Pomodoro`
  * Completed: `(Complete) Time for a break! · Retro Pomodoro`
* **Footer Status Bar:** `Shortcuts: [Space] Start/Pause · [Alt+S] Skip · [Alt+R] Reset · [Alt+M] Mute · [Alt+T] Task · [Alt+C] CRT`

---

## 3. Verification Plan
* Automated Playwright test updates (`tests/workstation.spec.js`) to assert new copy selectors.
* Vite build check (`npm run build`).
* Visual walkthrough on `http://localhost:3000`.
