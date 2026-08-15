import React from 'react';
import { formatTime } from '../../utils/formatters';

export function TimerDisplay({ timeRemaining, strokeDashoffset, currentMode, completedSessions }) {
  const roundNumber = (completedSessions % 4) + 1;
  const cycleLabel =
    currentMode === 'work'
      ? `POMODORO ${roundNumber} OF 4`
      : currentMode === 'shortBreak'
      ? `SHORT BREAK (${roundNumber}/4)`
      : 'LONG REST BREAK';

  return (
    <div className="relative flex justify-center items-center my-1.5 z-[6]">
      <div className="relative w-[210px] h-[210px] sm:w-[220px] sm:h-[220px] flex justify-center items-center">
        {/* SVG Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200" aria-hidden="true">
          <circle
            className="fill-none stroke-white/10 stroke-[6]"
            cx="100"
            cy="100"
            r="90"
          />
          <circle
            className="fill-none stroke-[var(--color-screen-glow)] stroke-[6] transition-[stroke-dashoffset] duration-300 ease-out drop-shadow-[0_0_6px_var(--color-screen-glow)]"
            cx="100"
            cy="100"
            r="90"
            strokeDasharray="565.48"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="square"
          />
        </svg>

        {/* Digital Countdown Centerpiece */}
        <div className="flex flex-col items-center justify-center select-none">
          <div
            className="font-['VT323',monospace] text-6xl sm:text-7xl leading-none text-[var(--color-screen-glow)] [text-shadow:var(--crt-glow-intensity)] tracking-widest tabular-nums"
            aria-live="polite"
          >
            {formatTime(timeRemaining)}
          </div>
          <div className="font-['Press_Start_2P',cursive] text-[9px] tracking-wider text-[var(--color-screen-text)] opacity-80 mt-1">
            {cycleLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
