import React, { useState } from 'react';
import { Radio, CloudRain, Waves, Square } from 'lucide-react';
import { AmbientChannel } from './AmbientChannel';
import { soundSynth } from '../../services/soundSynth';

export function AmbientMixer({ minimal = false }) {
  const [playingState, setPlayingState] = useState({
    noise: false,
    rain: false,
  });

  const channels = [
    { id: 'noise', label: 'White noise', icon: Waves },
    { id: 'rain', label: 'Rain', icon: CloudRain },
  ];

  const anyPlaying = Object.values(playingState).some(Boolean);

  const handleTogglePlay = (id) => {
    soundSynth.playButtonClick();
    setPlayingState((prev) => {
      const next = !prev[id];
      soundSynth.setAmbientPlaying(id, next);
      return { ...prev, [id]: next };
    });
  };

  const handleStopAll = () => {
    soundSynth.playButtonClick();
    soundSynth.stopAllAmbient();
    setPlayingState({
      noise: false,
      rain: false,
    });
  };

  if (minimal) {
    return (
      <div className="pt-3 border-t border-border mt-3">
        {/* Mixer Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Ambient
          </span>

          {anyPlaying && (
            <button
              type="button"
              onClick={handleStopAll}
              className="rounded-full px-2.5 py-0.5 bg-secondary/60 text-[10px] font-sans font-medium flex items-center gap-1 cursor-pointer transition-all hover:text-destructive text-muted-foreground"
              title="Stop all ambient sounds"
            >
              <Square className="w-2.5 h-2.5 fill-current" />
              <span>Stop all</span>
            </button>
          )}
        </div>

        {/* 2 Channels: White noise and Rain */}
        <div className="space-y-1.5">
          {channels.map((ch) => (
            <AmbientChannel
              key={ch.id}
              id={ch.id}
              label={ch.label}
              icon={ch.icon}
              isPlaying={playingState[ch.id]}
              onTogglePlay={handleTogglePlay}
              minimal
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-3 border-t border-[var(--border-color)] mt-3">
      {/* Mixer Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1.5 text-[var(--text-primary)] font-pixel text-[10px]">
          <Radio className="w-3.5 h-3.5" />
          <span>Ambient Sounds</span>
        </div>

        {anyPlaying && (
          <button
            type="button"
            onClick={handleStopAll}
            className="px-2 py-0.5 border border-[var(--border-color)] text-[9px] font-mono tracking-wider flex items-center space-x-1 cursor-pointer transition-all hover:border-[var(--danger)] hover:text-[var(--danger)] text-[var(--text-dim)]"
            title="Stop all ambient sounds"
          >
            <Square className="w-2.5 h-2.5 fill-current" />
            <span>Stop all</span>
          </button>
        )}
      </div>

      {/* 2 Channels: White noise and Rain */}
      <div className="space-y-1">
        {channels.map((ch) => (
          <AmbientChannel
            key={ch.id}
            id={ch.id}
            label={ch.label}
            icon={ch.icon}
            isPlaying={playingState[ch.id]}
            onTogglePlay={handleTogglePlay}
          />
        ))}
      </div>
    </div>
  );
}
