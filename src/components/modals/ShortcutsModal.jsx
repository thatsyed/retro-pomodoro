import React from 'react';
import { Modal } from '../common/Modal';
import { RetroButton } from '../common/RetroButton';

export function ShortcutsModal({ isOpen, onClose }) {
  const shortcuts = [
    { key: 'SPACE', desc: 'Start or Pause Pomodoro Timer' },
    { key: 'R', desc: 'Reset Timer to initial mode duration' },
    { key: 'W', desc: 'Switch to Work Mode (Focus Session)' },
    { key: 'S', desc: 'Switch to Short Break Mode' },
    { key: 'L', desc: 'Switch to Long Break Mode' },
    { key: 'Z', desc: 'Toggle Distraction-Free Zen Focus Mode' },
    { key: 'M', desc: 'Toggle Lo-Fi Music Play/Pause' },
    { key: '?', desc: 'Open / Close this Shortcuts Guide' },
    { key: 'ESC', desc: 'Close any active dialog modal' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="⌨️ KEYBOARD SHORTCUTS"
      footer={
        <RetroButton variant="primary" onClick={onClose} className="w-full">
          GOT IT
        </RetroButton>
      }
    >
      <div className="flex flex-col gap-2">
        {shortcuts.map((s) => (
          <div
            key={s.key}
            className="flex items-center gap-3 text-xs bg-[var(--color-card)] p-2 rounded-xs border border-[var(--color-border)]"
          >
            <kbd className="font-['VT323',monospace] text-base bg-[var(--color-screen-bg)] border border-[var(--color-border)] text-[var(--color-screen-glow)] py-0.5 px-2 rounded-xs min-w-[65px] text-center">
              {s.key}
            </kbd>
            <span className="font-mono text-[var(--color-border)]">{s.desc}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}
