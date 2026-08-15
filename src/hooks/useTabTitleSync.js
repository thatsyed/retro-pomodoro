import { useEffect } from 'react';

export function useTabTitleSync(timeLeft, mode, isRunning) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const secs = (timeLeft % 60).toString().padStart(2, '0');
    const modeLabel = mode === 'work' ? 'Focus' : mode === 'shortBreak' ? 'Short Break' : 'Long Break';
    
    if (timeLeft === 0) {
      document.title = `(🔔 COMPLETE!) Time's Up // Retro Pomodoro`;
    } else {
      const statusPrefix = isRunning ? `[${mins}:${secs}]` : `[PAUSED ${mins}:${secs}]`;
      document.title = `${statusPrefix} ${modeLabel} // Retro Pomodoro`;
    }
  }, [timeLeft, mode, isRunning]);
}
