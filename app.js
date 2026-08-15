// ==========================================================================
// RETRO POMODORO WORKSTATION - APP LOGIC & AUDIO ENGINE v2.0
// ==========================================================================

// --------------------------------------------------------------------------
// 1. DOM Element Selectors
// --------------------------------------------------------------------------
// Hardware Header & Themes
const themeSelect = document.getElementById('theme-select');
const stationStatsPill = document.getElementById('station-stats-pill');
const headerPomoCount = document.getElementById('header-pomo-count');
const headerFocusMins = document.getElementById('header-focus-mins');
const btnShortcuts = document.getElementById('btn-shortcuts');
const btnZenMode = document.getElementById('btn-zen-mode');
const btnSettings = document.getElementById('btn-settings');
const liveClock = document.getElementById('live-clock');

// Center Deck (Timer & Sprite)
const ledIndicator = document.getElementById('led-indicator');
const modeStatusText = document.getElementById('mode-status-text');
const modeWorkBtn = document.getElementById('mode-work');
const modeShortBtn = document.getElementById('mode-short');
const modeLongBtn = document.getElementById('mode-long');
const timeDisplay = document.getElementById('time-display');
const timerRingProgress = document.getElementById('timer-ring-progress');
const timerCycleLabel = document.getElementById('timer-cycle-label');
const cozySprite = document.getElementById('cozy-sprite');
const spriteSelectBtns = document.querySelectorAll('.sprite-select-btn');
const spriteItems = document.querySelectorAll('.sprite-item');
const tallyCount = document.getElementById('tally-count');
const tallyGoalText = document.getElementById('tally-goal-text');
const tallyDotsContainer = document.getElementById('tally-dots');
const startBtn = document.getElementById('btn-start');
const pauseBtn = document.getElementById('btn-pause');
const resetBtn = document.getElementById('btn-reset');
const presetBtns = document.querySelectorAll('.preset-btn');

// Left Deck (Tasks)
const formTodo = document.getElementById('form-todo');
const inputTodoText = document.getElementById('input-todo-text');
const inputTodoPriority = document.getElementById('input-todo-priority');
const todosList = document.getElementById('todos-list');
const todosEmpty = document.getElementById('todos-empty');
const taskStats = document.getElementById('task-stats');
const taskProgressBar = document.getElementById('task-progress-bar');
const progressPercentageLabel = document.getElementById('progress-percentage-label');
const filterBtns = document.querySelectorAll('.filter-btn');
const btnClearDone = document.getElementById('btn-clear-done');
const mobileTaskCount = document.getElementById('mobile-task-count');

// Right Deck (Audio & Alarms)
const bgMusicAudio = document.getElementById('bg-music');
const eqVisualizer = document.getElementById('eq-visualizer');
const musicTrackList = document.getElementById('music-track-list');
const musicNowPlaying = document.getElementById('music-now-playing');
const btnMusicToggle = document.getElementById('btn-music-toggle');
const musicVolumeSlider = document.getElementById('music-volume');
const volLevelText = document.getElementById('vol-level-text');
const ambientBtns = document.querySelectorAll('.ambient-btn');
const formAlarm = document.getElementById('form-alarm');
const inputAlarmTime = document.getElementById('input-alarm-time');
const inputAlarmLabel = document.getElementById('input-alarm-label');
const alarmsList = document.getElementById('alarms-list');
const alarmsEmpty = document.getElementById('alarms-empty');
const alarmCountBadge = document.getElementById('alarm-count-badge');

// Modals & Navigation
const settingsModal = document.getElementById('settings-modal');
const btnModalClose = document.getElementById('btn-modal-close');
const modalSaveBtn = document.getElementById('btn-settings-save');
const modalDefaultBtn = document.getElementById('btn-settings-default');
const inputWork = document.getElementById('input-work');
const inputShort = document.getElementById('input-short');
const inputLong = document.getElementById('input-long');
const toggleAutoStartBreak = document.getElementById('toggle-auto-start-break');
const toggleAutoStartPomo = document.getElementById('toggle-auto-start-pomo');
const inputDailyGoal = document.getElementById('input-daily-goal');
const toggleSound = document.getElementById('toggle-sound');
const toggleTicking = document.getElementById('toggle-ticking');
const inputVolume = document.getElementById('input-volume');
const toggleScanlines = document.getElementById('toggle-scanlines');

const shortcutsModal = document.getElementById('shortcuts-modal');
const btnShortcutsClose = document.getElementById('btn-shortcuts-close');
const btnShortcutsOk = document.getElementById('btn-shortcuts-ok');

const alarmAlertModal = document.getElementById('alarm-alert-modal');
const alarmAlertTime = document.getElementById('alarm-alert-time');
const alarmAlertLabel = document.getElementById('alarm-alert-label');
const btnAlarmDismiss = document.getElementById('btn-alarm-dismiss');

const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
const consoleDecks = document.querySelectorAll('.console-deck');

// --------------------------------------------------------------------------
// 2. Constants & Tracks
// --------------------------------------------------------------------------
const RING_CIRCUMFERENCE = 2 * Math.PI * 90; // ~565.488

const DEFAULT_SETTINGS = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  autoStartBreaks: false,
  autoStartPomos: false,
  dailyGoal: 8,
  soundEnabled: true,
  tickingEnabled: false,
  volume: 0.6,
  scanlines: true,
  theme: 'classic',
  activeSprite: 'mug'
};

