# Cozy Retro Pomodoro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully functional, offline-ready, responsive Cozy Retro Pomodoro web application with synthesized 8-bit sound effects and local storage settings persistence.

**Architecture:** A lightweight client-only architecture composed of `index.html`, `styles.css`, and `app.js` in a single directory. Uses precision delta-time tracking to prevent background timer drift and the Web Audio API for programmatically synthesized retro sounds.

**Tech Stack:** Vanilla HTML5, Vanilla CSS3, Vanilla JavaScript (ES6+), Web Audio API, Google Fonts (`VT323` and `Courier Prime`).

## Global Constraints
- Target platform: Modern Web Browsers (Chrome, Firefox, Safari, Edge)
- Frameworks: None. Vanilla HTML, CSS, JavaScript only
- Style approach: Plain CSS (`styles.css`), no CSS frameworks (Tailwind, Bootstrap)
- Sound implementation: Programmatic synthesis via Web Audio API (no external file dependencies)
- Timer accuracy: Delta-timestamp calculation to prevent background tab drift
- Settings storage: HTML5 LocalStorage (`cozy_pomodoro_settings`)

---

### Task 1: Project Scaffolding and HTML Setup

**Files:**
- Create: `index.html`

**Interfaces:**
- Produces: HTML structure containing layout elements (widget shell, timer screen, control buttons, settings modal, sound control toggles) with unique IDs.

- [ ] **Step 1: Write HTML base structure**

Create `index.html` with basic head tags, Google Font preloads, CSS link, and JS script link.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cozy Pomodoro - Retro Study Timer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=VT323&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="wallpaper-grid"></div>
  <div class="app-container">
    <div class="console-widget">
      <!-- Header -->
      <div class="console-header">
        <span class="indicator-led" id="led-indicator"></span>
        <h1 class="console-title">COZY POMODORO</h1>
      </div>

      <!-- Screen Display -->
      <div class="console-screen">
        <!-- Tabs / Modes -->
        <div class="mode-tabs">
          <button id="mode-work" class="tab-btn active">WORK</button>
          <button id="mode-short" class="tab-btn">SHORT</button>
          <button id="mode-long" class="tab-btn">LONG</button>
        </div>

        <!-- Clock Display -->
        <div class="time-display" id="time-display">25:00</div>

        <!-- Cozy Interactive Sprite -->
        <div class="sprite-area">
          <div class="cozy-sprite" id="cozy-sprite">
            <!-- Steaming Mug SVG -->
            <svg viewBox="0 0 64 64" class="mug-svg">
              <!-- Animated Steam Bubbles -->
              <g class="steam-group">
                <rect x="24" y="8" width="4" height="8" fill="#ebd8b7" class="steam-particle steam-1" />
                <rect x="36" y="4" width="4" height="8" fill="#ebd8b7" class="steam-particle steam-2" />
                <rect x="28" y="12" width="4" height="8" fill="#ebd8b7" class="steam-particle steam-3" />
              </g>
              <!-- Mug Body -->
              <path d="M16 28 h32 v24 a 8 8 0 0 1 -8 8 h-16 a 8 8 0 0 1 -8 -8 z" fill="#c26f63" stroke="#4d312c" stroke-width="4" />
              <path d="M48 36 h6 a 4 4 0 0 1 4 4 v8 a 4 4 0 0 1 -4 4 h-6" fill="none" stroke="#4d312c" stroke-width="4" />
              <!-- Liquid top line -->
              <line x1="18" y1="32" x2="46" y2="32" stroke="#ebd8b7" stroke-width="4" />
            </svg>
          </div>
        </div>

        <!-- Session Status -->
        <div class="session-tally" id="session-tally">
          <span class="tally-label">SESSIONS:</span>
          <div class="tally-dots" id="tally-dots"></div>
        </div>
      </div>

      <!-- Controls Panel -->
      <div class="console-controls">
        <button id="btn-start" class="retro-btn btn-primary">START</button>
        <button id="btn-pause" class="retro-btn btn-warning">PAUSE</button>
        <button id="btn-reset" class="retro-btn btn-danger">RESET</button>
      </div>

      <!-- Utility / Settings Access -->
      <div class="console-footer">
        <button id="btn-settings" class="retro-icon-btn">⚙️ SETTINGS</button>
      </div>
    </div>
  </div>

  <!-- Settings Modal (Hidden by default) -->
  <div class="settings-modal" id="settings-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>SETTINGS</h2>
        <button id="btn-modal-close" class="close-btn">&times;</button>
      </div>
      <div class="modal-body">
        <div class="setting-group">
          <label for="input-work">WORK (MIN):</label>
          <input type="number" id="input-work" min="1" max="60" value="25">
        </div>
        <div class="setting-group">
          <label for="input-short">SHORT BREAK (MIN):</label>
          <input type="number" id="input-short" min="1" max="30" value="5">
        </div>
        <div class="setting-group">
          <label for="input-long">LONG BREAK (MIN):</label>
          <input type="number" id="input-long" min="1" max="60" value="15">
        </div>
        <div class="setting-group checkbox-group">
          <label for="toggle-sound">SOUNDS:</label>
          <input type="checkbox" id="toggle-sound" checked>
        </div>
        <div class="setting-group">
          <label for="input-volume">VOLUME:</label>
          <input type="range" id="input-volume" min="0" max="1" step="0.1" value="0.5">
        </div>
      </div>
      <div class="modal-footer">
        <button id="btn-settings-save" class="retro-btn btn-primary">SAVE</button>
        <button id="btn-settings-default" class="retro-btn btn-danger">DEFAULTS</button>
      </div>
    </div>
  </div>
