import React, { useState } from 'react';
import { Bell, Plus } from 'lucide-react';
import { ReminderItem } from './ReminderItem';
import { AddReminderModal } from './AddReminderModal';
import { AmbientMixer } from '../ambient/AmbientMixer';

export function RemindersDeck({
  reminders,
  onToggleReminder,
  onAddReminder,
  onDeleteReminder,
  onResetReminder,
  theme = 'classic',
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const minimal = theme === 'minimal';

  if (minimal) {
    return (
      <div className="rounded-2xl border border-border bg-card p-4 flex flex-col shadow-sm lg:h-full">
        {/* Upper Section: Reminders Panel */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <h2 className="font-sans text-sm font-semibold tracking-tight text-foreground">Reminders</h2>
            </div>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1 text-[11px] font-sans font-medium flex items-center gap-1 cursor-pointer transition-all active:scale-[0.97]"
              title="Create reminder [Alt + N]"
            >
              <Plus className="w-3 h-3" />
              <span>New</span>
            </button>
          </div>

          {/* Reminders List */}
          <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-1.5">
            {reminders.length > 0 ? (
              reminders.map((rem) => (
                <ReminderItem
                  key={rem.id}
                  reminder={rem}
                  onToggle={onToggleReminder}
                  onDelete={onDeleteReminder}
                  onReset={onResetReminder}
                  minimal
                />
              ))
            ) : (
              <div className="text-center p-3 text-xs font-sans text-muted-foreground">
                No reminders set. Click New to add one.
              </div>
            )}
          </div>
        </div>

        {/* Lower Section: Ambient Soundscape Mixer */}
        <AmbientMixer minimal />

        {/* Add Reminder Modal */}
        <AddReminderModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddReminder={onAddReminder}
        />
      </div>
    );
  }

  return (
    <div className="retro-bezel bg-[var(--bg-deck)] p-4 flex flex-col h-full justify-between">
      {/* Upper Section: Reminders Panel */}
      <div>
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border-color)]">
          <div className="flex items-center space-x-2 text-[var(--text-primary)]">
            <Bell className="w-4 h-4" />
            <h2 className="font-pixel text-xs tracking-wider">Reminders</h2>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[var(--text-primary)] text-[var(--bg-app)] hover:bg-[var(--text-secondary)] px-2 py-0.5 font-pixel text-[9px] flex items-center space-x-1 cursor-pointer font-bold"
            title="Create reminder [Alt + N]"
          >
            <Plus className="w-3 h-3 stroke-[3]" />
            <span>New</span>
          </button>
        </div>

        {/* Reminders List */}
        <div className="overflow-y-auto max-h-[170px] pr-1 space-y-1">
          {reminders.length > 0 ? (
            reminders.map((rem) => (
              <ReminderItem
                key={rem.id}
                reminder={rem}
                onToggle={onToggleReminder}
                onDelete={onDeleteReminder}
                onReset={onResetReminder}
              />
            ))
          ) : (
            <div className="text-center p-3 text-[10px] font-mono text-[var(--text-dim)]">
              No reminders set. Click New to add one.
            </div>
          )}
        </div>
      </div>

      {/* Lower Section: Ambient Soundscape Mixer */}
      <AmbientMixer />

      {/* Add Reminder Modal */}
      <AddReminderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddReminder={onAddReminder}
      />
    </div>
  );
}
