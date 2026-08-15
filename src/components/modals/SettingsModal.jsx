import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { RetroButton } from '../common/RetroButton';
import { SvgIcon } from '../common/SvgIcon';
import { DEFAULT_SETTINGS, THEMES, SPRITES } from '../../types';
import { exportWorkstationData } from '../../hooks/useLocalStorage';
import {
  playClickSound,
  playAlarmChime,
  playTimerCompleteSound,
  playTaskDoneSound
} from '../../utils/audioSynth';

const TABS = [
  { id: 'appearance', label: 'APPEARANCE', icon: 'Sun' },
  { id: 'timer', label: 'TIMER', icon: 'Clock' },
  { id: 'sound', label: 'SOUND', icon: 'Volume2' },
  { id: 'alarms', label: 'ALARMS', icon: 'AlarmClock' },
  { id: 'data', label: 'DATA', icon: 'Sliders' }
];

const THEME_OPTIONS = [
  {
    id: 'classic',
    label: 'Classic Amber',
    desc: 'Vintage phosphor amber glow',
    primary: '#e0a34b',
    accent: '#779c72',
    bg: '#221715',
    chassis: '#e6d3b3'
  },
  {
    id: 'gameboy',
    label: 'Game Boy LCD',
    desc: 'Olive-green 4-shade matrix',
    primary: '#8ba364',
    accent: '#306230',
    bg: '#181c16',
    chassis: '#c4cfa1'
  },
  {
    id: 'cyberpunk',
    label: 'Cyberpunk 84',
    desc: 'Neon cyan & magenta grid',
    primary: '#00f0ff',
    accent: '#ff007f',
    bg: '#090614',
    chassis: '#1e1638'
  },
  {
    id: 'arcade',
    label: '8-Bit Arcade',
    desc: 'Phosphor green CRT matrix',
    primary: '#22c55e',
    accent: '#dc2626',
    bg: '#111116',
    chassis: '#2c2d35'
  },
  {
    id: 'vaporwave',
    label: 'Vapor Sunset',
    desc: 'Pastel pink & mint twilight',
    primary: '#ff8b94',
    accent: '#a8e6cf',
    bg: '#1c152a',
    chassis: '#dbd0e6'
  }
];

const SPRITE_CHOICES = [
  { id: 'mug', label: 'Cozy Mug', desc: 'Warm Steaming Coffee', icon: 'Coffee' },
  { id: 'cat', label: 'Pixel Cat', desc: 'Playful Calico Feline', icon: 'Cat' },
  { id: 'plant', label: 'Pixel Bonsai', desc: 'Living Desk Sprout', icon: 'Sprout' },
  { id: 'tape', label: 'Cassette Tape', desc: 'Lo-Fi Analog Ribbon', icon: 'CassetteTape' },
  { id: 'ghost', label: 'Pixel Ghost', desc: 'Friendly Spooky Buddy', icon: 'Flame' },
  { id: 'robot', label: 'Pixel Bot', desc: 'Focus Automaton Unit', icon: 'Tv' }
];

