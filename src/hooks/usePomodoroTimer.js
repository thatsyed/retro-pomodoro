import { useState, useEffect, useRef, useCallback } from 'react';
import { RING_CIRCUMFERENCE } from '../types';

export function usePomodoroTimer(settings, stats, setStats, onComplete, onTick) {
  const [currentMode, setCurrentMode] = useState('work'); // 'work' | 'shortBreak' | 'longBreak'
  const [timerState, setTimerState] = useState('paused'); // 'running' | 'paused'
  
  const workSecs = (settings?.workDuration || 25) * 60;
  const shortSecs = (settings?.shortBreakDuration || 5) * 60;
  const longSecs = (settings?.longBreakDuration || 15) * 60;

  const getTotalDuration = useCallback(() => {
    if (currentMode === 'work') return workSecs;
    if (currentMode === 'shortBreak') return shortSecs;
    return longSecs;
  }, [currentMode, workSecs, shortSecs, longSecs]);

  const [totalDuration, setTotalDuration] = useState(() => {
    return (settings?.workDuration || 25) * 60;
  });
  const [timeRemaining, setTimeRemaining] = useState(() => {
    return (settings?.workDuration || 25) * 60;
  });
  const [completedSessions, setCompletedSessions] = useState(0);

  const targetTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const startTimerRef = useRef(null);

  // Sync duration when mode or settings change and timer is paused
  useEffect(() => {
    if (timerState === 'paused') {
      const newTotal = getTotalDuration();
      setTotalDuration(newTotal);
      setTimeRemaining(newTotal);
    }
  }, [currentMode, workSecs, shortSecs, longSecs, timerState, getTotalDuration]);

  const stopTimer = useCallback(() => {
    setTimerState('paused');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleComplete = useCallback(() => {
    stopTimer();
    onComplete?.(currentMode);

    if (currentMode === 'work') {
      setCompletedSessions((prev) => prev + 1);
      setStats((prev) => ({
        ...prev,
        todayPomos: (prev?.todayPomos || 0) + 1,
        todayFocusMinutes: (prev?.todayFocusMinutes || 0) + (settings?.workDuration || 25)
      }));

      const nextMode = (completedSessions + 1) % 4 === 0 ? 'longBreak' : 'shortBreak';
      setCurrentMode(nextMode);

      if (settings?.autoStartBreaks) {
        setTimeout(() => startTimerRef.current?.(nextMode), 1000);
      }
    } else {
      setCurrentMode('work');
      if (settings?.autoStartPomos) {
        setTimeout(() => startTimerRef.current?.('work'), 1000);
      }
    }
  }, [currentMode, completedSessions, settings, onComplete, setStats, stopTimer]);

  const startTimer = useCallback((modeToStart = currentMode) => {
    if (timerState === 'running' && modeToStart === currentMode) return;

    if (modeToStart !== currentMode) {
      setCurrentMode(modeToStart);
    }

    setTimerState('running');
    targetTimeRef.current = Date.now() + (timeRemaining * 1000);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const delta = targetTimeRef.current - Date.now();
      if (delta <= 0) {
        setTimeRemaining(0);
        handleComplete();
      } else {
        const remaining = Math.ceil(delta / 1000);
        setTimeRemaining(remaining);
        onTick?.(remaining);
      }
    }, 100);
  }, [currentMode, timeRemaining, timerState, handleComplete, onTick]);

  startTimerRef.current = startTimer;

  const resetTimer = useCallback(() => {
    stopTimer();
    const duration = getTotalDuration();
    setTimeRemaining(duration);
    setTotalDuration(duration);
  }, [stopTimer, getTotalDuration]);

  const switchMode = useCallback((newMode) => {
    if (currentMode === newMode && timerState !== 'running') return;
    stopTimer();
    setCurrentMode(newMode);
  }, [currentMode, timerState, stopTimer]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Compute circular progress offset
  const progressRatio = totalDuration > 0 ? 1 - timeRemaining / totalDuration : 0;
  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - (isNaN(progressRatio) ? 0 : progressRatio));

  return {
    currentMode,
    timerState,
    timeRemaining,
    totalDuration,
    completedSessions,
    strokeDashoffset,
    startTimer,
    stopTimer,
    resetTimer,
    switchMode,
    isRunning: timerState === 'running'
  };
}
