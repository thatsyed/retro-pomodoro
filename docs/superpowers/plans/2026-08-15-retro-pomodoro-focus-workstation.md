# Retro Pomodoro Workstation (v2.0) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade 8-bit / cyberpunk Retro Pomodoro desktop focus console featuring a 3-deck cockpit layout (Left: Todo Tasks, Center: Pomodoro Timer & Animated Cassette Player, Right: Interval Reminders & Ambient Soundscape Mixer), Web Audio procedural soundscapes, dynamic tab title sync, desktop notifications, and 5 customizable retro CRT themes.

**Architecture:** Componentized React 19 + Vite 6 app styled with Tailwind CSS v4 & custom CSS variables for CRT scanlines and phosphor glow. Audio is split into HTML5 audio for music (`sounds/music/HoliznaCC0 - I Don't Understand A Thing.mp3`), procedural Web Audio for ambient generators (vinyl crackle, rain, white noise, cafe), and low-latency SFX triggers for buttons (`sounds/buttons/sfx_sounds_button6.wav`) and reminders (`sounds/reminders/sfx_alarm_loop6.wav`). Client-side state persists in LocalStorage with zero external backend dependencies.

**Tech Stack:** React 19, Vite 6, Tailwind CSS v4, Lucide React (strictly SVG icons, zero emojis), Web Audio API, HTML5 Desktop Notifications API.

## Global Constraints

- **Strict SVG Iconography:** ZERO emojis anywhere in UI or code; use `lucide-react` SVG icons styled with retro borders.
- **Audio Integrity:** Music player loads from `public/sounds/music/`; button clicks from `public/sounds/buttons/sfx_sounds_button6.wav`; alarms/reminders from `public/sounds/reminders/sfx_alarm_loop6.wav`.
- **Pure Local Persistence:** All tasks, reminder intervals, timer custom durations, theme choices, and volume settings must save to LocalStorage and hydrate on mount.
- **Dynamic Tab Title:** Real-time sync of timer state in `document.title` (e.g. `[24:59] Focus // Retro Pomodoro`).

---

### Task 1: Scaffolding, Package Setup & Design System Tokens

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/styles/index.css`
- Create: `src/styles/crt.css`
- Create: `src/main.jsx`
- Create: `src/App.jsx`

**Interfaces:**
- Produces: Base Vite dev and build pipeline with Tailwind CSS v4, Google Fonts (`VT323`, `Press Start 2P`, `JetBrains Mono`, `Courier Prime`), CRT CSS classes (`.crt-screen`, `.scanlines`, `.phosphor-glow`, `.retro-bevel`), and root app mount.

- [ ] **Step 1: Create package.json with dependencies**
```json
{
  "name": "retro-pomodoro",
  "private": true,
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^1.16.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "playwright": "^1.50.0",
    "tailwindcss": "^4.0.0",
    "vite": "^6.1.0"
  }
}
```

- [ ] **Step 2: Create vite.config.js**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: false,
  },
});
```

- [ ] **Step 3: Create index.html with fonts and retro viewport**
```html
<!DOCTYPE html>
<html lang="en" data-theme="cyberpunk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#0a0a12">
  <meta name="description" content="Retro Pomodoro Workstation - 8-Bit Cyberpunk Focus Console with Lo-Fi Cassette Player, Ambient Soundscapes, Todo Tasks, and Reminders">
  <title>Retro Pomodoro // Workstation v2.0</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=JetBrains+Mono:wght@400;500;700&family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet">
  <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg">
</head>
<body class="bg-[var(--bg-app)] text-[var(--text-primary)] min-h-screen font-mono overflow-x-hidden selection:bg-[var(--primary)] selection:text-[var(--bg-app)]">
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

- [ ] **Step 4: Create src/styles/index.css and src/styles/crt.css**
```css
/* src/styles/index.css */
@import "tailwindcss";

