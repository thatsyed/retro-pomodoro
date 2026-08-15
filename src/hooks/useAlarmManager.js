import { useState, useEffect, useCallback, useRef } from 'react';
import { generateId, formatClockTime } from '../utils/formatters';

export function useAlarmManager(alarms, setAlarms, onAlarmTrigger, onClick) {
  const [activeAlertAlarm, setActiveAlertAlarm] = useState(null);
  const [currentClock, setCurrentClock] = useState(() => formatClockTime());
  const lastCheckedDateRef = useRef(new Date().toDateString());
  const alertIntervalRef = useRef(null);

  const addAlarm = useCallback((time, label) => {
    if (!time) return;
    const newAlarm = {
      id: generateId('alarm'),
      time,
      label: (label || '').trim(),
      enabled: true,
      firedToday: false
    };
    setAlarms((prev) => [...prev, newAlarm].sort((a, b) => a.time.localeCompare(b.time)));
    onClick?.();
  }, [setAlarms, onClick]);

  const toggleAlarm = useCallback((id) => {
    setAlarms((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return { ...a, enabled: !a.enabled, firedToday: a.enabled ? a.firedToday : false };
        }
        return a;
      })
    );
    onClick?.();
  }, [setAlarms, onClick]);

  const deleteAlarm = useCallback((id) => {
    setAlarms((prev) => prev.filter((a) => a.id !== id));
    onClick?.();
  }, [setAlarms, onClick]);

  const dismissAlert = useCallback(() => {
    setActiveAlertAlarm(null);
    if (alertIntervalRef.current) {
      clearInterval(alertIntervalRef.current);
      alertIntervalRef.current = null;
    }
    onClick?.();
  }, [onClick]);

  // Main 1-second clock loop & alarm checker
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentClock(formatClockTime(now));

      // Midnight rollover
      const todayDate = now.toDateString();
      if (todayDate !== lastCheckedDateRef.current) {
        lastCheckedDateRef.current = todayDate;
        setAlarms((prev) => prev.map((a) => ({ ...a, firedToday: false })));
      }

      // Check alarms
      const currentHM = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      alarms.forEach((alarm) => {
        if (alarm.enabled && !alarm.firedToday && alarm.time === currentHM) {
          // Mark fired
          setAlarms((prev) =>
            prev.map((a) => (a.id === alarm.id ? { ...a, firedToday: true } : a))
          );
          setActiveAlertAlarm(alarm);
          onAlarmTrigger?.(alarm);

          if (alertIntervalRef.current) clearInterval(alertIntervalRef.current);
          alertIntervalRef.current = setInterval(() => {
            onAlarmTrigger?.(alarm);
          }, 1400);
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      if (alertIntervalRef.current) clearInterval(alertIntervalRef.current);
    };
  }, [alarms, onAlarmTrigger, setAlarms]);

  return {
    alarms,
    currentClock,
    activeAlertAlarm,
    addAlarm,
    toggleAlarm,
    deleteAlarm,
    dismissAlert
  };
}
