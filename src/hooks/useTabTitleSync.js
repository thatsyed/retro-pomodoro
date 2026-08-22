import { useEffect } from 'react';

export function useTabTitleSync(timeLeft, mode, isRunning, theme = 'classic') {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const secs = (timeLeft % 60).toString().padStart(2, '0');
    const modeLabel = mode === 'work' ? 'Focus' : mode === 'shortBreak' ? 'Short Break' : 'Long Break';
    const appName = theme === 'minimal' ? 'Dashboard' : 'Retro Pomodoro';

    if (timeLeft === 0) {
      document.title = `(Complete) Time for a break! · ${appName}`;
    } else {
      const statusPrefix = isRunning ? `[${mins}:${secs}]` : `[Paused ${mins}:${secs}]`;
      document.title = `${statusPrefix} ${modeLabel} · ${appName}`;
    }
  }, [timeLeft, mode, isRunning, theme]);
}
