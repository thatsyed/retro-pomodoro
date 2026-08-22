import React from 'react';
import { Settings, Keyboard } from 'lucide-react';
import { soundSynth } from '../../services/soundSynth';

export function HeaderBar({
  currentTheme,
  onOpenSettings,
  onOpenShortcuts,
}) {
  const minimal = currentTheme === 'minimal';

  const handleOpenSettings = () => {
    soundSynth.playButtonClick();
    onOpenSettings();
  };

  const handleOpenShortcuts = () => {
    soundSynth.playButtonClick();
    onOpenShortcuts();
  };

  if (minimal) {
    return (
      <header className="shrink-0 flex items-center justify-between px-1 pb-1 mb-3">
        {/* Brand Title */}
        <h1 className="font-sans text-lg font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>

        {/* Header Action Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleOpenShortcuts}
            className="size-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all cursor-pointer flex items-center justify-center"
            title="Shortcuts [Alt + K]"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleOpenSettings}
            className="size-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all cursor-pointer flex items-center justify-center"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>
    );
  }

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
