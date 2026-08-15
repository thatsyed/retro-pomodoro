// Web Audio Synthesizer for procedural ambient layers and tactile sound effects
class SoundSynthService {
  constructor() {
    this.ctx = null;
    this.ambientNodes = {
      vinyl: null,
      rain: null,
      noise: null,
      cafe: null,
    };
    this.gainNodes = {
      vinyl: null,
      rain: null,
      noise: null,
      cafe: null,
      master: null,
    };
    this.initialized = false;
    this.buttonAudio = null;
    this.alarmAudio = null;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      this.ctx = new AudioContextClass();
      
      this.gainNodes.master = this.ctx.createGain();
      this.gainNodes.master.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.gainNodes.master.connect(this.ctx.destination);

      ['vinyl', 'rain', 'noise', 'cafe'].forEach(key => {
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.connect(this.gainNodes.master);
        this.gainNodes[key] = gain;
      });

      // Preload audio elements
      this.buttonAudio = new Audio('/sounds/buttons/sfx_sounds_button6.wav');
      this.buttonAudio.volume = 0.5;
      
      this.alarmAudio = new Audio('/sounds/reminders/sfx_alarm_loop6.wav');
      this.alarmAudio.volume = 0.7;

      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playButtonClick() {
    this.init();
    this.resume();
    if (this.buttonAudio) {
      this.buttonAudio.currentTime = 0;
      this.buttonAudio.play().catch(() => this.fallbackClickSynth());
    } else {
      this.fallbackClickSynth();
    }
  }

  playReminderAlarm() {
    this.init();
    this.resume();
    if (this.alarmAudio) {
      this.alarmAudio.currentTime = 0;
      this.alarmAudio.play().catch(() => this.fallbackChimeSynth());
    } else {
      this.fallbackChimeSynth();
    }
  }

  playPomodoroFinish() {
    this.init();
    this.resume();
    this.fallbackChimeSynth();
  }

  fallbackClickSynth() {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.gainNodes.master || this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      console.warn('Click synth error:', e);
    }
  }

  fallbackChimeSynth() {
    if (!this.ctx) return;
    try {
      const notes = [587.33, 880, 1174.66, 1760]; // D5, A5, D6, A6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const startTime = this.ctx.currentTime + idx * 0.1;
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
        osc.connect(gain);
        gain.connect(this.gainNodes.master || this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.4);
      });
    } catch (e) {
      console.warn('Chime synth error:', e);
    }
  }

  setAmbientVolume(layer, volume) {
    this.init();
    this.resume();
    if (this.gainNodes[layer]) {
      const targetGain = Math.max(0, Math.min(1, volume));
      this.gainNodes[layer].gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.08);
      
      if (targetGain > 0 && !this.ambientNodes[layer]) {
        this.startAmbientGenerator(layer);
      } else if (targetGain === 0 && this.ambientNodes[layer]) {
        // Can let it run or keep quiet
      }
    }
  }

  startAmbientGenerator(layer) {
    if (!this.ctx || this.ambientNodes[layer]) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    if (layer === 'noise') {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.15;
      }
    } else if (layer === 'rain') {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }
    } else if (layer === 'vinyl') {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() < 0.001 ? (Math.random() * 2 - 1) * 0.8 : (Math.random() * 2 - 1) * 0.012;
      }
    } else if (layer === 'cafe') {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.sin(i * 0.015) * 0.025 + (Math.random() * 2 - 1) * 0.02;
      }
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    if (layer === 'rain') {
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;
      source.connect(filter);
      filter.connect(this.gainNodes[layer]);
    } else {
      source.connect(this.gainNodes[layer]);
    }

    source.start();
    this.ambientNodes[layer] = source;
  }
}

export const soundSynth = new SoundSynthService();
