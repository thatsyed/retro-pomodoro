import React, { useState, useEffect } from 'react';
import { StationHeader } from './components/header/StationHeader';
import { TimerDeck } from './components/timer/TimerDeck';
import { TaskDeck } from './components/tasks/TaskDeck';
import { AudioDeck } from './components/audio/AudioDeck';
import { SettingsModal } from './components/modals/SettingsModal';
import { ShortcutsModal } from './components/modals/ShortcutsModal';
import { AlarmAlertModal } from './components/modals/AlarmAlertModal';

import { useLocalStorage } from './hooks/useLocalStorage';
import { useAudioEngine } from './hooks/useAudioEngine';
import { usePomodoroTimer } from './hooks/usePomodoroTimer';
import { useTaskManager } from './hooks/useTaskManager';
import { useAlarmManager } from './hooks/useAlarmManager';
import { useWakeLock } from './hooks/useWakeLock';
import { DEFAULT_SETTINGS } from './types';

export function App() {
  // 1. Persistent State
  const [settings, setSettings] = useLocalStorage('retro_pomodoro_settings_v2', DEFAULT_SETTINGS);
  const [todos, setTodos] = useLocalStorage('retro_pomodoro_todos_v2', []);
  const [alarms, setAlarms] = useLocalStorage('retro_pomodoro_alarms_v2', []);
  const [stats, setStats] = useLocalStorage('retro_pomodoro_stats_v2', {
    date: new Date().toDateString(),
    todayPomos: 0,
    todayFocusMinutes: 0
  });

  // UI Modal State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [zenMode, setZenMode] = useState(false);
  const [mobileTab, setMobileTab] = useState('deck-timer'); // 'deck-tasks' | 'deck-timer' | 'deck-aux'

  // Apply Theme & Scanlines to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings?.theme || 'classic');
    document.body.classList.toggle('no-scanlines', settings?.scanlines === false);
    document.body.classList.toggle('zen-mode', zenMode);
  }, [settings?.theme, settings?.scanlines, zenMode]);

  // 2. Audio Engine
  const audioEngine = useAudioEngine(settings);

  // 3. Pomodoro Timer
  const timer = usePomodoroTimer(
    settings,
    stats,
    setStats,
    (completedMode) => audioEngine.triggerTimerComplete(completedMode),
    () => {
      if (settings?.tickingEnabled) audioEngine.triggerClick();
    }
  );

  // 4. Task Manager
  const taskManager = useTaskManager(
    todos,
    setTodos,
    () => audioEngine.triggerTaskDone(),
    () => audioEngine.triggerClick()
  );

  // 5. Alarm Manager
  const alarmManager = useAlarmManager(
    alarms,
    setAlarms,
    () => audioEngine.triggerAlarmAlert(),
    () => audioEngine.triggerClick()
  );

  // 6. Screen Wake Lock
  useWakeLock(timer.isRunning || audioEngine.isAudioPlaying);

  // Handlers
  const handleSelectTheme = (newTheme) => {
    audioEngine.triggerClick();
    setSettings((prev) => ({ ...prev, theme: newTheme }));
  };

  const handleSelectSprite = (spriteId) => {
    audioEngine.triggerClick();
    setSettings((prev) => ({ ...prev, activeSprite: spriteId }));
  };

  const handleApplyPreset = (work, short, long) => {
    audioEngine.triggerClick();
    setSettings((prev) => ({
      ...prev,
      workDuration: work,
      shortBreakDuration: short,
      longBreakDuration: long || prev.longBreakDuration
    }));
    timer.resetTimer();
  };

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        audioEngine.triggerClick();
        if (timer.isRunning) {
          timer.stopTimer();
        } else {
          timer.startTimer();
        }
      } else if (e.code === 'KeyR') {
        audioEngine.triggerClick();
        timer.resetTimer();
      } else if (e.code === 'KeyZ') {
        audioEngine.triggerClick();
        setZenMode((prev) => !prev);
      } else if (e.code === 'KeyW') {
        audioEngine.triggerClick();
        timer.switchMode('work');
      } else if (e.code === 'KeyS') {
        audioEngine.triggerClick();
        timer.switchMode('shortBreak');
      } else if (e.code === 'KeyL') {
        audioEngine.triggerClick();
        timer.switchMode('longBreak');
      } else if (e.code === 'KeyM') {
        audioEngine.toggleMusic();
      } else if (e.key === '?' || (e.shiftKey && e.code === 'Slash')) {
        audioEngine.triggerClick();
        setIsShortcutsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [timer, audioEngine]);

  // Import Backup Data
  const handleImportData = (imported) => {
    if (imported.settings) setSettings(imported.settings);
    if (imported.todos) setTodos(imported.todos);
    if (imported.alarms) setAlarms(imported.alarms);
    if (imported.stats) setStats(imported.stats);
    audioEngine.triggerClick();
  };

  return (
    <div className="app-layout">
      <div className="wallpaper-grid" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />

      {/* Top Station Hardware Header */}
      <StationHeader
        theme={settings?.theme || 'classic'}
        onSelectTheme={handleSelectTheme}
        todayPomos={stats?.todayPomos || 0}
        todayFocusMinutes={stats?.todayFocusMinutes || 0}
        zenMode={zenMode}
        onToggleZenMode={() => {
          audioEngine.triggerClick();
          setZenMode((prev) => !prev);
        }}
        onOpenSettings={() => {
          audioEngine.triggerClick();
          setIsSettingsOpen(true);
        }}
        onOpenShortcuts={() => {
          audioEngine.triggerClick();
          setIsShortcutsOpen(true);
        }}
      />

      {/* Mobile Deck Navigation Tabs (visible only on mobile) */}
      <nav className="flex md:hidden bg-[var(--color-chassis)] border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] p-1 gap-1" role="tablist" aria-label="Workstation Decks">
        <button
          role="tab"
          aria-selected={mobileTab === 'deck-timer'}
          onClick={() => {
            audioEngine.triggerClick();
            setMobileTab('deck-timer');
          }}
          className={`flex-1 font-mono text-xs font-bold py-2 px-1 rounded-xs text-center transition-colors ${
            mobileTab === 'deck-timer'
              ? 'bg-[var(--color-screen-bg)] text-[var(--color-screen-glow)]'
              : 'text-[var(--color-border)]'
          }`}
        >
          ⏱️ TIMER
        </button>
        <button
          role="tab"
          aria-selected={mobileTab === 'deck-tasks'}
          onClick={() => {
            audioEngine.triggerClick();
            setMobileTab('deck-tasks');
          }}
          className={`flex-1 font-mono text-xs font-bold py-2 px-1 rounded-xs text-center transition-colors ${
            mobileTab === 'deck-tasks'
              ? 'bg-[var(--color-screen-bg)] text-[var(--color-screen-glow)]'
              : 'text-[var(--color-border)]'
          }`}
        >
          📝 TASKS ({taskManager.allTodosCount})
        </button>
        <button
          role="tab"
          aria-selected={mobileTab === 'deck-aux'}
          onClick={() => {
            audioEngine.triggerClick();
            setMobileTab('deck-aux');
          }}
          className={`flex-1 font-mono text-xs font-bold py-2 px-1 rounded-xs text-center transition-colors ${
            mobileTab === 'deck-aux'
              ? 'bg-[var(--color-screen-bg)] text-[var(--color-screen-glow)]'
              : 'text-[var(--color-border)]'
          }`}
        >
          🎵 AUDIO
        </button>
      </nav>

      {/* Main 3-Deck Workstation Layout: Left = Tasks, Center = Pomodoro Timer, Right = Audio & Alarms */}
      <main className="workstation-container" id="workstation-container">
        {/* LEFT DECK: Task Operations Log */}
        <div className={mobileTab === 'deck-tasks' ? 'block' : 'hidden md:block'}>
          <TaskDeck
            todos={taskManager.todos}
            stats={taskManager.stats}
            filter={taskManager.filter}
            onSetFilter={taskManager.setFilter}
            onAddTodo={taskManager.addTodo}
            onToggleTodo={taskManager.toggleTodo}
            onDeleteTodo={taskManager.deleteTodo}
            onClearDone={taskManager.clearDone}
          />
        </div>

        {/* CENTER DECK: Primary Pomodoro Engine (Main Product) */}
        <div className={`deck-center-wrapper ${mobileTab === 'deck-timer' ? 'block' : 'hidden md:block'}`}>
          <TimerDeck
            currentMode={timer.currentMode}
            timerState={timer.timerState}
            timeRemaining={timer.timeRemaining}
            strokeDashoffset={timer.strokeDashoffset}
            completedSessions={timer.completedSessions}
            currentClock={alarmManager.currentClock}
            activeSprite={settings?.activeSprite || 'mug'}
            onSelectSprite={handleSelectSprite}
            onSwitchMode={(mode) => {
              audioEngine.triggerClick();
              timer.switchMode(mode);
            }}
            onStart={() => {
              audioEngine.triggerClick();
              timer.startTimer();
            }}
            onPause={() => {
              audioEngine.triggerClick();
              timer.stopTimer();
            }}
            onReset={() => {
              audioEngine.triggerClick();
              timer.resetTimer();
            }}
            onApplyPreset={handleApplyPreset}
            onOpenCustomSettings={() => setIsSettingsOpen(true)}
            dailyGoal={settings?.dailyGoal || 8}
          />
        </div>

        {/* RIGHT DECK: Audio & Alarms Subsystem */}
        <div className={mobileTab === 'deck-aux' ? 'block' : 'hidden md:block'}>
          <AudioDeck
            isPlayingMusic={audioEngine.isPlayingMusic}
            currentTrackIndex={audioEngine.currentTrackIndex}
            currentTrack={audioEngine.currentTrack}
            musicVolume={audioEngine.musicVolume}
            onSetMusicVolume={audioEngine.setMusicVolume}
            currentTime={audioEngine.currentTime}
            duration={audioEngine.duration}
            isMuted={audioEngine.isMuted}
            onToggleMute={audioEngine.toggleMute}
            onSeek={audioEngine.seek}
            onToggleMusic={audioEngine.toggleMusic}
            onSelectTrack={audioEngine.playTrack}
            onNextTrack={audioEngine.nextTrack}
            onPrevTrack={audioEngine.prevTrack}
            activeAmbient={audioEngine.activeAmbient}
            onToggleAmbient={audioEngine.toggleAmbient}
            alarms={alarmManager.alarms}
            onAddAlarm={alarmManager.addAlarm}
            onToggleAlarm={alarmManager.toggleAlarm}
            onDeleteAlarm={alarmManager.deleteAlarm}
            isAudioPlaying={audioEngine.isAudioPlaying}
          />
        </div>
      </main>

      {/* Keyboard Shortcuts Legend Footer */}
      <footer className="keyboard-legend flex flex-col items-center gap-2 p-2 text-[var(--color-screen-text)] opacity-85">
        <div className="flex justify-center items-center gap-4 flex-wrap text-xs">
          <span><kbd>SPACE</kbd> START/PAUSE</span>
          <span><kbd>R</kbd> RESET</span>
          <span><kbd>Z</kbd> ZEN MODE</span>
          <span><kbd>W</kbd>/<kbd>S</kbd>/<kbd>L</kbd> MODES</span>
          <span><kbd>M</kbd> MUSIC</span>
          <span><kbd>?</kbd> SHORTCUTS</span>
        </div>
        <div className="text-[10px] tracking-wider opacity-60">
          RETRO WORKSTATION v2.0 • BUILT WITH VITE, REACT & TAILWIND
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={(newSettings) => {
          setSettings(newSettings);
          timer.resetTimer();
        }}
        allData={{ settings, todos, alarms, stats }}
        onImportData={handleImportData}
      />

      {/* Shortcuts Guide Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Active Alarm Alert Popup */}
      <AlarmAlertModal
        alarm={alarmManager.activeAlertAlarm}
        onDismiss={alarmManager.dismissAlert}
      />
    </div>
  );
}
