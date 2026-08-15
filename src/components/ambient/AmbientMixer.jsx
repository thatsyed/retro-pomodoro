import React, { useState } from 'react';
import { Radio, CloudRain, Disc, Waves, Coffee, VolumeX, Volume2 } from 'lucide-react';
import { AmbientChannel } from './AmbientChannel';
import { soundSynth } from '../../services/soundSynth';

export function AmbientMixer() {
  const [volumes, setVolumes] = useState({
    vinyl: 0,
    rain: 0,
    noise: 0,
    cafe: 0,
  });

  const [mutedChannels, setMutedChannels] = useState({
    vinyl: false,
    rain: false,
    noise: false,
    cafe: false,
  });

  const [masterMute, setMasterMute] = useState(false);

  const channels = [
    { id: 'vinyl', label: 'Vinyl Needle', icon: Disc },
    { id: 'rain', label: 'Rain Storm', icon: CloudRain },
    { id: 'noise', label: 'White Noise', icon: Waves },
    { id: 'cafe', label: 'Cafe Ambience', icon: Coffee },
  ];

  const handleVolumeChange = (id, val) => {
    setVolumes((prev) => ({ ...prev, [id]: val }));
    if (mutedChannels[id] && val > 0) {
      setMutedChannels((prev) => ({ ...prev, [id]: false }));
    }
    if (!masterMute) {
      soundSynth.setAmbientVolume(id, val);
    }
  };

  const handleToggleMute = (id) => {
    soundSynth.playButtonClick();
    setMutedChannels((prev) => {
      const next = !prev[id];
      soundSynth.setAmbientVolume(id, next || masterMute ? 0 : volumes[id]);
      return { ...prev, [id]: next };
    });
  };

  const handleToggleMasterMute = () => {
    soundSynth.playButtonClick();
    const nextMaster = !masterMute;
    setMasterMute(nextMaster);
    channels.forEach((ch) => {
      soundSynth.setAmbientVolume(ch.id, nextMaster || mutedChannels[ch.id] ? 0 : volumes[ch.id]);
    });
  };

  return (
    <div className="pt-3 border-t border-[var(--border-color)] mt-3">
      {/* Mixer Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1.5 text-[var(--text-primary)] font-pixel text-[10px]">
          <Radio className="w-3.5 h-3.5" />
          <span>AMBIENT SOUNDSCAPES</span>
        </div>

        <button
          type="button"
          onClick={handleToggleMasterMute}
          className={`px-2 py-0.5 border text-[9px] font-mono uppercase tracking-wider flex items-center space-x-1 cursor-pointer transition-all ${
            masterMute
              ? 'border-[var(--danger)] text-[var(--danger)] bg-[var(--danger)]/10'
              : 'border-[var(--border-color)] text-[var(--text-dim)] hover:text-[var(--text-primary)]'
          }`}
        >
          {masterMute ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
          <span>{masterMute ? 'MUTED' : 'MUTE ALL'}</span>
        </button>
      </div>

      {/* 4 Channels */}
      <div className="space-y-1">
        {channels.map((ch) => (
          <AmbientChannel
            key={ch.id}
            id={ch.id}
            label={ch.label}
            icon={ch.icon}
            volume={volumes[ch.id]}
            isMuted={masterMute || mutedChannels[ch.id]}
            onVolumeChange={handleVolumeChange}
            onToggleMute={handleToggleMute}
          />
        ))}
      </div>
    </div>
  );
}
