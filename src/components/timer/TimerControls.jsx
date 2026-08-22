import React from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

export function TimerControls({ isRunning, onToggle, onSkip, onReset, minimal = false }) {
  if (minimal) {
    const ring =
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card';

    return (
      <div className="flex items-center justify-center gap-3 shrink-0">
        {/* Start / Pause Button */}
        <button
          type="button"
          onClick={onToggle}
          className={`flex-[2] h-12 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] cursor-pointer shadow-md ${ring}`}
          title={isRunning ? 'Pause Timer [Space]' : 'Start Timer [Space]'}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Start</span>
            </>
          )}
        </button>

        {/* Skip Button */}
        <button
          type="button"
          onClick={onSkip}
          className={`size-12 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/60 active:scale-[0.96] cursor-pointer flex items-center justify-center transition-all duration-200 ${ring}`}
          title="Skip Session [Alt + S]"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        {/* Reset Button */}
        <button
          type="button"
          onClick={onReset}
          className={`size-12 rounded-full border border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 active:scale-[0.96] cursor-pointer flex items-center justify-center transition-all duration-200 ${ring}`}
          title="Reset Countdown [Alt + R]"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-3 mb-4">
      {/* Start / Pause Button */}
      <button
        type="button"
        onClick={onToggle}
        className={`flex-1 py-3 px-4 font-pixel text-xs flex items-center justify-center space-x-2 border transition-all cursor-pointer shadow-md ${
          isRunning
            ? 'bg-[var(--accent)] border-[var(--accent)] text-[var(--bg-app)] hover:brightness-110 shadow-[var(--glow-accent)] font-bold'
            : 'bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--bg-app)] hover:brightness-110 shadow-[var(--glow-primary)] font-bold'
        }`}
        title={isRunning ? 'Pause Timer [Space]' : 'Start Timer [Space]'}
      >
        {isRunning ? (
          <>
            <Pause className="w-4 h-4 fill-current stroke-[2.5]" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current stroke-[2.5]" />
            <span>Start</span>
          </>
        )}
      </button>

      {/* Skip Button */}
      <button
        type="button"
        onClick={onSkip}
        className="py-3 px-3 bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-all cursor-pointer font-pixel text-[10px] flex items-center space-x-1"
        title="Skip Session [Alt + S]"
      >
        <SkipForward className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Skip</span>
      </button>

      {/* Reset Button */}
      <button
        type="button"
        onClick={onReset}
        className="py-3 px-3 bg-[var(--bg-surface)] text-[var(--text-dim)] border border-[var(--border-color)] hover:border-[var(--danger)] hover:text-[var(--danger)] transition-all cursor-pointer font-pixel text-[10px] flex items-center space-x-1"
        title="Reset Countdown [Alt + R]"
      >
        <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Reset</span>
      </button>
    </div>
  );
}
