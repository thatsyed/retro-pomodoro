import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Disc } from 'lucide-react';
import { audioPlayer } from '../../services/audioPlayer';
import { CassetteReels } from './CassetteReels';
import { soundSynth } from '../../services/soundSynth';

export function CassettePlayer({ minimal = false }) {
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

  if (minimal) {
    const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
    const ring =
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card';

    return (
      <div className="shrink-0 rounded-xl border border-border bg-background/40 p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Now Playing
          </span>
          {isPlaying ? (
            <span className="flex items-end gap-[2px] h-3" aria-hidden="true" data-testid="eq-bars">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="eq-bar w-[3px] h-full rounded-full bg-primary"
                  style={{ animationDelay: `${i * 220}ms` }}
                />
              ))}
            </span>
          ) : (
            <span className="inline-block size-1.5 rounded-full bg-muted-foreground/50" aria-hidden="true" />
          )}
        </div>

        {/* Track Info */}
        <div className="mb-3.5">
          <div className="text-sm font-medium text-foreground truncate">
            {track?.title || 'Georgetown Cafe'}
          </div>
          <div className="text-xs text-muted-foreground truncate mt-0.5">
            {track?.artist || 'Popoi'}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-3">
          <div className="relative h-1 w-full rounded-full bg-secondary overflow-visible">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
            <span
              aria-hidden="true"
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-2 rounded-full bg-primary shadow-sm transition-all duration-300"
              style={{ left: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] tracking-wide text-muted-foreground mt-2 tabular-nums">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 168)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className={`size-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/60 active:scale-[0.96] cursor-pointer flex items-center justify-center transition-all duration-200 ${ring}`}
            title="Previous track"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleTogglePlay}
            className={`size-11 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.95] cursor-pointer flex items-center justify-center shadow-md transition-all duration-200 ${ring}`}
            title={isPlaying ? 'Pause tape' : 'Play tape'}
          >
            {isPlaying ? (
              <Pause className="w-[18px] h-[18px] fill-current" />
            ) : (
              <Play className="w-[18px] h-[18px] fill-current ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className={`size-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/60 active:scale-[0.96] cursor-pointer flex items-center justify-center transition-all duration-200 ${ring}`}
            title="Next track"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleToggleLoop}
            className={`size-9 rounded-full active:scale-[0.96] cursor-pointer flex items-center justify-center transition-all duration-200 ${ring} ${
              isLooping
                ? 'text-primary bg-secondary/60'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
            }`}
            title={isLooping ? 'Repeat on' : 'Repeat off'}
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

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
