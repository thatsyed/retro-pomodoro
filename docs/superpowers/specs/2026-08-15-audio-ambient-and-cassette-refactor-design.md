# Audio Engine, Ambient Sounds & Cassette Controls Redesign

## Overview
This design streamlines the audio system of the Retro Pomodoro Workstation:
1. **Lo-Fi Cassette Player**: Updates the music library to use the newly provided cafe focus tracks with Track 1 looped by default, and converts the Play/Pause button to an icon-only tactile button.
2. **Ambient Sounds Deck**: Reduces the ambient sound layers to 2 essential channels (**White Noise** and **Rain**), plays the dedicated Rain audio file (`/sounds/music/rain/Rain.wav`), and updates channel controls to clean, direct Play/Pause toggle buttons without volume sliders.

---

## 1. Lo-Fi Cassette Player Updates

### Tracklist Configuration (`src/services/audioPlayer.js`)
- **Track 1 (Default)**:
  - Title: `Georgetown Cafe`
  - Artist: `Popoi`
  - URL: `/sounds/music/Popoi - Georgetown Cafe.mp3`
- **Track 2**:
  - Title: `Cafe`
  - Artist: `VibeDepot`
  - URL: `/sounds/music/VibeDepot - cafe.mp3`
- **Playback Behavior**: `isLooping` set to `true` by default, so Track 1 repeats automatically when played.

### UI Button Simplification (`src/components/cassette/CassettePlayer.jsx`)
- Remove the text labels (`<span>Play</span>`, `<span>Pause</span>`) from the main transport button.
- Render only `<Play className="w-3.5 h-3.5 fill-current" />` and `<Pause className="w-3.5 h-3.5 fill-current" />`.
- Maintain consistent button padding and hover glow matching the adjacent transport buttons.

---

## 2. Ambient Sounds Deck Simplification

### Channels (`src/components/ambient/AmbientMixer.jsx`)
- Remove `vinyl` and `cafe` channels.
- Keep two channels:
  1. `noise`: Label **White Noise**, Icon `Waves`
  2. `rain`: Label **Rain**, Icon `CloudRain`

### Audio Generation & File Playback (`src/services/soundSynth.js`)
- **White Noise**: Generated via Web Audio API `AudioBufferSourceNode` with looped randomized buffer.
- **Rain**: Loaded and looped using an `Audio` instance pointing to `/sounds/music/rain/Rain.wav`.
- Master mute stops or restores currently active playing ambient layers.

### UI Channel Row Design (`src/components/ambient/AmbientChannel.jsx` - Option B)
- **Layout**:
  - Left: Channel Icon (`Waves` / `CloudRain`) + Label text (`White noise` / `Rain`).
  - Right: Tactile Play / Pause button (`<Play />` / `<Pause />` icons) that directly toggles playback of that ambient sound.
- Remove the volume slider and previous mute/unmute speaker icons.

---

## 3. Testing & Verification Plan

### Automated Verification
- Update existing Playwright specs in `tests/workstation.spec.js` to assert:
  - Track 1 title `Georgetown Cafe` is rendered on the cassette deck.
  - Cassette Play button contains only the play icon.
  - Ambient sounds deck lists `White noise` and `Rain` channels with Play/Pause buttons.
  - Toggling ambient channels activates and pauses playback.
- Run `npm run build && npx playwright test` to ensure 100% test pass rate.
