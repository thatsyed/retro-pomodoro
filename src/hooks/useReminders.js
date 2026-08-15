import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { soundSynth } from '../services/soundSynth';
import { notificationService } from '../services/notificationService';

const DEFAULT_REMINDERS = [
  {
    id: 'rem-water',
    title: 'Hydration (Drink Water)',
    intervalMinutes: 30,
    enabled: true,
    secondsRemaining: 30 * 60,
  },
  {
    id: 'rem-stretch',
    title: 'Stretch & Stand Up',
    intervalMinutes: 45,
    enabled: true,
    secondsRemaining: 45 * 60,
  },
  {
    id: 'rem-posture',
    title: 'Posture & Spine Check',
    intervalMinutes: 20,
    enabled: false,
    secondsRemaining: 20 * 60,
  },
  {
    id: 'rem-eyes',
    title: 'Eye Rest (20-20-20 Rule)',
    intervalMinutes: 20,
    enabled: false,
    secondsRemaining: 20 * 60,
  },
];

export function useReminders() {
  const [reminders, setReminders] = useLocalStorage('rp_reminders_list', DEFAULT_REMINDERS);

  // Interval ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setReminders((prev) => {
        let changed = false;
        const updated = prev.map((rem) => {
          if (!rem.enabled) return rem;
          changed = true;
          if (rem.secondsRemaining <= 1) {
            // Trigger alert!
            soundSynth.playReminderAlarm();
            notificationService.send(
              `⏰ Reminder: ${rem.title}`,
              `Time for your ${rem.intervalMinutes}-minute ${rem.title} check!`
            );
            return {
              ...rem,
              secondsRemaining: rem.intervalMinutes * 60,
            };
          }
          return {
            ...rem,
            secondsRemaining: rem.secondsRemaining - 1,
          };
        });
        return changed ? updated : prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setReminders]);

  const toggleReminder = useCallback((id) => {
    soundSynth.playButtonClick();
    setReminders((prev) =>
      prev.map((rem) => {
        if (rem.id === id) {
          const nextEnabled = !rem.enabled;
          return {
            ...rem,
            enabled: nextEnabled,
            secondsRemaining: nextEnabled ? rem.intervalMinutes * 60 : rem.secondsRemaining,
          };
        }
        return rem;
      })
    );
  }, [setReminders]);

  const addReminder = useCallback((title, intervalMinutes) => {
    if (!title || !title.trim()) return;
    const mins = Math.max(1, parseInt(intervalMinutes, 10) || 30);
    soundSynth.playButtonClick();
    const newReminder = {
      id: `rem-${Date.now()}`,
      title: title.trim(),
      intervalMinutes: mins,
      enabled: true,
      secondsRemaining: mins * 60,
    };
    setReminders((prev) => [...prev, newReminder]);
  }, [setReminders]);

  const deleteReminder = useCallback((id) => {
    soundSynth.playButtonClick();
    setReminders((prev) => prev.filter((rem) => rem.id !== id));
  }, [setReminders]);

  const resetReminder = useCallback((id) => {
    soundSynth.playButtonClick();
    setReminders((prev) =>
      prev.map((rem) => {
        if (rem.id === id) {
          return {
            ...rem,
            secondsRemaining: rem.intervalMinutes * 60,
          };
        }
        return rem;
      })
    );
  }, [setReminders]);

  return {
    reminders,
    toggleReminder,
    addReminder,
    deleteReminder,
    resetReminder,
  };
}
