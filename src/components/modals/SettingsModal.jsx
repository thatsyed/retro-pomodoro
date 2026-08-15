import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { RetroButton } from '../common/RetroButton';
import { DEFAULT_SETTINGS } from '../../types';
import { exportWorkstationData } from '../../hooks/useLocalStorage';

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  allData,
  onImportData
}) {
  const [formData, setFormData] = useState(settings);

  // Sync state on modal open
  React.useEffect(() => {
    if (isOpen) {
      setFormData(settings);
    }
  }, [isOpen, settings]);

  const handleSave = () => {
    onSaveSettings(formData);
    onClose();
  };

  const handleResetDefaults = () => {
    setFormData({ ...DEFAULT_SETTINGS });
  };

  const handleExport = () => {
    exportWorkstationData(allData);
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        onImportData(parsed);
        onClose();
      } catch (err) {
        alert('Invalid JSON backup file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="⚙️ SYSTEM CONFIG"
      maxWidth="max-w-lg"
      footer={
        <>
          <RetroButton variant="danger" size="sm" onClick={handleResetDefaults}>
            DEFAULTS
          </RetroButton>
          <RetroButton variant="primary" size="sm" onClick={handleSave}>
            SAVE CONFIG
          </RetroButton>
        </>
      }
    >
      <div className="flex flex-col gap-3 text-xs font-mono">
        {/* Section 1: Durations */}
        <div className="font-bold border-b border-black/15 pb-1 opacity-80 uppercase tracking-wider">
          Timer Durations (Minutes)
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="cfg-work">Work Session:</label>
          <input
            id="cfg-work"
            type="number"
            min="1"
            max="90"
            value={formData.workDuration}
            onChange={(e) => setFormData({ ...formData, workDuration: parseInt(e.target.value, 10) || 1 })}
            className="w-16 text-center border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] py-1 bg-white font-mono"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="cfg-short">Short Break:</label>
          <input
            id="cfg-short"
            type="number"
            min="1"
            max="30"
            value={formData.shortBreakDuration}
            onChange={(e) => setFormData({ ...formData, shortBreakDuration: parseInt(e.target.value, 10) || 1 })}
            className="w-16 text-center border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] py-1 bg-white font-mono"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="cfg-long">Long Break:</label>
          <input
            id="cfg-long"
            type="number"
            min="1"
            max="60"
            value={formData.longBreakDuration}
            onChange={(e) => setFormData({ ...formData, longBreakDuration: parseInt(e.target.value, 10) || 1 })}
            className="w-16 text-center border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] py-1 bg-white font-mono"
          />
        </div>

        {/* Section 2: Automation */}
        <div className="font-bold border-b border-black/15 pb-1 mt-2 opacity-80 uppercase tracking-wider">
          Automation & Behavior
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="cfg-auto-break">Auto-start Breaks:</label>
          <input
            id="cfg-auto-break"
            type="checkbox"
            checked={formData.autoStartBreaks}
            onChange={(e) => setFormData({ ...formData, autoStartBreaks: e.target.checked })}
            className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="cfg-auto-pomo">Auto-start Pomodoros:</label>
          <input
            id="cfg-auto-pomo"
            type="checkbox"
            checked={formData.autoStartPomos}
            onChange={(e) => setFormData({ ...formData, autoStartPomos: e.target.checked })}
            className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="cfg-daily-goal">Daily Goal (Pomos):</label>
          <input
            id="cfg-daily-goal"
            type="number"
            min="1"
            max="24"
            value={formData.dailyGoal}
            onChange={(e) => setFormData({ ...formData, dailyGoal: parseInt(e.target.value, 10) || 8 })}
            className="w-16 text-center border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] py-1 bg-white font-mono"
          />
        </div>

        {/* Section 3: Audio & SFX */}
        <div className="font-bold border-b border-black/15 pb-1 mt-2 opacity-80 uppercase tracking-wider">
          Audio & Synthesizer
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="cfg-sound">Sound Effects (SFX):</label>
          <input
            id="cfg-sound"
            type="checkbox"
            checked={formData.soundEnabled}
            onChange={(e) => setFormData({ ...formData, soundEnabled: e.target.checked })}
            className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="cfg-volume">Master SFX Volume:</label>
          <input
            id="cfg-volume"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={formData.volume}
            onChange={(e) => setFormData({ ...formData, volume: parseFloat(e.target.value) })}
            className="w-28 accent-[var(--color-primary)] cursor-pointer"
          />
        </div>

        {/* Section 4: CRT Display */}
        <div className="font-bold border-b border-black/15 pb-1 mt-2 opacity-80 uppercase tracking-wider">
          Display & Graphics
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="cfg-scanlines">CRT Scanline Effect:</label>
          <input
            id="cfg-scanlines"
            type="checkbox"
            checked={formData.scanlines}
            onChange={(e) => setFormData({ ...formData, scanlines: e.target.checked })}
            className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer"
          />
        </div>

        {/* Section 5: Data Backup */}
        <div className="font-bold border-b border-black/15 pb-1 mt-2 opacity-80 uppercase tracking-wider">
          Backup & Data Portability
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="flex-1 py-1.5 px-2 bg-white border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] font-bold hover:bg-[var(--color-warning)] transition-colors cursor-pointer text-center"
          >
            💾 Export JSON
          </button>
          <label className="flex-1 py-1.5 px-2 bg-white border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] font-bold hover:bg-[var(--color-warning)] transition-colors cursor-pointer text-center">
            📂 Import JSON
            <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
          </label>
        </div>
      </div>
    </Modal>
  );
}
