import React from 'react';

export function ModeTabs({ mode, onChangeMode, durations, minimal = false }) {
  const tabs = [
    { id: 'work', label: 'Focus', duration: durations.work || 25 },
    { id: 'shortBreak', label: 'Short Break', duration: durations.shortBreak || 5 },
    { id: 'longBreak', label: 'Long Break', duration: durations.longBreak || 15 },
  ];

  if (minimal) {
    return (
      <div
        role="tablist"
        aria-label="Timer mode"
        className="flex items-center gap-1 p-1 rounded-full bg-secondary/60 border border-border/50"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={mode === tab.id}
            onClick={() => onChangeMode(tab.id)}
            title={`${tab.label} (${tab.duration}m)`}
            className={`flex-1 py-2 px-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
              mode === tab.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-1.5 p-1 bg-[var(--bg-app)] border border-[var(--border-color)] mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChangeMode(tab.id)}
          className={`flex-1 py-1.5 px-2 text-[10px] font-pixel tracking-wider transition-all cursor-pointer ${
            mode === tab.id
              ? 'bg-[var(--text-primary)] text-[var(--bg-app)] font-bold shadow-[var(--glow-primary)]'
              : 'text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
          }`}
        >
          {tab.label} ({tab.duration}m)
        </button>
      ))}
    </div>
  );
}
