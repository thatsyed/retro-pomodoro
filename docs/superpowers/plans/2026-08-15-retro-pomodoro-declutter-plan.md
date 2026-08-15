# Retro Pomodoro Workstation Declutter & Full-Height Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Declutter the Retro Pomodoro Workstation UI and copy, eliminate empty dead space by making Task and Timer decks expand to full height, and centralize customizations (theme, sprite companion, presets) into the Settings modal.

**Architecture:** Refactor styling tokens in `index.css` to enforce a clean, equal-height 3-deck studio grid. Simplify component markup and copy in Header, Timer, Task, and Audio decks, removing visual noise and moving secondary configuration options into a tabbed `SettingsModal`.

**Tech Stack:** React 19, Vite, Tailwind CSS v4, Lucide/SVG Icons, Web Audio API.

## Global Constraints
- Target clean analog Hi-Fi aesthetic: concise labels (`RETRO POMO`, `FOCUS`, `BREAK`, `TASKS`, `AUDIO`).
- Zero empty bottom dead space: `.console-deck`, `.deck-screen`, and task list containers must expand with `flex-1 h-full` and `overflow-y-auto`.
- Preserve all existing state and functionality (timer, audio engine, task CRUD, alarms, local storage, keyboard shortcuts).
- Typography: `VT323` for phosphor time readouts/headers, `JetBrains Mono` for task lists, inputs, and body text.

---

### Task 1: Clean Styling Tokens & Full-Height Deck Grid (`src/index.css`)

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: CSS variables for themes and deck layout
- Produces: Cleaned CSS tokens without decorative screw clutter, refined CRT scanlines, and full-height stretch utilities for `.workstation-container`, `.console-deck`, `.deck-screen`, and `.crt-main-screen`.

- [ ] **Step 1: Inspect and update `src/index.css` layout rules**
Update `.workstation-container`, `.console-deck`, `.deck-screen`, `.crt-main-screen` to support full-height expansion:
```css
.workstation-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  align-items: stretch;
}

@media (min-width: 1024px) {
  .workstation-container {
    grid-template-columns: 320px 1fr 340px;
  }
}

.console-deck {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.deck-screen, .crt-main-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
}
```

- [ ] **Step 2: Clean up decorative clutter and faux screw artifacts**
Remove `.chassis-screw` styles and reduce heavy border nesting and aggressive scanline opacities.

- [ ] **Step 3: Verify CSS build passes**
Run: `npm run build`
Expected: Build succeeds without CSS or Vite errors.

- [ ] **Step 4: Commit**
```bash
git add src/index.css
git commit -m "style: streamline layout tokens and enforce full-height deck stretching"
```

---

### Task 2: Streamline Station Header (`src/components/header/StationHeader.jsx`)

**Files:**
- Modify: `src/components/header/StationHeader.jsx`

**Interfaces:**
- Consumes: `todayPomos`, `todayFocusMinutes`, `zenMode`, `onToggleZenMode`, `onOpenSettings`, `onOpenShortcuts`
- Produces: Streamlined top bar with clean `RETRO POMO` branding, compact `X / Y POMOS` streak pill, and minimal Zen / Shortcuts / Config action buttons.

- [ ] **Step 1: Simplify Header markup and copy**
Update `StationHeader.jsx`:
- Brand title: `RETRO POMO` (with pulsing emerald power LED).
- Remove redundant hardware tags (`WS-8080 PRO`, `ANALOG FOCUS WORKSTATION`).
- Streak badge: single compact `X / Y POMOS` pill.
- Actions: Zen (`ZEN`), Shortcuts (`?`), Config (`CONFIG`). Theme selection is delegated to Settings.

- [ ] **Step 2: Verify build**
Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**
```bash
git add src/components/header/StationHeader.jsx
git commit -m "refactor(header): streamline copy and action controls"
```

---

### Task 3: Full-Height Task Deck & Copy Refinement (`src/components/tasks/TaskDeck.jsx`)

**Files:**
- Modify: `src/components/tasks/TaskDeck.jsx`
- Modify: `src/components/tasks/TaskList.jsx`

**Interfaces:**
- Consumes: `todos`, `stats`, `filter`, `onSetFilter`, `onAddTodo`, `onToggleTodo`, `onDeleteTodo`, `onClearDone`
- Produces: Full-height task log filling the deck with zero dead chassis voids, streamlined header (`TASKS • X/Y`), clean filter toggles, and smooth scrollable task list.

- [ ] **Step 1: Update TaskDeck layout to eliminate empty dead space**
Set `TaskDeck` container to `h-full flex flex-col justify-between`.
Set the inner CRT `.deck-screen` to `flex-1 flex flex-col`.
Make `TaskList` container use `flex-1 min-h-0 overflow-y-auto` so both task items and the empty state gracefully occupy the entire screen space.

- [ ] **Step 2: Streamline task copy and controls**
- Header: `TASKS` with `X/Y` count badge.
- Filter tabs: clean `ALL` | `ACTIVE` | `DONE` text buttons.
- Clear action: `CLEAR`.
- Quick task input: clean single-line input field.

- [ ] **Step 3: Verify build**
Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**
```bash
git add src/components/tasks/TaskDeck.jsx src/components/tasks/TaskList.jsx
git commit -m "feat(tasks): implement full-height task deck and clean copy"
```

