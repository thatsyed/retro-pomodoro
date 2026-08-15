import React from 'react';

export function ModeTabs({ mode, onChangeMode, durations }) {
  const tabs = [
    { id: 'work', label: 'FOCUS', duration: durations.work || 25 },
    { id: 'shortBreak', label: 'SHORT BREAK', duration: durations.shortBreak || 5 },
    { id: 'longBreak', label: 'LONG BREAK', duration: durations.longBreak || 15 },
  ];

  return (
    <div className="flex items-center space-x-1.5 p-1 bg-[var(--bg-app)] border border-[var(--border-color)] mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChangeMode(tab.id)}
          className={`flex-1 py-1.5 px-2 text-[10px] font-pixel tracking-wider uppercase transition-all cursor-pointer ${
            mode === tab.id
              ? 'bg-[var(--text-primary)] text-[var(--bg-app)] font-bold shadow-[var(--glow-primary)]'
              : 'text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
          }`}
        >
          {tab.label} ({tab.duration}M)
        </button>
      ))}
    </div>
  );
}
