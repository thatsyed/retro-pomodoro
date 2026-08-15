import React from 'react';
import { AMBIENT_SOUNDS } from '../../types';
import { SvgIcon } from '../common/SvgIcon';

export function AmbientGen({ activeAmbient, onToggleAmbient }) {
  return (
    <div className="border-t border-dashed border-white/12 pt-2 flex flex-col gap-1.5 z-[6]">
      <span className="text-[10px] font-bold tracking-wider opacity-75">
        AMBIENT GENERATOR
      </span>
      <div className="grid grid-cols-2 gap-1.5">
        {AMBIENT_SOUNDS.map((sound) => {
          const isActive = activeAmbient === sound.id;
          return (
            <button
              key={sound.id}
              onClick={() => onToggleAmbient(sound.id)}
              className={`flex items-center gap-1.5 text-xs font-mono font-bold py-1.5 px-2 rounded-[var(--btn-radius)] border transition-all cursor-pointer ${
                isActive
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-[0_0_8px_rgba(119,156,114,0.5)]'
                  : 'bg-white/5 border-white/15 text-[var(--color-screen-text)] hover:bg-white/10'
              }`}
            >
              <SvgIcon name={sound.icon} size={14} />
              <span>{sound.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
