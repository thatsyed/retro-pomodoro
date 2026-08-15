import React from 'react';

export function ProgressBar({ percentage }) {
  return (
    <div className="flex flex-col gap-1 relative z-[6]" title="Task Completion Progress">
      <div className="flex justify-between text-[11px] font-bold opacity-80">
        <span>PROGRESS</span>
        <span className="text-[var(--color-screen-glow)] font-['VT323',monospace] text-base leading-none">
          {percentage}%
        </span>
      </div>
      <div className="w-full h-3.5 bg-black/50 border-2 border-[var(--color-border)] rounded-xs overflow-hidden shadow-[inset_1px_1px_3px_rgba(0,0,0,0.5)]">
        <div
          className="h-full w-full bg-[var(--color-primary)] origin-left transition-transform duration-300 ease-out"
          style={{
            transform: `scaleX(${percentage / 100})`,
            backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.2) 50%)',
            backgroundSize: '8px 100%'
          }}
        />
      </div>
    </div>
  );
}