const MUSIC_TRACKS = [
  { id: 0, name: 'Morning Coffee', src: 'sounds/music/morning-coffee.wav' },
  { id: 1, name: 'Lo-Fi Chill', src: 'sounds/music/lofi-chill.wav' },
  { id: 2, name: 'Starlit Focus', src: 'sounds/music/starlit-focus.wav' }
];

// --------------------------------------------------------------------------
// 3. Application State
// --------------------------------------------------------------------------
let appState = {
  currentMode: 'work', // 'work' | 'shortBreak' | 'longBreak'
  timerState: 'paused', // 'paused' | 'running'
  timeRemaining: 1500, // in seconds
  totalDurationForMode: 1500,
  targetTime: null,
  completedSessions: 0,
  todoFilter: 'all', // 'all' | 'active' | 'done'
  zenMode: false,
  settings: { ...DEFAULT_SETTINGS },
  todos: [],
  alarms: [],
  music: {
    enabled: false,
    trackIndex: 0,
    volume: 0.4
  },
  ambientActive: null, // null | 'rain' | 'vinyl' | 'pinknoise' | 'cafe'
  stats: {
    date: new Date().toDateString(),
    todayPomos: 0,
    todayFocusMinutes: 0
  }
};

let timerInterval = null;
let clockInterval = null;
let alarmAlertInterval = null;
let tickingSoundInterval = null;
let lastCheckedDate = new Date().toDateString();

// --------------------------------------------------------------------------
// 4. Settings & Theme Management
// --------------------------------------------------------------------------
function loadSettings() {
  const saved = localStorage.getItem('retro_pomodoro_settings_v2');
  if (saved) {
    try {
      appState.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Failed to parse settings', e);
      appState.settings = { ...DEFAULT_SETTINGS };
    }
  } else {
    // Check v1 legacy fallback
    const legacy = localStorage.getItem('retro_pomodoro_settings');
    if (legacy) {
      try {
        appState.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(legacy) };
      } catch (e) {
        appState.settings = { ...DEFAULT_SETTINGS };
      }
    } else {
      appState.settings = { ...DEFAULT_SETTINGS };
    }
  }

  // Populate Config Inputs
  inputWork.value = appState.settings.workDuration;
  inputShort.value = appState.settings.shortBreakDuration;
  inputLong.value = appState.settings.longBreakDuration;
  toggleAutoStartBreak.checked = !!appState.settings.autoStartBreaks;
  toggleAutoStartPomo.checked = !!appState.settings.autoStartPomos;
  inputDailyGoal.value = appState.settings.dailyGoal || 8;
  toggleSound.checked = appState.settings.soundEnabled;
  toggleTicking.checked = !!appState.settings.tickingEnabled;
  inputVolume.value = appState.settings.volume;
  toggleScanlines.checked = appState.settings.scanlines !== false;

  // Apply Theme & Scanlines
  applyTheme(appState.settings.theme || 'classic');
  applyScanlines(appState.settings.scanlines !== false);
  setActiveSprite(appState.settings.activeSprite || 'mug', false);

  updateDurationFromMode();
}

function saveSettings() {
  const workVal = parseInt(inputWork.value, 10);
  const shortVal = parseInt(inputShort.value, 10);
  const longVal = parseInt(inputLong.value, 10);
  const goalVal = parseInt(inputDailyGoal.value, 10);
  
  appState.settings.workDuration = isNaN(workVal) ? DEFAULT_SETTINGS.workDuration : Math.max(1, Math.min(90, workVal));
  appState.settings.shortBreakDuration = isNaN(shortVal) ? DEFAULT_SETTINGS.shortBreakDuration : Math.max(1, Math.min(30, shortVal));
  appState.settings.longBreakDuration = isNaN(longVal) ? DEFAULT_SETTINGS.longBreakDuration : Math.max(1, Math.min(60, longVal));
  appState.settings.dailyGoal = isNaN(goalVal) ? 8 : Math.max(1, Math.min(24, goalVal));
  
  appState.settings.autoStartBreaks = toggleAutoStartBreak.checked;
  appState.settings.autoStartPomos = toggleAutoStartPomo.checked;
  appState.settings.soundEnabled = toggleSound.checked;
  appState.settings.tickingEnabled = toggleTicking.checked;
  
  const volumeVal = parseFloat(inputVolume.value);
  appState.settings.volume = isNaN(volumeVal) ? DEFAULT_SETTINGS.volume : Math.max(0, Math.min(1, volumeVal));
  appState.settings.scanlines = toggleScanlines.checked;

  applyScanlines(appState.settings.scanlines);
  localStorage.setItem('retro_pomodoro_settings_v2', JSON.stringify(appState.settings));
}

function applyTheme(themeName) {
  appState.settings.theme = themeName;
  document.documentElement.setAttribute('data-theme', themeName);
  if (themeSelect) {
    themeSelect.value = themeName;
  }
  localStorage.setItem('retro_pomodoro_settings_v2', JSON.stringify(appState.settings));
}

function applyScanlines(enabled) {
  document.body.classList.toggle('no-scanlines', !enabled);
}

// --------------------------------------------------------------------------
// 5. Daily Stats & Streak Tracking
// --------------------------------------------------------------------------
function loadStats() {
  const today = new Date().toDateString();
  const saved = localStorage.getItem('retro_pomodoro_stats');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) {
        appState.stats = parsed;
      } else {
        appState.stats = { date: today, todayPomos: 0, todayFocusMinutes: 0 };
      }
    } catch (e) {
      appState.stats = { date: today, todayPomos: 0, todayFocusMinutes: 0 };
    }
  } else {
    appState.stats = { date: today, todayPomos: 0, todayFocusMinutes: 0 };
  }
  renderStats();
}

