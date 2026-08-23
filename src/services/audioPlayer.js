// HTML5 Audio Controller for Lo-Fi Cassette Music Deck
// Loudness-normalized to -16 LUFS (EBU R128) via ffmpeg loudnorm:
//   Popoi - Georgetown Cafe:  -12.29 -> -16.27 LUFS (mean -13.7 -> -17.7 dB, peak -0.0 -> -3.9 dB)
//   VibeDepot - cafe:         -5.86  -> -16.26 LUFS (mean -8.2  -> -18.6 dB, peak  0.0 -> -9.8 dB)
//   Rain.wav:                 -49.23 -> -16.01 LUFS (mean -53.4 -> -20.1 dB, peak -26.8 -> -1.5 dB)
// Files in public/sounds/music/ are pre-normalized; per-track gains below are 1.0 for
// normalized files. Keep the gain map for future non-normalized additions:
//   original corrective gains would have been Popoi 0.65 (-3.71dB), VibeDepot 0.31 (-10.14dB)
class AudioPlayerService {
  constructor() {
    this.baseVolume = 0.62;
    this.trackGains = {
      'popoi-georgetown-cafe': 1.0,
      'vibedepot-cafe': 0.60,
    };
    this.audio = typeof Audio !== 'undefined' ? new Audio() : null;
    if (this.audio) {
      this.audio.preload = 'auto';
      this.audio.loop = true;
    }
    this.listeners = new Set();
    this.trackList = [
      {
        id: 'popoi-georgetown-cafe',
        title: 'Georgetown Cafe',
        artist: 'Popoi',
        url: '/sounds/music/Popoi - Georgetown Cafe.mp3',
        duration: 168,
        gain: .80,
      },
      {
        id: 'vibedepot-cafe',
        title: 'Cafe',
        artist: 'VibeDepot',
        url: '/sounds/music/VibeDepot - cafe.mp3',
        duration: 120,
        gain: .60,
      }
    ];
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.isLooping = true;
    
    if (this.audio) {
      this.audio.addEventListener('play', () => this.emitState(true));
      this.audio.addEventListener('pause', () => this.emitState(false));
      this.audio.addEventListener('ended', () => this.handleTrackEnd());
      this.audio.addEventListener('timeupdate', () => this.emitTime());
      this.applyVolume();
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    // Emit current state immediately
    listener({
      type: 'init',
      isPlaying: this.isPlaying,
      track: this.getCurrentTrack(),
      isLooping: this.isLooping,
    });
    return () => this.listeners.delete(listener);
  }

  emitState(isPlaying) {
    this.isPlaying = isPlaying;
    this.listeners.forEach(fn => fn({
      type: 'state',
      isPlaying,
      track: this.getCurrentTrack(),
      isLooping: this.isLooping
    }));
  }

  emitTime() {
    if (!this.audio) return;
    this.listeners.forEach(fn => fn({
      type: 'time',
      currentTime: this.audio.currentTime || 0,
      duration: this.audio.duration || this.getCurrentTrack()?.duration || 0
    }));
  }

  getCurrentTrack() {
    return this.trackList[this.currentTrackIndex] || null;
  }

  getTrackGain(track) {
    if (!track) return 1.0;
    if (typeof track.gain === 'number') return track.gain;
    return this.trackGains[track.id] ?? 1.0;
  }

  applyVolume() {
    if (!this.audio) return;
    const track = this.getCurrentTrack();
    const gain = this.getTrackGain(track);
    this.audio.volume = Math.max(0, Math.min(1, this.baseVolume * gain));
  }

  async play() {
    if (!this.audio) return;
    try {
      const track = this.getCurrentTrack();
      if (!track) return;
      if (!this.audio.src || !this.audio.src.endsWith(encodeURI(track.url)) && !this.audio.src.includes(encodeURI(track.title))) {
        this.audio.src = track.url;
      }
      this.applyVolume();
      await this.audio.play();
      this.isPlaying = true;
      this.emitState(true);
    } catch (e) {
      console.warn('Audio play request blocked by browser policy:', e);
      this.isPlaying = false;
      this.emitState(false);
    }
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.emitState(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  setVolume(volume) {
    if (!this.audio) return;
    this.baseVolume = Math.max(0, Math.min(1, volume));
    this.applyVolume();
  }

  setLoop(isLoop) {
    this.isLooping = isLoop;
    if (this.audio) {
      this.audio.loop = isLoop;
    }
    this.emitState(this.isPlaying);
  }

  handleTrackEnd() {
    if (!this.isLooping) {
      this.nextTrack();
    }
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.trackList.length;
    if (this.audio) {
      this.audio.src = this.getCurrentTrack().url;
      this.applyVolume();
      if (this.isPlaying) this.play();
    }
    this.emitState(this.isPlaying);
  }

  prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.trackList.length) % this.trackList.length;
    if (this.audio) {
      this.audio.src = this.getCurrentTrack().url;
      this.applyVolume();
      if (this.isPlaying) this.play();
    }
    this.emitState(this.isPlaying);
  }
}

export const audioPlayer = new AudioPlayerService();
