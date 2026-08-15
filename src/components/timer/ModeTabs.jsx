import React from 'react';

export function ModeTabs({ currentMode, onSwitchMode }) {
  const modes = [
    { id: 'work', label: 'WORK', badge: '1' },
    { id: 'shortBreak', label: 'SHORT', badge: '2' },
    { id: 'longBreak', label: 'LONG', badge: '3' }
  ];

  return (
    <div className="flex w-full justify-around border-b-2 border-white/10 pb-2 relative z-[6]" role="tablist" aria-label="Pomodoro Modes">
      {modes.map((m) => {
        const isActive = currentMode === m.id;
        return (
          <button
            key={m.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSwitchMode(m.id)}
            className={`font-mono text-xs font-bold py-1.5 px-3 rounded-xs flex items-center gap-1.5 cursor-pointer transition-all ${
              isActive
                ? 'text-[var(--color-screen-glow)] bg-white/10 [text-shadow:var(--crt-glow-intensity)]'
                : 'text-[var(--color-screen-text)] opacity-60 hover:opacity-90 hover:bg-white/5'
            }`}
          >
            <span className="text-[10px] bg-black/40 py-0.5 px-1 rounded-xs font-['Press_Start_2P',cursive]">
              {m.badge}
            </span>
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
