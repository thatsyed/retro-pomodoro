import { useEffect } from 'react';
import { audioPlayer } from '../services/audioPlayer';
import { soundSynth } from '../services/soundSynth';

export function useKeyboardHotkeys({
  onToggleTimer,
  onSkipTimer,
  onResetTimer,
  onToggleCrt,
  onOpenShortcuts,
  onCloseModals,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      const isInputActive = activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select';

      // Spacebar: Start / Pause Timer (if not typing in input)
      if (e.code === 'Space' && !isInputActive) {
        e.preventDefault();
        onToggleTimer();
        return;
      }

      // Escape: Close Modals
      if (e.key === 'Escape') {
        onCloseModals();
        return;
      }

      // Alt Shortcuts
      if (e.altKey) {
        const key = e.key.toLowerCase();
        if (key === 's') {
          e.preventDefault();
          onSkipTimer();
        } else if (key === 'r') {
          e.preventDefault();
          onResetTimer();
        } else if (key === 'm') {
          e.preventDefault();
          soundSynth.playButtonClick();
          audioPlayer.toggle();
        } else if (key === 't') {
          e.preventDefault();
          const taskInput = document.getElementById('task-input');
          if (taskInput) taskInput.focus();
        } else if (key === 'c') {
          e.preventDefault();
          onToggleCrt();
        } else if (key === 'k') {
          e.preventDefault();
          onOpenShortcuts();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleTimer, onSkipTimer, onResetTimer, onToggleCrt, onOpenShortcuts, onCloseModals]);
}
