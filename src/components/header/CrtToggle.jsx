import React from 'react';
import { Tv } from 'lucide-react';
import { soundSynth } from '../../services/soundSynth';

export function CrtToggle({ enabled, onToggle }) {
  const handleClick = () => {
    soundSynth.playButtonClick();
    onToggle();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center space-x-1.5 px-2 py-1 border text-[10px] font-mono tracking-wider transition-all cursor-pointer ${
        enabled
          ? 'bg-[var(--text-primary)]/15 border-[var(--text-primary)] text-[var(--text-primary)] shadow-[var(--glow-primary)]'
          : 'bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-dim)] hover:text-[var(--text-secondary)]'
      }`}
      title="Toggle CRT scanlines [Alt + C]"
    >
      <Tv className="w-3.5 h-3.5" />
      <span>CRT: {enabled ? 'On' : 'Off'}</span>
    </button>
  );
}
