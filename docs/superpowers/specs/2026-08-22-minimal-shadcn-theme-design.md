# Design: Minimal (shadcn-style) Theme with Token Bridge

**Date:** 2026-08-22
**Status:** Approved

## Goal

Add a sixth theme, `minimal` — a sophisticated, Apple-like dark minimalist look based on shadcn/ui's neutral zinc dark palette — while keeping all five existing retro themes fully functional. Adopt shadcn/ui incrementally: install the library and its primitives, bridge its design tokens onto the existing theme system, but do not rebuild retro-specific markup in this phase.

## Decisions (from brainstorming)

| Question | Decision |
|---|---|
| Visual direction | Dark minimalist, shadcn zinc dark palette |
| shadcn scope | Full library install, **incremental component adoption** |
| CRT overlay | Stays independent of theme selection |
| Accent | Pure neutral zinc — no colored accent |

## Architecture

### 1. shadcn/ui setup

- Run `npx shadcn@latest init` (Tailwind v4 compatible). Project uses JavaScript, so configure `components.json` for jsx with `src/lib/utils.js` providing the `cn()` helper (`clsx` + `tailwind-merge` as new dev/runtime dependencies).
- Add a Tailwind v4 `@theme inline` block to `src/styles/index.css` exposing shadcn semantic tokens (`--color-background`, `--color-foreground`, `--color-primary`, etc.) so utilities like `bg-background`, `text-muted-foreground`, `border-border` work.

### 2. Token bridge

Every existing theme block in `src/styles/index.css` (`:root[data-theme=...]`) gains shadcn semantic variables mapped from its existing retro palette:

```css
/* example mapping for classic */
--background: #14110f;      /* = --bg-app */
--foreground: #e6c280;      /* = --text-primary */
--card: #28221e;            /* = --bg-deck */
--primary: #d97736;         /* = --accent */
--destructive: #d94b4b;     /* = --danger */
--border: #3d342d;          /* = --border-color */
--muted-foreground: #7d6e64;/* = --text-dim */
--radius: 0px;              /* square corners preserve retro feel */
```

The full token set per theme: `background`, `foreground`, `card`, `card-foreground`, `popover`, `popover-foreground`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `muted`, `muted-foreground`, `accent`, `accent-foreground`, `destructive`, `border`, `input`, `ring`, `radius`.

The `minimal` theme defines both variable families:

- shadcn tokens: zinc dark values — `--background: #09090b`, `--card / --popover: #18181b`, `--border / --input: #27272a`, `--muted-foreground: #a1a1aa`, `--primary: #fafafa` with near-black foreground, `--ring: #d4d4d8`, `--radius: 0.625rem`.
- Legacy aliases: `--bg-app`, `--bg-surface`, `--bg-deck`, `--border-color`, `--border-highlight`, `--text-primary/secondary/dim`, `--accent`, `--accent-secondary`, `--danger`, `--glow-primary/accent` set to flat equivalents (glows set to `none`) so all existing retro-classed markup renders correctly under this theme.

Result: any shadcn component works under all six themes automatically; legacy markup works under all six themes.

### 3. Theme registration

- Add `{ id: 'minimal', name: 'Minimal' }` to the themes array in `src/components/header/ThemeSelector.jsx`.
- Persistence uses the existing `rp_theme` localStorage key via `useLocalStorage` in `App.jsx`. No key or shape migration needed.

### 4. Component adoption — phase 1

Generate via CLI and adopt where visually neutral:

- `Button`, `Card`, `Input`, `Select`, `Dialog`
- First targets: modals (settings/help/shortcuts dialogs) and form controls (`#task-input`, timer duration inputs).
- Out of scope for this phase: bezel decks, pixel-font timer display, glow effects, cassette/CRT styling. These keep their current classes.

## Error handling

- No new browser APIs; nothing to degrade.
- Unknown persisted theme value falls through to existing behavior (attribute set to unknown value renders `:root` fallback = classic tokens); no change required.

## Testing

- `npm run build` passes.
- Playwright coverage:
  - Selecting "Minimal" applies `data-theme="minimal"` and persists after reload.
  - Timer start/pause/reset works under minimal theme.
  - Switching back to a retro theme restores its palette.
  - CRT toggle operates independently of theme (on/off under both minimal and classic).
