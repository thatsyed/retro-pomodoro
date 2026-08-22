import React, { useState, useEffect } from 'react';
import { HeaderBar } from './components/header/HeaderBar';
import { TaskDeck } from './components/tasks/TaskDeck';
import { HeroTimerDeck } from './components/timer/HeroTimerDeck';
import { RemindersDeck } from './components/reminders/RemindersDeck';
import { CrtOverlay } from './components/crt/CrtOverlay';
import { SettingsModal } from './components/settings/SettingsModal';
import { KeyboardShortcutsModal } from './components/settings/KeyboardShortcutsModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTimer } from './hooks/useTimer';
import { useTasks } from './hooks/useTasks';
import { useReminders } from './hooks/useReminders';
import { useTabTitleSync } from './hooks/useTabTitleSync';
import { useKeyboardHotkeys } from './hooks/useKeyboardHotkeys';

export default function App() {
  // Theme & CRT state
  const [theme, setTheme] = useLocalStorage('rp_theme', 'classic');
  const [crtEnabled, setCrtEnabled] = useLocalStorage('rp_crt_enabled', true);

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Timer State & Controls
  const timer = useTimer();

  // Task State & Controls
  const taskStore = useTasks();

  // Reminders State & Controls
  const reminderStore = useReminders();

  // Dynamic Browser Tab Title Synchronizer
  useTabTitleSync(timer.timeLeft, timer.mode, timer.isRunning, theme);

  // Sync active theme to html tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Global Keyboard Shortcuts
  useKeyboardHotkeys({
    onToggleTimer: timer.toggle,
    onSkipTimer: timer.skip,
    onResetTimer: timer.reset,
    onToggleCrt: () => setCrtEnabled((prev) => !prev),
    onOpenShortcuts: () => setIsShortcutsOpen(true),
    onCloseModals: () => {
      setIsSettingsOpen(false);
      setIsShortcutsOpen(false);
    },
  });

  const minimal = theme === 'minimal';

  return (
    <div className={`h-screen overflow-hidden bg-[var(--bg-app)] text-[var(--text-primary)] flex flex-col justify-between p-3 sm:p-4 relative ${minimal ? 'font-sans' : 'font-mono'}`}>
      {/* CRT Scanlines and Phosphor Glow Overlay */}
      <CrtOverlay enabled={crtEnabled && !minimal} />

      <div className="max-w-7xl w-full mx-auto flex-1 min-h-0 flex flex-col">
        {/* Top Console Navigation Bar */}
        <HeaderBar
          currentTheme={theme}
          onThemeChange={setTheme}
          crtEnabled={crtEnabled}
          onToggleCrt={() => setCrtEnabled((prev) => !prev)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
        />

        {/* 3-Deck Console Cockpit Layout */}
        <main className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)] gap-3 flex-1 min-h-0 items-stretch content-start overflow-y-auto lg:content-normal">
          {/* Left Deck: Tasks & Todo Manager (3 cols) */}
          <section className="lg:col-span-3 flex flex-col min-h-0">
            <TaskDeck
              tasks={taskStore.tasks}
              filter={taskStore.filter}
              onFilterChange={taskStore.setFilter}
              onAddTask={taskStore.addTask}
              onToggleTask={taskStore.toggleTask}
              onDeleteTask={taskStore.deleteTask}
              onClearCompleted={taskStore.clearCompleted}
              stats={taskStore.stats}
              theme={theme}
            />
          </section>

          {/* Center Hero Deck: Digital Pomodoro Display & Lo-Fi Cassette Player (6 cols) */}
          <section className="lg:col-span-6 flex flex-col min-h-0">
            <HeroTimerDeck
              mode={timer.mode}
              timeLeft={timer.timeLeft}
              totalDuration={timer.totalDuration}
              isRunning={timer.isRunning}
              completedSessions={timer.completedSessions}
              durations={timer.durations}
              theme={theme}
              onToggle={timer.toggle}
              onSkip={timer.skip}
              onReset={timer.reset}
              onChangeMode={timer.changeMode}
            />
          </section>

          {/* Right Deck: Reminders & Ambient Soundscape Mixer (3 cols) */}
          <section className="lg:col-span-3 flex flex-col min-h-0">
            <RemindersDeck
              reminders={reminderStore.reminders}
              onToggleReminder={reminderStore.toggleReminder}
              onAddReminder={reminderStore.addReminder}
              onDeleteReminder={reminderStore.deleteReminder}
              onResetReminder={reminderStore.resetReminder}
              theme={theme}
            />
          </section>
        </main>

        {/* Bottom Keyboard Shortcuts Strip */}
        {minimal ? (
          <footer className="mt-3 shrink-0 p-3 rounded-2xl border border-border bg-card flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-4 overflow-x-auto py-0.5">
              <span><kbd className="font-medium text-foreground">Space</kbd> Start/Pause</span>
              <span><kbd className="font-medium text-foreground">Alt+S</kbd> Skip</span>
              <span><kbd className="font-medium text-foreground">Alt+R</kbd> Reset</span>
              <span><kbd className="font-medium text-foreground">Alt+M</kbd> Mute</span>
              <span><kbd className="font-medium text-foreground">Alt+T</kbd> Add Task</span>
              <span><kbd className="font-medium text-foreground">Alt+C</kbd> CRT</span>
              <span><kbd className="font-medium text-foreground">Alt+K</kbd> Help</span>
            </div>
            <div className="text-[10px] text-muted-foreground/70">
              Dashboard
            </div>
          </footer>
        ) : (
          <footer className="mt-3 shrink-0 p-2 bg-[var(--bg-deck)] retro-bezel flex flex-wrap items-center justify-between text-[10px] text-[var(--text-dim)] font-mono">
            <div className="flex items-center space-x-3 overflow-x-auto py-0.5">
              <span>Shortcuts:</span>
              <span><strong className="text-[var(--text-primary)]">[Space]</strong> Start/Pause</span>
              <span><strong className="text-[var(--text-primary)]">[Alt+S]</strong> Skip</span>
              <span><strong className="text-[var(--text-primary)]">[Alt+R]</strong> Reset</span>
              <span><strong className="text-[var(--text-primary)]">[Alt+M]</strong> Mute</span>
              <span><strong className="text-[var(--text-primary)]">[Alt+T]</strong> Add Task</span>
              <span><strong className="text-[var(--text-primary)]">[Alt+C]</strong> CRT</span>
              <span><strong className="text-[var(--text-primary)]">[Alt+K]</strong> Help</span>
            </div>
            <div className="text-[9px] text-[var(--text-dim)] tracking-wider">
              Retro Pomodoro
            </div>
          </footer>
        )}
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        durations={timer.durations}
        onSaveDurations={timer.setDurations}
        autoStartBreaks={timer.autoStartBreaks}
        onToggleAutoBreaks={timer.setAutoStartBreaks}
        autoStartPomodoros={timer.autoStartPomodoros}
        onToggleAutoPomodoros={timer.setAutoStartPomodoros}
        theme={theme}
        onThemeChange={setTheme}
        crtEnabled={crtEnabled}
        onToggleCrt={() => setCrtEnabled((prev) => !prev)}
      />

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