function saveStats() {
  localStorage.setItem('retro_pomodoro_stats', JSON.stringify(appState.stats));
  renderStats();
}

function renderStats() {
  if (headerPomoCount) headerPomoCount.textContent = appState.stats.todayPomos;
  if (headerFocusMins) headerFocusMins.textContent = appState.stats.todayFocusMinutes;
  if (tallyGoalText) {
    const goal = appState.settings.dailyGoal || 8;
    tallyGoalText.textContent = `Daily Goal: ${appState.stats.todayPomos}/${goal}`;
  }
}

// --------------------------------------------------------------------------
// 6. Interactive Companion Sprites
// --------------------------------------------------------------------------
function setActiveSprite(spriteId, playSound = true) {
  appState.settings.activeSprite = spriteId;
  spriteItems.forEach(item => {
    item.classList.toggle('active', item.id === `sprite-${spriteId}`);
  });
  spriteSelectBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-sprite') === spriteId);
  });
  if (playSound) {
    triggerClickSound();
    localStorage.setItem('retro_pomodoro_settings_v2', JSON.stringify(appState.settings));
  }
}

// --------------------------------------------------------------------------
// 7. Core Pomodoro Timer Logic
// --------------------------------------------------------------------------
function updateDurationFromMode() {
  if (appState.timerState === 'running') return;
  
  if (appState.currentMode === 'work') {
    appState.totalDurationForMode = appState.settings.workDuration * 60;
  } else if (appState.currentMode === 'shortBreak') {
    appState.totalDurationForMode = appState.settings.shortBreakDuration * 60;
  } else if (appState.currentMode === 'longBreak') {
    appState.totalDurationForMode = appState.settings.longBreakDuration * 60;
  }
  appState.timeRemaining = appState.totalDurationForMode;
  updateDisplay();
}

function updateDisplay() {
  const minutes = Math.floor(appState.timeRemaining / 60);
  const seconds = appState.timeRemaining % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  timeDisplay.textContent = timeString;
  document.title = `${timeString} • ${appState.currentMode === 'work' ? 'Focus' : 'Break'} | Retro Pomodoro`;

  // Update Circular Progress Ring
  if (timerRingProgress) {
    const progressRatio = appState.totalDurationForMode > 0 ? (1 - appState.timeRemaining / appState.totalDurationForMode) : 0;
    const offset = RING_CIRCUMFERENCE * (1 - progressRatio);
    timerRingProgress.style.strokeDashoffset = offset;
  }

  // Update Cycle Label
  if (timerCycleLabel) {
    const roundNumber = (appState.completedSessions % 4) + 1;
    if (appState.currentMode === 'work') {
      timerCycleLabel.textContent = `POMODORO ${roundNumber} OF 4`;
    } else if (appState.currentMode === 'shortBreak') {
      timerCycleLabel.textContent = `SHORT BREAK (${roundNumber}/4)`;
    } else {
      timerCycleLabel.textContent = `LONG REST BREAK`;
    }
  }
  
  // LED & Status Text Styling
  ledIndicator.className = 'indicator-led';
  if (appState.timerState === 'paused') {
    ledIndicator.classList.add('paused');
  }
  
  ledIndicator.classList.add(appState.currentMode);
  if (appState.currentMode !== 'work') {
    ledIndicator.classList.add('break');
    modeStatusText.textContent = appState.currentMode === 'shortBreak' ? 'SHORT BREAK' : 'LONG BREAK';
  } else {
    modeStatusText.textContent = appState.timerState === 'running' ? 'FOCUS SESSION' : 'READY TO WORK';
  }
  
  // Sprite Animation Status
  const steamGroup = document.querySelector('.steam-group');
  if (appState.timerState === 'running') {
    cozySprite.classList.add('active');
    if (steamGroup) {
      steamGroup.style.display = appState.currentMode === 'work' ? 'block' : 'none';
    }
  } else {
    cozySprite.classList.remove('active');
    if (steamGroup) steamGroup.style.display = 'none';
  }
}

function switchMode(newMode) {
  if (appState.currentMode === newMode && appState.timerState !== 'running') return;
  stopTimer();
  appState.currentMode = newMode;
  
  modeWorkBtn.classList.toggle('active', newMode === 'work');
  modeWorkBtn.setAttribute('aria-selected', newMode === 'work');
  modeShortBtn.classList.toggle('active', newMode === 'shortBreak');
  modeShortBtn.setAttribute('aria-selected', newMode === 'shortBreak');
  modeLongBtn.classList.toggle('active', newMode === 'longBreak');
  modeLongBtn.setAttribute('aria-selected', newMode === 'longBreak');
  
  updateDurationFromMode();
}

function startTimer() {
  if (appState.timerState === 'running') return;
  
  initAudioContext();
  appState.timerState = 'running';
  appState.targetTime = Date.now() + (appState.timeRemaining * 1000);
  
  updateDisplay();
  
  timerInterval = setInterval(() => {
    const delta = appState.targetTime - Date.now();
    
    if (delta <= 0) {
      appState.timeRemaining = 0;
      updateDisplay();
      stopTimer();
      handleTimerComplete();
    } else {
      appState.timeRemaining = Math.ceil(delta / 1000);
      updateDisplay();
    }
  }, 100);

  // Subtle Ticking Sound
  if (appState.settings.tickingEnabled) {
    startTickingSound();
  }
}

