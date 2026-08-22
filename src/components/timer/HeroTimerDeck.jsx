import React from 'react';
import { ModeTabs } from './ModeTabs';
import { DigitalDisplay } from './DigitalDisplay';
import { TimerControls } from './TimerControls';
import { CassettePlayer } from '../cassette/CassettePlayer';

export function HeroTimerDeck({
  mode,
  timeLeft,
  totalDuration,
  isRunning,
  completedSessions,
  durations,
  onToggle,
  onSkip,
  onReset,
  onChangeMode,
  theme = 'classic',
}) {
  const minimal = theme === 'minimal';

  return (
    <div
      className={
        minimal
          ? 'rounded-2xl border border-border bg-card p-5 sm:p-6 flex flex-col shadow-sm gap-4 lg:h-full'
          : 'retro-bezel bg-[var(--bg-deck)] p-4 flex flex-col justify-between lg:h-full'
      }
    >
      {/* Top: Mode Selection */}
      <ModeTabs
        mode={mode}
        onChangeMode={onChangeMode}
        durations={durations}
        minimal={minimal}
      />

      {/* Main Digital CRT Timer Screen */}
      <DigitalDisplay
        timeLeft={timeLeft}
        totalDuration={totalDuration}
        mode={mode}
        isRunning={isRunning}
        completedSessions={completedSessions}
        minimal={minimal}
      />

      {/* Tactile Timer Buttons */}
      <TimerControls
        isRunning={isRunning}
        onToggle={onToggle}
        onSkip={onSkip}
        onReset={onReset}
        minimal={minimal}
      />

      {/* Lo-Fi Cassette Tape Deck */}
      <CassettePlayer minimal={minimal} />
    </div>
  );
}
