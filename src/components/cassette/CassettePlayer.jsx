import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Disc } from 'lucide-react';
import { audioPlayer } from '../../services/audioPlayer';
import { CassetteReels } from './CassetteReels';
import { soundSynth } from '../../services/soundSynth';

export function CassettePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState(audioPlayer.getCurrentTrack());
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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

    return () => unsubscribe();
  }, []);

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
          <span>Cassette Player</span>
        </div>
        <span className={`text-[9px] font-mono px-1.5 py-0.2 border ${
          isPlaying ? 'border-[var(--text-primary)] text-[var(--text-primary)] animate-pulse' : 'border-[var(--border-color)] text-[var(--text-dim)]'
        }`}>
          {isPlaying ? 'Playing' : 'Paused'}
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
            {track?.title || "Georgetown Cafe"}
          </div>
          <div className="text-[9px] text-[var(--text-dim)] truncate">
            {track?.artist || 'Popoi'}
          </div>
        </div>
        <div className="text-right text-[10px] text-[var(--text-secondary)] shrink-0 font-bold">
          {formatTime(currentTime)} / {formatTime(duration || 168)}
        </div>
      </div>

      {/* Tape Controls */}
      <div className="flex items-center justify-center space-x-2 pt-1">
        <button
          type="button"
          onClick={handlePrev}
          className="p-1.5 bg-[var(--bg-surface)] text-[var(--text-dim)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-all cursor-pointer"
          title="Previous track"
        >
          <SkipBack className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={handleTogglePlay}
          className={`p-1.5 border transition-all cursor-pointer flex items-center justify-center ${
            isPlaying
              ? 'bg-[var(--accent)] text-[var(--bg-app)] border-[var(--accent)] shadow-[var(--glow-accent)]'
              : 'bg-[var(--text-primary)] text-[var(--bg-app)] border-[var(--text-primary)] shadow-[var(--glow-primary)]'
          }`}
          title={isPlaying ? 'Pause tape' : 'Play tape'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current stroke-[2.5]" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current stroke-[2.5]" />
          )}
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="p-1.5 bg-[var(--bg-surface)] text-[var(--text-dim)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-all cursor-pointer"
          title="Next track"
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
          title={isLooping ? 'Repeat on' : 'Repeat off'}
        >
          <Repeat className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
