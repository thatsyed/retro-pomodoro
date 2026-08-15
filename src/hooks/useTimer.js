import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { soundSynth } from '../services/soundSynth';
import { notificationService } from '../services/notificationService';

const DEFAULT_DURATIONS = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
};

export function useTimer() {
  const [durations, setDurations] = useLocalStorage('rp_timer_durations', DEFAULT_DURATIONS);
  const [mode, setMode] = useLocalStorage('rp_timer_mode', 'work');
  const [timeLeft, setTimeLeft] = useState(() => (durations[mode] || 25) * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useLocalStorage('rp_completed_sessions', 0);
  const [autoStartBreaks, setAutoStartBreaks] = useLocalStorage('rp_auto_breaks', false);
  const [autoStartPomodoros, setAutoStartPomodoros] = useLocalStorage('rp_auto_pomodoros', false);

  const timerRef = useRef(null);

  const prevDurationsRef = useRef(durations);
  const prevModeRef = useRef(mode);

  // Sync timeLeft only when durations configuration or mode actually change while idle
  useEffect(() => {
    const durationsChanged = prevDurationsRef.current !== durations;
    const modeChanged = prevModeRef.current !== mode;

    if (!isRunning && (durationsChanged || modeChanged)) {
      setTimeLeft((durations[mode] || 25) * 60);
    }

    prevDurationsRef.current = durations;
    prevModeRef.current = mode;
  }, [mode, durations, isRunning]);

  const handleComplete = useCallback(() => {
    soundSynth.playPomodoroFinish();

    if (mode === 'work') {
      const nextSessions = completedSessions + 1;
      setCompletedSessions(nextSessions);
      const nextMode = nextSessions % 4 === 0 ? 'longBreak' : 'shortBreak';
      setMode(nextMode);
      setTimeLeft((durations[nextMode] || 5) * 60);
      notificationService.send(
        '🎯 Focus Session Completed!',
        `Great job! Time for a ${nextMode === 'longBreak' ? '15-minute Long Break' : '5-minute Short Break'}.`
      );
      setIsRunning(autoStartBreaks);
    } else {
      setMode('work');
      setTimeLeft((durations.work || 25) * 60);
      notificationService.send(
        '⚡ Break Over!',
        'Ready for your next focus session?'
      );
      setIsRunning(autoStartPomodoros);
    }
  }, [mode, completedSessions, setCompletedSessions, setMode, durations, autoStartBreaks, autoStartPomodoros]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, handleComplete]);

  const start = useCallback(() => {
    soundSynth.playButtonClick();
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    soundSynth.playButtonClick();
    setIsRunning(false);
  }, []);

  const toggle = useCallback(() => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  }, [isRunning, start, pause]);

  const reset = useCallback(() => {
    soundSynth.playButtonClick();
    setIsRunning(false);
    setTimeLeft((durations[mode] || 25) * 60);
  }, [durations, mode]);

  const skip = useCallback(() => {
    soundSynth.playButtonClick();
    setIsRunning(false);
    if (mode === 'work') {
      const nextSessions = completedSessions + 1;
      setCompletedSessions(nextSessions);
      const nextMode = nextSessions % 4 === 0 ? 'longBreak' : 'shortBreak';
      setMode(nextMode);
      setTimeLeft((durations[nextMode] || 5) * 60);
    } else {
      setMode('work');
      setTimeLeft((durations.work || 25) * 60);
    }
  }, [mode, completedSessions, setCompletedSessions, setMode, durations]);

  const changeMode = useCallback((newMode) => {
    soundSynth.playButtonClick();
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft((durations[newMode] || 25) * 60);
  }, [durations, setMode]);

  return {
    mode,
    timeLeft,
    totalDuration: (durations[mode] || 25) * 60,
    isRunning,
    completedSessions,
    durations,
    setDurations,
    autoStartBreaks,
    setAutoStartBreaks,
    autoStartPomodoros,
    setAutoStartPomodoros,
    start,
    pause,
    toggle,
    reset,
    skip,
    changeMode,
  };
}
