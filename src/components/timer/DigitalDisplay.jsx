import React from 'react';

const modeLabel = {
  work: 'Focus',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
};

export function DigitalDisplay({ timeLeft, totalDuration, mode, isRunning, completedSessions, minimal = false }) {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  const progressPercent = Math.min(100, Math.max(0, ((totalDuration - timeLeft) / totalDuration) * 100));

  if (minimal) {
    const currentRound = (completedSessions % 4) + 1;

    return (
      <div className="relative w-full flex flex-col items-center justify-center rounded-xl border border-border bg-background/40 px-5 py-6 sm:px-10 sm:py-8 overflow-hidden lg:flex-1 lg:min-h-0">
        {/* Faint radial lift behind the countdown */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(250,250,250,0.04),transparent)]"
        />

        <div className="relative w-full flex flex-col items-center gap-5 sm:gap-7">
          {/* Status Header */}
          <div className="w-full flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-2 uppercase tracking-widest text-muted-foreground font-medium">
              <span
                aria-hidden="true"
                className={`inline-block size-1.5 rounded-full transition-colors ${
                  mode === 'work' ? 'bg-primary' : 'bg-muted-foreground'
                } ${isRunning ? 'animate-pulse' : ''}`}
                data-testid="status-dot"
              />
              {modeLabel[mode] || 'Focus'}
            </span>
              <span className="flex items-center gap-1.5 text-muted-foreground tabular-nums" title={`Round ${currentRound} of 4`}>
                <span className="flex items-center gap-1" aria-hidden="true">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={`size-1.5 rounded-full transition-colors duration-300 ${
                        i < currentRound ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </span>
                {currentRound} of 4
              </span>
          </div>

          {/* Hero Countdown */}
          <div
            className={`font-sans font-extralight tabular-nums select-none leading-none tracking-tighter transition-colors duration-500 text-[4.25rem] sm:text-[7rem] lg:text-[8rem] xl:text-[9rem] ${
              isRunning ? 'text-foreground' : 'text-foreground/60'
            }`}
          >
            {minutes}:{seconds}
          </div>

          {/* Progress */}
          <div className="w-full">
            <div className="relative h-1 w-full rounded-full bg-secondary overflow-visible">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
              <span
                aria-hidden="true"
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-2 rounded-full bg-primary shadow-sm transition-all duration-300"
                style={{ left: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[10px] tracking-wide text-muted-foreground mt-2.5 tabular-nums text-center">
              {Math.round(progressPercent)}% done
            </div>
          </div>
        </div>
      </div>
    );
  }

  const modeBadge = {
    work: { text: 'Focus', color: 'text-[var(--text-primary)] border-[var(--text-primary)]' },
    shortBreak: { text: 'Short Break', color: 'text-[var(--text-secondary)] border-[var(--text-secondary)]' },
    longBreak: { text: 'Long Break', color: 'text-[var(--accent)] border-[var(--accent)]' },
  }[mode] || { text: 'Focus', color: 'text-[var(--text-primary)]' };

  return (
    <div className="retro-panel-inset p-4 mb-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(var(--text-primary)_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* Top Status Header */}
      <div className="w-full flex items-center justify-between text-[10px] font-mono text-[var(--text-dim)] mb-1 z-10">
        <span className={`px-2 py-0.5 border font-bold tracking-widest ${modeBadge.color}`}>
          {modeBadge.text}
        </span>
        <div className="flex items-center space-x-1">
          <span className="text-[var(--text-dim)]">Round:</span>
          <span className="text-[var(--text-primary)] font-bold">
            {(completedSessions % 4) + 1} of 4
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
          <span>{Math.round(progressPercent)}% done</span>
          <span>{Math.floor(totalDuration / 60)}:00</span>
        </div>
      </div>
    </div>
  );
}
