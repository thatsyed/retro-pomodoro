import React from 'react';
import { Bell, BellOff, RotateCcw, Trash2 } from 'lucide-react';

export function ReminderItem({ reminder, onToggle, onDelete, onReset }) {
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s.toString().padStart(2, '0')}s`;
  };

  return (
    <div
      className={`p-2 my-1.5 border transition-all duration-150 flex items-center justify-between ${
        reminder.enabled
          ? 'bg-[var(--bg-surface)] border-[var(--border-color)]'
          : 'bg-[var(--bg-surface)]/50 border-[var(--border-color)]/50 opacity-60'
      }`}
    >
      <div className="flex items-center space-x-2.5 flex-1 min-w-0 pr-2">
        {/* Active Toggle Button */}
        <button
          type="button"
          onClick={() => onToggle(reminder.id)}
          className={`w-6 h-6 flex items-center justify-center border transition-all cursor-pointer ${
            reminder.enabled
              ? 'bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--bg-app)] shadow-[var(--glow-primary)]'
              : 'bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-dim)] hover:border-[var(--text-secondary)]'
          }`}
          title={reminder.enabled ? 'Disable Reminder' : 'Enable Reminder'}
          aria-label={reminder.enabled ? 'Disable Reminder' : 'Enable Reminder'}
        >
          {reminder.enabled ? <Bell className="w-3.5 h-3.5 fill-current" /> : <BellOff className="w-3.5 h-3.5" />}
        </button>

        {/* Title and Countdown */}
        <div className="flex-1 min-w-0">
          <div className="text-xs font-mono text-[var(--text-primary)] truncate font-semibold">
            {reminder.title}
          </div>
          <div className="text-[9px] font-mono text-[var(--text-dim)] flex items-center space-x-2">
            <span>INTERVAL: {reminder.intervalMinutes}M</span>
            {reminder.enabled && (
              <span className="text-[var(--accent-secondary)] font-bold">
                NEXT: {formatTime(reminder.secondsRemaining)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-1 shrink-0">
        <button
          type="button"
          onClick={() => onReset(reminder.id)}
          className="text-[var(--text-dim)] hover:text-[var(--text-secondary)] p-1 transition-colors cursor-pointer"
          title="Reset timer"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(reminder.id)}
          className="text-[var(--text-dim)] hover:text-[var(--danger)] p-1 transition-colors cursor-pointer"
          title="Delete reminder"
          aria-label="Delete reminder"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
