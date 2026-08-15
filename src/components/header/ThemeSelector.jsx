import React from 'react';
import { THEMES } from '../../types';

export function ThemeSelector({ currentTheme, onSelectTheme }) {
  return (
    <div className="relative">
      <select
        value={currentTheme}
        onChange={(e) => onSelectTheme(e.target.value)}
        aria-label="Select Retro Theme"
        className="font-mono text-xs font-bold bg-white border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] py-1.5 px-2.5 cursor-pointer text-[var(--color-border)] shadow-[2px_2px_0_var(--color-btn-shadow)] hover:bg-[var(--color-warning)] transition-colors focus:outline-none"
      >
        {THEMES.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.label}
          </option>
        ))}
      </select>
    </div>
  );
}
