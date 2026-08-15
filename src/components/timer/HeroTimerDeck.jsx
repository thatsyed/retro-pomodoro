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
}) {
  return (
    <div className="retro-bezel bg-[var(--bg-deck)] p-4 flex flex-col justify-between h-full">
      {/* Top: Mode Selection */}
      <ModeTabs
        mode={mode}
        onChangeMode={onChangeMode}
        durations={durations}
      />

      {/* Main Digital CRT Timer Screen */}
      <DigitalDisplay
        timeLeft={timeLeft}
        totalDuration={totalDuration}
        mode={mode}
        isRunning={isRunning}
        completedSessions={completedSessions}
      />

      {/* Tactile Timer Buttons */}
      <TimerControls
        isRunning={isRunning}
        onToggle={onToggle}
        onSkip={onSkip}
        onReset={onReset}
      />

      {/* Lo-Fi Cassette Tape Deck */}
      <CassettePlayer />
    </div>
  );
}
