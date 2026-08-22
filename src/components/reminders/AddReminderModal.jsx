import React, { useState } from 'react';
import { Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function AddReminderModal({ isOpen, onClose, onAddReminder }) {
  const [title, setTitle] = useState('');
  const [intervalMinutes, setIntervalMinutes] = useState(30);

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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md gap-0 p-0">
        <DialogHeader className="border-b border-border px-5 pt-4 pb-3.5">
          <DialogTitle className="modal-title flex items-center gap-2.5">
            <Clock className="w-4 h-4 shrink-0" />
            New Reminder
          </DialogTitle>
          <DialogDescription className="sr-only">Create a repeating interval reminder.</DialogDescription>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-5 font-mono text-xs">
          <div>
            <label htmlFor="reminder-title" className="block text-[10px] text-muted-foreground mb-1">
              Reminder name
            </label>
            <Input
              id="reminder-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Drink water, Rest eyes, Stretch"
              className="border-border bg-background text-foreground"
            />
          </div>

          <div>
            <label htmlFor="reminder-interval" className="block text-[10px] text-muted-foreground mb-1">
              Repeat every (minutes): {intervalMinutes} min
            </label>
            <Input
              id="reminder-interval"
              type="number"
              min="1"
              max="240"
              required
              value={intervalMinutes}
              onChange={(e) => setIntervalMinutes(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="border-border bg-background text-foreground"
            />
          </div>

          {/* Quick preset buttons */}
          <div className="flex items-center space-x-1.5 text-[10px]">
            <span className="text-muted-foreground">Presets:</span>
            {[15, 20, 30, 45, 60].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setIntervalMinutes(m)}
                className={`rounded-md border px-2 py-0.5 text-[9px] tracking-wider transition-all cursor-pointer ${
                  intervalMinutes === m
                    ? 'border-primary text-primary bg-primary/10 font-bold'
                    : 'border-border text-muted-foreground hover:text-secondary-foreground'
                }`}
              >
                {m}m
              </button>
            ))}
          </div>

          {/* Buttons */}
          <DialogFooter className="gap-2 border-t border-border pt-3 sm:space-x-2">
            <Button type="button" variant="outline" size="sm" onClick={onClose} className="font-pixel text-[10px]">
              Cancel
            </Button>
            <Button type="submit" size="sm" className="font-pixel text-[10px]">
              <Plus className="w-3 h-3 stroke-[3]" />
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