:root[data-theme="cyberpunk"], :root {
  --bg-app: #08080f;
  --bg-surface: #100f1e;
  --bg-deck: #151329;
  --border-color: #2b2353;
  --border-highlight: #4d3a94;
  --text-primary: #00ffcc;
  --text-secondary: #00b392;
  --text-dim: #5a748c;
  --accent: #ff007f;
  --accent-secondary: #ffe600;
  --danger: #ff3366;
  --glow-primary: 0 0 10px rgba(0, 255, 204, 0.4), 0 0 20px rgba(0, 255, 204, 0.15);
  --glow-accent: 0 0 10px rgba(255, 0, 127, 0.4), 0 0 20px rgba(255, 0, 127, 0.15);
}

:root[data-theme="amber"] {
  --bg-app: #0d0903;
  --bg-surface: #171107;
  --bg-deck: #21190c;
  --border-color: #3b2c14;
  --border-highlight: #6e5225;
  --text-primary: #ffb000;
  --text-secondary: #d99100;
  --text-dim: #7a633c;
  --accent: #ff6600;
  --accent-secondary: #ffd000;
  --danger: #ff3b30;
  --glow-primary: 0 0 10px rgba(255, 176, 0, 0.45), 0 0 20px rgba(255, 176, 0, 0.2);
  --glow-accent: 0 0 10px rgba(255, 102, 0, 0.45), 0 0 20px rgba(255, 102, 0, 0.2);
}

:root[data-theme="matrix"] {
  --bg-app: #020b05;
  --bg-surface: #06170b;
  --bg-deck: #0a2110;
  --border-color: #13401f;
  --border-highlight: #227037;
  --text-primary: #33ff66;
  --text-secondary: #24b848;
  --text-dim: #437a52;
  --accent: #00ffaa;
  --accent-secondary: #bbff33;
  --danger: #ff3344;
  --glow-primary: 0 0 10px rgba(51, 255, 102, 0.45), 0 0 20px rgba(51, 255, 102, 0.2);
  --glow-accent: 0 0 10px rgba(0, 255, 170, 0.45), 0 0 20px rgba(0, 255, 170, 0.2);
}

:root[data-theme="synthwave"] {
  --bg-app: #0e0717;
  --bg-surface: #180d29;
  --bg-deck: #22133a;
  --border-color: #3f1e68;
  --border-highlight: #6e37b3;
  --text-primary: #e0aaff;
  --text-secondary: #c77dff;
  --text-dim: #7b6299;
  --accent: #ff71ce;
  --accent-secondary: #01cdfe;
  --danger: #ff3864;
  --glow-primary: 0 0 10px rgba(224, 170, 255, 0.4), 0 0 20px rgba(224, 170, 255, 0.15);
  --glow-accent: 0 0 10px rgba(255, 113, 206, 0.45), 0 0 20px rgba(255, 113, 206, 0.2);
}

:root[data-theme="classic"] {
  --bg-app: #14110f;
  --bg-surface: #1e1916;
  --bg-deck: #28221e;
  --border-color: #3d342d;
  --border-highlight: #63554b;
  --text-primary: #e6c280;
  --text-secondary: #c29d5b;
  --text-dim: #7d6e64;
  --accent: #d97736;
  --accent-secondary: #e0bb43;
  --danger: #d94b4b;
  --glow-primary: 0 0 8px rgba(230, 194, 128, 0.35);
  --glow-accent: 0 0 8px rgba(217, 119, 54, 0.35);
}

.font-vt323 { font-family: 'VT323', monospace; }
.font-pixel { font-family: 'Press Start 2P', monospace; }
.font-mono { font-family: 'JetBrains Mono', 'Courier Prime', monospace; }

.retro-bezel {
  border: 2px solid var(--border-color);
  box-shadow: inset 1px 1px 0px rgba(255, 255, 255, 0.1), inset -1px -1px 0px rgba(0, 0, 0, 0.6), 0 4px 12px rgba(0,0,0,0.5);
}

