import React from 'react';
import { X, Keyboard } from 'lucide-react';

export function KeyboardShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Space', desc: 'Start / Pause Pomodoro Timer' },
    { key: 'Alt + S', desc: 'Skip to next Timer period (Work ↔ Break)' },
    { key: 'Alt + R', desc: 'Reset current countdown' },
    { key: 'Alt + M', desc: 'Master Audio Mute / Unmute' },
    { key: 'Alt + T', desc: 'Focus New Task input field' },
    { key: 'Alt + N', desc: 'Open New Reminder creator' },
    { key: 'Alt + C', desc: 'Toggle CRT Scanlines & Glow shaders' },
    { key: 'Alt + K', desc: 'Open Keyboard Shortcuts cheat-sheet' },
    { key: 'Esc', desc: 'Close open dialogs & modals' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="retro-bezel bg-[var(--bg-deck)] p-5 max-w-md w-full relative">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center space-x-2 text-[var(--text-primary)]">
            <Keyboard className="w-4 h-4" />
            <h3 className="font-pixel text-xs tracking-wider">KEYBOARD SHORTCUTS</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--text-dim)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 font-mono text-xs max-h-[300px] overflow-y-auto pr-1">
          {shortcuts.map((sc) => (
            <div key={sc.key} className="flex items-center justify-between p-1.5 bg-[var(--bg-surface)] border border-[var(--border-color)]">
              <span className="px-2 py-0.5 bg-[var(--bg-app)] border border-[var(--text-primary)] text-[var(--text-primary)] font-bold text-[11px]">
                {sc.key}
              </span>
              <span className="text-[11px] text-[var(--text-dim)] text-right pl-2">
                {sc.desc}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-3 mt-3 border-t border-[var(--border-color)] text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[var(--text-primary)] text-[var(--bg-app)] font-pixel text-[10px] font-bold cursor-pointer hover:brightness-110"
          >
            CLOSE [Esc]
          </button>
        </div>
      </div>
    </div>
  );
}
