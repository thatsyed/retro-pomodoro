# AGENTS.md

## Project overview

Retro Pomodoro is a client-side Vite + React 19 focus timer. Stack: Vite 6 + React 19 + Tailwind CSS 4 (`@tailwindcss/vite`) + Radix UI + `lucide-react` + Web Audio API. Styling uses Tailwind utility classes alongside `src/styles/index.css` (theme tokens), `crt.css`, and `cassette.css`. Browser state is persisted via `src/hooks/useLocalStorage.js`; audio and notifications live in `src/services/`. Audio is loudness-normalized to -16 LUFS (see `src/services/audioPlayer.js:1` and `src/services/soundSynth.js:1`).

## Structure

- `src/App.jsx` composes the three primary decks, theme/CRT state, and global keyboard handling; `src/main.jsx` mounts the app and imports global styles.
- `src/components/` — feature-oriented presentation components:
  - `header/`, `timer/`, `tasks/`, `reminders/`, `cassette/`, `ambient/`, `crt/`, `settings/`
  - `ui/` — shadcn/new-york wrappers (`button.jsx`, `card.jsx`, `dialog.jsx`, `input.jsx`, `switch.jsx`) built on Radix + `class-variance-authority` + `src/lib/utils.js` (`cn()`)
- `src/hooks/` — reusable browser state: `useLocalStorage`, `useTimer`, `useTasks`, `useReminders`, `useTabTitleSync`, `useKeyboardHotkeys`
- `src/services/` — browser integrations: `audioPlayer.js` (HTML5 Audio cassette deck, per-track `gain` + `baseVolume`), `soundSynth.js` (Web Audio procedural white noise + `Audio` rain/alarms, `masterGain`), `notificationService.js` (Web Notifications)
- `src/lib/utils.js` — `cn()` helper (`clsx` + `tailwind-merge`)
- `src/styles/` — `index.css` (Tailwind + 6 theme token blocks via `data-theme`), `crt.css`, `cassette.css`
- `public/` — canonical static assets (copied verbatim by Vite). `public/sounds/music/` (MP3/WAV normalized to -16 LUFS) and `public/icons/` are canonical. `public/sounds/buttons/` and `public/sounds/reminders/` hold short SFX.
- `sounds/` and `icons/` at repo root are legacy duplicates of `public/` — do not add files there.
- `tests/` — Playwright e2e (`workstation.spec.js`, `timer-pause.spec.js`, `ambient-audio.spec.js`)
- `docs/superpowers/` — design specs and implementation plans; review before substantial feature/architecture work.
- Config: `vite.config.js` (`@` → `src/`, dev port 3000), `components.json` (shadcn), `playwright.config.js` (serves `dist/` on 4173)

## Development commands

```bash
npm run dev        # Vite dev server on http://localhost:3000 (falls back to 3001 if busy)
npm run build      # production build to dist/
npm run preview    # preview dist/ on 4173
npx playwright test
```

Run `npm run build` after source changes. Run the relevant Playwright tests when changing user-visible behavior; the Playwright configuration serves the built app on port 4173.

## Implementation conventions

- Use function components and hooks; keep stateful behavior in a hook when it can be reused or tested independently.
- Preserve the feature-oriented component layout under `src/components/` and the `minimal` vs `classic` theme branching (use `minimal` bool + conditional Tailwind classes; `data-theme` values: `classic`, `cyberpunk`, `amber`, `matrix`, `synthwave`, `minimal`).
- Use the existing Tailwind utilities and CSS custom properties (for example, `--bg-app` and `--text-primary`) so all CRT themes remain consistent.
- Audio: `public/sounds/music/` tracks are pre-normalized to -16 LUFS via `ffmpeg loudnorm` (`Popoi -12.29→-16.27`, `VibeDepot -5.86→-16.26`, `rain -49.23→-16.01`); cassette plays at `baseVolume 0.62` (~-20 LUFS, `vibedepot-cafe` gain `0.60` for lower cafe bed ~-24.5 LUFS). Ambient rain/white-noise are intentionally ~15dB quieter for a soothing bed: `RAIN_VOLUME 0.10` / `NOISE_GAIN_BALANCED 0.18` / `NOISE_BUFFER_AMPLITUDE 0.18` in `src/services/soundSynth.js:17` (~-35 LUFS vs cassette). Keep `public/sounds/music/` as source of truth and preserve the per-track `gain` map. Compress embedded MP3 cover art to ≤700px JPEG (Popoi was 10MB PNG → 93k JPEG) to avoid bloat.
- Keep browser-only APIs behind services or hooks, and degrade safely when an API is unavailable (`AudioContext`/`Notification` guards in `soundSynth.js` and `notificationService.js`).
- Preserve local-storage keys and stored-data shapes unless a migration strategy is included (`rp_theme`, `rp_crt_enabled`, `rp_timer_durations`, `rp_timer_mode`, `rp_completed_sessions`, `rp_auto_breaks`, `rp_auto_pomodoros`, `rp_tasks_list`, `rp_reminders_list`).
- Use accessible native controls, labels, and meaningful button titles; tests depend on visible text, roles, and IDs such as `#task-input`.
- Add or update static assets under `public/`; do not add files to the legacy top-level `sounds/` or `icons/` directories. Treat removal of those duplicate directories as a separate, verified cleanup task.

## Change checklist

- Do not commit generated output such as `dist/` or test artifacts.
- Keep the app usable at small screen widths as well as the desktop three-deck layout.
- Update or add Playwright coverage for changed interactions.
- Avoid unrelated formatting or README changes.
