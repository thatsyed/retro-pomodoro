import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Volume2, VolumeX, Disc } from 'lucide-react';
import { audioPlayer } from '../../services/audioPlayer';
import { CassetteReels } from './CassetteReels';
import { soundSynth } from '../../services/soundSynth';

export function CassettePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState(audioPlayer.getCurrentTrack());
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(true);

  useEffect(() => {
    const unsubscribe = audioPlayer.subscribe((event) => {
      if (event.type === 'state' || event.type === 'init') {
        setIsPlaying(event.isPlaying);
        setTrack(event.track);
        setIsLooping(event.isLooping);
      } else if (event.type === 'time') {
        setCurrentTime(event.currentTime);
        setDuration(event.duration);
      }
    });

    audioPlayer.setVolume(volume);

    return () => unsubscribe();
  }, [volume]);

  const handleTogglePlay = () => {
    soundSynth.playButtonClick();
    audioPlayer.toggle();
  };

  const handlePrev = () => {
    soundSynth.playButtonClick();
    audioPlayer.prevTrack();
  };

  const handleNext = () => {
    soundSynth.playButtonClick();
    audioPlayer.nextTrack();
  };

  const handleToggleLoop = () => {
    soundSynth.playButtonClick();
    const nextLoop = !isLooping;
    setIsLooping(nextLoop);
    audioPlayer.setLoop(nextLoop);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (isMuted && val > 0) setIsMuted(false);
    audioPlayer.setVolume(val);
  };

  const handleToggleMute = () => {
    soundSynth.playButtonClick();
    if (isMuted) {
      setIsMuted(false);
      audioPlayer.setVolume(volume);
    } else {
      setIsMuted(true);
      audioPlayer.setVolume(0);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="cassette-shell p-3 retro-bezel flex flex-col justify-between">
      {/* Cassette Header */}
      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[var(--border-color)] text-[10px] font-pixel">
        <div className="flex items-center space-x-1.5 text-[var(--text-primary)]">
          <Disc className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
          <span>LO-FI TAPE DECK</span>
        </div>
        <span className={`text-[9px] font-mono px-1.5 py-0.2 border uppercase ${
          isPlaying ? 'border-[var(--text-primary)] text-[var(--text-primary)] animate-pulse' : 'border-[var(--border-color)] text-[var(--text-dim)]'
        }`}>
          {isPlaying ? 'PLAYING' : 'STANDBY'}
        </span>
      </div>

      {/* Cassette Window & Spinning Reels */}
      <div className="tape-window my-1 py-1">
        <CassetteReels isPlaying={isPlaying} />
      </div>

      {/* Track Info Display */}
      <div className="bg-[var(--bg-app)] border border-[var(--border-color)] p-2 my-2 flex items-center justify-between font-mono">
        <div className="truncate pr-2">
          <div className="text-[11px] text-[var(--text-primary)] font-bold truncate">
            {track?.title || "I Don't Understand A Thing"}
          </div>
          <div className="text-[9px] text-[var(--text-dim)] truncate">
            ARTIST: {track?.artist || 'HoliznaCC0'} // ROYALTY-FREE FOCUS
          </div>
        </div>
        <div className="text-right text-[10px] text-[var(--text-secondary)] shrink-0 font-bold">
          {formatTime(currentTime)} / {formatTime(duration || 213)}
        </div>
      </div>

      {/* Tape Controls & Volume */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={handlePrev}
            className="p-1.5 bg-[var(--bg-surface)] text-[var(--text-dim)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-all cursor-pointer"
            title="Previous Track"
          >
            <SkipBack className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={handleTogglePlay}
            className={`px-3 py-1.5 text-xs font-pixel flex items-center space-x-1 border transition-all cursor-pointer ${
              isPlaying
                ? 'bg-[var(--accent)] text-[var(--bg-app)] border-[var(--accent)] shadow-[var(--glow-accent)] font-bold'
                : 'bg-[var(--text-primary)] text-[var(--bg-app)] border-[var(--text-primary)] shadow-[var(--glow-primary)] font-bold'
            }`}
            title={isPlaying ? 'Pause Tape' : 'Play Tape'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>PLAY</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="p-1.5 bg-[var(--bg-surface)] text-[var(--text-dim)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-all cursor-pointer"
            title="Next Track"
          >
            <SkipForward className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={handleToggleLoop}
            className={`p-1.5 border transition-all cursor-pointer ${
              isLooping
                ? 'bg-[var(--text-primary)]/15 border-[var(--text-primary)] text-[var(--text-primary)]'
                : 'bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-dim)]'
            }`}
            title={isLooping ? 'Looping Enabled' : 'Looping Disabled'}
          >
            <Repeat className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Tape Deck Volume Slider */}
        <div className="flex items-center space-x-2 pl-2">
          <button
            type="button"
            onClick={handleToggleMute}
            className="text-[var(--text-dim)] hover:text-[var(--text-primary)] cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-3.5 h-3.5 text-[var(--danger)]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 accent-[var(--text-primary)] cursor-pointer h-1.5 bg-[var(--bg-app)] border border-[var(--border-color)]"
            title={`Music Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
          />
        </div>
      </div>
    </div>
  );
}