const PRESETS = [
  { label: '25 / 5', name: 'Classic Pomodoro', work: 25, short: 5, long: 15 },
  { label: '50 / 10', name: 'Deep Work Session', work: 50, short: 10, long: 20 },
  { label: '15 / 3', name: 'Sprint Burst', work: 15, short: 3, long: 10 }
];

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  allData,
  onImportData,
  alarms: propAlarms,
  onAddAlarm,
  onToggleAlarm,
  onDeleteAlarm
}) {
  const [activeTab, setActiveTab] = useState('appearance');
  const [formData, setFormData] = useState(settings || DEFAULT_SETTINGS);

  // Alarms management inside modal
  const [localAlarms, setLocalAlarms] = useState([]);
  const [alarmTime, setAlarmTime] = useState('');
  const [alarmLabel, setAlarmLabel] = useState('');

  // Sync state on modal open
  useEffect(() => {
    if (isOpen) {
      setFormData(settings || DEFAULT_SETTINGS);
      if (propAlarms) {
        setLocalAlarms(propAlarms);
      } else if (allData?.alarms) {
        setLocalAlarms(allData.alarms);
      }
    }
  }, [isOpen, settings, propAlarms, allData?.alarms]);

  const currentAlarms = propAlarms || localAlarms;

  const handleTabChange = (tabId) => {
    playClickSound(formData.volume, formData.soundEnabled);
    setActiveTab(tabId);
  };

  const handleThemeChange = (newTheme) => {
    setFormData((prev) => ({ ...prev, theme: newTheme }));
    document.documentElement.setAttribute('data-theme', newTheme);
    playClickSound(formData.volume, formData.soundEnabled);
  };

  const handleSave = () => {
    playClickSound(formData.volume, formData.soundEnabled);
    onSaveSettings(formData);
    onClose();
  };

  const handleClose = () => {
    // Revert live preview if canceled
    document.documentElement.setAttribute('data-theme', settings?.theme || 'classic');
    document.body.classList.toggle('no-scanlines', settings?.scanlines === false);
    onClose();
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all workstation settings to factory defaults?')) {
      setFormData({ ...DEFAULT_SETTINGS });
      document.documentElement.setAttribute('data-theme', DEFAULT_SETTINGS.theme);
      document.body.classList.toggle('no-scanlines', false);
      playClickSound(DEFAULT_SETTINGS.volume, DEFAULT_SETTINGS.soundEnabled);
    }
  };

  const handleResetStats = () => {
    if (window.confirm("Reset today's focus stats (completed pomodoros and minutes)?")) {
      if (onImportData && allData) {
        onImportData({
          ...allData,
          stats: {
            date: new Date().toDateString(),
            todayPomos: 0,
            todayFocusMinutes: 0
          }
        });
      }
      playClickSound(formData.volume, formData.soundEnabled);
    }
  };

  const handleExport = () => {
    exportWorkstationData(allData || { settings: formData });
    playClickSound(formData.volume, formData.soundEnabled);
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        if (onImportData) {
          onImportData(parsed);
          alert('Workstation configuration & data successfully imported!');
          onClose();
        }
      } catch (err) {
        alert('Invalid JSON backup file');
      }
    };
    reader.readAsText(file);
  };

  const handleAddAlarmSubmit = (e) => {
    e.preventDefault();
    if (!alarmTime) return;

    if (onAddAlarm) {
      onAddAlarm(alarmTime, alarmLabel);
    } else {
      const newAlarm = {
        id: Date.now().toString(),
        time: alarmTime,
        label: alarmLabel.trim() || 'Alarm',
        enabled: true
      };
      const updated = [...localAlarms, newAlarm];
      setLocalAlarms(updated);
      if (onImportData && allData) {
        onImportData({ ...allData, alarms: updated });
      }
    }

    setAlarmTime('');
    setAlarmLabel('');
    playClickSound(formData.volume, formData.soundEnabled);
  };

  const handleToggleAlarmItem = (id) => {
    if (onToggleAlarm) {
      onToggleAlarm(id);
    } else {
      const updated = localAlarms.map((a) =>
        a.id === id ? { ...a, enabled: !a.enabled } : a
      );
      setLocalAlarms(updated);
      if (onImportData && allData) {
        onImportData({ ...allData, alarms: updated });
      }
    }
    playClickSound(formData.volume, formData.soundEnabled);
  };

  const handleDeleteAlarmItem = (id) => {
    if (onDeleteAlarm) {
      onDeleteAlarm(id);
    } else {
      const updated = localAlarms.filter((a) => a.id !== id);
      setLocalAlarms(updated);
      if (onImportData && allData) {
        onImportData({ ...allData, alarms: updated });
      }
    }
    playClickSound(formData.volume, formData.soundEnabled);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="⚙️ SYSTEM CONFIGURATION"
      maxWidth="max-w-xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="font-mono text-[10px] opacity-60 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
            <span>TAB: {TABS.find((t) => t.id === activeTab)?.label}</span>
          </div>
          <div className="flex gap-2">
            <RetroButton variant="ghost" size="sm" onClick={handleClose}>
              CANCEL
            </RetroButton>
            <RetroButton variant="primary" size="sm" onClick={handleSave}>
              SAVE CONFIG
            </RetroButton>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-3 font-mono">
        {/* Tab Navigation Header */}
        <nav
          className="flex border-b-2 border-[var(--color-border)] gap-1 pb-2 overflow-x-auto scrollbar-none"
          role="tablist"
          aria-label="Configuration categories"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => handleTabChange(tab.id)}
                className={`px-2.5 py-1.5 font-mono text-xs font-bold rounded-[var(--btn-radius)] border-2 transition-all cursor-pointer flex items-center gap-1.5 flex-shrink-0 ${
                  isActive
                    ? 'bg-[var(--color-warning)] text-[var(--color-border)] border-[var(--color-border)] shadow-[1px_1px_0_var(--color-btn-shadow)] translate-y-px'
                    : 'bg-white/70 hover:bg-white text-[var(--color-border)] border-transparent hover:border-[var(--color-border)]/40'
                }`}
              >
                <SvgIcon name={tab.icon} size={13} />
                <span>[{tab.label}]</span>
              </button>
            );
          })}
        </nav>

        {/* Tab 1: APPEARANCE */}
        {activeTab === 'appearance' && (
          <div className="flex flex-col gap-4 text-xs">
            {/* Theme Selector */}
            <div className="flex flex-col gap-2">
              <div className="font-bold border-b border-[var(--color-border)]/20 pb-1 uppercase tracking-wider text-[var(--color-border)] flex items-center justify-between">
                <span>Color Theme Palette</span>
                <span className="text-[10px] font-normal opacity-60">Live Preview</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {THEME_OPTIONS.map((theme) => {
                  const isSelected = formData.theme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => handleThemeChange(theme.id)}
                      className={`p-2.5 rounded-[var(--btn-radius)] border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--color-warning)] text-[var(--color-border)] border-[var(--color-border)] shadow-[2px_2px_0_var(--color-btn-shadow)] font-bold'
                          : 'bg-white/80 hover:bg-white border-[var(--color-border)]/30 text-[var(--color-border)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full border border-black/30 shadow-inner flex-shrink-0"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div>
                          <div className="text-xs font-bold leading-tight">{theme.label}</div>
                          <div className="text-[9px] opacity-70 leading-tight">{theme.desc}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/20"
                          style={{ backgroundColor: theme.accent }}
                          title="Accent"
                        />
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/20"
                          style={{ backgroundColor: theme.chassis }}
                          title="Chassis"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CRT Display */}
            <div className="flex flex-col gap-2 border-t border-[var(--color-border)]/20 pt-3">
              <div className="font-bold border-b border-[var(--color-border)]/20 pb-1 uppercase tracking-wider text-[var(--color-border)]">
                Display & CRT Graphics
              </div>
              <label className="flex items-center justify-between p-2.5 rounded-[var(--btn-radius)] bg-white/70 border border-[var(--color-border)]/30 cursor-pointer hover:bg-white transition-colors">
                <div>
                  <div className="font-bold text-xs">CRT Scanline Overlays</div>
                  <div className="text-[10px] opacity-70">
                    Simulate vintage phosphor scanline artifacts across screens
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.scanlines ?? true}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormData((prev) => ({ ...prev, scanlines: checked }));
                    document.body.classList.toggle('no-scanlines', !checked);
                    playClickSound(formData.volume, formData.soundEnabled);
                  }}
                  className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
                />
              </label>
            </div>

            {/* Companion Sprite Picker */}
            <div className="flex flex-col gap-2 border-t border-[var(--color-border)]/20 pt-3">
              <div className="font-bold border-b border-[var(--color-border)]/20 pb-1 uppercase tracking-wider text-[var(--color-border)] flex items-center justify-between">
                <span>Focus Companion Sprite</span>
                <span className="text-[10px] font-normal opacity-60">
                  Active: {formData.activeSprite?.toUpperCase() || 'MUG'}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SPRITE_CHOICES.map((sprite) => {
                  const isSelected = (formData.activeSprite || 'mug') === sprite.id;
                  return (
                    <button
                      key={sprite.id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, activeSprite: sprite.id }));
                        playClickSound(formData.volume, formData.soundEnabled);
                      }}
                      className={`p-2 rounded-[var(--btn-radius)] border-2 flex flex-col items-center gap-1 transition-all cursor-pointer text-center ${
                        isSelected
                          ? 'bg-[var(--color-warning)] text-[var(--color-border)] border-[var(--color-border)] shadow-[2px_2px_0_var(--color-btn-shadow)] font-bold'
                          : 'bg-white/80 hover:bg-white border-[var(--color-border)]/30 text-[var(--color-border)]'
                      }`}
                    >
                      <SvgIcon name={sprite.icon} size={22} className="text-[var(--color-border)] mt-1" />
                      <span className="font-bold text-xs">{sprite.label}</span>
                      <span className="text-[9px] opacity-70 truncate max-w-full">{sprite.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: TIMER */}
        {activeTab === 'timer' && (
          <div className="flex flex-col gap-4 text-xs">
            {/* Quick Presets */}
            <div className="flex flex-col gap-2">
              <div className="font-bold border-b border-[var(--color-border)]/20 pb-1 uppercase tracking-wider text-[var(--color-border)] flex items-center justify-between">
                <span>Quick Duration Presets</span>
                <span className="text-[10px] font-normal opacity-60">Click to fill durations</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {PRESETS.map((preset) => {
                  const isActive =
                    formData.workDuration === preset.work &&
                    formData.shortBreakDuration === preset.short &&
                    formData.longBreakDuration === preset.long;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          workDuration: preset.work,
                          shortBreakDuration: preset.short,
                          longBreakDuration: preset.long
                        }));
                        playClickSound(formData.volume, formData.soundEnabled);
                      }}
                      className={`py-2 px-1 rounded-[var(--btn-radius)] border-2 font-mono text-center transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[var(--color-warning)] text-[var(--color-border)] border-[var(--color-border)] shadow-[1px_1px_0_var(--color-btn-shadow)] font-bold'
                          : 'bg-white/80 hover:bg-white border-[var(--color-border)]/30 text-[var(--color-border)]'
                      }`}
                    >
                      <div className="font-bold text-xs">{preset.label}</div>
                      <div className="text-[9px] opacity-70 truncate">{preset.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Durations */}
            <div className="flex flex-col gap-2 border-t border-[var(--color-border)]/20 pt-3">
              <div className="font-bold border-b border-[var(--color-border)]/20 pb-1 uppercase tracking-wider text-[var(--color-border)]">
                Session Durations (Minutes)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="cfg-work" className="font-bold text-[11px]">
                    Focus Session:
                  </label>
                  <input
                    id="cfg-work"
                    type="number"
                    min="1"
                    max="120"
                    value={formData.workDuration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        workDuration: parseInt(e.target.value, 10) || 1
                      })
                    }
                    className="w-full text-center border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] py-1.5 bg-white font-mono font-bold text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="cfg-short" className="font-bold text-[11px]">
                    Short Break:
                  </label>
                  <input
                    id="cfg-short"
                    type="number"
                    min="1"
                    max="60"
                    value={formData.shortBreakDuration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shortBreakDuration: parseInt(e.target.value, 10) || 1
                      })
                    }
                    className="w-full text-center border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] py-1.5 bg-white font-mono font-bold text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="cfg-long" className="font-bold text-[11px]">
                    Long Break:
                  </label>
                  <input
                    id="cfg-long"
                    type="number"
                    min="1"
                    max="90"
                    value={formData.longBreakDuration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        longBreakDuration: parseInt(e.target.value, 10) || 1
                      })
                    }
                    className="w-full text-center border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] py-1.5 bg-white font-mono font-bold text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Intervals & Goals */}
            <div className="flex flex-col gap-2 border-t border-[var(--color-border)]/20 pt-3">
              <div className="font-bold border-b border-[var(--color-border)]/20 pb-1 uppercase tracking-wider text-[var(--color-border)]">
                Cycles & Targets
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="flex-1 flex justify-between items-center p-2.5 rounded-[var(--btn-radius)] bg-white/70 border border-[var(--color-border)]/30">
                  <div>
                    <div className="font-bold text-xs">Long Break Interval</div>
                    <div className="text-[10px] opacity-70">Focus rounds before long break</div>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={formData.longBreakInterval ?? 4}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        longBreakInterval: parseInt(e.target.value, 10) || 4
                      })
                    }
                    className="w-14 text-center border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] py-1 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div className="flex-1 flex justify-between items-center p-2.5 rounded-[var(--btn-radius)] bg-white/70 border border-[var(--color-border)]/30">
                  <div>
                    <div className="font-bold text-xs">Daily Goal</div>
                    <div className="text-[10px] opacity-70">Target pomodoros per day</div>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={formData.dailyGoal || 8}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dailyGoal: parseInt(e.target.value, 10) || 8
                      })
                    }
                    className="w-14 text-center border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] py-1 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Automation */}
            <div className="flex flex-col gap-2 border-t border-[var(--color-border)]/20 pt-3">
              <div className="font-bold border-b border-[var(--color-border)]/20 pb-1 uppercase tracking-wider text-[var(--color-border)]">
                Automation Behavior
              </div>
              <label className="flex items-center justify-between p-2.5 rounded-[var(--btn-radius)] bg-white/70 border border-[var(--color-border)]/30 cursor-pointer hover:bg-white transition-colors">
                <div>
                  <div className="font-bold text-xs">Auto-start Breaks</div>
                  <div className="text-[10px] opacity-70">
                    Automatically trigger break countdown when focus period ends
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.autoStartBreaks ?? false}
                  onChange={(e) => {
                    setFormData({ ...formData, autoStartBreaks: e.target.checked });
                    playClickSound(formData.volume, formData.soundEnabled);
                  }}
                  className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between p-2.5 rounded-[var(--btn-radius)] bg-white/70 border border-[var(--color-border)]/30 cursor-pointer hover:bg-white transition-colors">
                <div>
                  <div className="font-bold text-xs">Auto-start Pomodoros</div>
                  <div className="text-[10px] opacity-70">
                    Automatically trigger next focus countdown when break concludes
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.autoStartPomos ?? false}
                  onChange={(e) => {
                    setFormData({ ...formData, autoStartPomos: e.target.checked });
                    playClickSound(formData.volume, formData.soundEnabled);
                  }}
                  className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {/* Tab 3: SOUND */}
        {activeTab === 'sound' && (
          <div className="flex flex-col gap-4 text-xs">
            {/* Master Audio */}
            <div className="flex flex-col gap-2">
              <div className="font-bold border-b border-[var(--color-border)]/20 pb-1 uppercase tracking-wider text-[var(--color-border)]">
                Synthesizer & Sound Effects
              </div>
              <label className="flex items-center justify-between p-2.5 rounded-[var(--btn-radius)] bg-white/70 border border-[var(--color-border)]/30 cursor-pointer hover:bg-white transition-colors">
                <div>
                  <div className="font-bold text-xs">Sound Effects (SFX)</div>
                  <div className="text-[10px] opacity-70">
                    Enable procedural synthesizer audio and button clicks
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.soundEnabled ?? true}
                  onChange={(e) => {
                    setFormData({ ...formData, soundEnabled: e.target.checked });
                    playClickSound(formData.volume, e.target.checked);
                  }}
                  className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
                />
              </label>

              <div className="flex items-center justify-between p-2.5 rounded-[var(--btn-radius)] bg-white/70 border border-[var(--color-border)]/30">
                <div>
                  <div className="font-bold text-xs">Master Volume</div>
                  <div className="text-[10px] opacity-70">
                    Controls overall synthesized chime and click output level
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={formData.volume ?? 0.6}
                    onChange={(e) => setFormData({ ...formData, volume: parseFloat(e.target.value) })}
                    className="w-28 accent-[var(--color-primary)] cursor-pointer"
                  />
                  <span className="w-10 text-right font-bold text-xs tabular-nums">
                    {Math.round((formData.volume ?? 0.6) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Ticking Sound */}
            <div className="flex flex-col gap-2 border-t border-[var(--color-border)]/20 pt-3">
              <div className="font-bold border-b border-[var(--color-border)]/20 pb-1 uppercase tracking-wider text-[var(--color-border)]">
                Mechanical Ticking Clock
              </div>
              <label className="flex items-center justify-between p-2.5 rounded-[var(--btn-radius)] bg-white/70 border border-[var(--color-border)]/30 cursor-pointer hover:bg-white transition-colors">
                <div>
                  <div className="font-bold text-xs">Focus Second Ticking Click</div>
                  <div className="text-[10px] opacity-70">
                    Plays subtle analog click on every passing second in focus mode
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.tickingEnabled ?? false}
                  onChange={(e) => {
                    setFormData({ ...formData, tickingEnabled: e.target.checked });
                    playClickSound(formData.volume, formData.soundEnabled);
                  }}
                  className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
                />
              </label>
            </div>

            {/* Sound Testing */}
            <div className="flex flex-col gap-2 border-t border-[var(--color-border)]/20 pt-3">
              <div className="font-bold border-b border-[var(--color-border)]/20 pb-1 uppercase tracking-wider text-[var(--color-border)]">
                Audio Audition & Sound Checks
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => playAlarmChime(formData.volume, true)}
                  className="p-2 bg-white/80 hover:bg-white border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] text-left flex items-center gap-2 cursor-pointer transition-colors shadow-[2px_2px_0_var(--color-btn-shadow)] active:translate-y-px"
                >
                  <SvgIcon name="AlarmClock" size={16} />
                  <div>
                    <div className="font-bold text-xs">Alarm Chime</div>
                    <div className="text-[9px] opacity-70">High-pitch alert</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => playTimerCompleteSound('work', formData.volume, true)}
                  className="p-2 bg-white/80 hover:bg-white border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] text-left flex items-center gap-2 cursor-pointer transition-colors shadow-[2px_2px_0_var(--color-btn-shadow)] active:translate-y-px"
                >
                  <SvgIcon name="Zap" size={16} />
                  <div>
                    <div className="font-bold text-xs">Fanfare</div>
                    <div className="text-[9px] opacity-70">Work completed</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => playTaskDoneSound(formData.volume, true)}
                  className="p-2 bg-white/80 hover:bg-white border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] text-left flex items-center gap-2 cursor-pointer transition-colors shadow-[2px_2px_0_var(--color-btn-shadow)] active:translate-y-px"
                >
                  <SvgIcon name="CheckSquare" size={16} />
                  <div>
                    <div className="font-bold text-xs">Task Complete</div>
                    <div className="text-[9px] opacity-70">Two-tone chord</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: ALARMS */}
        {activeTab === 'alarms' && (
          <div className="flex flex-col gap-3 text-xs">
            {/* Quick Alarm Adder */}
            <div className="flex flex-col gap-2">
              <div className="font-bold border-b border-[var(--color-border)]/20 pb-1 uppercase tracking-wider text-[var(--color-border)]">
                Add Scheduled Alarm
              </div>
              <form onSubmit={handleAddAlarmSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="time"
                  value={alarmTime}
                  onChange={(e) => setAlarmTime(e.target.value)}
                  required
                  aria-label="Alarm Time"
                  className="py-1.5 px-2 bg-white border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] font-mono text-sm max-w-[120px]"
                />
                <input
                  type="text"
                  value={alarmLabel}
                  onChange={(e) => setAlarmLabel(e.target.value)}
                  placeholder="Alarm label (e.g. Daily Standup)"
                  maxLength={30}
                  aria-label="Alarm Label"
                  className="flex-1 py-1.5 px-2 bg-white border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] font-mono text-xs"
                />
                <RetroButton variant="primary" size="sm" type="submit" className="whitespace-nowrap">
                  <SvgIcon name="BellPlus" size={14} />
                  <span>+ ADD ALARM</span>
                </RetroButton>
              </form>
            </div>

            {/* Alarms List */}
            <div className="flex flex-col gap-2 border-t border-[var(--color-border)]/20 pt-3">
              <div className="font-bold border-b border-[var(--color-border)]/20 pb-1 uppercase tracking-wider text-[var(--color-border)] flex items-center justify-between">
                <span>Configured Alarms ({currentAlarms.length})</span>
                <span className="text-[10px] font-normal opacity-60">
                  {currentAlarms.filter((a) => a.enabled).length} Active
                </span>
              </div>

              <div className="max-h-[220px] overflow-y-auto pr-1 flex flex-col gap-1.5">
                {currentAlarms.length === 0 ? (
                  <div className="text-center py-6 border-2 border-dashed border-[var(--color-border)]/30 rounded-[var(--btn-radius)] bg-white/40 opacity-70">
                    <SvgIcon name="AlarmClock" size={24} className="mx-auto mb-1 opacity-50" />
                    <div className="font-bold">NO ALARMS CONFIGURED</div>
                    <div className="text-[10px]">Add your reminder or meeting time above</div>
                  </div>
                ) : (
                  currentAlarms.map((alarm) => (
                    <div
                      key={alarm.id}
                      className={`flex items-center justify-between bg-white border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] py-1.5 px-3 shadow-[2px_2px_0_var(--color-btn-shadow)] ${
                        !alarm.enabled ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-baseline gap-2 truncate flex-1">
                        <span className="font-['VT323',monospace] text-2xl leading-none tabular-nums font-bold text-[var(--color-border)]">
                          {alarm.time}
                        </span>
                        <span className="text-xs truncate font-bold opacity-85 text-[var(--color-border)]">
                          {alarm.label || 'Scheduled Alert'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <span className="text-[10px] font-mono font-bold">
                            {alarm.enabled ? 'ON' : 'OFF'}
                          </span>
                          <input
                            type="checkbox"
                            checked={alarm.enabled}
                            onChange={() => handleToggleAlarmItem(alarm.id)}
                            aria-label={`Toggle alarm for ${alarm.time}`}
                            className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => handleDeleteAlarmItem(alarm.id)}
                          aria-label={`Delete alarm for ${alarm.time}`}
                          className="text-[var(--color-danger)] hover:scale-125 transition-transform p-1 cursor-pointer"
                          title="Delete alarm"
                        >
                          <SvgIcon name="Trash2" size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: DATA */}
        {activeTab === 'data' && (
          <div className="flex flex-col gap-4 text-xs">
            {/* Backup & Portability */}
            <div className="flex flex-col gap-2">
              <div className="font-bold border-b border-[var(--color-border)]/20 pb-1 uppercase tracking-wider text-[var(--color-border)]">
                Data Portability & Backup
              </div>
              <p className="text-[11px] opacity-75 leading-relaxed">
                Export your entire workstation state (preferences, todo items, alarms, and focus
                history) to a portable JSON backup file, or restore from an existing backup.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                <button
                  type="button"
                  onClick={handleExport}
                  className="py-2.5 px-3 bg-white border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] font-bold hover:bg-[var(--color-warning)] transition-colors cursor-pointer text-center flex items-center justify-center gap-2 shadow-[2px_2px_0_var(--color-btn-shadow)] active:translate-y-px text-xs"
                >
                  <span>💾</span>
                  <span>EXPORT BACKUP (.JSON)</span>
                </button>
                <label className="py-2.5 px-3 bg-white border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] font-bold hover:bg-[var(--color-warning)] transition-colors cursor-pointer text-center flex items-center justify-center gap-2 shadow-[2px_2px_0_var(--color-btn-shadow)] active:translate-y-px text-xs">
                  <span>📂</span>
                  <span>IMPORT BACKUP (.JSON)</span>
                  <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                </label>
              </div>
            </div>

            {/* Reset Controls */}
            <div className="flex flex-col gap-2 border-t border-[var(--color-border)]/20 pt-3">
              <div className="font-bold border-b border-[var(--color-border)]/20 pb-1 uppercase tracking-wider text-[var(--color-border)]">
                System Reset Operations
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleResetStats}
                  className="p-2.5 bg-white border-2 border-[var(--color-warning)] text-[var(--color-border)] rounded-[var(--btn-radius)] font-bold hover:bg-[var(--color-warning)] transition-colors cursor-pointer text-left flex flex-col gap-0.5 shadow-[2px_2px_0_var(--color-btn-shadow)] active:translate-y-px"
                >
                  <div className="flex items-center gap-1.5 text-xs">
                    <span>🔄</span>
                    <span>RESET TODAY'S STATS</span>
                  </div>
                  <div className="text-[9px] font-normal opacity-75">
                    Resets completed pomodoro sessions & focus tally for today
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="p-2.5 bg-white border-2 border-[var(--color-danger)] text-[var(--color-danger)] rounded-[var(--btn-radius)] font-bold hover:bg-[var(--color-danger)] hover:text-white transition-colors cursor-pointer text-left flex flex-col gap-0.5 shadow-[2px_2px_0_var(--color-btn-shadow)] active:translate-y-px"
                >
                  <div className="flex items-center gap-1.5 text-xs">
                    <span>⚠️</span>
                    <span>RESTORE DEFAULTS</span>
                  </div>
                  <div className="text-[9px] font-normal opacity-75">
                    Reverts all timer and audio configs to factory defaults
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
