// DOM Element Selectors
const ledIndicator = document.getElementById('led-indicator');
const modeWorkBtn = document.getElementById('mode-work');
const modeShortBtn = document.getElementById('mode-short');
const modeLongBtn = document.getElementById('mode-long');
const timeDisplay = document.getElementById('time-display');
const cozySprite = document.getElementById('cozy-sprite');
const tallyDotsContainer = document.getElementById('tally-dots');
const tallyCount = document.getElementById('tally-count');
const startBtn = document.getElementById('btn-start');
const pauseBtn = document.getElementById('btn-pause');
const resetBtn = document.getElementById('btn-reset');
const settingsBtn = document.getElementById('btn-settings');
const modalCloseBtn = document.getElementById('btn-modal-close');
const modalSaveBtn = document.getElementById('btn-settings-save');
const modalDefaultBtn = document.getElementById('btn-settings-default');
const settingsModal = document.getElementById('settings-modal');
const steamGroup = document.querySelector('.steam-group');

// Numerical / Modal settings selectors
const inputWork = document.getElementById('input-work');
const inputShort = document.getElementById('input-short');
const inputLong = document.getElementById('input-long');
const toggleSound = document.getElementById('toggle-sound');
const inputVolume = document.getElementById('input-volume');

// Default App Config
const DEFAULT_SETTINGS = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  soundEnabled: true,
  volume: 0.5
};

let appState = {
  currentMode: 'work', // 'work' | 'shortBreak' | 'longBreak'
  timerState: 'paused', // 'paused' | 'running'
  timeRemaining: 1500, // seconds
  targetTime: null, // exact timestamp when timer completes
  completedSessions: 0,
  settings: { ...DEFAULT_SETTINGS }
};

let timerInterval = null;

// Initialize Settings
function loadSettings() {
  const saved = localStorage.getItem('cozy_pomodoro_settings');
  if (saved) {
    try {
      appState.settings = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse settings', e);
      appState.settings = { ...DEFAULT_SETTINGS };
    }
  } else {
    appState.settings = { ...DEFAULT_SETTINGS };
  }

  // Sync form fields
  inputWork.value = appState.settings.workDuration;
  inputShort.value = appState.settings.shortBreakDuration;
  inputLong.value = appState.settings.longBreakDuration;
  toggleSound.checked = appState.settings.soundEnabled;
  inputVolume.value = appState.settings.volume;

  updateDurationFromMode();
}

function saveSettings() {
  const workVal = parseInt(inputWork.value, 10);
  const shortVal = parseInt(inputShort.value, 10);
  const longVal = parseInt(inputLong.value, 10);
  
  appState.settings.workDuration = isNaN(workVal) 
    ? DEFAULT_SETTINGS.workDuration 
    : Math.max(1, Math.min(60, workVal));
    
  appState.settings.shortBreakDuration = isNaN(shortVal) 
    ? DEFAULT_SETTINGS.shortBreakDuration 
    : Math.max(1, Math.min(30, shortVal));
    
  appState.settings.longBreakDuration = isNaN(longVal) 
    ? DEFAULT_SETTINGS.longBreakDuration 
    : Math.max(1, Math.min(60, longVal));
    
  appState.settings.soundEnabled = toggleSound.checked;
  
  const volumeVal = parseFloat(inputVolume.value);
  appState.settings.volume = isNaN(volumeVal) 
    ? DEFAULT_SETTINGS.volume 
    : Math.max(0, Math.min(1, volumeVal));
  
  localStorage.setItem('cozy_pomodoro_settings', JSON.stringify(appState.settings));
}

function updateDurationFromMode() {
  if (appState.timerState === 'running') return; // Do not switch details mid-run
  
  if (appState.currentMode === 'work') {
    appState.timeRemaining = appState.settings.workDuration * 60;
  } else if (appState.currentMode === 'shortBreak') {
    appState.timeRemaining = appState.settings.shortBreakDuration * 60;
  } else if (appState.currentMode === 'longBreak') {
    appState.timeRemaining = appState.settings.longBreakDuration * 60;
  }
  updateDisplay();
}

function updateDisplay() {
  const minutes = Math.floor(appState.timeRemaining / 60);
  const seconds = appState.timeRemaining % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  // LED Styling
  ledIndicator.className = 'indicator-led';
  if (appState.timerState === 'paused') {
    ledIndicator.classList.add('paused');
  }
  
  ledIndicator.classList.add(appState.currentMode);
  // Also add 'break' class for break modes to match CSS rule: .indicator-led.break
  if (appState.currentMode !== 'work') {
    ledIndicator.classList.add('break');
  }
  
  // Steam Floating speed based on running state
  if (steamGroup) {
    if (appState.timerState === 'running' && appState.currentMode === 'work') {
      steamGroup.style.display = 'block';
      cozySprite.classList.add('active');
    } else if (appState.timerState === 'running' && appState.currentMode !== 'work') {
      steamGroup.style.display = 'none'; // Cozy idle/sleeping during breaks
      cozySprite.classList.add('active');
    } else {
      steamGroup.style.display = 'none';
      cozySprite.classList.remove('active');
    }
  } else {
    if (appState.timerState === 'running') {
      cozySprite.classList.add('active');
    } else {
      cozySprite.classList.remove('active');
    }
  }
}

