import React, { useState } from 'react';
import { X, Plus, Clock } from 'lucide-react';

export function AddReminderModal({ isOpen, onClose, onAddReminder }) {
  const [title, setTitle] = useState('');
  const [intervalMinutes, setIntervalMinutes] = useState(30);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && intervalMinutes > 0) {
      onAddReminder(title.trim(), intervalMinutes);
      setTitle('');
      setIntervalMinutes(30);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="retro-bezel bg-[var(--bg-deck)] p-5 max-w-md w-full relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center space-x-2 text-[var(--text-primary)]">
            <Clock className="w-4 h-4" />
            <h3 className="font-pixel text-xs tracking-wider">NEW REMINDER</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--text-dim)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reminder-title" className="block text-[10px] font-mono text-[var(--text-dim)] mb-1 uppercase">
              Reminder Title / Focus Action
            </label>
            <input
              id="reminder-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Eye Rest, Drink Water, Stand Up"
              className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] px-3 py-2 text-xs text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--text-primary)]"
            />
          </div>

          <div>
            <label htmlFor="reminder-interval" className="block text-[10px] font-mono text-[var(--text-dim)] mb-1 uppercase">
              Repeat Interval (Minutes): {intervalMinutes} min
            </label>
            <input
              id="reminder-interval"
              type="number"
              min="1"
              max="240"
              required
              value={intervalMinutes}
              onChange={(e) => setIntervalMinutes(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] px-3 py-2 text-xs text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--text-primary)]"
            />
          </div>

          {/* Quick preset buttons */}
          <div className="flex items-center space-x-1.5 text-[10px] font-mono">
            <span className="text-[var(--text-dim)]">PRESETS:</span>
            {[15, 20, 30, 45, 60].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setIntervalMinutes(m)}
                className={`px-2 py-0.5 border text-[9px] cursor-pointer ${
                  intervalMinutes === m
                    ? 'border-[var(--text-primary)] text-[var(--text-primary)] bg-[var(--text-primary)]/10 font-bold'
                    : 'border-[var(--border-color)] text-[var(--text-dim)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {m}m
              </button>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[var(--border-color)]">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-[var(--bg-surface)] text-[var(--text-dim)] border border-[var(--border-color)] hover:text-[var(--text-primary)] font-pixel text-[10px] cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[var(--text-primary)] text-[var(--bg-app)] font-pixel text-[10px] font-bold border border-[var(--text-primary)] shadow-[var(--glow-primary)] cursor-pointer hover:brightness-110 flex items-center space-x-1"
            >
              <Plus className="w-3 h-3 stroke-[3]" />
              <span>CREATE</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