.retro-panel-inset {
  border: 1px solid var(--border-color);
  background: var(--bg-surface);
  box-shadow: inset 2px 2px 4px rgba(0,0,0,0.6), inset -1px -1px 0px rgba(255,255,255,0.05);
}

.glow-text {
  text-shadow: var(--glow-primary);
}

.glow-accent-text {
  text-shadow: var(--glow-accent);
}
```

```css
/* src/styles/crt.css */
.crt-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
}

.crt-scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.18) 0px,
    rgba(0, 0, 0, 0.18) 1px,
    transparent 1px,
    transparent 2px
  );
  opacity: 0.85;
}

.crt-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 65%, rgba(0, 0, 0, 0.65) 100%);
}
```

- [ ] **Step 5: Install dependencies and test build**
Run: `npm install && npm run build`
Expected: Successful build with exit code 0.

- [ ] **Step 6: Commit Task 1**
```bash
git add package.json vite.config.js index.html src/styles/ src/main.jsx src/App.jsx
git commit -m "feat(setup): initialize React 19 + Vite 6 scaffolding with retro CRT tokens and theme palettes"
```

---

### Task 2: Sound Engine & Asset Pipeline

**Files:**
- Create: `src/services/soundSynth.js`
- Create: `src/services/audioPlayer.js`
- Copy assets to `public/sounds/`
- Test: `src/services/__tests__/soundEngine.test.js` or browser audio test harness

**Interfaces:**
- Produces:
  - `playButtonClickSound()`: Plays `sounds/buttons/sfx_sounds_button6.wav` (with fallback click synth).
  - `playReminderAlertSound()`: Plays `sounds/reminders/sfx_alarm_loop6.wav` (with fallback FM chime synth).
  - `playPomodoroFinishSound()`: Plays 3-tone arpeggio completion chime.
  - `ambientSynthesizer`: Controls procedural channels: `start()`, `stop()`, `setLayerVolume(layerName, volume)` for `vinyl`, `rain`, `noise`, `cafe`.
  - `musicPlayerService`: HTML5 Audio track controller `play()`, `pause()`, `loadTrack(url)`, `setVolume(vol)`, `seek(time)`.

- [ ] **Step 1: Copy audio assets to public/sounds directory**
Ensure `public/sounds/music/HoliznaCC0 - I Don't Understand A Thing.mp3`, `public/sounds/buttons/sfx_sounds_button6.wav`, and `public/sounds/reminders/sfx_alarm_loop6.wav` exist in `public/`.