function stopTimer() {
  appState.timerState = 'paused';
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  stopTickingSound();
  updateDisplay();
}

function resetTimer() {
  stopTimer();
  updateDurationFromMode();
}

function updateTallyDots() {
  tallyDotsContainer.innerHTML = '';
  if (tallyCount) {
    tallyCount.textContent = appState.completedSessions;
  }
  const filledCount = appState.completedSessions === 0 ? 0 : ((appState.completedSessions - 1) % 4 + 1);
  for (let i = 0; i < 4; i++) {
    const dot = document.createElement('div');
    dot.className = 'tally-dot';
    if (i < filledCount) {
      dot.classList.add('filled');
    }
    tallyDotsContainer.appendChild(dot);
  }
}

function handleTimerComplete() {
  if (appState.currentMode === 'work') {
    appState.completedSessions++;
    appState.stats.todayPomos++;
    appState.stats.todayFocusMinutes += appState.settings.workDuration;
    saveStats();
    updateTallyDots();
    
    triggerCompletionAlert('work');

    // Determine Next Mode
    if (appState.completedSessions % 4 === 0) {
      switchMode('longBreak');
    } else {
      switchMode('shortBreak');
    }

    if (appState.settings.autoStartBreaks) {
      setTimeout(startTimer, 1200);
    }
  } else {
    triggerCompletionAlert('break');
    switchMode('work');

    if (appState.settings.autoStartPomos) {
      setTimeout(startTimer, 1200);
    }
  }
}

// --------------------------------------------------------------------------
// 8. Live Clock & Alarms Check Loop
// --------------------------------------------------------------------------
function updateLiveClockAndCheckAlarms() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  if (liveClock) {
    liveClock.textContent = `${hours}:${minutes}:${seconds}`;
  }
  
  // Midnight rollover check
  const currentDate = now.toDateString();
  if (currentDate !== lastCheckedDate) {
    lastCheckedDate = currentDate;
    loadStats();
    let modified = false;
    appState.alarms.forEach(alarm => {
      if (alarm.firedToday) {
        alarm.firedToday = false;
        modified = true;
      }
    });
    if (modified) {
      saveAlarms();
      renderAlarms();
    }
  }
  
  // Check active alarms
  const currentHM = `${hours}:${minutes}`;
  appState.alarms.forEach(alarm => {
    if (alarm.enabled && !alarm.firedToday && alarm.time === currentHM) {
      alarm.firedToday = true;
      saveAlarms();
      renderAlarms();
      triggerAlarmAlert(alarm);
    }
  });
}

// --------------------------------------------------------------------------
// 9. Task Operations Log
// --------------------------------------------------------------------------
function loadTodos() {
  const saved = localStorage.getItem('retro_pomodoro_todos');
  if (saved) {
    try {
      appState.todos = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse todos', e);
      appState.todos = [];
    }
  } else {
    appState.todos = [];
  }
  renderTodos();
}

function saveTodos() {
  localStorage.setItem('retro_pomodoro_todos', JSON.stringify(appState.todos));
}

function renderTodos() {
  const totalCount = appState.todos.length;
  const doneCount = appState.todos.filter(t => t.done).length;
  
  if (taskStats) {
    taskStats.textContent = `${doneCount}/${totalCount} DONE`;
  }
  if (mobileTaskCount) {
    mobileTaskCount.textContent = totalCount;
  }
  if (taskProgressBar) {
    const percentage = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);
    taskProgressBar.style.transform = `scaleX(${percentage / 100})`;
    if (progressPercentageLabel) {
      progressPercentageLabel.textContent = `${percentage}%`;
    }
  }

  let filtered = appState.todos;
  if (appState.todoFilter === 'active') {
    filtered = appState.todos.filter(t => !t.done);
  } else if (appState.todoFilter === 'done') {
    filtered = appState.todos.filter(t => t.done);
  }

  todosList.innerHTML = '';
  if (filtered.length === 0) {
    todosEmpty.style.display = 'flex';
    const emptySub = todosEmpty.querySelector('.empty-subtitle');
    if (emptySub) {
      emptySub.textContent = totalCount === 0 ? 'Add a task above to start your focus sprint.' : 'No tasks match current filter.';
    }
  } else {
    todosEmpty.style.display = 'none';
    filtered.forEach(todo => {
      const li = document.createElement('li');
      li.className = 'todo-item';
      
      // Priority Tag Dot
      const priorityDot = document.createElement('span');
      priorityDot.className = `priority-indicator ${todo.priority || 'normal'}`;
      priorityDot.title = `Priority: ${todo.priority || 'normal'}`;

      // Pixel Checkbox
      const checkbox = document.createElement('span');
      checkbox.className = `pixel-checkbox ${todo.done ? 'checked' : ''}`;
      checkbox.setAttribute('role', 'checkbox');
      checkbox.setAttribute('aria-checked', todo.done ? 'true' : 'false');
      checkbox.addEventListener('click', () => {
        toggleTodo(todo.id);
      });
      
      // Text
      const textSpan = document.createElement('span');
      textSpan.className = `task-text ${todo.done ? 'completed' : ''}`;
      textSpan.textContent = todo.text;
      textSpan.addEventListener('click', () => {
        toggleTodo(todo.id);
      });
      
      // Delete Button
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-item-btn';
      deleteBtn.innerHTML = '&times;';
      deleteBtn.setAttribute('aria-label', `Delete task: ${todo.text}`);
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTodo(todo.id);
      });
      
      li.appendChild(priorityDot);
      li.appendChild(checkbox);
      li.appendChild(textSpan);
      li.appendChild(deleteBtn);
      todosList.appendChild(li);
    });
  }
}