---

### Task 4: Hero Timer Deck Polish & Dead Space Removal (`src/components/timer/TimerDeck.jsx`)

**Files:**
- Modify: `src/components/timer/TimerDeck.jsx`
- Modify: `src/components/timer/SpriteStage.jsx`

**Interfaces:**
- Consumes: `currentMode`, `timerState`, `timeRemaining`, `strokeDashoffset`, `completedSessions`, `currentClock`, `activeSprite`, `onSwitchMode`, `onStart`, `onPause`, `onReset`, `dailyGoal`
- Produces: Clean hero timer with mode tabs (`FOCUS`, `SHORT BREAK`, `LONG BREAK`), full-height CRT screen, clean sprite stage (without intrusive arrow selectors), session dots, and 2 high-contrast action buttons (`START`/`PAUSE`, `RESET`).

- [ ] **Step 1: Refactor TimerDeck layout and remove presets clutter**
- Remove bottom presets row (`25/5`, `50/10`, `CUSTOM...`) from the main screen (moved to Settings).
- Remove sprite selector buttons from `SpriteStage` (moved to Settings) so the sprite sits cleanly.
- Set `TimerDeck` to `h-full flex flex-col justify-between`.
- Set `.crt-main-screen` to `flex-1 flex flex-col justify-around py-4`.
- Simplify arcade controls to 2 buttons: `START / PAUSE` (toggle) and `RESET`.

- [ ] **Step 2: Streamline Timer copy**
- Header title: `FOCUS` / `SHORT BREAK` / `LONG BREAK`.
- Session footer: `ROUND X/4` with 4 session dots and daily goal counter.

- [ ] **Step 3: Verify build**
Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**
```bash
git add src/components/timer/TimerDeck.jsx src/components/timer/SpriteStage.jsx
git commit -m "feat(timer): declutter hero timer deck and eliminate empty voids"
```

---

### Task 5: Streamline Audio Deck (`src/components/audio/AudioDeck.jsx`)

**Files:**
- Modify: `src/components/audio/AudioDeck.jsx`

**Interfaces:**
- Consumes: audio engine props, ambient generator props, alarm manager props
- Produces: Full-height audio console with clean header (`AUDIO`), sleek cassette tape player, 4 ambient sound buttons, and concise alarm status.

- [ ] **Step 1: Simplify Audio Deck layout and copy**
- Header: `AUDIO` with mini equalizer.
- Cassette tape: Clean tape card with track title, playback controls (`⏮`, `▶/❚❚`, `⏭`), and volume slider.
- Ambient sounds: 4 clean toggle cards (`Rain`, `Campfire`, `Cafe`, `White Noise`).
- Alarms section: Compact summary with link to open alarm manager in Settings.
- Container set to `h-full flex flex-col justify-between`.

- [ ] **Step 2: Verify build**
Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**
```bash
git add src/components/audio/AudioDeck.jsx
git commit -m "feat(audio): declutter audio deck and balance height"
```

---

### Task 6: Comprehensive Settings Modal (`src/components/modals/SettingsModal.jsx`)

**Files:**
- Modify: `src/components/modals/SettingsModal.jsx`

**Interfaces:**
- Consumes: `isOpen`, `onClose`, `settings`, `onSaveSettings`, `allData`, `onImportData`, `alarms`, `alarmManager`
- Produces: Tabbed Settings modal organizing:
  1. **Appearance**: Theme selection (Classic, Game Boy, Cyberpunk, Arcade, Lo-Fi Brown), CRT scanlines toggle, Sprite companion selector.
  2. **Timer**: Durations (Work, Short break, Long break, Cycle count), Presets (`25/5`, `50/10`, `15/3`).
  3. **Sound**: SFX volume, ambient mix, ticking sound toggle, alert chime.
  4. **Alarms**: Full alarm creator and list.
  5. **Data**: Backup export / import and reset.

- [ ] **Step 1: Implement tabbed navigation in SettingsModal**
Add tabs: `[APPEARANCE] [TIMER] [SOUND] [ALARMS] [BACKUP]`.

- [ ] **Step 2: Move Theme Selector, Sprite Picker, and Presets into Settings**
Ensure users can change themes, companion sprites, and presets directly within the modal with live preview.

- [ ] **Step 3: Verify build**
Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**
```bash
git add src/components/modals/SettingsModal.jsx
git commit -m "feat(settings): create centralized tabbed configuration modal"
```

---

### Task 7: App Integration & Footer Cleanup (`src/App.jsx`)

**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: All updated decks, modals, and header
- Produces: Seamless root application with clean hotkey footer.

- [ ] **Step 1: Update App.jsx props and handlers**
- Wire updated `StationHeader`, `TaskDeck`, `TimerDeck`, `AudioDeck`, and `SettingsModal`.
- Clean footer to minimal hotkey cheatsheet: `[SPACE] Start/Pause • [R] Reset • [Z] Zen • [W/S/L] Modes • [M] Music • [?] Shortcuts`.

- [ ] **Step 2: Full end-to-end verification**
Run: `npm run build`
Verify all UI components render cleanly with zero compile/runtime errors.

- [ ] **Step 3: Commit**
```bash
git add src/App.jsx
git commit -m "refactor(app): integrate decluttered decks and clean hotkey footer"
```