- [ ] **Step 2: Implement src/services/soundSynth.js**
```javascript
// Web Audio Synthesizer for procedural ambient layers and tactile sound effects
class SoundSynthService {
  constructor() {
    this.ctx = null;
    this.ambientNodes = {
      vinyl: null,
      rain: null,
      noise: null,
      cafe: null,
    };
    this.gainNodes = {
      vinyl: null,
      rain: null,
      noise: null,
      cafe: null,
      master: null,
    };
    this.initialized = false;
    this.buttonAudio = null;
    this.alarmAudio = null;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      this.gainNodes.master = this.ctx.createGain();
      this.gainNodes.master.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.gainNodes.master.connect(this.ctx.destination);

      ['vinyl', 'rain', 'noise', 'cafe'].forEach(key => {
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.connect(this.gainNodes.master);
        this.gainNodes[key] = gain;
      });

      // Preload audio elements
      this.buttonAudio = new Audio('/sounds/buttons/sfx_sounds_button6.wav');
      this.buttonAudio.volume = 0.5;
      
      this.alarmAudio = new Audio('/sounds/reminders/sfx_alarm_loop6.wav');
      this.alarmAudio.volume = 0.7;

      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playButtonClick() {
    this.init();
    this.resume();
    if (this.buttonAudio) {
      this.buttonAudio.currentTime = 0;
      this.buttonAudio.play().catch(() => this.fallbackClickSynth());
    } else {
      this.fallbackClickSynth();
    }
  }

  playReminderAlarm() {
    this.init();
    this.resume();
    if (this.alarmAudio) {
      this.alarmAudio.currentTime = 0;
      this.alarmAudio.play().catch(() => this.fallbackChimeSynth());
    } else {
      this.fallbackChimeSynth();
    }
  }

  fallbackClickSynth() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(this.gainNodes.master || this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  fallbackChimeSynth() {
    if (!this.ctx) return;
    const notes = [587.33, 880, 1174.66]; // D5, A5, D6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.12);
      gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + idx * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.12 + 0.5);
      osc.connect(gain);
      gain.connect(this.gainNodes.master || this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.12);
      osc.stop(this.ctx.currentTime + idx * 0.12 + 0.5);
    });
  }

  setAmbientVolume(layer, volume) {
    this.init();
    this.resume();
    if (this.gainNodes[layer]) {
      const targetGain = Math.max(0, Math.min(1, volume));
      this.gainNodes[layer].gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.08);
      
      if (targetGain > 0 && !this.ambientNodes[layer]) {
        this.startAmbientGenerator(layer);
      }
    }
  }

  startAmbientGenerator(layer) {
    if (!this.ctx || this.ambientNodes[layer]) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    if (layer === 'noise') {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.15;
      }
    } else if (layer === 'rain') {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }
    } else if (layer === 'vinyl') {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() < 0.0008 ? (Math.random() * 2 - 1) * 0.8 : (Math.random() * 2 - 1) * 0.015;
      }
    } else if (layer === 'cafe') {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.sin(i * 0.02) * 0.02 + (Math.random() * 2 - 1) * 0.03;
      }
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    if (layer === 'rain') {
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;
      source.connect(filter);
      filter.connect(this.gainNodes[layer]);
    } else {
      source.connect(this.gainNodes[layer]);
    }

    source.start();
    this.ambientNodes[layer] = source;
  }
}

export const soundSynth = new SoundSynthService();
```

- [ ] **Step 3: Implement src/services/audioPlayer.js**
```javascript
// HTML5 Audio Controller for Lo-Fi Cassette Music Deck
class AudioPlayerService {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.audio.loop = true;
    this.listeners = new Set();
    this.trackList = [
      {
        id: 'holizna-lofi',
        title: "I Don't Understand A Thing",
        artist: 'HoliznaCC0',
        url: '/sounds/music/HoliznaCC0 - I Don\'t Understand A Thing.mp3',
        duration: 213,
      }
    ];
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    
    this.audio.addEventListener('play', () => this.emitState(true));
    this.audio.addEventListener('pause', () => this.emitState(false));
    this.audio.addEventListener('ended', () => this.handleTrackEnd());
    this.audio.addEventListener('timeupdate', () => this.emitTime());
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emitState(isPlaying) {
    this.isPlaying = isPlaying;
    this.listeners.forEach(fn => fn({ type: 'state', isPlaying, track: this.getCurrentTrack() }));
  }

  emitTime() {
    this.listeners.forEach(fn => fn({
      type: 'time',
      currentTime: this.audio.currentTime,
      duration: this.audio.duration || this.getCurrentTrack()?.duration || 0
    }));
  }

  getCurrentTrack() {
    return this.trackList[this.currentTrackIndex] || null;
  }

  play() {
    if (!this.audio.src || !this.audio.src.includes(encodeURI(this.getCurrentTrack().url))) {
      this.audio.src = this.getCurrentTrack().url;
    }
    return this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  setVolume(volume) {
    this.audio.volume = Math.max(0, Math.min(1, volume));
  }

  setLoop(isLoop) {
    this.audio.loop = isLoop;
  }

  handleTrackEnd() {
    if (!this.audio.loop) {
      this.nextTrack();
    }
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.trackList.length;
    this.audio.src = this.getCurrentTrack().url;
    if (this.isPlaying) this.play();
  }

  prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.trackList.length) % this.trackList.length;
    this.audio.src = this.getCurrentTrack().url;
    if (this.isPlaying) this.play();
  }
}

export const audioPlayer = new AudioPlayerService();
```