</body>
</html>
```

- [ ] **Step 2: Verify HTML scaffolding**
Open `index.html` in a web browser. Verify page titles, fonts loading, and structural layout blocks render (albeit unstyled).

- [ ] **Step 3: Commit**
```bash
git add index.html
git commit -m "feat: scaffold basic index.html structure"
```

---

### Task 2: CSS Designing and Retro Cozy Styling

**Files:**
- Create: `styles.css`

**Interfaces:**
- Consumes: Markup selectors defined in Task 1.
- Produces: CSS properties, keyframe animations, variables, layout structure, pixel borders, tactile buttons, and interactive steam floating effects.

- [ ] **Step 1: Write base design system variables and layout styling**

Create `styles.css` and define variables for colors, board widths, fonts, and global base styles.

```css
:root {
  --color-bg: #2c1e1c;
  --color-bg-grid: #332321;
  --color-console: #ebd8b7;
  --color-screen: #3c2421;
  --color-text-screen: #ebd8b7;
  --color-text-glow: #e5b060;
  --color-border: #4d312c;
  --color-btn-shadow: #4d312c;
  --color-white: #f7f1e3;
  
  --color-green: #8aa882;
  --color-red: #c26f63;
  --color-yellow: #e5b060;
  
  --font-digital: 'VT323', monospace;
  --font-text: 'Courier Prime', monospace;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-bg);
  background-image: 
    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  font-family: var(--font-text);
  color: var(--color-border);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
}

/* Wallpaper Grid Background */
.wallpaper-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

/* Container */
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
}

/* Console Widget */
.console-widget {
  background-color: var(--color-console);
  border: 4px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 8px 8px 0px var(--color-btn-shadow);
  width: 100%;
  max-width: 420px;
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Console Header */
.console-header {
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 2px dashed var(--color-border);
  padding-bottom: 12px;
}

.indicator-led {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--color-red);
  border: 2px solid var(--color-border);
  transition: background-color 0.3s ease;
}

.indicator-led.work {
  background-color: var(--color-red);
}

.indicator-led.break {
  background-color: var(--color-green);
}

.indicator-led.paused {
  animation: blink-led 1s infinite alternate;
}

@keyframes blink-led {
  0% { opacity: 0.4; }
  100% { opacity: 1; }
}

.console-title {
  font-family: var(--font-digital);
  font-size: 1.8rem;
  letter-spacing: 2px;
  font-weight: normal;
  color: var(--color-border);
}
```

- [ ] **Step 2: Add Screen and Button Styling**

Implement screen rendering, active buttons, and custom controls.

```css
/* Screen */
.console-screen {
  background-color: var(--color-screen);
  border: 4px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  color: var(--color-text-screen);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
  box-shadow: inset 4px 4px 0px rgba(0,0,0,0.4);
}

