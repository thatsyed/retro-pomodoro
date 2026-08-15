import React from 'react';
import { ModeTabs } from './ModeTabs';
import { TimerDisplay } from './TimerDisplay';
import { SpriteStage } from './SpriteStage';
import { RetroButton } from '../common/RetroButton';
import { SvgIcon } from '../common/SvgIcon';

export function TimerDeck({
  currentMode,
  timerState,
  timeRemaining,
  strokeDashoffset,
  completedSessions,
  currentClock,
  activeSprite,
  onSelectSprite,
  onSwitchMode,
  onStart,
  onPause,
  onReset,
  onApplyPreset,
  onOpenCustomSettings,
  dailyGoal = 8
}) {
  const isRunning = timerState === 'running';

  const filledCount =
    completedSessions === 0 ? 0 : ((completedSessions - 1) % 4) + 1;

  const presets = [
    { label: '25 / 5', work: 25, short: 5, long: 15 },
    { label: '50 / 10', work: 50, short: 10, long: 20 },
    { label: '15 / 3', work: 15, short: 3, long: 10 }
  ];

  return (
    <section
      className="console-deck deck-center relative flex flex-col gap-4"
      id="deck-timer"
      aria-labelledby="main-timer-title"
    >
      <span className="chassis-screw screw-tl" />
      <span className="chassis-screw screw-tr" />
      <span className="chassis-screw screw-bl" />
      <span className="chassis-screw screw-br" />

      {/* Deck Header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-[var(--color-border)] pb-2.5">
        <div className="flex items-center gap-2">
          <span
            className={`w-3.5 h-3.5 rounded-full border-2 border-[var(--color-border)] transition-all ${
              currentMode === 'work'
                ? 'bg-[var(--color-danger)] shadow-[0_0_8px_var(--color-danger)]'
                : 'bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]'
            } ${!isRunning ? 'animate-pulse' : ''}`}
            title="Status LED"
          />
          <h2 id="main-timer-title" className="font-['VT323',monospace] text-2xl tracking-wider text-[var(--color-border)]">
            {currentMode === 'work' ? (isRunning ? 'FOCUS SESSION' : 'READY TO WORK') : 'REST BREAK'}
          </h2>
        </div>

        {/* Live Digital Wall Clock */}
        <div
          className="font-['VT323',monospace] text-2xl text-[var(--color-screen-glow)] bg-[var(--color-screen-bg)] border-2 border-[var(--color-border)] rounded-xs py-0.5 px-2 tracking-widest tabular-nums leading-none shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]"
          title="Digital Clock"
        >
          {currentClock}
        </div>
      </div>

      {/* Main Recessed CRT Screen */}
      <div className="console-screen crt-main-screen p-4 flex flex-col items-center gap-3">
        <ModeTabs currentMode={currentMode} onSwitchMode={onSwitchMode} />

        <TimerDisplay
          timeRemaining={timeRemaining}
          strokeDashoffset={strokeDashoffset}
          currentMode={currentMode}
          completedSessions={completedSessions}
        />

        <SpriteStage
          activeSprite={activeSprite}
          onSelectSprite={onSelectSprite}
          isRunning={isRunning}
          currentMode={currentMode}
        />

        {/* Session Tracker Tallies & Goal */}
        <div className="flex flex-col gap-1.5 w-full border-t border-dashed border-white/12 pt-2.5 z-[6]">
          <div className="flex justify-between text-xs font-mono">
            <span>
              CYCLE ROUND: <strong className="text-[var(--color-screen-glow)] font-['VT323',monospace] text-base">{completedSessions}</strong>
            </span>
            <span className="opacity-75">
              Daily Goal: {completedSessions}/{dailyGoal}
            </span>
          </div>

          <div className="flex justify-center gap-2" aria-label="Session Dots">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full border-2 border-[var(--color-border)] transition-all ${
                  idx < filledCount
                    ? 'bg-[var(--color-danger)] shadow-[0_0_6px_var(--color-danger)]'
                    : 'bg-black/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Arcade Control Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <RetroButton variant="primary" onClick={onStart} disabled={isRunning} aria-label="Start timer">
          <SvgIcon name="Play" size={16} />
          <span>START</span>
        </RetroButton>

        <RetroButton variant="warning" onClick={onPause} disabled={!isRunning} aria-label="Pause timer">
          <SvgIcon name="Pause" size={16} />
          <span>PAUSE</span>
        </RetroButton>

        <RetroButton variant="danger" onClick={onReset} aria-label="Reset timer">
          <SvgIcon name="RotateCcw" size={16} />
          <span>RESET</span>
        </RetroButton>
      </div>

      {/* Duration Preset Chips */}
      <div className="flex items-center justify-center gap-2 border-t-2 border-dashed border-[var(--color-border)] pt-3 flex-wrap">
        <span className="text-xs font-bold opacity-80">PRESETS:</span>
        <div className="flex gap-1.5 flex-wrap">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => onApplyPreset(p.work, p.short, p.long)}
              className="font-mono text-xs font-bold bg-white border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] py-1 px-2 cursor-pointer shadow-[2px_2px_0_var(--color-btn-shadow)] hover:bg-[var(--color-warning)] text-[var(--color-border)] transition-colors"
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={onOpenCustomSettings}
            className="font-mono text-xs font-bold bg-white border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] py-1 px-2 cursor-pointer shadow-[2px_2px_0_var(--color-btn-shadow)] hover:bg-[var(--color-warning)] text-[var(--color-border)] transition-colors"
          >
            CUSTOM...
          </button>
        </div>
      </div>
    </section>
  );
}
