import React from 'react';
import { Equalizer } from './Equalizer';
import { AmbientGen } from './AmbientGen';
import { AlarmList } from './AlarmList';
import { RetroButton } from '../common/RetroButton';
import { SvgIcon } from '../common/SvgIcon';
import { MUSIC_TRACKS } from '../../types';

export function AudioDeck({
  isPlayingMusic,
  currentTrackIndex,
  currentTrack,
  musicVolume,
  onSetMusicVolume,
  onToggleMusic,
  onSelectTrack,
  activeAmbient,
  onToggleAmbient,
  alarms,
  onAddAlarm,
  onToggleAlarm,
  onDeleteAlarm,
  isAudioPlaying
}) {
  return (
    <section
      className="console-deck deck-side deck-aux-panel relative flex flex-col gap-4"
      id="deck-aux"
      aria-label="Audio and Alarms Module"
    >
      <span className="chassis-screw screw-tl" />
      <span className="chassis-screw screw-tr" />
      <span className="chassis-screw screw-bl" />
      <span className="chassis-screw screw-br" />

      {/* Submodule 1: Lo-Fi Tape Deck & Ambient */}
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between items-center border-b-2 border-dashed border-[var(--color-border)] pb-2">
          <div className="flex items-center gap-2">
            <SvgIcon name="Radio" size={18} className="text-[var(--color-border)]" />
            <h2 className="font-['VT323',monospace] text-2xl tracking-wider text-[var(--color-border)]">
              LO-FI TAPE DECK
            </h2>
          </div>
          <Equalizer isPlaying={isAudioPlaying} />
        </div>

        <div className="deck-screen flex flex-col gap-2.5">
          {/* Track Selection Buttons */}
          <div className="flex flex-col gap-1.5 z-[6]">
            {MUSIC_TRACKS.map((track, idx) => {
              const isActive = idx === currentTrackIndex;
              return (
                <button
                  key={track.id}
                  onClick={() => onSelectTrack(idx)}
                  className={`flex items-center justify-between py-1.5 px-2.5 rounded-[var(--btn-radius)] border-2 border-[var(--color-border)] font-mono text-xs font-bold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[var(--color-warning)] text-[var(--color-border)] shadow-[1px_1px_0_var(--color-btn-shadow)]'
                      : 'bg-[var(--color-card)] text-[var(--color-border)] hover:bg-[var(--color-warning)] shadow-[2px_2px_0_var(--color-btn-shadow)]'
                  }`}
                >
                  <span>{track.name}</span>
                  <span className="font-['VT323',monospace] text-base">
                    {isActive && isPlayingMusic ? '♪ PLAYING' : '♪'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Status Bar */}
          <div className="text-xs font-bold text-center py-1 px-2 bg-white/10 rounded-xs text-[var(--color-screen-glow)] z-[6]">
            {isPlayingMusic ? `Now Playing: ${currentTrack.name}` : `Status: Paused (${currentTrack.name})`}
          </div>

          {/* Play/Pause Button */}
          <div className="z-[6]">
            <RetroButton
              variant={isPlayingMusic ? 'warning' : 'primary'}
              size="md"
              onClick={onToggleMusic}
              className="w-full"
            >
              <SvgIcon name={isPlayingMusic ? 'Pause' : 'Play'} size={16} />
              <span>{isPlayingMusic ? 'PAUSE MUSIC' : 'PLAY MUSIC'}</span>
            </RetroButton>
          </div>

          {/* Volume Slider */}
          <div className="flex justify-between items-center z-[6] text-xs font-bold">
            <label htmlFor="music-volume-slider" className="flex items-center gap-1">
              <SvgIcon name="Volume2" size={14} />
              <span>VOL: {Math.round(musicVolume * 100)}%</span>
            </label>
            <input
              id="music-volume-slider"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={musicVolume}
              onChange={(e) => onSetMusicVolume(parseFloat(e.target.value))}
              aria-label="Music Volume"
              className="w-28 accent-[var(--color-primary)] cursor-pointer"
            />
          </div>

          {/* Ambient Generator Channels */}
          <AmbientGen activeAmbient={activeAmbient} onToggleAmbient={onToggleAmbient} />
        </div>
      </div>

      {/* Submodule 2: Scheduled Alarms */}
      <div className="flex flex-col gap-2.5 border-t-2 border-dashed border-[var(--color-border)] pt-3.5">
        <div className="flex justify-between items-center border-b-2 border-dashed border-[var(--color-border)] pb-2">
          <div className="flex items-center gap-2">
            <SvgIcon name="AlarmClock" size={18} className="text-[var(--color-border)]" />
            <h2 className="font-['VT323',monospace] text-2xl tracking-wider text-[var(--color-border)]">
              DAILY ALARMS
            </h2>
          </div>
          <span className="font-['VT323',monospace] text-base bg-[var(--color-screen-bg)] text-[var(--color-screen-glow)] border border-[var(--color-border)] px-2 py-0.5 rounded-xs tabular-nums">
            {alarms.length} SET
          </span>
        </div>

        <div className="deck-screen">
          <AlarmList
            alarms={alarms}
            onAddAlarm={onAddAlarm}
            onToggleAlarm={onToggleAlarm}
            onDeleteAlarm={onDeleteAlarm}
          />
        </div>
      </div>
    </section>
  );
}