/* Tabs/Modes */
.mode-tabs {
  display: flex;
  width: 100%;
  justify-content: space-around;
  border-bottom: 2px solid rgba(255,255,255,0.1);
  padding-bottom: 8px;
}

.tab-btn {
  background: transparent;
  border: none;
  font-family: var(--font-text);
  color: var(--color-text-screen);
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  padding: 4px 8px;
  opacity: 0.6;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  opacity: 0.9;
}

.tab-btn.active {
  opacity: 1;
  color: var(--color-text-glow);
  text-shadow: 0 0 8px var(--color-text-glow);
}

/* Time Display */
.time-display {
  font-family: var(--font-digital);
  font-size: 5rem;
  line-height: 1;
  color: var(--color-text-glow);
  text-shadow: 0 0 12px var(--color-text-glow);
  margin: 10px 0;
  user-select: none;
}

/* Sprite styling & Steam */
.sprite-area {
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mug-svg {
  width: 64px;
  height: 64px;
  overflow: visible;
}

.steam-particle {
  opacity: 0;
  animation: float-steam 2s infinite linear;
}

.steam-1 {
  animation-delay: 0s;
}
.steam-2 {
  animation-delay: 0.6s;
}
.steam-3 {
  animation-delay: 1.2s;
}

@keyframes float-steam {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  15% {
    opacity: 0.8;
  }
  85% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-20px) translateX(var(--steam-drift, 4px));
    opacity: 0;
  }
}

.cozy-sprite {
  transition: transform 0.3s ease;
}

.cozy-sprite.active {
  animation: gentle-bounce 0.8s infinite alternate ease-in-out;
}

@keyframes gentle-bounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(-4px); }
}

/* Session Tally */
.session-tally {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  align-self: flex-start;
  width: 100%;
  border-top: 1px dashed rgba(255,255,255,0.1);
  padding-top: 8px;
}

.tally-label {
  font-weight: bold;
}

.tally-dots {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tally-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background-color: transparent;
}

.tally-dot.filled {
  background-color: var(--color-red);
}

/* Control buttons */
.console-controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.retro-btn {
  font-family: var(--font-text);
  font-weight: bold;
  font-size: 1rem;
  padding: 12px;
  border: 3px solid var(--color-border);
  border-radius: 6px;
  cursor: pointer;
  background-color: var(--color-white);
  box-shadow: 0 4px 0 var(--color-btn-shadow);
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  position: relative;
}

.retro-btn:active {
  transform: translateY(4px);
  box-shadow: 0 0px 0 var(--color-btn-shadow);
}

.btn-primary {
  background-color: var(--color-green);
  color: var(--color-white);
}

.btn-warning {
  background-color: var(--color-yellow);
  color: var(--color-border);
}

.btn-danger {
  background-color: var(--color-red);
  color: var(--color-white);
}

.console-footer {
  display: flex;
  justify-content: center;
}

.retro-icon-btn {
  font-family: var(--font-text);
  background: transparent;
  border: none;
  font-weight: bold;
  cursor: pointer;
  color: var(--color-border);
  opacity: 0.8;
}

.retro-icon-btn:hover {
  opacity: 1;
}

/* Settings Modal */
.settings-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.settings-modal.show {
  opacity: 1;
  pointer-events: auto;
}

.modal-content {
  background-color: var(--color-console);
  border: 4px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 8px 8px 0px var(--color-btn-shadow);
  width: 90%;
  max-width: 360px;
  padding: 20px;
  transform: scale(0.8);
  transition: transform 0.3s ease;
}

