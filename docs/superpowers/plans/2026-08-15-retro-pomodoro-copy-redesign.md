# Ultra-Minimalist Copy Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul all copy, labels, placeholders, titles, and dialog strings across the application to adopt clean, human-friendly Standard Title Case and ultra-minimalist monospace formatting.

**Architecture:** Systematic text and token updates across components (`header`, `tasks`, `timer`, `cassette`, `reminders`, `ambient`, `settings`, `crt`, `hooks`, and `services`), followed by updating Playwright test assertions and running automated QA verification.

**Tech Stack:** React 19, Tailwind CSS v4, Lucide React SVG icons, Playwright.

## Global Constraints

- **Strict SVG Iconography:** Maintain ZERO emojis anywhere.
- **Copy Consistency:** Use Standard Title Case / Sentence Case (`Focus`, `Short Break`, `Tasks`, `Reminders`, `Ambient Sounds`, `Settings`) consistently without redundant `//` pseudo-terminal slashes.
- **Dynamic Tab Title:** Format as `[24:59] Focus · Retro Pomodoro` and `[Paused 24:59] Focus · Retro Pomodoro`.

---

### Task 1: Header & Top Navigation Bar Copy

**Files:**
- Modify: `src/components/header/HeaderBar.jsx`
- Modify: `src/components/header/ThemeSelector.jsx`
- Modify: `src/components/header/CrtToggle.jsx`

**Interfaces:**
- Produces updated header copy: `Retro Pomodoro`, `Focus console`, `CRT: On / Off`, `Shortcuts [Alt + K]`, `Settings`.

- [ ] **Step 1: Update HeaderBar.jsx, ThemeSelector.jsx, and CrtToggle.jsx**
- [ ] **Step 2: Commit Task 1**
```bash
git add src/components/header/
git commit -m "refactor(copy): update header, theme selector, and CRT toggle to clean title case"
```

---

### Task 2: Left Deck (Tasks & Todo) Copy

**Files:**
- Modify: `src/components/tasks/TaskDeck.jsx`
- Modify: `src/components/tasks/TaskInput.jsx`
- Modify: `src/components/tasks/TaskItem.jsx`
- Modify: `src/components/tasks/TaskFilters.jsx`
- Modify: `src/hooks/useTasks.js`

**Interfaces:**
- Produces: `Tasks`, `{count} active`, `Add a task...`, `Add`, `Priority: Low / Med / High`, `All ({n})`, `Active ({n})`, `Done ({n})`, `{x} of {y} completed`, `Clear done`, `No tasks here. Press Alt + T to add one.`

- [ ] **Step 1: Update task components and default tasks in useTasks.js**
- [ ] **Step 2: Commit Task 2**
```bash
git add src/components/tasks/ src/hooks/useTasks.js
git commit -m "refactor(copy): update task deck copy, placeholders, filters, and priority labels"
```

---

### Task 3: Center Hero Deck (Pomodoro & Cassette) Copy

**Files:**
- Modify: `src/components/timer/ModeTabs.jsx`
- Modify: `src/components/timer/DigitalDisplay.jsx`
- Modify: `src/components/timer/TimerControls.jsx`
- Modify: `src/components/cassette/CassettePlayer.jsx`
- Modify: `src/components/cassette/CassetteReels.jsx`

**Interfaces:**
- Produces: `Focus (25m)`, `Short Break (5m)`, `Long Break (15m)`, `Round {n} of 4`, `{percent}% done`, `Start`, `Pause`, `Skip`, `Reset`, `Cassette Player`, `Playing`, `Paused`, `Side A`, `Lo-Fi Focus`, `Tape 1`.

- [ ] **Step 1: Update timer and cassette components**
- [ ] **Step 2: Commit Task 3**
```bash
git add src/components/timer/ src/components/cassette/
git commit -m "refactor(copy): update timer modes, controls, and cassette deck labels"
```

---

### Task 4: Right Deck (Reminders & Ambient Sounds) Copy

**Files:**
- Modify: `src/components/reminders/RemindersDeck.jsx`
- Modify: `src/components/reminders/ReminderItem.jsx`
- Modify: `src/components/reminders/AddReminderModal.jsx`
- Modify: `src/components/ambient/AmbientMixer.jsx`
- Modify: `src/components/ambient/AmbientChannel.jsx`
- Modify: `src/hooks/useReminders.js`

**Interfaces:**
- Produces: `Reminders`, `New`, default reminders (`Drink water`, `Stretch and move`, `Check posture`, `Rest eyes (20-20-20)`), `Every {x}m · In {y}`, `Ambient Sounds`, `Mute all`, `Unmute`, channels (`Vinyl crackle`, `Rain storm`, `White noise`, `Cafe background`).

- [ ] **Step 1: Update reminder and ambient components and useReminders.js**
- [ ] **Step 2: Commit Task 4**
```bash
git add src/components/reminders/ src/components/ambient/ src/hooks/useReminders.js
git commit -m "refactor(copy): update reminders and ambient soundscape mixer labels"
```

---

### Task 5: Settings, Shortcuts, Tab Title & Footer Copy

**Files:**
- Modify: `src/components/settings/SettingsModal.jsx`
- Modify: `src/components/settings/KeyboardShortcutsModal.jsx`
- Modify: `src/hooks/useTabTitleSync.js`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces: Clean settings modal copy (`Settings`, `Timer durations`, `Automation`, `Desktop notifications`), shortcuts modal, tab title `[24:59] Focus · Retro Pomodoro`, and footer status bar.

- [ ] **Step 1: Update settings, shortcuts modal, useTabTitleSync, and App.jsx**
- [ ] **Step 2: Commit Task 5**
```bash
git add src/components/settings/ src/hooks/useTabTitleSync.js src/App.jsx
git commit -m "refactor(copy): update settings modal, shortcuts, tab title, and footer copy"
```

---

### Task 6: Test Suite Updates & Final E2E QA Verification

**Files:**
- Modify: `tests/workstation.spec.js`

**Interfaces:**
- Updates Playwright test assertions for new text and runs full E2E test suite.

- [ ] **Step 1: Update tests/workstation.spec.js**
- [ ] **Step 2: Run npm run build && npx playwright test**
- [ ] **Step 3: Commit Task 6**
```bash
git add tests/workstation.spec.js
git commit -m "test: update Playwright E2E test assertions to match revised clean copy"
```
