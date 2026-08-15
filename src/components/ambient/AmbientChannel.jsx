import React from 'react';
import { Play, Pause } from 'lucide-react';

export function AmbientChannel({ id, label, icon: Icon, isPlaying, onTogglePlay }) {
  return (
    <div className="flex items-center justify-between p-2 bg-[var(--bg-surface)] border border-[var(--border-color)] my-1.5 transition-all">
      {/* Icon & Label */}
      <div className="flex items-center space-x-2 truncate pr-2">
        <Icon className={`w-3.5 h-3.5 shrink-0 ${isPlaying ? 'text-[var(--text-primary)]' : 'text-[var(--text-dim)]'}`} />
        <span className={`text-[11px] font-mono truncate ${isPlaying ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-dim)]'}`} title={label}>
          {label}
        </span>
      </div>

      {/* Direct Tactile Play / Pause Toggle Button */}
      <button
        type="button"
        onClick={() => onTogglePlay(id)}
        className={`p-1.5 border transition-all cursor-pointer flex items-center justify-center ${
          isPlaying
            ? 'bg-[var(--accent)] text-[var(--bg-app)] border-[var(--accent)] shadow-[var(--glow-accent)]'
            : 'bg-[var(--bg-app)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-[var(--text-primary)] shadow-[var(--glow-primary)]'
        }`}
        title={isPlaying ? `Pause ${label}` : `Play ${label}`}
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 fill-current stroke-[2.5]" />
        ) : (
          <Play className="w-3.5 h-3.5 fill-current stroke-[2.5]" />
        )}
      </button>
    </div>
  );
}
