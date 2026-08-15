import React from 'react';
import { Terminal, Settings, Keyboard } from 'lucide-react';
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
      <div className="flex items-center">
        <h1 className="font-pixel text-xs sm:text-sm text-[var(--text-primary)] glow-text tracking-wider">
          Retro Pomodoro
        </h1>
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
          title="Shortcuts [Alt + K]"
        >
          <Keyboard className="w-4 h-4" />
        </button>

        {/* Settings Modal Button */}
        <button
          type="button"
          onClick={handleOpenSettings}
          className="p-1.5 bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all cursor-pointer"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
