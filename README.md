# Retro Pomodoro Workstation

![Retro Pomodoro Workstation](https://res.cloudinary.com/j8k8qxlg/image/upload/f_auto,q_auto/ChatGPT_Image_Aug_24_2026_12_27_31_AM)

**Live Demo**: [retropomo.netlify.app](https://retropomo.netlify.app)

Retro Pomodoro Workstation is a client-side focus console built with React 19, Vite 6, Tailwind CSS 4, Radix UI, Lucide icons, and the Web Audio API. It combines a Pomodoro timer with an integrated Lo-Fi cassette player, procedural ambient sound synthesizer, task manager, and scheduled interval reminders inside a 3-deck modular dashboard.

---

## Workstation Architecture

The console is organized into three primary operational decks:
- **Left Deck (Task Log)**: Inline task creation, completion toggles, active task counters, and status filters (All, Active, Done).
- **Center Deck (Pomodoro & Cassette)**: Digital countdown screen, round counter (1 to 4), mode tabs, timer controls, and a Lo-Fi cassette tape deck.
- **Right Deck (Auxiliary & Reminders)**: Interval reminder cards with toggle switches and an ambient audio mixer for procedural white noise and rain beds.

---

## Features

### Precision Pomodoro Timer
- Three distinct session modes: Focus (25m), Short Break (5m), and Long Break (15m).
- Four-session round tracker with automatic transition from short breaks to a long break after 4 completed focus blocks.
- Real-time browser tab title synchronization displaying active countdown and mode state.
- Optional automation toggles to auto-start breaks after focus periods and auto-start focus periods after breaks.
- Web Audio sound synthesizers for tactile button clicks and session completion chimes.
- System notifications on session milestones via the Web Notifications API.

### Integrated Audio Systems
- **Cassette Tape Deck**: HTML5 Audio cassette player with track navigation (previous, next, loop) and track progress bar. Includes pre-normalized lo-fi focus tracks at -16 LUFS loudness standard.
- **Ambient Sound Mixer**: Independent channels for procedural white noise and rain audio beds with real-time master audio gain calibration.

### Task Management Deck
- Inline task creation with immediate local storage persistence.
- Task status filtering across All, Active, and Done views.
- Active task counter badge and one-click bulk removal for completed items.

### Interval Reminders Deck
- Preset and custom interval reminders (such as Hydrate, Posture Check, and Eye Rest).
- Visual status indicators with toggle switches to enable or silence individual alerts.

### Dual Interface Themes and CRT Effects
- **Classic Theme**: Retro hardware console aesthetic with warm phosphor tones and bezel framing.
- **Minimal Theme**: Modern, high-contrast dark dashboard built on clean neutral tokens.
- **CRT Overlay**: Optional scanline and phosphor bloom visual effects filter.

### Persistent Local Storage
- All timer durations, active modes, completed session counts, tasks, reminders, and UI preferences persist automatically in browser `localStorage`.

---

## Timer Usage Instructions

### 1. Starting and Managing Focus Sessions
1. Select the desired timer mode (**Focus**, **Short Break**, or **Long Break**) using the top mode tabs or let the app cycle automatically.
2. Click **Start** (or press `Space`) to begin the countdown.
3. To pause the countdown, click **Pause** (or press `Space`).
4. To skip to the next scheduled interval, click **Skip** (or press `Alt + S`).
5. To reset the current countdown to its full duration, click **Reset** (or press `Alt + R`).

### 2. The 4-Round Pomodoro Cycle
By default, the workstation follows the standard Pomodoro rhythm:
1. Complete a **Focus** block (25 minutes).
2. Take a **Short Break** (5 minutes).
3. Repeat for 4 consecutive focus sessions.
4. After the 4th session completes, the console transitions into a **Long Break** (15 minutes).

The digital display shows current progress as `Round X of 4` along with an active percentage completion bar.

### 3. Configuring Durations and Automation
1. Click the **Settings** button in the header bar.
2. Adjust durations in minutes for **Focus**, **Short break**, and **Long break**.
3. Toggle automation preferences:
   - **Auto-start breaks after focus**: Immediately starts the break countdown when a focus block ends.
   - **Auto-start focus after breaks**: Immediately starts the next focus block when a break ends.
4. Enable **Desktop notifications** if you want system alerts when working in other tabs or applications.
5. Click **Save settings** to apply your changes.

---

## Keyboard Shortcuts

![Keyboard Shortcuts](https://res.cloudinary.com/j8k8qxlg/image/upload/v1787511629/ChatGPT_Image_Aug_24_2026_12_30_18_AM.png)

---

## Local Deployment & Development

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Installation

Clone the repository and install project dependencies:

```bash
git clone https://github.com/thatsyed/retro-pomodoro.git
cd retro-pomodoro
npm install
```

### Running the Development Server

Start the local Vite development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your web browser. The server supports instant Hot Module Replacement (HMR) upon file changes.

### Building for Production

To create an optimized, minified production build:

```bash
npm run build
```

Production assets are compiled into the `dist/` directory.

### Previewing the Production Build

Test the compiled production bundle locally on port 4173:

```bash
npm run preview
```

### Running Tests

Execute the Playwright end-to-end test suite:

```bash
npx playwright test
```

To run tests in interactive UI mode:

```bash
npx playwright test --ui
```

---

## Tech Stack

- **Framework**: React 19
- **Bundler & Dev Server**: Vite 6
- **Styling**: Tailwind CSS 4 with `@tailwindcss/vite`
- **Component Primitives**: Radix UI
- **Icons**: Lucide React
- **Audio Engine**: Web Audio API + HTML5 Audio
- **Testing**: Playwright

