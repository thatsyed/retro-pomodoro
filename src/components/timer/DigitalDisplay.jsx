import React from 'react';

export function DigitalDisplay({ timeLeft, totalDuration, mode, isRunning, completedSessions }) {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  const progressPercent = Math.min(100, Math.max(0, ((totalDuration - timeLeft) / totalDuration) * 100));

  const modeBadge = {
    work: { text: 'FOCUS SPRINT', color: 'text-[var(--text-primary)] border-[var(--text-primary)]' },
    shortBreak: { text: 'SHORT BREAK', color: 'text-[var(--text-secondary)] border-[var(--text-secondary)]' },
    longBreak: { text: 'LONG RECHARGE', color: 'text-[var(--accent)] border-[var(--accent)]' },
  }[mode] || { text: 'FOCUS', color: 'text-[var(--text-primary)]' };

  return (
    <div className="retro-panel-inset p-4 mb-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(var(--text-primary)_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* Top Status Header */}
      <div className="w-full flex items-center justify-between text-[10px] font-mono text-[var(--text-dim)] mb-1 z-10">
        <span className={`px-2 py-0.5 border uppercase font-bold tracking-widest ${modeBadge.color}`}>
          {modeBadge.text}
        </span>
        <div className="flex items-center space-x-1">
          <span className="text-[var(--text-dim)]">CYCLE:</span>
          <span className="text-[var(--text-primary)] font-bold">
            {(completedSessions % 4) + 1} / 4
          </span>
        </div>
      </div>

      {/* Hero 7-Segment Countdown */}
      <div className="font-vt323 text-8xl md:text-9xl tracking-tight text-[var(--text-primary)] glow-text my-1 select-none z-10 leading-none">
        {minutes}:{seconds}
      </div>

      {/* Segmented Retro Progress Bar */}
      <div className="w-full mt-2 z-10">
        <div className="h-3 w-full bg-[var(--bg-app)] border border-[var(--border-color)] p-0.5 flex">
          <div
            className="h-full bg-[var(--text-primary)] transition-all duration-300 shadow-[var(--glow-primary)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-[var(--text-dim)] mt-1">
          <span>00:00</span>
          <span>{Math.round(progressPercent)}% ELAPSED</span>
          <span>{Math.floor(totalDuration / 60)}:00</span>
        </div>
      </div>
    </div>
  );
}
