import React from 'react';
import { RetroButton } from '../common/RetroButton';
import { SvgIcon } from '../common/SvgIcon';

export function StationHeader({
  todayPomos = 0,
  todayFocusMinutes = 0,
  dailyGoal = 8,
  zenMode = false,
  onToggleZenMode,
  onOpenSettings,
  onOpenShortcuts
}) {
  return (
    <header
      className="station-top-bar bg-gradient-to-b from-[var(--color-chassis)] to-[var(--color-chassis-dark)] border-2 border-[var(--color-border)] rounded-[var(--chassis-radius)] shadow-[0_4px_0_var(--color-btn-shadow)] px-4 py-2.5 flex justify-between items-center gap-3 relative"
      role="banner"
    >
      {/* Brand Title with Power LED */}
      <div className="flex items-center gap-2.5">
        <span
          className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#22c55e] animate-pulse shrink-0"
          aria-hidden="true"
        />
        <h1 className="font-['VT323',monospace] text-2xl sm:text-3xl tracking-widest leading-none text-[var(--color-border)] select-none">
          RETRO POMO
        </h1>
      </div>

      {/* Focus Streak Pill */}
      <div className="hidden sm:flex items-center gap-2 bg-[var(--color-screen-bg)] border border-[var(--color-screen-bezel)] text-[var(--color-screen-text)] px-3 py-1 rounded-full text-xs shadow-inner font-mono">
        <SvgIcon name="Flame" size={13} className="text-[var(--color-warning)]" />
        <span className="font-bold tracking-wide">
          <strong className="text-[var(--color-screen-glow)] font-bold">{todayPomos}</strong> / {dailyGoal} POMOS
        </span>
        {todayFocusMinutes > 0 && (
          <>
            <span className="opacity-30">|</span>
            <span className="opacity-75 text-[11px]">{todayFocusMinutes}m</span>
          </>
        )}
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        <RetroButton
          variant={zenMode ? 'warning' : 'ghost'}
          size="sm"
          onClick={onToggleZenMode}
          aria-label="Toggle Zen Focus Mode"
          title="Toggle Zen Mode (Z)"
        >
          <SvgIcon name="Zap" size={14} />
          <span>ZEN</span>
        </RetroButton>

        <RetroButton
          variant="ghost"
          size="sm"
          onClick={onOpenShortcuts}
          aria-label="Keyboard shortcuts"
          title="Shortcuts (?)"
        >
          <SvgIcon name="Keyboard" size={14} />
          <span>?</span>
        </RetroButton>

        <RetroButton
          variant="ghost"
          size="sm"
          onClick={onOpenSettings}
          aria-label="Open settings"
          title="Settings"
        >
          <SvgIcon name="Sliders" size={14} />
          <span>CONFIG</span>
        </RetroButton>
      </div>
    </header>
  );
}
