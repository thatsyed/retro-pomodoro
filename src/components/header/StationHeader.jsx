import React from 'react';
import { ThemeSelector } from './ThemeSelector';
import { RetroButton } from '../common/RetroButton';
import { SvgIcon } from '../common/SvgIcon';

export function StationHeader({
  theme,
  onSelectTheme,
  todayPomos,
  todayFocusMinutes,
  zenMode,
  onToggleZenMode,
  onOpenSettings,
  onOpenShortcuts
}) {
  return (
    <header className="station-top-bar bg-gradient-to-b from-[var(--color-chassis)] to-[var(--color-chassis-dark)] border-3 border-[var(--color-border)] rounded-[var(--chassis-radius)] shadow-[0_6px_0_var(--color-btn-shadow),0_10px_20px_rgba(0,0,0,0.3)] px-4.5 py-2.5 flex justify-between items-center flex-wrap gap-3 relative" role="banner">
      {/* Brand & Hardware Badge */}
      <div className="flex items-center gap-3.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#22c55e] animate-pulse" aria-hidden="true" />
          <span className="bg-[var(--color-screen-bg)] text-[var(--color-screen-glow)] font-['Press_Start_2P',cursive] text-xs py-1 px-2 rounded-xs border-2 border-[var(--color-border)] tracking-wider">
            WS-8080 PRO
          </span>
        </div>
        <div className="flex flex-col">
          <h1 className="font-['VT323',monospace] text-2xl tracking-widest leading-none text-[var(--color-border)]">
            RETRO POMODORO
          </h1>
          <span className="font-mono text-[11px] font-bold tracking-widest opacity-75">
            ANALOG FOCUS WORKSTATION
          </span>
        </div>
      </div>

      {/* Focus Streak Pill */}
      <div className="hidden sm:flex items-center gap-2.5 bg-[var(--color-screen-bg)] border-2 border-[var(--color-border)] text-[var(--color-screen-text)] px-3.5 py-1 rounded-full text-xs shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4)]">
        <span className="flex items-center gap-1.5 font-mono">
          <SvgIcon name="Flame" size={14} className="text-[var(--color-danger)]" />
          <strong className="text-[var(--color-screen-glow)] font-bold">{todayPomos}</strong> SESSIONS
        </span>
        <span className="opacity-30">|</span>
        <span className="flex items-center gap-1.5 font-mono">
          <SvgIcon name="Clock" size={14} className="text-[var(--color-primary)]" />
          <strong className="text-[var(--color-screen-glow)] font-bold">{todayFocusMinutes}</strong>m FOCUSED
        </span>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        <ThemeSelector currentTheme={theme} onSelectTheme={onSelectTheme} />

        <RetroButton
          variant="ghost"
          size="sm"
          onClick={onOpenShortcuts}
          aria-label="Keyboard shortcuts"
          title="Shortcuts (?)"
          className="!p-1.5"
        >
          <SvgIcon name="Keyboard" size={16} />
        </RetroButton>

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
