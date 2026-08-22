# AGENTS.md

## Project overview

Retro Pomodoro is a client-side Vite + React 19 focus timer. Styling uses Tailwind CSS utility classes alongside the CRT and cassette styles in `src/styles/`. Browser data is persisted through the hooks in `src/hooks/`; audio and notifications live in `src/services/`. 

## Structure

- `src/App.jsx` composes the three primary decks and global UI state.
- `src/components/` contains feature-oriented presentation components.
- `src/hooks/` owns reusable browser state and interaction logic.
- `src/services/` wraps browser integrations such as audio and notifications.
- `src/styles/` contains global, CRT, and cassette styling.
- `tests/` contains Playwright end-to-end coverage.
- `public/` is the canonical source for static assets served at the application root.
- `docs/superpowers/` contains project design specifications and implementation plans; review the relevant documents before substantial feature or architecture work.

## Development commands

```bash
npm run dev
npm run build
npm run preview
npx playwright test
```

Run `npm run build` after source changes. Run the relevant Playwright tests when changing user-visible behavior; the Playwright configuration serves the built app on port 4173.

## Implementation conventions

- Use function components and hooks; keep stateful behavior in a hook when it can be reused or tested independently.
- Preserve the feature-oriented component layout under `src/components/`.
- Use the existing Tailwind utilities and CSS custom properties (for example, `--bg-app` and `--text-primary`) so all CRT themes remain consistent.
- Keep browser-only APIs behind services or hooks, and degrade safely when an API is unavailable.
- Preserve local-storage keys and stored-data shapes unless a migration strategy is included.
- Use accessible native controls, labels, and meaningful button titles; tests depend on visible text, roles, and IDs such as `#task-input`.
- Add or update static assets under `public/`; do not add files to the legacy top-level `sounds/` or `icons/` directories. Treat removal of those duplicate directories as a separate, verified cleanup task.

## Change checklist

- Do not commit generated output such as `dist/` or test artifacts.
- Keep the app usable at small screen widths as well as the desktop three-deck layout.
- Update or add Playwright coverage for changed interactions.
- Avoid unrelated formatting or README changes.