function addTodo(text, priority = 'normal') {
  const trimmed = text.trim();
  if (!trimmed) return;
  const newTodo = {
    id: `todo_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    text: trimmed,
    priority: priority || 'normal',
    done: false,
    createdAt: Date.now()
  };
  appState.todos.unshift(newTodo);
  saveTodos();
  renderTodos();
  triggerClickSound();
}

function toggleTodo(id) {
  const todo = appState.todos.find(t => t.id === id);
  if (todo) {
    todo.done = !todo.done;
    saveTodos();
    renderTodos();
    if (todo.done) {
      playTaskCompleteSound();
    } else {
      triggerClickSound();
    }
  }
}

function deleteTodo(id) {
  appState.todos = appState.todos.filter(t => t.id !== id);
  saveTodos();
  renderTodos();
  triggerClickSound();
}

function clearCompletedTodos() {
  const initialLen = appState.todos.length;
  appState.todos = appState.todos.filter(t => !t.done);
  if (appState.todos.length !== initialLen) {
    saveTodos();
    renderTodos();
    triggerClickSound();
  }
}

// --------------------------------------------------------------------------
// 10. Daily Alarms Submodule
// --------------------------------------------------------------------------
function loadAlarms() {
  const saved = localStorage.getItem('retro_pomodoro_alarms');
  if (saved) {
    try {
      appState.alarms = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse alarms', e);
      appState.alarms = [];
    }
  } else {
    appState.alarms = [];
  }
  renderAlarms();
}

function saveAlarms() {
  localStorage.setItem('retro_pomodoro_alarms', JSON.stringify(appState.alarms));
}

function renderAlarms() {
  alarmsList.innerHTML = '';
  const totalAlarms = appState.alarms.length;
  if (alarmCountBadge) {
    alarmCountBadge.textContent = `${totalAlarms} SET`;
  }

  if (totalAlarms === 0) {
    alarmsEmpty.style.display = 'block';
  } else {
    alarmsEmpty.style.display = 'none';
    appState.alarms.forEach(alarm => {
      const li = document.createElement('li');
      li.className = `alarm-item ${alarm.enabled ? '' : 'disabled'}`;
      
      const infoDiv = document.createElement('div');
      infoDiv.className = 'alarm-info';
      
      const timeSpan = document.createElement('span');
      timeSpan.className = 'alarm-time-display';
      timeSpan.textContent = alarm.time;
      
      const labelSpan = document.createElement('span');
      labelSpan.className = 'alarm-label';
      labelSpan.textContent = alarm.label || 'Scheduled Alarm';
      
      infoDiv.appendChild(timeSpan);
      infoDiv.appendChild(labelSpan);
      
      const controlsDiv = document.createElement('div');
      controlsDiv.className = 'alarm-controls';
      
      const toggle = document.createElement('input');
      toggle.type = 'checkbox';
      toggle.checked = alarm.enabled;
      toggle.setAttribute('aria-label', `Toggle alarm for ${alarm.time}`);
      toggle.addEventListener('change', () => {
        toggleAlarm(alarm.id);
      });
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-item-btn';
      deleteBtn.innerHTML = '&times;';
      deleteBtn.setAttribute('aria-label', `Delete alarm for ${alarm.time}`);
      deleteBtn.addEventListener('click', () => {
        deleteAlarm(alarm.id);
      });
      
      controlsDiv.appendChild(toggle);
      controlsDiv.appendChild(deleteBtn);
      
      li.appendChild(infoDiv);
      li.appendChild(controlsDiv);
      alarmsList.appendChild(li);
    });
  }
}

function addAlarm(time, label) {
  if (!time) return;
  const newAlarm = {
    id: `alarm_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    time: time,
    label: (label || '').trim(),
    enabled: true,
    firedToday: false
  };
  appState.alarms.push(newAlarm);
  appState.alarms.sort((a, b) => a.time.localeCompare(b.time));
  saveAlarms();
  renderAlarms();
  triggerClickSound();
}

function toggleAlarm(id) {
  const alarm = appState.alarms.find(a => a.id === id);
  if (alarm) {
    alarm.enabled = !alarm.enabled;
    if (alarm.enabled) {
      alarm.firedToday = false;
    }
    saveAlarms();
    renderAlarms();
    triggerClickSound();
  }
}

function deleteAlarm(id) {
  appState.alarms = appState.alarms.filter(a => a.id !== id);
  saveAlarms();
  renderAlarms();
  triggerClickSound();
}

function triggerAlarmAlert(alarm) {
  alarmAlertTime.textContent = alarm.time;
  alarmAlertLabel.textContent = alarm.label || 'Scheduled Focus Break / Event';
  alarmAlertModal.classList.add('show');
  
  playAlarmChime();
  if (alarmAlertInterval) clearInterval(alarmAlertInterval);
  alarmAlertInterval = setInterval(() => {
    playAlarmChime();
  }, 1400);
}

function dismissAlarmAlert() {
  alarmAlertModal.classList.remove('show');
  if (alarmAlertInterval) {
    clearInterval(alarmAlertInterval);
    alarmAlertInterval = null;
  }
  triggerClickSound();
}

