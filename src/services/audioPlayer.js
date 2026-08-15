// HTML5 Audio Controller for Lo-Fi Cassette Music Deck
class AudioPlayerService {
  constructor() {
    this.audio = typeof Audio !== 'undefined' ? new Audio() : null;
    if (this.audio) {
      this.audio.preload = 'auto';
      this.audio.loop = true;
      this.audio.volume = 0.65;
    }
    this.listeners = new Set();
    this.trackList = [
      {
        id: 'popoi-georgetown-cafe',
        title: 'Georgetown Cafe',
        artist: 'Popoi',
        url: '/sounds/music/Popoi - Georgetown Cafe.mp3',
        duration: 168,
      },
      {
        id: 'vibedepot-cafe',
        title: 'Cafe',
        artist: 'VibeDepot',
        url: '/sounds/music/VibeDepot - cafe.mp3',
        duration: 120,
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

  async play() {
    if (!this.audio) return;
    try {
      const track = this.getCurrentTrack();
      if (!track) return;
      if (!this.audio.src || !this.audio.src.endsWith(encodeURI(track.url)) && !this.audio.src.includes(encodeURI(track.title))) {
        this.audio.src = track.url;
      }
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
    this.audio.volume = Math.max(0, Math.min(1, volume));
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
      if (this.isPlaying) this.play();
    }
    this.emitState(this.isPlaying);
  }

  prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.trackList.length) % this.trackList.length;
    if (this.audio) {
      this.audio.src = this.getCurrentTrack().url;
      if (this.isPlaying) this.play();
    }
    this.emitState(this.isPlaying);
  }
}

export const audioPlayer = new AudioPlayerService();