.settings-modal.show .modal-content {
  transform: scale(1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px dashed var(--color-border);
  padding-bottom: 10px;
  margin-bottom: 16px;
}

.modal-header h2 {
  font-family: var(--font-digital);
  font-weight: normal;
  font-size: 1.8rem;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  color: var(--color-border);
}

.setting-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.setting-group label {
  font-size: 0.9rem;
  font-weight: bold;
}

.setting-group input[type="number"],
.setting-group input[type="range"] {
  border: 2px solid var(--color-border);
  border-radius: 4px;
  padding: 4px 6px;
  font-family: var(--font-text);
  font-size: 0.9rem;
  background-color: var(--color-white);
  color: var(--color-border);
}

.setting-group input[type="number"] {
  width: 70px;
  text-align: center;
}

.checkbox-group input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: var(--color-green);
  cursor: pointer;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 2px dashed var(--color-border);
  padding-top: 16px;
  margin-top: 16px;
}
```

- [ ] **Step 3: Verify style compilation & rendering**
Refresh `index.html` in the browser. Verify font family, grid background patterns, colors, centering, buttons and the mock layouts matches specifications.

- [ ] **Step 4: Commit**
```bash
git add styles.css
git commit -m "feat: implement CSS stylesheet with retro console aesthetics"
```

---

### Task 3: JavaScript Core Timer Engine & Settings Modal

**Files:**
- Create: `app.js`

**Interfaces:**
- Consumes: DOM nodes defined in `index.html` (`btn-start`, `btn-pause`, `btn-reset`, `time-display`, `led-indicator`, custom settings inputs).
- Produces: Precise delta timer calculations, mode toggles, session counters, and saving/loading configurations from local storage.

- [ ] **Step 1: Write application state and configuration logic**

Create `app.js` and initialize the default application parameters. Add loading settings from `localStorage`.

```javascript
// DOM Element Selectors
const ledIndicator = document.getElementById('led-indicator');
const modeWorkBtn = document.getElementById('mode-work');
const modeShortBtn = document.getElementById('mode-short');
const modeLongBtn = document.getElementById('mode-long');
const timeDisplay = document.getElementById('time-display');
const cozySprite = document.getElementById('cozy-sprite');
const tallyDotsContainer = document.getElementById('tally-dots');
const startBtn = document.getElementById('btn-start');
const pauseBtn = document.getElementById('btn-pause');
const resetBtn = document.getElementById('btn-reset');
const settingsBtn = document.getElementById('btn-settings');
const modalCloseBtn = document.getElementById('btn-modal-close');
const modalSaveBtn = document.getElementById('btn-settings-save');
const modalDefaultBtn = document.getElementById('btn-settings-default');
const settingsModal = document.getElementById('settings-modal');

// Numerical / Modal settings selectors
const inputWork = document.getElementById('input-work');
const inputShort = document.getElementById('input-short');
const inputLong = document.getElementById('input-long');
const toggleSound = document.getElementById('toggle-sound');
const inputVolume = document.getElementById('input-volume');

// Default App Config
const DEFAULT_SETTINGS = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  soundEnabled: true,
  volume: 0.5
};

let appState = {
  currentMode: 'work', // 'work' | 'shortBreak' | 'longBreak'
  timerState: 'paused', // 'paused' | 'running'
  timeRemaining: 1500, // seconds
  targetTime: null, // exact timestamp when timer completes
  completedSessions: 0,
  settings: { ...DEFAULT_SETTINGS }
};

let timerInterval = null;

// Initialize Settings
function loadSettings() {
  const saved = localStorage.getItem('cozy_pomodoro_settings');
  if (saved) {
    try {
      appState.settings = JSON.parse(saved);
      // Sync form fields
      inputWork.value = appState.settings.workDuration;
      inputShort.value = appState.settings.shortBreakDuration;
      inputLong.value = appState.settings.longBreakDuration;
      toggleSound.checked = appState.settings.soundEnabled;
      inputVolume.value = appState.settings.volume;
    } catch (e) {
      console.error('Failed to parse settings', e);
      appState.settings = { ...DEFAULT_SETTINGS };
    }
  }
  updateDurationFromMode();
}

