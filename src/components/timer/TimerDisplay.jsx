import React from 'react';
import { formatTime } from '../../utils/formatters';

export function TimerDisplay({ timeRemaining, strokeDashoffset, currentMode, completedSessions }) {
  const roundNumber = (completedSessions % 4) + 1;
  const cycleLabel =
    currentMode === 'work'
      ? `POMODORO ${roundNumber} OF 4`
      : currentMode === 'shortBreak'
      ? `SHORT REST (${roundNumber}/4)`
      : 'LONG REST BREAK';

  return (
    <div className="relative flex justify-center items-center my-2 z-[6]">
      <div className="relative w-[215px] h-[215px] sm:w-[230px] sm:h-[230px] flex justify-center items-center">
        {/* SVG Progress Ring with 12 Clock Ticks */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200" aria-hidden="true">
          {/* Outer Ambient Glow Ring */}
          <circle
            className="fill-none stroke-white/5 stroke-[10]"
            cx="100"
            cy="100"
            r="90"
          />

          {/* Background Track */}
          <circle
            className="fill-none stroke-black/60 stroke-[7]"
            cx="100"
            cy="100"
            r="90"
          />

          {/* Active Glowing Progress Arc */}
          <circle
            className="fill-none stroke-[var(--color-screen-glow)] stroke-[7] transition-[stroke-dashoffset] duration-300 ease-out drop-shadow-[0_0_8px_var(--color-screen-glow)]"
            cx="100"
            cy="100"
            r="90"
            strokeDasharray="565.48"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />

          {/* 12 Sub-dial Hour Ticks */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="100"
              y1="16"
              x2="100"
              y2="20"
              className="stroke-white/30 stroke-[1.5]"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}
        </svg>

        {/* Digital Countdown Centerpiece */}
        <div className="flex flex-col items-center justify-center select-none z-10">
          <div
            className="font-['VT323',monospace] text-6xl sm:text-7xl leading-none text-[var(--color-screen-glow)] [text-shadow:var(--crt-glow-intensity)] tracking-widest tabular-nums font-normal"
            aria-live="polite"
          >
            {formatTime(timeRemaining)}
          </div>
          <div className="font-['Press_Start_2P',cursive] text-[8.5px] tracking-wider text-[var(--color-screen-text)] opacity-85 mt-1.5 px-2 py-0.5 rounded bg-black/40 border border-white/10">
            {cycleLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
