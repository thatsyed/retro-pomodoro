import React from 'react';
import { Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function KeyboardShortcutsModal({ isOpen, onClose }) {
  const shortcuts = [
    { key: 'Space', desc: 'Start / Pause timer' },
    { key: 'Alt + S', desc: 'Skip to next period (Focus ↔ Break)' },
    { key: 'Alt + R', desc: 'Reset current countdown' },
    { key: 'Alt + M', desc: 'Mute / Unmute music tape' },
    { key: 'Alt + T', desc: 'Focus add task input' },
    { key: 'Alt + N', desc: 'Open new reminder creator' },
    { key: 'Alt + C', desc: 'Toggle CRT scanlines & glow' },
    { key: 'Alt + K', desc: 'Open shortcuts cheat-sheet' },
    { key: 'Esc', desc: 'Close open dialogs' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md gap-0 p-0">
        <DialogHeader className="border-b border-border px-5 pt-4 pb-3.5">
          <DialogTitle className="modal-title flex items-center gap-2.5">
            <Keyboard className="w-4 h-4 shrink-0" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription className="sr-only">List of available keyboard shortcuts.</DialogDescription>
        </DialogHeader>

        <div className="space-y-2 p-5 pb-0 font-mono text-xs max-h-[300px] overflow-y-auto pr-1">
          {shortcuts.map((sc) => (
            <div
              key={sc.key}
              className="flex items-center justify-between rounded-md border border-border bg-muted/40 p-1.5"
            >
              <kbd className="rounded-xs border border-primary bg-background px-2 py-0.5 text-primary font-bold text-[11px]">
                {sc.key}
              </kbd>
              <span className="text-[11px] text-muted-foreground text-right pl-2">{sc.desc}</span>
            </div>
          ))}
        </div>

        <DialogFooter className="border-t border-border p-5 pt-3 mt-3">
          <Button type="button" size="sm" onClick={onClose} className="font-pixel text-[10px]">
            Close [Esc]
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
