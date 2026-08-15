import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function AmbientChannel({ id, label, icon: Icon, volume, isMuted, onVolumeChange, onToggleMute }) {
  const effectiveVolume = isMuted ? 0 : volume;

  return (
    <div className="flex items-center justify-between p-1.5 bg-[var(--bg-surface)] border border-[var(--border-color)] my-1">
      {/* Icon & Label */}
      <div className="flex items-center space-x-2 w-28 shrink-0">
        <Icon className={`w-3.5 h-3.5 ${effectiveVolume > 0 ? 'text-[var(--text-primary)]' : 'text-[var(--text-dim)]'}`} />
        <span className="text-[10px] font-mono text-[var(--text-primary)] truncate" title={label}>
          {label}
        </span>
      </div>

      {/* Slider */}
      <div className="flex items-center space-x-2 flex-1 px-2">
        <input
          type="range"
          min="0"
          max="1"
          step="0.02"
          value={effectiveVolume}
          onChange={(e) => onVolumeChange(id, parseFloat(e.target.value))}
          className="w-full accent-[var(--text-primary)] h-1 bg-[var(--bg-app)] cursor-pointer"
          title={`${label} Volume: ${Math.round(effectiveVolume * 100)}%`}
        />
        <span className="text-[9px] font-mono text-[var(--text-dim)] w-7 text-right">
          {Math.round(effectiveVolume * 100)}%
        </span>
      </div>

      {/* Mute Button */}
      <button
        type="button"
        onClick={() => onToggleMute(id)}
        className="text-[var(--text-dim)] hover:text-[var(--text-primary)] p-0.5 cursor-pointer"
        title={isMuted ? 'Unmute layer' : 'Mute layer'}
      >
        {effectiveVolume === 0 ? (
          <VolumeX className="w-3 h-3 text-[var(--danger)]" />
        ) : (
          <Volume2 className="w-3 h-3" />
        )}
      </button>
    </div>
  );
}