// --------------------------------------------------------------------------
// 11. Lo-Fi Tape Deck & Audio Player
// --------------------------------------------------------------------------
function loadMusicState() {
  const saved = localStorage.getItem('retro_pomodoro_music');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      appState.music.trackIndex = typeof parsed.trackIndex === 'number' ? parsed.trackIndex : 0;
      appState.music.volume = typeof parsed.volume === 'number' ? parsed.volume : 0.4;
      appState.music.enabled = false;
    } catch (e) {
      console.error('Failed to parse music settings', e);
    }
  }
  
  bgMusicAudio.volume = appState.music.volume;
  musicVolumeSlider.value = appState.music.volume;
  if (volLevelText) volLevelText.textContent = `${Math.round(appState.music.volume * 100)}%`;
  renderMusicDeck();
}

function saveMusicState() {
  localStorage.setItem('retro_pomodoro_music', JSON.stringify({
    enabled: appState.music.enabled,
    trackIndex: appState.music.trackIndex,
    volume: appState.music.volume
  }));
}

function renderMusicDeck() {
  musicTrackList.innerHTML = '';
  MUSIC_TRACKS.forEach((track, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `track-btn ${index === appState.music.trackIndex ? 'active' : ''}`;
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = track.name;
    
    const indicator = document.createElement('span');
    indicator.className = 'track-indicator';
    indicator.textContent = (index === appState.music.trackIndex && appState.music.enabled) ? '♪ PLAYING' : '♪';
    
    btn.appendChild(nameSpan);
    btn.appendChild(indicator);
    
    btn.addEventListener('click', () => {
      selectTrack(index);
    });
    
    musicTrackList.appendChild(btn);
  });
  
  updateMusicStatusDisplay();
}

function updateMusicStatusDisplay() {
  const currentTrack = MUSIC_TRACKS[appState.music.trackIndex];
  if (appState.music.enabled) {
    musicNowPlaying.textContent = `Now Playing: ${currentTrack.name}`;
    btnMusicToggle.textContent = '⏸ PAUSE MUSIC';
    btnMusicToggle.className = 'retro-btn btn-warning full-width';
    if (eqVisualizer) eqVisualizer.classList.add('playing');
  } else {
    musicNowPlaying.textContent = `Status: Paused (${currentTrack.name})`;
    btnMusicToggle.textContent = '▶ PLAY MUSIC';
    btnMusicToggle.className = 'retro-btn btn-primary full-width';
    if (eqVisualizer && !appState.ambientActive) eqVisualizer.classList.remove('playing');
  }
}

function selectTrack(index) {
  if (index < 0 || index >= MUSIC_TRACKS.length) return;
  const changed = appState.music.trackIndex !== index;
  appState.music.trackIndex = index;
  saveMusicState();
  
  if (changed || !appState.music.enabled) {
    playCurrentTrack();
  }
  renderMusicDeck();
  triggerClickSound();
}

function playCurrentTrack() {
  const track = MUSIC_TRACKS[appState.music.trackIndex];
  bgMusicAudio.src = track.src;
  bgMusicAudio.volume = appState.music.volume;
  bgMusicAudio.play().then(() => {
    appState.music.enabled = true;
    saveMusicState();
    renderMusicDeck();
  }).catch(err => {
    console.warn('Audio playback waiting for user gesture', err);
    appState.music.enabled = false;
    updateMusicStatusDisplay();
  });
}

function pauseMusic() {
  bgMusicAudio.pause();
  appState.music.enabled = false;
  saveMusicState();
  renderMusicDeck();
}

function toggleMusic() {
  if (appState.music.enabled) {
    pauseMusic();
  } else {
    playCurrentTrack();
  }
  triggerClickSound();
}

// --------------------------------------------------------------------------
// 12. Synthesized Ambient Soundscapes & Noise Generator
// --------------------------------------------------------------------------
let ambientAudioNodes = {
  source: null,
  gain: null,
  filter: null
};

function toggleAmbientSound(type) {
  initAudioContext();
  if (appState.ambientActive === type) {
    stopAmbientSound();
  } else {
    stopAmbientSound();
    startAmbientSound(type);
  }
  triggerClickSound();
}

function startAmbientSound(type) {
  appState.ambientActive = type;
  ambientBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-ambient') === type);
  });
  if (eqVisualizer) eqVisualizer.classList.add('playing');

  try {
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    if (type === 'pinknoise') {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
        b6 = white * 0.115926;
      }
    } else if (type === 'rain') {
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.12;
      }
    } else if (type === 'vinyl') {
      for (let i = 0; i < bufferSize; i++) {
        const crackle = Math.random() > 0.9985 ? (Math.random() * 2 - 1) * 0.4 : 0;
        output[i] = (Math.random() * 2 - 1) * 0.015 + crackle;
      }
    } else { // cafe murmur
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.08;
      }
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = type === 'rain' ? 'lowpass' : (type === 'cafe' ? 'bandpass' : 'lowpass');
    filter.frequency.value = type === 'rain' ? 800 : (type === 'cafe' ? 600 : 1200);

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(appState.settings.volume * 0.4, audioCtx.currentTime + 0.5);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    whiteNoise.start();
    ambientAudioNodes = { source: whiteNoise, gain: gainNode, filter: filter };
  } catch (e) {
    console.error('Ambient audio init failed', e);
  }
}

function stopAmbientSound() {
  appState.ambientActive = null;
  ambientBtns.forEach(btn => btn.classList.remove('active'));
  if (ambientAudioNodes.source) {
    try {
      ambientAudioNodes.source.stop();
      ambientAudioNodes.source.disconnect();
    } catch (e) {}
    ambientAudioNodes = { source: null, gain: null, filter: null };
  }
  if (eqVisualizer && !appState.music.enabled) {
    eqVisualizer.classList.remove('playing');
  }
}

