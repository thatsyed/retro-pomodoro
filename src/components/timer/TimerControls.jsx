import React from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

export function TimerControls({ isRunning, onToggle, onSkip, onReset }) {
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
            <span>PAUSE</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current stroke-[2.5]" />
            <span>START</span>
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
        <span>SKIP</span>
      </button>

      {/* Reset Button */}
      <button
        type="button"
        onClick={onReset}
        className="py-3 px-3 bg-[var(--bg-surface)] text-[var(--text-dim)] border border-[var(--border-color)] hover:border-[var(--danger)] hover:text-[var(--danger)] transition-all cursor-pointer font-pixel text-[10px] flex items-center space-x-1"
        title="Reset Countdown [Alt + R]"
      >
        <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>RESET</span>
      </button>
    </div>
  );
}
