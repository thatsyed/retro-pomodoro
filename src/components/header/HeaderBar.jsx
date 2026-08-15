import React from 'react';
import { Terminal, Settings, Keyboard, Sparkles } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';
import { CrtToggle } from './CrtToggle';
import { soundSynth } from '../../services/soundSynth';

export function HeaderBar({
  currentTheme,
  onThemeChange,
  crtEnabled,
  onToggleCrt,
  onOpenSettings,
  onOpenShortcuts,
}) {
  const handleOpenSettings = () => {
    soundSynth.playButtonClick();
    onOpenSettings();
  };

  const handleOpenShortcuts = () => {
    soundSynth.playButtonClick();
    onOpenShortcuts();
  };

  return (
    <header className="retro-bezel bg-[var(--bg-deck)] p-3 mb-4 flex flex-wrap items-center justify-between gap-3">
      {/* Brand Title */}
      <div className="flex items-center space-x-2.5">
        <div className="w-8 h-8 bg-[var(--bg-app)] border border-[var(--text-primary)] flex items-center justify-center text-[var(--text-primary)] shadow-[var(--glow-primary)]">
          <Terminal className="w-4 h-4" />
        </div>
        <div>
          <h1 className="font-pixel text-xs sm:text-sm text-[var(--text-primary)] glow-text tracking-wider">
            RETRO POMODORO // v2.0
          </h1>
          <p className="font-mono text-[9px] text-[var(--text-dim)] uppercase tracking-widest">
            8-BIT FOCUS WORKSTATION
          </p>
        </div>
      </div>

      {/* Header Action Controls */}
      <div className="flex items-center flex-wrap gap-2">
        {/* Theme Selector */}
        <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />

        {/* CRT Shaders Toggle */}
        <CrtToggle enabled={crtEnabled} onToggle={onToggleCrt} />

        {/* Hotkeys Modal Button */}
        <button
          type="button"
          onClick={handleOpenShortcuts}
          className="p-1.5 bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all cursor-pointer"
          title="Keyboard Shortcuts Cheat-sheet [Alt + K]"
        >
          <Keyboard className="w-4 h-4" />
        </button>

        {/* Settings Modal Button */}
        <button
          type="button"
          onClick={handleOpenSettings}
          className="p-1.5 bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all cursor-pointer"
          title="System Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