function saveSettings() {
  appState.settings.workDuration = parseInt(inputWork.value) || DEFAULT_SETTINGS.workDuration;
  appState.settings.shortBreakDuration = parseInt(inputShort.value) || DEFAULT_SETTINGS.shortBreakDuration;
  appState.settings.longBreakDuration = parseInt(inputLong.value) || DEFAULT_SETTINGS.longBreakDuration;
  appState.settings.soundEnabled = toggleSound.checked;
  appState.settings.volume = parseFloat(inputVolume.value) ?? DEFAULT_SETTINGS.volume;
  
  localStorage.setItem('cozy_pomodoro_settings', JSON.stringify(appState.settings));
}
```

- [ ] **Step 2: Add timer engine, mode switches, and DOM rendering**

Implement precision delta-time tick checks and tab switcher operations.

```javascript
function updateDurationFromMode() {
  if (appState.timerState === 'running') return; // Do not switch details mid-run
  
  if (appState.currentMode === 'work') {
    appState.timeRemaining = appState.settings.workDuration * 60;
  } else if (appState.currentMode === 'shortBreak') {
    appState.timeRemaining = appState.settings.shortBreakDuration * 60;
  } else if (appState.currentMode === 'longBreak') {
    appState.timeRemaining = appState.settings.longBreakDuration * 60;
  }
  updateDisplay();
}

function updateDisplay() {
  const minutes = Math.floor(appState.timeRemaining / 60);
  const seconds = appState.timeRemaining % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  // LED Styling
  ledIndicator.className = 'indicator-led';
  if (appState.timerState === 'paused') {
    ledIndicator.classList.add('paused');
  }
  ledIndicator.classList.add(appState.currentMode);
  
  // Steam Floating speed based on running state
  const steamGroup = document.querySelector('.steam-group');
  if (appState.timerState === 'running' && appState.currentMode === 'work') {
    steamGroup.style.display = 'block';
    cozySprite.classList.add('active');
  } else if (appState.timerState === 'running' && appState.currentMode !== 'work') {
    steamGroup.style.display = 'none'; // Cozy idle/sleeping during breaks
    cozySprite.classList.add('active');
  } else {
    steamGroup.style.display = 'none';
    cozySprite.classList.remove('active');
  }
}

function switchMode(newMode) {
  if (appState.currentMode === newMode) return;
  stopTimer();
  appState.currentMode = newMode;
  
  // Update Active Tab Button
  modeWorkBtn.classList.toggle('active', newMode === 'work');
  modeShortBtn.classList.toggle('active', newMode === 'shortBreak');
  modeLongBtn.classList.toggle('active', newMode === 'longBreak');
  
  updateDurationFromMode();
}

function startTimer() {
  if (appState.timerState === 'running') return;
  
  appState.timerState = 'running';
  appState.targetTime = Date.now() + (appState.timeRemaining * 1000);
  
  updateDisplay();
  
  timerInterval = setInterval(() => {
    const delta = appState.targetTime - Date.now();
    
    if (delta <= 0) {
      appState.timeRemaining = 0;
      updateDisplay();
      stopTimer();
      handleTimerComplete();
    } else {
      appState.timeRemaining = Math.ceil(delta / 1000);
      updateDisplay();
    }
  }, 100);
}

function stopTimer() {
  appState.timerState = 'paused';
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  updateDisplay();
}

function resetTimer() {
  stopTimer();
  updateDurationFromMode();
}

function updateTallyDots() {
  tallyDotsContainer.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    const dot = document.createElement('div');
    dot.className = 'tally-dot';
    if (i < appState.completedSessions % 4) {
      dot.classList.add('filled');
    }
    tallyDotsContainer.appendChild(dot);
  }
}

function handleTimerComplete() {
  // If work session finished, increase count
  if (appState.currentMode === 'work') {
    appState.completedSessions++;
    updateTallyDots();
    // Auto-suggest short break
    switchMode('shortBreak');
  } else {
    // Break finished, suggest work
    switchMode('work');
  }
  
  // Custom hook for synthesizing chime (Task 4)
  triggerCompletionAlert();
}

// Modal handling
function openSettings() {
  settingsModal.classList.add('show');
}

function closeSettings() {
  settingsModal.classList.remove('show');
}

// Listeners Setup
modeWorkBtn.addEventListener('click', () => { triggerClickSound(); switchMode('work'); });
modeShortBtn.addEventListener('click', () => { triggerClickSound(); switchMode('shortBreak'); });
modeLongBtn.addEventListener('click', () => { triggerClickSound(); switchMode('longBreak'); });

startBtn.addEventListener('click', () => { triggerClickSound(); startTimer(); });
pauseBtn.addEventListener('click', () => { triggerClickSound(); stopTimer(); });
resetBtn.addEventListener('click', () => { triggerClickSound(); resetTimer(); });

