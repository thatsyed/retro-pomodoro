# Design Specification: Cozy Retro Pomodoro Widget

A beautiful, responsive, and standalone Pomodoro timer web application featuring a cozy retro pixel-art aesthetic. Unlocked and ready for local development or easy web deployment (Vercel, Netlify, GitHub Pages, etc.).

## 1. Overview
The Cozy Retro Pomodoro is a client-side web application designed to help users focus using the Pomodoro technique. It is styled to resemble an 8-bit handheld gaming console or a classic desktop widget, featuring warm, earthy color tones, pixel-art styling, custom sounds synthesized natively using the Web Audio API, and persistent local settings.

## 2. File Structure
The project will be self-contained in a single directory to enable simple, zero-configuration deployments:
* `index.html` - The structural markup containing semantic HTML5 elements, loaded Google Fonts, and the main container.
* `styles.css` - Custom CSS implementation including pixel art borders, custom colors, animations, responsive layouts, and cozy theme decorations.
* `app.js` - Application logic including precise state management, timer tick calculations, local storage synchronization, Web Audio API synthesizers, and click interactions.
* `assets/` - A directory for secondary static assets (like a favicon or optional images, if needed).

## 3. UI/UX & Aesthetic Design
The app is styled with a cozy, warm retro aesthetic.

### Theme & Colors
* **Background Wallpaper:** Dark brown `#2c1e1c` with a subtle repeating checkerboard grid pattern (`#332321`) to evoke retro CRT/wallpaper grids.
* **Widget Body:** Retro plastic console style. Main background: `#ebd8b7` (warm cream sand). Border: 4px solid `#4d312c` (dark chocolate). Box shadow: flat 8px `#4d312c`.
* **Screen Display:** Dark LCD style `#3c2421` (rich cocoa) with a glow effect.
* **Clock Text:** Large, sharp digits in glowing amber `#e5b060` or soft green `#a4c297`.
* **Palette Accents:**
  * Sage Green: `#8aa882` (representing rest, active break)
  * Terracotta Red: `#c26f63` (representing focus, active work)
  * Mustard Yellow: `#e5b060` (active/accent controls)
  * Dark Chocolate: `#4d312c` (borders, labels)
  * Cozy Soft Cream: `#f7f1e3` (inner button faces, inputs)

### Fonts
* **Primary Digital Display:** Google Font `VT323` (monospace retro font)
* **Secondary UI Text:** Google Font `Courier Prime` or monospace fallback (for settings, text labels, buttons)

### Cozy Interactive Elements
* **Visual Cozy Sprite:** An animated CSS/SVG element representing a steaming coffee mug or flickering candle.
  * *Steaming Mug:* Tiny pixel steam bubbles float upwards during the active timer. The steam speeds up or slows down based on timer state.
* **Mechanical Tactile Buttons:** CSS class `.retro-btn` with a flat 3D shadow that translates downwards on `:active` (e.g., `transform: translateY(4px); box-shadow: 0 0px ...`).
* **Completed Session Indicators:** Cute pixel tomatoes/coffee mugs that fill up as sessions are completed.

## 4. Technical Architecture & State Management

### Timer Precision Logic
To prevent interval drifting caused by browser background tab throttling, the timer will check the actual elapsed system time rather than relying strictly on `setInterval` intervals:
1. When timer runs, store the target end-time timestamp: `targetTime = Date.now() + timeRemainingMs`.
2. run a `setInterval` or `requestAnimationFrame` loop that runs every 100ms.
3. On each tick, compute: `timeRemainingMs = targetTime - Date.now()`.
4. Update display with `Math.max(0, Math.ceil(timeRemainingMs / 1000))`.
5. When `timeRemainingMs <= 0`, trigger state transition and play sounds.

### Application State Structure
```javascript
let appState = {
  currentMode: 'work',        // 'work' | 'shortBreak' | 'longBreak'
  timerState: 'paused',       // 'paused' | 'running'
  timeRemaining: 1500,        // Remaining seconds (initially 25 * 60)
  completedSessions: 0,       // Session tally
  settings: {
    workDuration: 25,         // minutes
    shortBreakDuration: 5,    // minutes
    longBreakDuration: 15,    // minutes
    soundEnabled: true,
    volume: 0.5
  }
}
```

### Local Storage Schema
The state configuration will be stored under the key `cozy_pomodoro_settings` to persist user intervals and audio settings across reloads.

### Web Audio API Synthesizers
Natively synthesizing retro sound effects without external file dependencies:
* **AudioContext Initialization:** Created upon the first user click (unblocking browser policy).
* **Click Sound (Mechanical Click):**
  * Oscillator: Triangle wave, frequency sweeps quickly from 150Hz to 40Hz in 50ms.
  * Envelope: Immediate decay.
* **Session Done Sound (Work Complete - Bright Retro Chime):**
  * Oscillator: Square wave.
  * Notes: C5 (523Hz) for 100ms, then E5 (659Hz) for 100ms, then G5 (784Hz) for 250ms.
  * Gain envelope with quick attack and medium release to mimic retro NES soundcard.
* **Break Done Sound (Break Over - Warm Calming Chime):**
  * Oscillator: Triangle wave.
  * Notes: G4 (392Hz) for 150ms, then E4 (330Hz) for 150ms, then C4 (261Hz) for 350ms.
  * Soft attack and long release.

## 5. Settings Modal
A custom retro settings modal that slides in or pops up with:
* Numerical inputs for Work, Short Break, and Long Break durations.
* Sound toggle checkbox (styled as a custom pixel checkbox).
* Volume slider control.
* "Save Config" and "Reset Defaults" buttons.
