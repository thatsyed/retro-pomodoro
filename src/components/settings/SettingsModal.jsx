import React, { useState } from 'react';
import { Settings, Bell, Clock } from 'lucide-react';
import { notificationService } from '../../services/notificationService';
import { soundSynth } from '../../services/soundSynth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function SettingsModal({
  isOpen,
  onClose,
  durations,
  onSaveDurations,
  autoStartBreaks,
  onToggleAutoBreaks,
  autoStartPomodoros,
  onToggleAutoPomodoros,
  theme,
  onThemeChange,
  crtEnabled,
  onToggleCrt,
}) {
  const [work, setWork] = useState(durations.work || 25);
  const [shortBreak, setShortBreak] = useState(durations.shortBreak || 5);
  const [longBreak, setLongBreak] = useState(durations.longBreak || 15);
  const [notifState, setNotifState] = useState(notificationService.hasPermission);

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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg gap-0 p-0">
        <DialogHeader className="border-b border-border px-5 pt-4 pb-3.5">
          <DialogTitle className="modal-title flex items-center gap-2.5">
            <Settings className="w-4 h-4 shrink-0" />
            Settings
          </DialogTitle>
          <DialogDescription className="sr-only">Configure timer durations, automation and notifications.</DialogDescription>
        </DialogHeader>

        {/* Settings Form */}
        <form onSubmit={handleSave} className="space-y-4 p-5 font-mono text-xs">
          {/* Section 1: Timer Durations */}
          <div>
            <div className="flex items-center space-x-1.5 text-foreground font-bold mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Timer durations (minutes)</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-md border border-border bg-muted/40 p-2">
                <label htmlFor="setting-focus-mins" className="block text-[9px] text-muted-foreground mb-1">
                  Focus
                </label>
                <Input
                  id="setting-focus-mins"
                  type="number"
                  min="1"
                  max="120"
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                  className="h-auto border-border bg-background px-2 py-1 text-center font-bold text-foreground"
                />
              </div>

              <div className="rounded-md border border-border bg-muted/40 p-2">
                <label htmlFor="setting-short-break-mins" className="block text-[9px] text-muted-foreground mb-1">
                  Short break
                </label>
                <Input
                  id="setting-short-break-mins"
                  type="number"
                  min="1"
                  max="60"
                  value={shortBreak}
                  onChange={(e) => setShortBreak(e.target.value)}
                  className="h-auto border-border bg-background px-2 py-1 text-center font-bold text-secondary-foreground"
                />
              </div>

              <div className="rounded-md border border-border bg-muted/40 p-2">
                <label htmlFor="setting-long-break-mins" className="block text-[9px] text-muted-foreground mb-1">
                  Long break
                </label>
                <Input
                  id="setting-long-break-mins"
                  type="number"
                  min="1"
                  max="90"
                  value={longBreak}
                  onChange={(e) => setLongBreak(e.target.value)}
                  className="h-auto border-border bg-background px-2 py-1 text-center font-bold text-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Automation Toggles */}
          <div className="space-y-2 rounded-md border border-border bg-muted/40 p-3">
            <div className="text-[10px] text-foreground font-bold mb-1">Automation</div>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[11px] text-muted-foreground">Auto-start breaks after focus</span>
              <input
                type="checkbox"
                checked={autoStartBreaks}
                onChange={(e) => onToggleAutoBreaks(e.target.checked)}
                className="accent-primary w-4 h-4 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[11px] text-muted-foreground">Auto-start focus after breaks</span>
              <input
                type="checkbox"
                checked={autoStartPomodoros}
                onChange={(e) => onToggleAutoPomodoros(e.target.checked)}
                className="accent-primary w-4 h-4 cursor-pointer"
              />
            </label>
          </div>

          {/* Section 3: Appearance */}
          <div className="space-y-2.5 rounded-md border border-border bg-muted/40 p-3">
            <div className="text-[10px] text-foreground font-bold mb-1">Appearance</div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Theme variant</span>
              <div className="flex items-center gap-1 p-0.5 rounded-full bg-secondary/60">
                {[{ id: 'classic', name: 'Classic' }, { id: 'minimal', name: 'Minimal' }].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      soundSynth.playButtonClick();
                      onThemeChange(t.id);
                    }}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium transition-all cursor-pointer ${
                      theme === t.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">CRT scanlines</span>
              <Switch
                checked={crtEnabled}
                onCheckedChange={(v) => {
                  soundSynth.playButtonClick();
                  onToggleCrt(v);
                }}
                title="Toggle CRT scanlines [Alt + C]"
              />
            </div>
          </div>

          {/* Section 4: Desktop Notifications */}
          <div className="flex items-center justify-between rounded-md border border-border bg-muted/40 p-3">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-foreground" />
              <div>
                <div className="text-[11px] text-foreground font-bold">Desktop notifications</div>
                <div className="text-[9px] text-muted-foreground">
                  {notifState ? 'Status: Active' : 'Status: Permission required'}
                </div>
              </div>
            </div>

            {!notifState && (
              <Button type="button" onClick={handleRequestNotif} size="sm" className="font-pixel text-[9px]">
                Enable
              </Button>
            )}
          </div>

          {/* Actions */}
          <DialogFooter className="gap-2 border-t border-border pt-3 sm:space-x-2">
            <Button type="button" variant="outline" size="sm" onClick={onClose} className="font-pixel text-[10px]">
              Cancel
            </Button>
            <Button type="submit" size="sm" className="font-pixel text-[10px]">
              Save settings
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