- [ ] **Step 4: Commit Task 2**
```bash
git add src/services/soundSynth.js src/services/audioPlayer.js public/sounds/
git commit -m "feat(audio): implement Web Audio sound synthesizer, ambient soundscape generators, and lo-fi audio player"
```

---

### Task 3: Notifications & Tab Title Sync Services

**Files:**
- Create: `src/services/notificationService.js`
- Create: `src/hooks/useTabTitleSync.js`

**Interfaces:**
- Produces:
  - `notificationService.requestPermission()`: Prompts browser notification permission.
  - `notificationService.sendNotification(title, body)`: Sends desktop notification if granted.
  - `useTabTitleSync(timeLeft, mode, isRunning)`: Synchronizes tab title format `[24:59] Focus // Retro Pomodoro`.

- [ ] **Step 1: Implement src/services/notificationService.js**
```javascript
class NotificationService {
  constructor() {
    this.hasPermission = typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted';
  }

  async requestPermission() {
    if (typeof window === 'undefined' || !('Notification' in window)) return false;
    try {
      const permission = await Notification.requestPermission();
      this.hasPermission = permission === 'granted';
      return this.hasPermission;
    } catch (e) {
      console.warn('Notification permission request error:', e);
      return false;
    }
  }

  send(title, body) {
    if (!this.hasPermission && typeof window !== 'undefined' && 'Notification' in window) {
      this.hasPermission = Notification.permission === 'granted';
    }
    if (this.hasPermission) {
      try {
        new Notification(title, {
          body,
          icon: '/icons/favicon.svg',
          silent: false,
        });
      } catch (e) {
        console.warn('Failed to send notification:', e);
      }
    }
  }
}

export const notificationService = new NotificationService();
```

