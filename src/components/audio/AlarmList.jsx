import React, { useState } from 'react';
import { RetroButton } from '../common/RetroButton';
import { SvgIcon } from '../common/SvgIcon';

export function AlarmList({ alarms, onAddAlarm, onToggleAlarm, onDeleteAlarm }) {
  const [time, setTime] = useState('');
  const [label, setLabel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (time) {
      onAddAlarm(time, label);
      setTime('');
      setLabel('');
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      {/* Alarm Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 z-[6]">
        <div className="flex gap-1.5">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            aria-label="Alarm Time"
            className="retro-input text-xs py-1 px-2 bg-white border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] font-mono text-[var(--color-border)] max-w-[110px]"
          />
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label (optional)"
            maxLength={25}
            aria-label="Alarm Label"
            className="retro-input text-xs py-1 px-2 bg-white border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] font-mono text-[var(--color-border)] flex-1"
          />
        </div>
        <RetroButton variant="primary" size="sm" type="submit">
          <SvgIcon name="BellPlus" size={14} />
          <span>+ SET ALARM</span>
        </RetroButton>
      </form>

      {/* Alarms List */}
      <div className="max-h-[140px] overflow-y-auto pr-1 z-[6]">
        {alarms.length === 0 ? (
          <div className="text-center font-mono text-xs text-[var(--color-screen-text)] opacity-50 py-3">
            NO ALARMS SET
          </div>
        ) : (
          <ul className="flex flex-col gap-1.5" aria-label="Scheduled alarms list">
            {alarms.map((alarm) => (
              <li
                key={alarm.id}
                className={`flex items-center justify-between bg-[var(--color-card)] border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] py-1.5 px-2 shadow-[2px_2px_0_var(--color-btn-shadow)] text-[var(--color-border)] ${
                  !alarm.enabled ? 'opacity-40' : ''
                }`}
              >
                <div className="flex items-baseline gap-2 overflow-hidden flex-1">
                  <span className="font-['VT323',monospace] text-xl leading-none tracking-wide tabular-nums">
                    {alarm.time}
                  </span>
                  <span className="text-xs truncate opacity-80">
                    {alarm.label || 'Alarm'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={alarm.enabled}
                    onChange={() => onToggleAlarm(alarm.id)}
                    aria-label={`Toggle alarm for ${alarm.time}`}
                    className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
                  />
                  <button
                    onClick={() => onDeleteAlarm(alarm.id)}
                    aria-label={`Delete alarm for ${alarm.time}`}
                    className="text-[var(--color-danger)] hover:scale-125 transition-transform p-0.5 cursor-pointer"
                  >
                    <SvgIcon name="Trash2" size={13} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
