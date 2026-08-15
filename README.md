# Retro Pomodoro ⏳📻

A retro-styled desktop focus console and Pomodoro workstation built with **React 19, Vite, Tailwind CSS**, and the **Web Audio API**.

Live Demo: [https://retro-pomodor.netlify.app/](https://retro-pomodor.netlify.app/)

---

## ✨ Features

### 1. 🎯 Pomodoro Focus Timer
- **3 Modes**: Focus (Work), Short Break, and Long Break with customized durations.
- **Glowing CRT Digital Display**: Segmented countdown timer with round counters (`1 of 4`) and progress gauge.
- **Dynamic Browser Tab Sync**: Real-time timer countdown in your browser tab title.
- **Desktop Notifications & Chimes**: Optional audible alarm and browser notification on session completion.
- **Configurable Automation**: Auto-start breaks or focus rounds via Settings.

### 2. 📋 Task Manager (Left Deck)
- Quick task creation with priority levels (**High**, **Medium**, **Low**).
- Filter views by **All**, **Active**, and **Done**.
- Checkboxes, completion strikethrough, and one-click "Clear Done" action.
- Local storage persistence for seamless return to your tasks.

### 3. 📼 Lo-Fi Cassette Player (Center Deck)
- Animated dual-spool cassette tape deck that spins while music is playing.
- Curated focus tracks (`Georgetown Cafe` by Popoi, `Cafe` by VibeDepot) with auto-looping.
- Tactile playback controls: *Previous*, *Play/Pause*, *Next*, and *Repeat*.

### 4. 🌧️ Ambient Sounds & Interval Reminders (Right Deck)
- **Ambient Noise Mixer**: Independent Play/Pause buttons for **White Noise** (synthesized) and **Rain** audio, plus a "Stop all" toggle.
- **Health & Habit Reminders**: Recurring interval alerts (e.g., *Hydrate*, *Stretch*, *Posture check*) with countdown badges and audio chimes.

### 5. 🎨 Retro Themes & CRT Visuals
- **5 CRT Color Palettes**:
  - ☕ **Classic** *(Default)* – Warm amber/sepia console.
  - 🌌 **Cyberpunk** – Neon cyan & hot magenta.
  - ⚡ **Amber** – Monochromatic amber phosphor terminal.
  - 📟 **Matrix** – Phosphor hacker green.
  - 🌆 **Synthwave** – Deep violet & neon pink.
- **CRT Scanlines**: Toggleable CRT monitor scanlines and phosphor glow.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Space</kbd> | Start / Pause Pomodoro Timer |
| <kbd>Alt</kbd> + <kbd>S</kbd> | Skip current session |
| <kbd>Alt</kbd> + <kbd>R</kbd> | Reset countdown to full duration |
| <kbd>Alt</kbd> + <kbd>T</kbd> | Focus task input to add a task |
| <kbd>Alt</kbd> + <kbd>C</kbd> | Toggle CRT scanlines on / off |
| <kbd>Alt</kbd> + <kbd>K</kbd> | Open keyboard shortcuts modal |
| <kbd>Esc</kbd> | Close any open modal dialog |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm

### Installation & Local Run

```bash
# 1. Clone the repository
git clone https://github.com/thatsyed/retro-pomodoro.git
cd retro-pomodoro

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized production build in dist/
npm run build

# Preview production build locally
npm run preview
```

### Run Tests

```bash
# Run End-to-End Playwright test suite
npx playwright test
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
