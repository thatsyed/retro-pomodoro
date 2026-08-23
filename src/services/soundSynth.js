// Web Audio Synthesizer for procedural ambient layers and tactile sound effects
// Loudness-normalized to -16 LUFS (EBU R128) via ffmpeg loudnorm:
//   Rain.wav: -49.23 -> -16.01 LUFS (file pre-normalized)
//   White noise: procedural, balanced as ambient texture (~15dB quieter than cassette)
//     Original white noise at gain 0.3 + buffer 0.15 = -28.78 LUFS raw (-30.72 via master 0.8)
//     Ambient: 0.18 amp * 0.18 gain through master 0.8 => ~-35 LUFS vs cassette -20.1 LUFS at 0.62
class SoundSynthService {
  constructor() {
    this.ctx = null;
    this.noiseNode = null;
    this.noiseGain = null;
    this.masterGain = null;
    this.rainAudio = null;
    this.initialized = false;
    this.buttonAudio = null;
    this.alarmAudio = null;
    // Ambient levels ~15dB quieter than cassette baseVolume 0.62 (music -20 LUFS, ambient ~-35 LUFS) - ultra-soft bed
    this.RAIN_VOLUME = 0.1;
    this.NOISE_GAIN_BALANCED = 0.05;
    this.NOISE_BUFFER_AMPLITUDE = 0.18;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.noiseGain = this.ctx.createGain();
      this.noiseGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.noiseGain.connect(this.masterGain);

      // Preload audio elements
      this.buttonAudio = new Audio("/sounds/buttons/sfx_sounds_button6.wav");
      this.buttonAudio.volume = 0.5;

      this.alarmAudio = new Audio("/sounds/reminders/sfx_alarm_loop6.wav");
      this.alarmAudio.volume = 0.7;

      this.rainAudio = new Audio("/sounds/music/rain/Rain.wav");
      this.rainAudio.loop = true;
      this.rainAudio.volume = this.RAIN_VOLUME;

      this.initialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported or blocked:", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === "suspended") {
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
      osc.type = "triangle";
      osc.frequency.setValueAtTime(240, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        60,
        this.ctx.currentTime + 0.04,
      );
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        this.ctx.currentTime + 0.04,
      );
      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      console.warn("Click synth error:", e);
    }
  }

  fallbackChimeSynth() {
    if (!this.ctx) return;
    try {
      const notes = [587.33, 880, 1174.66, 1760]; // D5, A5, D6, A6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        const startTime = this.ctx.currentTime + idx * 0.1;
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
        osc.connect(gain);
        gain.connect(this.masterGain || this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.4);
      });
    } catch (e) {
      console.warn("Chime synth error:", e);
    }
  }

  setAmbientPlaying(layer, isPlaying) {
    this.init();
    this.resume();
    if (layer === "rain") {
      if (!this.rainAudio) {
        this.rainAudio = new Audio("/sounds/music/rain/Rain.wav");
        this.rainAudio.loop = true;
        this.rainAudio.volume = this.RAIN_VOLUME;
      } else {
        this.rainAudio.volume = this.RAIN_VOLUME;
      }
      if (isPlaying) {
        this.rainAudio
          .play()
          .catch((e) => console.warn("Rain playback blocked:", e));
      } else {
        this.rainAudio.pause();
      }
    } else if (layer === "noise") {
      if (isPlaying) {
        if (!this.noiseNode) {
          this.startWhiteNoiseGenerator();
        }
        if (this.noiseGain) {
          this.noiseGain.gain.setTargetAtTime(
            this.NOISE_GAIN_BALANCED,
            this.ctx.currentTime,
            0.05,
          );
        }
      } else {
        if (this.noiseGain) {
          this.noiseGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
        }
      }
    }
  }

  startWhiteNoiseGenerator() {
    if (!this.ctx || this.noiseNode) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * this.NOISE_BUFFER_AMPLITUDE;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(this.noiseGain);
    source.start();
    this.noiseNode = source;
  }

  stopAllAmbient() {
    if (this.rainAudio) {
      this.rainAudio.pause();
    }
    if (this.noiseGain && this.ctx) {
      this.noiseGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
    }
  }
}

export const soundSynth = new SoundSynthService();