// --------------------------------------------------------------------------
// 13. Web Audio SFX Synthesizer
// --------------------------------------------------------------------------
let audioCtx = null;

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

let lastClickTime = 0;

function triggerClickSound() {
  if (!appState.settings.soundEnabled || appState.settings.volume <= 0.001) return;
  const now = Date.now();
  if (now - lastClickTime < 90) return;
  lastClickTime = now;
  try {
    initAudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(750, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.06);
    
    gain.gain.setValueAtTime(appState.settings.volume * 1.2, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.06);
  } catch (e) {}
}

function playTaskCompleteSound() {
  if (!appState.settings.soundEnabled || appState.settings.volume <= 0.001) return;
  try {
    initAudioContext();
    const now = audioCtx.currentTime;
    playTone(587.33, now, 0.08, 'square'); // D5
    playTone(880.00, now + 0.08, 0.14, 'square'); // A5
  } catch (e) {}
}

function triggerCompletionAlert(type) {
  if (!appState.settings.soundEnabled || appState.settings.volume <= 0.001) return;
  try {
    initAudioContext();
    const now = audioCtx.currentTime;
    
    if (type === 'work') {
      // Upbeat Level-Up Fanfare
      playTone(523.25, now, 0.1, 'square');        // C5
      playTone(659.25, now + 0.1, 0.1, 'square');  // E5
      playTone(783.99, now + 0.2, 0.1, 'square');  // G5
      playTone(1046.50, now + 0.3, 0.3, 'square'); // C6
    } else {
      // Gentle Break Over Chime
      playTone(880.00, now, 0.12, 'triangle');
      playTone(659.25, now + 0.12, 0.12, 'triangle');
      playTone(523.25, now + 0.24, 0.28, 'triangle');
    }
  } catch (e) {}
}

function playAlarmChime() {
  if (!appState.settings.soundEnabled || appState.settings.volume <= 0.001) return;
  try {
    initAudioContext();
    const now = audioCtx.currentTime;
    const freq = 1318.51; // E6
    playTone(freq, now, 0.08, 'square');
    playTone(freq, now + 0.12, 0.08, 'square');
    playTone(freq, now + 0.24, 0.15, 'square');
  } catch (e) {}
}

function playTone(freq, startTime, duration, waveType) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = waveType;
  osc.frequency.value = freq;
  
  gain.gain.setValueAtTime(appState.settings.volume * 1.3, startTime);
  gain.gain.linearRampToValueAtTime(0.001, startTime + duration);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start(startTime);
  osc.stop(startTime + duration);
}

function startTickingSound() {
  stopTickingSound();
  tickingSoundInterval = setInterval(() => {
    if (appState.timerState === 'running' && appState.settings.tickingEnabled && appState.settings.soundEnabled) {
      try {
        initAudioContext();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 1200;
        gain.gain.setValueAtTime(appState.settings.volume * 0.08, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.015);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.015);
      } catch (e) {}
    }
  }, 1000);
}

function stopTickingSound() {
  if (tickingSoundInterval) {
    clearInterval(tickingSoundInterval);
    tickingSoundInterval = null;
  }
}

// --------------------------------------------------------------------------
// 14. Zen Mode & Presets
// --------------------------------------------------------------------------
function applyPreset(workMin, shortMin, longMin) {
  stopTimer();
  appState.settings.workDuration = workMin;
  appState.settings.shortBreakDuration = shortMin;
  if (longMin) appState.settings.longBreakDuration = longMin;
  
  inputWork.value = workMin;
  inputShort.value = shortMin;
  if (longMin) inputLong.value = longMin;
  
  saveSettings();
  updateDurationFromMode();
  triggerClickSound();
}

function toggleZenMode() {
  appState.zenMode = !appState.zenMode;
  document.body.classList.toggle('zen-mode', appState.zenMode);
  btnZenMode.classList.toggle('active', appState.zenMode);
  triggerClickSound();
}

// --------------------------------------------------------------------------
// 15. Event Listeners & Interactions
// --------------------------------------------------------------------------
// Global Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
  
  if (e.code === 'Space') {
    e.preventDefault();
    triggerClickSound();
    if (appState.timerState === 'running') {
      stopTimer();
    } else {
      startTimer();
    }
  } else if (e.code === 'KeyR') {
    triggerClickSound();
    resetTimer();
  } else if (e.code === 'KeyZ') {
    toggleZenMode();
  } else if (e.code === 'KeyW') {
    triggerClickSound();
    switchMode('work');
  } else if (e.code === 'KeyS') {
    triggerClickSound();
    switchMode('shortBreak');
  } else if (e.code === 'KeyL') {
    triggerClickSound();
    switchMode('longBreak');
  } else if (e.code === 'KeyM') {
    toggleMusic();
  } else if (e.key === '?' || (e.shiftKey && e.code === 'Slash')) {
    shortcutsModal.classList.toggle('show');
    triggerClickSound();
  } else if (e.code === 'Escape') {
    settingsModal.classList.remove('show');
    shortcutsModal.classList.remove('show');
    alarmAlertModal.classList.remove('show');
    dismissAlarmAlert();
  }
});

