// ==========================================================================
// WEB AUDIO API PROCEDURAL SYNTHESIZER & AMBIENT GENERATOR
// ==========================================================================

let audioCtx = null;

export function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

let lastClickTime = 0;

export function playClickSound(volume = 0.6, soundEnabled = true) {
  if (!soundEnabled || volume <= 0.001) return;
  const now = Date.now();
  if (now - lastClickTime < 80) return;
  lastClickTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(750, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(volume * 1.2, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {}
}

export function playTaskDoneSound(volume = 0.6, soundEnabled = true) {
  if (!soundEnabled || volume <= 0.001) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    playTone(ctx, 587.33, now, 0.08, 'square', volume); // D5
    playTone(ctx, 880.00, now + 0.08, 0.14, 'square', volume); // A5
  } catch (e) {}
}

export function playTimerCompleteSound(mode = 'work', volume = 0.6, soundEnabled = true) {
  if (!soundEnabled || volume <= 0.001) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (mode === 'work') {
      // Victorious level-up fanfare
      playTone(ctx, 523.25, now, 0.09, 'square', volume);
      playTone(ctx, 659.25, now + 0.09, 0.09, 'square', volume);
      playTone(ctx, 783.99, now + 0.18, 0.09, 'square', volume);
      playTone(ctx, 1046.50, now + 0.27, 0.3, 'square', volume);
    } else {
      // Gentle break-over chime
      playTone(ctx, 880.00, now, 0.12, 'triangle', volume);
      playTone(ctx, 659.25, now + 0.12, 0.12, 'triangle', volume);
      playTone(ctx, 523.25, now + 0.24, 0.25, 'triangle', volume);
    }
  } catch (e) {}
}

export function playAlarmChime(volume = 0.6, soundEnabled = true) {
  if (!soundEnabled || volume <= 0.001) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freq = 1318.51; // E6
    playTone(ctx, freq, now, 0.08, 'square', volume);
    playTone(ctx, freq, now + 0.12, 0.08, 'square', volume);
    playTone(ctx, freq, now + 0.24, 0.15, 'square', volume);
  } catch (e) {}
}

function playTone(ctx, freq, startTime, duration, waveType, volume) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = waveType;
  osc.frequency.value = freq;

  gain.gain.setValueAtTime(volume * 1.2, startTime);
  gain.gain.linearRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

// --------------------------------------------------------------------------
// Procedural Ambient Noise Synthesis (Rain, Vinyl, Pink Noise, Cafe)
// --------------------------------------------------------------------------
export function createAmbientGenerator(type, volume = 0.4) {
  const ctx = getAudioContext();
  if (!ctx) return null;

  try {
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
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
    } else { // cafe
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.08;
      }
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = type === 'rain' ? 'lowpass' : (type === 'cafe' ? 'bandpass' : 'lowpass');
    filter.frequency.value = type === 'rain' ? 800 : (type === 'cafe' ? 600 : 1200);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume * 0.4, ctx.currentTime + 0.3);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start();

    return {
      stop: () => {
        try {
          whiteNoise.stop();
          whiteNoise.disconnect();
        } catch (e) {}
      }
    };
  } catch (e) {
    console.error('Ambient synthesis error', e);
    return null;
  }
}
