// ==========================================================================
// RETRO POMODORO WORKSTATION - TYPES & CONSTANTS
// ==========================================================================

export const RING_CIRCUMFERENCE = 2 * Math.PI * 90; // ~565.488

export const THEMES = [
  { id: 'classic', label: 'Classic Amber', icon: 'Sun' },
  { id: 'gameboy', label: 'Game Boy LCD', icon: 'Gamepad2' },
  { id: 'cyberpunk', label: 'Cyberpunk 84', icon: 'Zap' },
  { id: 'arcade', label: '8-Bit Arcade', icon: 'Tv' },
  { id: 'vaporwave', label: 'Vapor Sunset', icon: 'Disc' }
];

export const DEFAULT_SETTINGS = {
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

export const MUSIC_TRACKS = [
  { id: 0, name: 'Morning Coffee', src: '/sounds/music/morning-coffee.wav' },
  { id: 1, name: 'Lo-Fi Chill', src: '/sounds/music/lofi-chill.wav' },
  { id: 2, name: 'Starlit Focus', src: '/sounds/music/starlit-focus.wav' }
];

export const AMBIENT_SOUNDS = [
  { id: 'rain', label: 'Rain', icon: 'CloudRain' },
  { id: 'vinyl', label: 'Vinyl', icon: 'Disc3' },
  { id: 'pinknoise', label: 'Pink Noise', icon: 'Waves' },
  { id: 'cafe', label: 'Cafe', icon: 'Coffee' }
];

export const SPRITES = [
  { id: 'mug', label: 'Cozy Mug', icon: 'Coffee' },
  { id: 'cat', label: 'Pixel Cat', icon: 'Cat' },
  { id: 'plant', label: 'Pixel Bonsai', icon: 'Sprout' },
  { id: 'tape', label: 'Lo-Fi Cassette', icon: 'CassetteTape' },
  { id: 'ghost', label: 'Pixel Ghost', icon: 'Flame' },
  { id: 'robot', label: 'Pixel Robot', icon: 'Tv' }
];

export const PRIORITIES = {
  HIGH: 'high',
  NORMAL: 'normal',
  LOW: 'low'
};