- [ ] **Step 2: Implement src/hooks/useTabTitleSync.js**
```javascript
import { useEffect } from 'react';

export function useTabTitleSync(timeLeft, mode, isRunning) {
  useEffect(() => {
    const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const secs = (timeLeft % 60).toString().padStart(2, '0');
    const modeLabel = mode === 'work' ? 'Focus' : mode === 'shortBreak' ? 'Short Break' : 'Long Break';
    
    if (timeLeft === 0) {
      document.title = `(🔔 COMPLETE!) Time's Up // Retro Pomodoro`;
    } else {
      const statusPrefix = isRunning ? `[${mins}:${secs}]` : `[PAUSED ${mins}:${secs}]`;
      document.title = `${statusPrefix} ${modeLabel} // Retro Pomodoro`;
    }
  }, [timeLeft, mode, isRunning]);
}
```

- [ ] **Step 3: Commit Task 3**
```bash
git add src/services/notificationService.js src/hooks/useTabTitleSync.js
git commit -m "feat(notifications): add desktop notification service and dynamic browser tab title sync"
```

---

### Task 4: State Management & LocalStorage Persistence

**Files:**
- Create: `src/hooks/useLocalStorage.js`
- Create: `src/hooks/useTimer.js`
- Create: `src/hooks/useTasks.js`
- Create: `src/hooks/useReminders.js`

**Interfaces:**
- Produces:
  - `useLocalStorage(key, initialValue)`: Reactive hook with local storage syncing.
  - `useTimer()`: State for `mode`, `timeLeft`, `isRunning`, `sessionsCompleted`, `start()`, `pause()`, `skip()`, `reset()`, `setDurations()`.
  - `useTasks()`: State for `tasks`, `filter`, `addTask(title, priority)`, `toggleTask(id)`, `deleteTask(id)`, `clearCompleted()`.
  - `useReminders()`: State for `reminders`, `addReminder(title, intervalMinutes)`, `toggleReminder(id)`, `deleteReminder(id)`.

- [ ] **Step 1: Implement src/hooks/useLocalStorage.js**
- [ ] **Step 2: Implement src/hooks/useTimer.js with tick sound/chime trigger**
- [ ] **Step 3: Implement src/hooks/useTasks.js with validation**
- [ ] **Step 4: Implement src/hooks/useReminders.js with interval timers**
- [ ] **Step 5: Commit Task 4**
```bash
git add src/hooks/
git commit -m "feat(state): add reactive timer, task todo, reminder, and local persistence hooks"
```

---

### Task 5: Left Deck — Task & Todo Manager Component

**Files:**
- Create: `src/components/tasks/TaskDeck.jsx`
- Create: `src/components/tasks/TaskInput.jsx`
- Create: `src/components/tasks/TaskItem.jsx`
- Create: `src/components/tasks/TaskFilters.jsx`

**Interfaces:**
- Strict SVG iconography (Lucide `Check`, `Plus`, `Trash2`, `ListTodo`, `Flame`, `CircleAlert`).
- Renders task input with priority pill, list with hover animations, empty state, and clear completed action.

- [ ] **Step 1: Implement TaskInput.jsx with priority selector (Low/Med/High) and Enter hotkey**
- [ ] **Step 2: Implement TaskItem.jsx with retro checkbox, priority badge, and delete button**
- [ ] **Step 3: Implement TaskFilters.jsx (All / Active / Completed)**
- [ ] **Step 4: Implement TaskDeck.jsx assembling the left workstation deck**
- [ ] **Step 5: Commit Task 5**
```bash
git add src/components/tasks/
git commit -m "feat(tasks): create left deck todo manager with priority filters and clean retro styling"
```

---

### Task 6: Center Hero Deck — Pomodoro & Cassette Player

**Files:**
- Create: `src/components/timer/HeroTimerDeck.jsx`
- Create: `src/components/timer/DigitalDisplay.jsx`
- Create: `src/components/timer/TimerControls.jsx`
- Create: `src/components/timer/ModeTabs.jsx`
- Create: `src/components/cassette/CassettePlayer.jsx`
- Create: `src/components/cassette/CassetteReels.jsx`
- Create: `src/styles/cassette.css`

**Interfaces:**
- Digital CRT timer display with `VT323` font, progress bar, tactile Play/Pause, Skip, Reset buttons.
- Animated Cassette deck with dual rotating spools, magnetic tape strip, track metadata, play/pause/prev/next/volume controls.

- [ ] **Step 1: Create src/styles/cassette.css for reel rotation animations and cassette shell**
- [ ] **Step 2: Implement CassetteReels.jsx (SVG dual rotating 8-spoke reels with tape spool physics)**
- [ ] **Step 3: Implement CassettePlayer.jsx with track info and audio controls**
- [ ] **Step 4: Implement DigitalDisplay.jsx and TimerControls.jsx**
- [ ] **Step 5: Implement HeroTimerDeck.jsx assembling the center workstation deck**
- [ ] **Step 6: Commit Task 6**
```bash
git add src/components/timer/ src/components/cassette/ src/styles/cassette.css
git commit -m "feat(timer-cassette): build hero Pomodoro display and animated lo-fi cassette tape deck"
```

---

### Task 7: Right Deck — Reminders & Ambient Soundscape Mixer

**Files:**
- Create: `src/components/reminders/RemindersDeck.jsx`
- Create: `src/components/reminders/ReminderItem.jsx`
- Create: `src/components/reminders/AddReminderModal.jsx`
- Create: `src/components/ambient/AmbientMixer.jsx`
- Create: `src/components/ambient/AmbientChannel.jsx`

**Interfaces:**
- Reminders Deck: Lists active reminders (Hydration, Stretch, Posture, Eye Rest, Custom), countdown badges, active toggles, and modal to add new reminders.
- Ambient Mixer: 4-channel retro faders (Vinyl, Rain, White Noise, Cafe) with mute all button and real-time gain adjustment.

- [ ] **Step 1: Implement ReminderItem.jsx and AddReminderModal.jsx**
- [ ] **Step 2: Implement RemindersDeck.jsx**
- [ ] **Step 3: Implement AmbientChannel.jsx with custom range slider and volume meter**
- [ ] **Step 4: Implement AmbientMixer.jsx with master mute and 4 ambient channels**
- [ ] **Step 5: Commit Task 7**
```bash
git add src/components/reminders/ src/components/ambient/
git commit -m "feat(reminders-ambient): build right deck interval reminders panel and ambient soundscape mixer"
```

---

### Task 8: Top Navigation, Theme Customizer & Settings Modal

**Files:**
- Create: `src/components/header/HeaderBar.jsx`
- Create: `src/components/header/ThemeSelector.jsx`
- Create: `src/components/header/CrtToggle.jsx`
- Create: `src/components/settings/SettingsModal.jsx`
- Create: `src/components/settings/KeyboardShortcutsModal.jsx`
- Create: `src/components/crt/CrtOverlay.jsx`

**Interfaces:**
- HeaderBar with version badge, theme selector (Cyberpunk, Amber, Matrix, Synthwave, Classic), CRT toggles, notification permission button, and settings modal.
- SettingsModal allowing customizable timer durations (Work, Short Break, Long Break, Long Break Interval) and sound volumes.
- KeyboardShortcutsModal showing cheat-sheet.

- [ ] **Step 1: Implement ThemeSelector.jsx and CrtToggle.jsx**
- [ ] **Step 2: Implement HeaderBar.jsx**
- [ ] **Step 3: Implement SettingsModal.jsx and KeyboardShortcutsModal.jsx**
- [ ] **Step 4: Implement CrtOverlay.jsx**
- [ ] **Step 5: Commit Task 8**
```bash
git add src/components/header/ src/components/settings/ src/components/crt/
git commit -m "feat(header-settings): add top console header, theme switcher, CRT shader overlay, and settings modal"
```

---

### Task 9: App Integration, Keyboard Hotkeys & Final Wiring

**Files:**
- Modify: `src/App.jsx`
- Create: `src/hooks/useKeyboardHotkeys.js`

**Interfaces:**
- Assembles the 3-column cockpit layout, binds global keyboard shortcuts (`Space` for timer, `Alt+S` skip, `Alt+R` reset, `Alt+M` mute, `Alt+T` new task, `Alt+C` CRT toggle, `Alt+K` hotkeys modal, `Esc` close modal).

- [ ] **Step 1: Implement src/hooks/useKeyboardHotkeys.js**
- [ ] **Step 2: Wire all components and state in src/App.jsx**
- [ ] **Step 3: Test keyboard shortcuts across all decks**
- [ ] **Step 4: Commit Task 9**
```bash
git add src/App.jsx src/hooks/useKeyboardHotkeys.js
git commit -m "feat(app): integrate 3-deck cockpit console with global keyboard shortcuts and sound wiring"
```

---

### Task 10: Verification, Build Testing & Browser QA

**Files:**
- Create: `playwright.config.js`
- Create: `tests/workstation.spec.js`

**Interfaces:**
- Runs automated build validation (`npm run build`) and Playwright browser QA to verify:
  1. Timer start/pause/skip and countdown correctness.
  2. Cassette reel animation spinning during playback.
  3. Task addition, completion, filtering, and deletion.
  4. Reminder countdown and toggle switch state.
  5. Ambient volume sliders without audio errors.
  6. Theme switching and CRT overlay toggles.
  7. LocalStorage persistence across page reloads.

- [ ] **Step 1: Run production build check**
Run: `npm run build`
Expected: Zero compilation errors.

- [ ] **Step 2: Write and run Playwright browser tests**
- [ ] **Step 3: Capture browser screenshot / walkthrough**
- [ ] **Step 4: Commit Task 10**
```bash
git add tests/ playwright.config.js
git commit -m "test: add comprehensive end-to-end browser QA and validation tests"
```
