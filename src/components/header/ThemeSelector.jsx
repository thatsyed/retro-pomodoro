import React from 'react';
import { Palette } from 'lucide-react';
import { soundSynth } from '../../services/soundSynth';

export function ThemeSelector({ currentTheme, onThemeChange }) {
  const themes = [
    { id: 'classic', name: 'Classic' },
    { id: 'cyberpunk', name: 'Cyberpunk' },
    { id: 'amber', name: 'Amber' },
    { id: 'matrix', name: 'Matrix' },
    { id: 'synthwave', name: 'Synthwave' },
  ];

  const handleSelect = (e) => {
    soundSynth.playButtonClick();
    onThemeChange(e.target.value);
  };

  return (
    <div className="flex items-center space-x-1.5 bg-[var(--bg-app)] border border-[var(--border-color)] px-2 py-1">
      <Palette className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
      <select
        value={currentTheme}
        onChange={handleSelect}
        className="bg-transparent text-[10px] font-mono text-[var(--text-primary)] focus:outline-none cursor-pointer tracking-wider"
      >
        {themes.map((t) => (
          <option key={t.id} value={t.id} className="bg-[var(--bg-deck)] text-[var(--text-primary)]">
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
}
