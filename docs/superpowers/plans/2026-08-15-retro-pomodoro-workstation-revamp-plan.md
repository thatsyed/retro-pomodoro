# Retro Pomodoro Workstation Deck (v2 Widescreen Revamp) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Retro Pomodoro into a widescreen 3-column modular workstation console with persistent side decks for Tasks, Lo-Fi Music with an animated pixel equalizer, Alarms, Quick Presets, and Zen Focus Mode.

**Architecture:** A zero-dependency CSS Grid / Flexbox 3-deck layout (`#deck-tasks`, `#deck-timer`, `#deck-aux`) wrapping the Pomodoro core and auxiliary features, driven by modular JavaScript state managers and Web Audio API synthesized chimes. Fully responsive with mobile stacking.

**Tech Stack:** Vanilla JavaScript (ES6+), HTML5, CSS3, Web Audio API, LocalStorage.

## Global Constraints
- Pure Vanilla JS, HTML5, CSS3 (No build frameworks or runtime dependencies).
- Offline-ready and drift-proof timing.
- Cohesive 80s cozy retro hardware aesthetic matching design tokens.

---

### Task 1: Workstation Shell & HTML Structure

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update HTML structure to 3-column workstation deck**
Replace the single compact widget with the `.workstation-container` containing `#station-top-bar`, `#deck-tasks`, `#deck-timer`, `#deck-aux`, and overlay modals (`#settings-modal`, `#alarm-alert-modal`).

- [ ] **Step 2: Verify HTML markup validity**
Run: `node -e "const fs = require('fs'); const html = fs.readFileSync('index.html', 'utf8'); console.log('HTML length:', html.length);"`
Expected: Successful read with valid markup length.

- [ ] **Step 3: Commit**
```bash
git add index.html
git commit -m "feat: restructure index.html for 3-column workstation deck"
```

---

### Task 2: Workstation Design System & Responsive Multi-Deck CSS

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Implement 3-deck CSS Grid & Chassis Aesthetics**
Add styles for `.workstation-container`, `.console-deck`, `.deck-header`, `.deck-screen`, and responsive breakpoints (`@media (max-width: 1024px)` and `@media (max-width: 768px)`).

- [ ] **Step 2: Implement Zen Mode Styles**
Add `.zen-mode` layout transitions that collapse side decks and expand the central console.

- [ ] **Step 3: Commit**
```bash
git add styles.css
git commit -m "feat: implement 3-column responsive workstation styling and zen mode"
```

---

### Task 3: Task Operations Deck & Filter Tabs

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `app.js`

- [ ] **Step 1: Implement Task Progress Bar & Filter Tabs Logic in JS**
Add `appState.todoFilter` ('all' | 'active' | 'done'), update `renderTodos()` to compute completion percentage for the stepped progress bar and badge counter, and filter items based on the active tab.

- [ ] **Step 2: Add Task Deck Event Listeners**
Connect filter tab clicks and inline task creation to `app.js`.

- [ ] **Step 3: Commit**
```bash
git add app.js styles.css index.html
git commit -m "feat: implement task progress bar, completion stats, and filter tabs"
```

---

### Task 4: Main Console Quick Presets & Zen Focus Mode

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `app.js`

- [ ] **Step 1: Implement Quick Preset Buttons (25/5, 50/10)**
Add preset switcher function in `app.js` that quickly configures work/break lengths and updates the timer display.

- [ ] **Step 2: Implement Zen Focus Mode Toggle**
Add `#btn-zen-mode` handler in `app.js` that toggles `.zen-mode` on the document body and updates button icon/text.

- [ ] **Step 3: Commit**
```bash
git add app.js styles.css index.html
git commit -m "feat: add quick timer presets and zen focus mode"
```

---

### Task 5: Lo-Fi Tape Deck Equalizer Visualizer & Persistent Alarms Deck

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `app.js`

- [ ] **Step 1: Add Animated Pixel Equalizer Bars**
Create 8 animated frequency bar elements `.eq-bar` inside the Lo-Fi tape deck with dynamic CSS keyframe jumps active when music is playing.

- [ ] **Step 2: Embed Persistent Alarms Deck**
Integrate time-of-day alarm creation form and scrollable alarm list directly into the bottom of `#deck-aux` with instant toggle switches.

- [ ] **Step 3: Commit**
```bash
git add app.js styles.css index.html
git commit -m "feat: add animated equalizer visualizer and persistent alarms deck"
```

---

### Task 6: End-to-End Automated Verification & Documentation

**Files:**
- Create: `test_revamp.js`
- Modify: `README.md`

- [ ] **Step 1: Write automated DOM & state consistency verification script**
- [ ] **Step 2: Run verification script**
Run: `node test_revamp.js`
Expected: `ALL WORKSTATION REVAMP TESTS PASSED`
- [ ] **Step 3: Clean up test script and update README.md**
- [ ] **Step 4: Final commit**
```bash
git add README.md
git commit -m "docs: document workstation revamp in README.md"
```
