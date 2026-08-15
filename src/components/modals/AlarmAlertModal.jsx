import React from 'react';
import { RetroButton } from '../common/RetroButton';

export function AlarmAlertModal({ alarm, onDismiss }) {
  if (!alarm) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-[var(--color-danger)]/75 backdrop-blur-[4px] animate-pulse"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="alarm-alert-title"
    >
      <div className="w-full max-w-sm bg-gradient-to-b from-[var(--color-chassis)] to-[var(--color-chassis-dark)] border-4 border-[var(--color-danger)] rounded-[var(--chassis-radius)] shadow-[0_12px_24px_rgba(0,0,0,0.6)] p-6 text-[var(--color-border)] text-center flex flex-col gap-3">
        <h2 id="alarm-alert-title" className="font-['VT323',monospace] text-3xl text-[var(--color-danger)]">
          ⏰ ALARM ALERT
        </h2>

        <div className="font-['VT323',monospace] text-6xl text-[var(--color-danger)] leading-none my-1 tabular-nums">
          {alarm.time}
        </div>

        <div className="font-mono text-sm font-bold opacity-90">
          {alarm.label || 'Scheduled Focus Break / Event'}
        </div>

        <div className="mt-3">
          <RetroButton variant="primary" size="lg" onClick={onDismiss} className="w-full">
            DISMISS ALARM
          </RetroButton>
        </div>
      </div>
    </div>
  );
}
