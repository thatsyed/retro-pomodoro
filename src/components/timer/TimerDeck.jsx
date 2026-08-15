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
  onSwitchMode,
  onStart,
  onPause,
  onReset,
  dailyGoal = 8
}) {
  const isRunning = timerState === 'running';

  const filledCount =
    completedSessions === 0 ? 0 : ((completedSessions - 1) % 4) + 1;

  const modeTitles = {
    work: 'FOCUS',
    shortBreak: 'SHORT BREAK',
    longBreak: 'LONG BREAK'
  };

  return (
    <section
      className="console-deck deck-center relative h-full flex flex-col justify-between gap-4"
      id="deck-timer"
      aria-labelledby="main-timer-title"
    >
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
            {modeTitles[currentMode] || 'FOCUS'}
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
      <div className="console-screen crt-main-screen flex-1 flex flex-col justify-between p-4 min-h-0 gap-3">
        <ModeTabs currentMode={currentMode} onSwitchMode={onSwitchMode} />

        <TimerDisplay
          timeRemaining={timeRemaining}
          strokeDashoffset={strokeDashoffset}
          currentMode={currentMode}
          completedSessions={completedSessions}
        />

        <SpriteStage
          activeSprite={activeSprite}
          isRunning={isRunning}
          currentMode={currentMode}
        />

        {/* Session Tracker Dots & Goal */}
        <div className="flex flex-col gap-2 w-full border-t border-dashed border-white/15 pt-2.5 z-[6]">
          <div className="flex justify-between items-center text-xs font-mono">
            <span>
              ROUND <strong className="text-[var(--color-screen-glow)] font-['VT323',monospace] text-base">{filledCount}/4</strong>
            </span>
            <div className="flex justify-center gap-1.5" aria-label="Session Dots">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full border border-[var(--color-border)] transition-all ${
                    idx < filledCount
                      ? 'bg-[var(--color-danger)] shadow-[0_0_6px_var(--color-danger)]'
                      : 'bg-black/40'
                  }`}
                />
              ))}
            </div>
            <span className="opacity-80">
              GOAL: <strong className="text-[var(--color-screen-glow)] font-mono text-xs">{completedSessions}/{dailyGoal}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Arcade Control Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {isRunning ? (
          <RetroButton variant="warning" onClick={onPause} aria-label="Pause timer">
            <SvgIcon name="Pause" size={16} />
            <span>PAUSE</span>
          </RetroButton>
        ) : (
          <RetroButton variant="primary" onClick={onStart} aria-label="Start timer">
            <SvgIcon name="Play" size={16} />
            <span>START</span>
          </RetroButton>
        )}

        <RetroButton variant="danger" onClick={onReset} aria-label="Reset timer">
          <SvgIcon name="RotateCcw" size={16} />
          <span>RESET</span>
        </RetroButton>
      </div>
    </section>
  );
}