function switchMode(newMode) {
  if (appState.currentMode === newMode) return;
  stopTimer();
  appState.currentMode = newMode;
  
  // Update Active Tab Button
  modeWorkBtn.classList.toggle('active', newMode === 'work');
  modeShortBtn.classList.toggle('active', newMode === 'shortBreak');
  modeLongBtn.classList.toggle('active', newMode === 'longBreak');
  
  updateDurationFromMode();
}

function startTimer() {
  if (appState.timerState === 'running') return;
  
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
}

function stopTimer() {
  appState.timerState = 'paused';
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
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
  // Determine how many dots to fill: 
  // If completedSessions is 0, fill 0.
  // Otherwise, fill (completedSessions - 1) % 4 + 1.
  // This way: 1 -> 1, 2 -> 2, 3 -> 3, 4 -> 4, 5 -> 1, etc.
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
  // If work session finished, increase count
  if (appState.currentMode === 'work') {
    appState.completedSessions++;
    updateTallyDots();
    
    // Suggest long break every 4th session, otherwise short break
    if (appState.completedSessions % 4 === 0) {
      switchMode('longBreak');
    } else {
      switchMode('shortBreak');
    }
  } else {
    // Break finished, suggest work
    switchMode('work');
  }
  
  // Custom hook for synthesizing chime (Task 4)
  triggerCompletionAlert();
}

// Modal handling
function openSettings() {
  // Sync form fields from state.settings to avoid showing unsaved modifications
  inputWork.value = appState.settings.workDuration;
  inputShort.value = appState.settings.shortBreakDuration;
  inputLong.value = appState.settings.longBreakDuration;
  toggleSound.checked = appState.settings.soundEnabled;
  inputVolume.value = appState.settings.volume;

  settingsModal.classList.add('show');
}

function closeSettings() {
  settingsModal.classList.remove('show');
}

// Listeners Setup
modeWorkBtn.addEventListener('click', () => { triggerClickSound(); switchMode('work'); });
modeShortBtn.addEventListener('click', () => { triggerClickSound(); switchMode('shortBreak'); });
modeLongBtn.addEventListener('click', () => { triggerClickSound(); switchMode('longBreak'); });

startBtn.addEventListener('click', () => { triggerClickSound(); startTimer(); });
pauseBtn.addEventListener('click', () => { triggerClickSound(); stopTimer(); });
resetBtn.addEventListener('click', () => { triggerClickSound(); resetTimer(); });

settingsBtn.addEventListener('click', () => { triggerClickSound(); openSettings(); });
modalCloseBtn.addEventListener('click', () => { triggerClickSound(); closeSettings(); });

// Close settings when clicking on modal background overlay
settingsModal.addEventListener('click', (e) => {
  if (e.target === settingsModal) {
    triggerClickSound();
    closeSettings();
  }
});

// Sound Volume Live Preview
inputVolume.addEventListener('input', () => {
  appState.settings.volume = parseFloat(inputVolume.value);
  triggerClickSound();
});

modalSaveBtn.addEventListener('click', () => {
  triggerClickSound();
  saveSettings();
  closeSettings();
  resetTimer();
});

modalDefaultBtn.addEventListener('click', () => {
  triggerClickSound();
  inputWork.value = DEFAULT_SETTINGS.workDuration;
  inputShort.value = DEFAULT_SETTINGS.shortBreakDuration;
  inputLong.value = DEFAULT_SETTINGS.longBreakDuration;
  toggleSound.checked = DEFAULT_SETTINGS.soundEnabled;
  inputVolume.value = DEFAULT_SETTINGS.volume;
});

// Load and render initially
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  updateTallyDots();
});

let audioCtx = null;

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// Play Quick Mechanical Button Click
function triggerClickSound() {
  if (!appState.settings.soundEnabled || appState.settings.volume <= 0.001) return;
  try {
    initAudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(appState.settings.volume * 0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
    
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  } catch (e) {
    console.error('Audio play failed:', e);
  }
}

// Play Upbeat Work/Relax Break Completion Alert
function triggerCompletionAlert() {
  if (!appState.settings.soundEnabled || appState.settings.volume <= 0.001) return;
  try {
    initAudioContext();
    const now = audioCtx.currentTime;
    
    if (appState.currentMode === 'shortBreak' || appState.currentMode === 'longBreak') {
      // Completed WORK (Trigger upbeat NES melody: C5 -> E5 -> G5)
      playNote(523.25, now, 0.1, 'square');      // C5
      playNote(659.25, now + 0.1, 0.1, 'square');  // E5
      playNote(783.99, now + 0.2, 0.25, 'square'); // G5
    } else {
      // Completed BREAK (Trigger relaxing bell melody: G4 -> E4 -> C4)
      playNote(392.00, now, 0.15, 'triangle');     // G4
      playNote(329.63, now + 0.15, 0.15, 'triangle'); // E4
      playNote(261.63, now + 0.3, 0.35, 'triangle');  // C4
    }
  } catch (e) {
    console.error('Completion alert audio failed:', e);
  }
}

function playNote(freq, startTime, duration, waveType) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = waveType;
  osc.frequency.value = freq;
  
  gain.gain.setValueAtTime(appState.settings.volume * 0.4, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start(startTime);
  osc.stop(startTime + duration);
  
  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
}
