import React, { useState } from 'react';
import { X, Settings, Bell, Clock } from 'lucide-react';
import { notificationService } from '../../services/notificationService';
import { soundSynth } from '../../services/soundSynth';

export function SettingsModal({
  isOpen,
  onClose,
  durations,
  onSaveDurations,
  autoStartBreaks,
  onToggleAutoBreaks,
  autoStartPomodoros,
  onToggleAutoPomodoros,
}) {
  const [work, setWork] = useState(durations.work || 25);
  const [shortBreak, setShortBreak] = useState(durations.shortBreak || 5);
  const [longBreak, setLongBreak] = useState(durations.longBreak || 15);
  const [notifState, setNotifState] = useState(notificationService.hasPermission);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    soundSynth.playButtonClick();
    onSaveDurations({
      work: Math.max(1, parseInt(work, 10) || 25),
      shortBreak: Math.max(1, parseInt(shortBreak, 10) || 5),
      longBreak: Math.max(1, parseInt(longBreak, 10) || 15),
    });
    onClose();
  };

  const handleRequestNotif = async () => {
    soundSynth.playButtonClick();
    const granted = await notificationService.requestPermission();
    setNotifState(granted);
    if (granted) {
      notificationService.send('Retro Pomodoro Alerts', 'Desktop notifications enabled successfully!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="retro-bezel bg-[var(--bg-deck)] p-5 max-w-lg w-full relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 mb-4 border-b border-[var(--border-color)]">
          <div className="flex items-center space-x-2 text-[var(--text-primary)]">
            <Settings className="w-4 h-4" />
            <h3 className="font-pixel text-xs tracking-wider">Settings</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--text-dim)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
          {/* Section 1: Timer Durations */}
          <div>
            <div className="flex items-center space-x-1.5 text-[var(--text-primary)] font-bold mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Timer durations (minutes)</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-[var(--bg-surface)] border border-[var(--border-color)]">
                <label htmlFor="setting-focus-mins" className="block text-[9px] text-[var(--text-dim)] mb-1">
                  Focus
                </label>
                <input
                  id="setting-focus-mins"
                  type="number"
                  min="1"
                  max="120"
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                  className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] px-2 py-1 text-[var(--text-primary)] text-center font-bold"
                />
              </div>

              <div className="p-2 bg-[var(--bg-surface)] border border-[var(--border-color)]">
                <label htmlFor="setting-short-break-mins" className="block text-[9px] text-[var(--text-dim)] mb-1">
                  Short break
                </label>
                <input
                  id="setting-short-break-mins"
                  type="number"
                  min="1"
                  max="60"
                  value={shortBreak}
                  onChange={(e) => setShortBreak(e.target.value)}
                  className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] px-2 py-1 text-[var(--text-secondary)] text-center font-bold"
                />
              </div>

              <div className="p-2 bg-[var(--bg-surface)] border border-[var(--border-color)]">
                <label htmlFor="setting-long-break-mins" className="block text-[9px] text-[var(--text-dim)] mb-1">
                  Long break
                </label>
                <input
                  id="setting-long-break-mins"
                  type="number"
                  min="1"
                  max="90"
                  value={longBreak}
                  onChange={(e) => setLongBreak(e.target.value)}
                  className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] px-2 py-1 text-[var(--accent)] text-center font-bold"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Automation Toggles */}
          <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
            <div className="text-[10px] text-[var(--text-primary)] font-bold mb-1">
              Automation
            </div>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[11px] text-[var(--text-dim)]">Auto-start breaks after focus</span>
              <input
                type="checkbox"
                checked={autoStartBreaks}
                onChange={(e) => onToggleAutoBreaks(e.target.checked)}
                className="accent-[var(--text-primary)] w-4 h-4 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[11px] text-[var(--text-dim)]">Auto-start focus after breaks</span>
              <input
                type="checkbox"
                checked={autoStartPomodoros}
                onChange={(e) => onToggleAutoPomodoros(e.target.checked)}
                className="accent-[var(--text-primary)] w-4 h-4 cursor-pointer"
              />
            </label>
          </div>

          {/* Section 3: Desktop Notifications */}
          <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-[var(--text-primary)]" />
              <div>
                <div className="text-[11px] text-[var(--text-primary)] font-bold">Desktop notifications</div>
                <div className="text-[9px] text-[var(--text-dim)]">
                  {notifState ? 'Status: Active' : 'Status: Permission required'}
                </div>
              </div>
            </div>

            {!notifState && (
              <button
                type="button"
                onClick={handleRequestNotif}
                className="px-3 py-1 bg-[var(--text-primary)] text-[var(--bg-app)] font-pixel text-[9px] font-bold cursor-pointer hover:brightness-110"
              >
                Enable
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[var(--border-color)]">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-[var(--bg-surface)] text-[var(--text-dim)] border border-[var(--border-color)] hover:text-[var(--text-primary)] font-pixel text-[10px] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[var(--text-primary)] text-[var(--bg-app)] font-pixel text-[10px] font-bold border border-[var(--text-primary)] shadow-[var(--glow-primary)] cursor-pointer hover:brightness-110"
            >
              Save settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