// Mode Buttons
modeWorkBtn.addEventListener('click', () => { triggerClickSound(); switchMode('work'); });
modeShortBtn.addEventListener('click', () => { triggerClickSound(); switchMode('shortBreak'); });
modeLongBtn.addEventListener('click', () => { triggerClickSound(); switchMode('longBreak'); });

// Timer Controls
startBtn.addEventListener('click', () => { triggerClickSound(); startTimer(); });
pauseBtn.addEventListener('click', () => { triggerClickSound(); stopTimer(); });
resetBtn.addEventListener('click', () => { triggerClickSound(); resetTimer(); });

// Companion Picker
spriteSelectBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const sprite = btn.getAttribute('data-sprite');
    setActiveSprite(sprite, true);
  });
});

// Theme Select Dropdown
if (themeSelect) {
  themeSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
    triggerClickSound();
  });
}

// Preset Buttons
presetBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.getAttribute('data-custom') === 'true') {
      settingsModal.classList.add('show');
      triggerClickSound();
      return;
    }
    presetBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const w = parseInt(btn.getAttribute('data-work'), 10);
    const s = parseInt(btn.getAttribute('data-short'), 10);
    const l = parseInt(btn.getAttribute('data-long'), 10);
    applyPreset(w, s, l);
  });
});

// Task Filter Tabs & Clear Done
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    appState.todoFilter = btn.getAttribute('data-filter');
    triggerClickSound();
    renderTodos();
  });
});

if (btnClearDone) {
  btnClearDone.addEventListener('click', clearCompletedTodos);
}

// Todo Form Submit
formTodo.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo(inputTodoText.value, inputTodoPriority.value);
  inputTodoText.value = '';
});

// Alarm Form Submit
formAlarm.addEventListener('submit', (e) => {
  e.preventDefault();
  addAlarm(inputAlarmTime.value, inputAlarmLabel.value);
  inputAlarmTime.value = '';
  inputAlarmLabel.value = '';
});

// Lo-Fi Music & Ambient Generator
btnMusicToggle.addEventListener('click', toggleMusic);

musicVolumeSlider.addEventListener('input', () => {
  const vol = parseFloat(musicVolumeSlider.value);
  appState.music.volume = isNaN(vol) ? 0.4 : Math.max(0, Math.min(1, vol));
  bgMusicAudio.volume = appState.music.volume;
  if (volLevelText) volLevelText.textContent = `${Math.round(appState.music.volume * 100)}%`;
  saveMusicState();
});

ambientBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const ambientType = btn.getAttribute('data-ambient');
    toggleAmbientSound(ambientType);
  });
});

// Zen Mode & Settings Modals
btnZenMode.addEventListener('click', toggleZenMode);

btnSettings.addEventListener('click', () => {
  triggerClickSound();
  settingsModal.classList.add('show');
});

btnModalClose.addEventListener('click', () => {
  triggerClickSound();
  settingsModal.classList.remove('show');
  loadSettings();
});

settingsModal.addEventListener('click', (e) => {
  if (e.target === settingsModal) {
    triggerClickSound();
    settingsModal.classList.remove('show');
    loadSettings();
  }
});

modalSaveBtn.addEventListener('click', () => {
  triggerClickSound();
  saveSettings();
  settingsModal.classList.remove('show');
  resetTimer();
});

modalDefaultBtn.addEventListener('click', () => {
  triggerClickSound();
  inputWork.value = DEFAULT_SETTINGS.workDuration;
  inputShort.value = DEFAULT_SETTINGS.shortBreakDuration;
  inputLong.value = DEFAULT_SETTINGS.longBreakDuration;
  toggleAutoStartBreak.checked = DEFAULT_SETTINGS.autoStartBreaks;
  toggleAutoStartPomo.checked = DEFAULT_SETTINGS.autoStartPomos;
  inputDailyGoal.value = DEFAULT_SETTINGS.dailyGoal;
  toggleSound.checked = DEFAULT_SETTINGS.soundEnabled;
  toggleTicking.checked = DEFAULT_SETTINGS.tickingEnabled;
  inputVolume.value = DEFAULT_SETTINGS.volume;
  toggleScanlines.checked = DEFAULT_SETTINGS.scanlines;
});

// Shortcuts Guide Modal
btnShortcuts.addEventListener('click', () => {
  triggerClickSound();
  shortcutsModal.classList.add('show');
});

btnShortcutsClose.addEventListener('click', () => {
  triggerClickSound();
  shortcutsModal.classList.remove('show');
});

btnShortcutsOk.addEventListener('click', () => {
  triggerClickSound();
  shortcutsModal.classList.remove('show');
});

shortcutsModal.addEventListener('click', (e) => {
  if (e.target === shortcutsModal) {
    shortcutsModal.classList.remove('show');
  }
});

btnAlarmDismiss.addEventListener('click', dismissAlarmAlert);

// Mobile Deck Tabs Switching
mobileNavBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    mobileNavBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const targetId = btn.getAttribute('data-target');
    
    consoleDecks.forEach(deck => {
      if (deck.id === targetId) {
        deck.classList.remove('deck-hidden-mobile');
      } else {
        deck.classList.add('deck-hidden-mobile');
      }
    });
    triggerClickSound();
  });
});

// --------------------------------------------------------------------------
// 16. App Initialization
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  loadStats();
  loadTodos();
  loadAlarms();
  loadMusicState();
  updateTallyDots();
  
  // Start Digital Wall Clock and Alarms loop
  updateLiveClockAndCheckAlarms();
  clockInterval = setInterval(updateLiveClockAndCheckAlarms, 1000);
});
