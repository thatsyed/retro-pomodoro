# Audio Engine, Ambient Sounds & Cassette Controls Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Streamline ambient sounds to White Noise and Rain with direct Play/Pause controls, update the cassette music tracklist to the new focus tracks with looping, and simplify the cassette Play/Pause button to an icon-only control.

**Architecture:** Update `audioPlayer.js` and `soundSynth.js` audio services for accurate track paths and procedural/audio-file playback. Refactor `AmbientMixer.jsx` and `AmbientChannel.jsx` to render direct Play/Pause buttons without volume sliders. Update `CassettePlayer.jsx` to remove text labels from the main action button.

**Tech Stack:** React 19, Lucide React, Web Audio API, HTML5 Audio, Tailwind CSS v4, Playwright E2E.

---

### Task 1: Audio Player Tracklist & Cassette Controls

**Files:**
- Modify: `src/services/audioPlayer.js`
- Modify: `src/components/cassette/CassettePlayer.jsx`
- Modify: `tests/workstation.spec.js`

**Interfaces:**
- Consumes: `/sounds/music/Popoi - Georgetown Cafe.mp3`, `/sounds/music/VibeDepot - cafe.mp3`
- Produces: `audioPlayer.trackList` with 2 tracks, looping track 1 by default, `CassettePlayer` button with icon-only presentation.

- [ ] **Step 1: Update workstation test for new track & cassette button**

```javascript
// In tests/workstation.spec.js
test('controls Lo-Fi cassette tape deck', async ({ page }) => {
  const tapeSection = page.locator('.cassette-shell');
  await expect(tapeSection).toBeVisible();
  await expect(page.locator('text=Georgetown Cafe')).toBeVisible();

  // Click tape play button (icon-only button)
  const tapePlayBtn = tapeSection.locator('button[title="Play tape"]');
  await tapePlayBtn.click();
  await expect(tapeSection.locator('text=Playing')).toBeVisible();
});
```

- [ ] **Step 2: Run test to verify it fails on old track title**

Run: `npx playwright test tests/workstation.spec.js`
Expected: FAIL on `Georgetown Cafe` not found.

- [ ] **Step 3: Update `src/services/audioPlayer.js` and `src/components/cassette/CassettePlayer.jsx`**

Update `trackList` in `src/services/audioPlayer.js`:
```javascript
this.trackList = [
  {
    id: 'popoi-georgetown-cafe',
    title: 'Georgetown Cafe',
    artist: 'Popoi',
    url: '/sounds/music/Popoi - Georgetown Cafe.mp3',
    duration: 168,
  },
  {
    id: 'vibedepot-cafe',
    title: 'Cafe',
    artist: 'VibeDepot',
    url: '/sounds/music/VibeDepot - cafe.mp3',
    duration: 120,
  }
];
```

In `src/components/cassette/CassettePlayer.jsx`:
Remove text labels inside play/pause button:
```jsx
<button
  type="button"
  onClick={handleTogglePlay}
  className={`p-2 sm:px-3 sm:py-1.5 text-xs font-pixel flex items-center justify-center border transition-all cursor-pointer ${
    isPlaying
      ? 'bg-[var(--accent)] text-[var(--bg-app)] border-[var(--accent)] shadow-[var(--glow-accent)] font-bold'
      : 'bg-[var(--text-primary)] text-[var(--bg-app)] border-[var(--text-primary)] shadow-[var(--glow-primary)] font-bold'
  }`}
  title={isPlaying ? 'Pause tape' : 'Play tape'}
>
  {isPlaying ? (
    <Pause className="w-3.5 h-3.5 fill-current" />
  ) : (
    <Play className="w-3.5 h-3.5 fill-current" />
  )}
</button>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build && npx playwright test tests/workstation.spec.js`
Expected: PASS.

- [ ] **Step 5: Commit changes**

```bash
git add src/services/audioPlayer.js src/components/cassette/CassettePlayer.jsx tests/workstation.spec.js
git commit -m "feat: update cassette tracklist and simplify play button to icon-only"
```

---

### Task 2: Ambient Sound Engine & UI Streamlining (White Noise & Rain)

**Files:**
- Modify: `src/services/soundSynth.js`
- Modify: `src/components/ambient/AmbientMixer.jsx`
- Modify: `src/components/ambient/AmbientChannel.jsx`
- Create: `tests/ambient-audio.spec.js`

**Interfaces:**
- Consumes: `/sounds/music/rain/Rain.wav`
- Produces: `soundSynth.toggleAmbientLayer(layer, isPlaying)`, `AmbientMixer` with 2 channels (White noise, Rain) and direct Play/Pause buttons.

- [ ] **Step 1: Create failing test for ambient sound channels and direct play/pause buttons**

```javascript
// In tests/ambient-audio.spec.js
import { test, expect } from '@playwright/test';

test.describe('Ambient Sounds Deck', () => {
  test('renders only White noise and Rain with direct Play/Pause buttons', async ({ page }) => {
    await page.goto('/');

    const ambientSection = page.locator('text=Ambient Sounds').locator('..').locator('..');
    await expect(ambientSection).toBeVisible();

    // Check channels
    await expect(ambientSection.locator('text=White noise')).toBeVisible();
    await expect(ambientSection.locator('text=Rain')).toBeVisible();
    await expect(ambientSection.locator('text=Vinyl crackle')).not.toBeVisible();
    await expect(ambientSection.locator('text=Cafe background')).not.toBeVisible();

    // Check Play buttons on ambient channels
    const rainPlayBtn = ambientSection.locator('button[title="Play Rain"]');
    await expect(rainPlayBtn).toBeVisible();
    await rainPlayBtn.click();

    // Should now show Pause button
    const rainPauseBtn = ambientSection.locator('button[title="Pause Rain"]');
    await expect(rainPauseBtn).toBeVisible();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/ambient-audio.spec.js`
Expected: FAIL.

- [ ] **Step 3: Implement soundSynth updates, AmbientMixer, and AmbientChannel**

In `src/services/soundSynth.js`:
- Add `rainAudio = new Audio('/sounds/music/rain/Rain.wav')` with `loop = true`.
- Implement `setAmbientPlaying(layer, isPlaying)` and `setAmbientVolume(layer, volume)`.
- Support procedural `noise` (white noise) via Web Audio buffer source.

In `src/components/ambient/AmbientMixer.jsx`:
- Define `channels = [{ id: 'noise', label: 'White noise', icon: Waves }, { id: 'rain', label: 'Rain', icon: CloudRain }]`.
- Track `playingChannels: { noise: false, rain: false }`.
- Provide `handleTogglePlay(id)` that calls `soundSynth.setAmbientPlaying(id, nextPlaying)`.

In `src/components/ambient/AmbientChannel.jsx`:
- Render Icon + Label on left.
- Render tactile button on right with `Play` / `Pause` icons (`title={isPlaying ? `Pause ${label}` : `Play ${label}`}`).

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build && npx playwright test tests/ambient-audio.spec.js`
Expected: PASS.

- [ ] **Step 5: Commit changes**

```bash
git add src/services/soundSynth.js src/components/ambient/AmbientMixer.jsx src/components/ambient/AmbientChannel.jsx tests/ambient-audio.spec.js
git commit -m "feat: simplify ambient sounds to white noise and rain with direct play/pause buttons"
```

---

### Task 3: Full Verification & E2E Validation

**Files:**
- Test: All tests in `tests/`

- [ ] **Step 1: Run full test suite**

Run: `npm run build && npx playwright test`
Expected: 100% tests pass across all test specs.

- [ ] **Step 2: Commit any remaining cleanups**

```bash
git status
```