settingsBtn.addEventListener('click', () => { triggerClickSound(); openSettings(); });
modalCloseBtn.addEventListener('click', () => { triggerClickSound(); closeSettings(); });

modalSaveBtn.addEventListener('click', () => {
  triggerClickSound();
  saveSettings();
  closeSettings();
  resetTimer();
});

modalDefaultBtn.addEventListener('click', () => {
  triggerClickSound();
  inputWork.value = DEFAULT_SETTINGS.workDuration;
  inputShort.value = DEFAULT_SETTINGS.shortBreakDuration;
  inputLong.value = DEFAULT_SETTINGS.longBreakDuration;
  toggleSound.checked = DEFAULT_SETTINGS.soundEnabled;
  inputVolume.value = DEFAULT_SETTINGS.volume;
});

// Load and render initially
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  updateTallyDots();
});
```

- [ ] **Step 3: Set placeholder functions for sound triggers**
At the bottom of `app.js`, add placeholders for `triggerClickSound` and `triggerCompletionAlert` to prevent reference errors during validation.

```javascript
function triggerClickSound() {}
function triggerCompletionAlert() {}
```

- [ ] **Step 4: Verify state functionality**
Open `index.html` in browser. Test pressing modes, Start, Pause, Reset. Ensure countdown clock starts ticking and is stable. Test editing timers in Settings, saving, and verifying updated durations.

- [ ] **Step 5: Commit**
```bash
git add app.js
git commit -m "feat: add timer logic, modal selectors, and state management"
```

---

### Task 4: Web Audio API Integration for Synthesized Sounds

**Files:**
- Modify: `app.js`

**Interfaces:**
- Consumes: Sound toggles, volume values, timer completion events from Task 3.
- Produces: Synthesized triangle and square wave sound alerts via browser audio nodes.

- [ ] **Step 1: Write Web Audio API initializer**

Modify sound placeholders in `app.js` with audio synthesis logic.

```javascript
let audioCtx = null;

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// Play Quick Mechanical Button Click
function triggerClickSound() {
  if (!appState.settings.soundEnabled) return;
  try {
    initAudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(appState.settings.volume * 0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    console.error('Audio play failed:', e);
  }
}

// Play Upbeat Work/Relax Break Completion Alert
function triggerCompletionAlert() {
  if (!appState.settings.soundEnabled) return;
  try {
    initAudioContext();
    const now = audioCtx.currentTime;
    
    if (appState.currentMode === 'shortBreak' || appState.currentMode === 'longBreak') {
      // Completed WORK (Trigger upbeat NES melody: C5 -> E5 -> G5)
      playNote(523.25, now, 0.1, 'square');      // C5
      playNote(659.25, now + 0.1, 0.1, 'square');  // E5
      playNote(783.99, now + 0.2, 0.25, 'square'); // G5
    } else {
      // Completed BREAK (Trigger relaxing bell melody: G4 -> E4 -> C4)
      playNote(392.00, now, 0.15, 'triangle');     // G4
      playNote(329.63, now + 0.15, 0.15, 'triangle'); // E4
      playNote(261.63, now + 0.3, 0.35, 'triangle');  // C4
    }
  } catch (e) {
    console.error('Completion alert audio failed:', e);
  }
}

function playNote(freq, startTime, duration, waveType) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = waveType;
  osc.frequency.value = freq;
  
  gain.gain.setValueAtTime(appState.settings.volume * 0.4, startTime);
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start(startTime);
  osc.stop(startTime + duration);
}
```

- [ ] **Step 2: Hook up initialization trigger on click buttons**

Ensure `initAudioContext` runs inside first user inputs. Update UI triggers to ensure sound synthesis is fully unlocked on first click.

- [ ] **Step 3: Verify audio synthesis and final integration**
Run `index.html` in browser. Click controls and verify subtle clicks. Trigger completion by setting work timer to 1 min (0.01 hours/mins) in setting or waiting. Verify upbeat NES chimes on work complete and relaxed soft chime on break complete.

- [ ] **Step 4: Commit**
```bash
git add app.js
git commit -m "feat: integrate Web Audio API sound synthesis alerts"
```
