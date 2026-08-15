import React from 'react';
import { Equalizer } from './Equalizer';
import { RetroButton } from '../common/RetroButton';
import { SvgIcon } from '../common/SvgIcon';
import { MUSIC_TRACKS, AMBIENT_SOUNDS } from '../../types';
import { formatTime } from '../../utils/formatters';

export function AudioDeck({
  isPlayingMusic = false,
  currentTrackIndex = 0,
  currentTrack = MUSIC_TRACKS[0],
  musicVolume = 0.5,
  onSetMusicVolume,
  currentTime = 0,
  duration = 0,
  isMuted = false,
  onToggleMute,
  onSeek,
  onToggleMusic,
  onSelectTrack,
  onNextTrack,
  onPrevTrack,
  activeAmbient,
  onToggleAmbient,
  alarms = [],
  onToggleAlarm,
  onDeleteAlarm,
  isAudioPlaying = false
}) {
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const enabledAlarms = (alarms || []).filter((a) => a.enabled);

  return (
    <section
      className="console-deck deck-side deck-aux-panel h-full flex flex-col justify-between gap-3.5"
      id="deck-aux"
      aria-label="Audio and Alarms Module"
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-dashed border-[var(--color-border)] pb-2.5">
        <div className="flex items-center gap-2">
          <SvgIcon name="Radio" size={18} className="text-[var(--color-border)]" />
          <h2 className="font-['VT323',monospace] text-2xl tracking-wider text-[var(--color-border)]">
            AUDIO
          </h2>
        </div>
        <Equalizer isPlaying={isAudioPlaying} />
      </div>

      {/* Main CRT Screen Panel */}
      <div className="deck-screen flex-1 flex flex-col justify-between gap-3 min-h-0">
        {/* Cassette Tape Module */}
        <div className="relative bg-[#120d0c] border-2 border-[var(--color-border)] rounded-md p-2.5 flex flex-col gap-2 z-[6] shadow-[inset_2px_2px_6px_rgba(0,0,0,0.7)]">
          {/* Cassette Top Status */}
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <div className="flex items-center gap-2 truncate">
              <span
                className={`w-2 h-2 rounded-full border border-black/40 flex-shrink-0 ${
                  isPlayingMusic
                    ? 'bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse'
                    : 'bg-amber-700/60'
                }`}
              />
              <span className="font-mono text-[10px] font-bold text-[var(--color-screen-glow)] tracking-tight truncate max-w-[130px]">
                SIDE A • {currentTrack?.name || 'LO-FI'}
              </span>
            </div>
            <span className="font-['VT323',monospace] text-base text-[var(--color-screen-glow)] tabular-nums tracking-widest leading-none flex-shrink-0">
              {formatTime(Math.floor(currentTime))} / {formatTime(Math.floor(duration))}
            </span>
          </div>

          {/* Cassette Window with Dual Spinning Reels */}
          <div className="relative h-12 bg-[#1e1513] rounded border border-white/10 flex items-center justify-between px-5 overflow-hidden">
            {/* Magnetic Tape Ribbon */}
            <div className="absolute inset-x-10 top-1/2 h-[3px] -translate-y-1/2 bg-[#5c3e34] shadow-[0_0_4px_rgba(0,0,0,0.8)] pointer-events-none" />

            {/* Left Reel */}
            <div className="relative z-10 flex items-center justify-center">
              <div
                className={`w-8 h-8 rounded-full border-2 border-white/30 bg-[#2c1d1a] flex items-center justify-center ${
                  isPlayingMusic ? 'reel-spinning' : ''
                }`}
              >
                <div className="w-3 h-3 rounded-full border border-white/40 bg-black/60 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-white/70" />
                </div>
                <span className="absolute w-full h-[1px] bg-white/20" />
                <span className="absolute h-full w-[1px] bg-white/20" />
              </div>
            </div>

            {/* Center Clean Window Badge */}
            <div className="relative z-10 flex items-center gap-1.5 bg-black/50 px-2 py-0.5 rounded border border-white/10">
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="font-mono text-[8px] text-[var(--color-screen-text)] opacity-70 tracking-widest">
                TAPE
              </span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
            </div>

            {/* Right Reel */}
            <div className="relative z-10 flex items-center justify-center">
              <div
                className={`w-8 h-8 rounded-full border-2 border-white/30 bg-[#2c1d1a] flex items-center justify-center ${
                  isPlayingMusic ? 'reel-spinning' : ''
                }`}
              >
                <div className="w-3 h-3 rounded-full border border-white/40 bg-black/60 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-white/70" />
                </div>
                <span className="absolute w-full h-[1px] bg-white/20" />
                <span className="absolute h-full w-[1px] bg-white/20" />
              </div>
            </div>
          </div>

          {/* Track Progress Scrubber */}
          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={isNaN(progressPercent) ? 0 : progressPercent}
            onChange={(e) => onSeek?.(parseFloat(e.target.value))}
            aria-label="Track progress seek"
            className="w-full h-1.5 bg-black/70 rounded-xs accent-[var(--color-warning)] cursor-pointer"
          />

          {/* Transport Controls */}
          <div className="flex items-center justify-between gap-1.5">
            <button
              onClick={onPrevTrack}
              aria-label="Previous track"
              className="flex-1 py-1 px-2 bg-white/10 hover:bg-white/20 rounded border border-white/15 text-[var(--color-screen-text)] transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95 text-xs font-mono font-bold"
              title="Previous Track"
            >
              <span>⏮</span>
              <span className="text-[10px]">PREV</span>
            </button>

            <RetroButton
              variant={isPlayingMusic ? 'warning' : 'primary'}
              size="sm"
              onClick={onToggleMusic}
              className="flex-[1.4] py-1.5 text-xs"
              aria-label={isPlayingMusic ? 'Pause music' : 'Play music'}
            >
              <SvgIcon name={isPlayingMusic ? 'Pause' : 'Play'} size={14} />
              <span>{isPlayingMusic ? 'PAUSE' : 'PLAY'}</span>
            </RetroButton>

            <button
              onClick={onNextTrack}
              aria-label="Next track"
              className="flex-1 py-1 px-2 bg-white/10 hover:bg-white/20 rounded border border-white/15 text-[var(--color-screen-text)] transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95 text-xs font-mono font-bold"
              title="Next Track"
            >
              <span className="text-[10px]">NEXT</span>
              <span>⏭</span>
            </button>
          </div>

          {/* Track Selector & Volume Row */}
          <div className="flex flex-col gap-1.5 pt-1 border-t border-white/10">
            {/* Track Selector Buttons */}
            <div className="grid grid-cols-3 gap-1">
              {MUSIC_TRACKS.map((track, idx) => {
                const isActive = idx === currentTrackIndex;
                return (
                  <button
                    key={track.id}
                    onClick={() => onSelectTrack?.(idx)}
                    className={`py-1 px-1 rounded-[var(--btn-radius)] border font-mono text-[9px] font-bold truncate transition-all cursor-pointer text-center ${
                      isActive
                        ? 'bg-[var(--color-warning)] text-[var(--color-border)] border-[var(--color-border)] shadow-[1px_1px_0_var(--color-btn-shadow)]'
                        : 'bg-white/5 border-white/15 text-[var(--color-screen-text)] hover:bg-white/10'
                    }`}
                    title={track.name}
                  >
                    {idx + 1}. {track.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>

            {/* Volume Control */}
            <div className="flex justify-between items-center text-xs font-bold pt-1">
              <button
                onClick={onToggleMute}
                className="flex items-center gap-1 text-[var(--color-screen-text)] hover:text-[var(--color-warning)] transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                <SvgIcon name={isMuted ? 'VolumeX' : 'Volume2'} size={13} />
                <span className="font-mono text-[10px]">
                  VOL: {isMuted ? 'MUTED' : `${Math.round(musicVolume * 100)}%`}
                </span>
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : musicVolume}
                onChange={(e) => onSetMusicVolume?.(parseFloat(e.target.value))}
                aria-label="Music Volume"
                className="w-24 accent-[var(--color-primary)] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Ambient Noise Generator (4 Cards) */}
        <div className="flex flex-col gap-1.5 z-[6] border-t border-dashed border-white/15 pt-2">
          <div className="flex items-center justify-between text-[10px] font-bold tracking-wider opacity-75 font-mono">
            <span>AMBIENT SOUNDS</span>
            {activeAmbient && (
              <span className="text-[var(--color-screen-glow)] font-['VT323',monospace] text-sm">
                ACTIVE
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {AMBIENT_SOUNDS.map((sound) => {
              const isActive = activeAmbient === sound.id;
              return (
                <button
                  key={sound.id}
                  onClick={() => onToggleAmbient?.(sound.id)}
                  className={`flex items-center gap-1.5 text-xs font-mono font-bold py-1.5 px-2 rounded-[var(--btn-radius)] border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-[0_0_8px_rgba(119,156,114,0.5)]'
                      : 'bg-white/5 border-white/15 text-[var(--color-screen-text)] hover:bg-white/10'
                  }`}
                >
                  <SvgIcon name={sound.icon} size={14} />
                  <span className="truncate">{sound.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Alarms Section (Compact Summary) */}
        <div className="flex flex-col gap-1.5 z-[6] border-t border-dashed border-white/15 pt-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <SvgIcon name="AlarmClock" size={14} className="text-[var(--color-screen-glow)]" />
              <span className="font-mono text-[10px] font-bold tracking-wider opacity-75">
                ALARMS
              </span>
            </div>
            <span className="font-['VT323',monospace] text-sm bg-[var(--color-screen-bg)] text-[var(--color-screen-glow)] border border-white/20 px-1.5 py-0.2 rounded-xs tabular-nums">
              {enabledAlarms.length}/{alarms?.length || 0} ACTIVE
            </span>
          </div>

          <div className="flex flex-col gap-1 max-h-[85px] overflow-y-auto pr-0.5">
            {!alarms || alarms.length === 0 ? (
              <div className="text-center font-mono text-[10px] text-[var(--color-screen-text)] opacity-50 py-2 border border-white/5 rounded">
                NO ALARMS CONFIGURED
              </div>
            ) : (
              alarms.map((alarm) => (
                <div
                  key={alarm.id}
                  className={`flex items-center justify-between py-1 px-2 rounded-[var(--btn-radius)] border border-white/10 text-xs font-mono transition-all ${
                    alarm.enabled
                      ? 'bg-white/10 text-[var(--color-screen-glow)]'
                      : 'bg-white/5 text-[var(--color-screen-text)] opacity-40'
                  }`}
                >
                  <div className="flex items-baseline gap-2 truncate">
                    <span className="font-['VT323',monospace] text-base leading-none tabular-nums font-bold">
                      {alarm.time}
                    </span>
                    <span className="text-[10px] truncate opacity-80">
                      {alarm.label || 'Alarm'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={alarm.enabled}
                      onChange={() => onToggleAlarm?.(alarm.id)}
                      aria-label={`Toggle alarm for ${alarm.time}`}
                      className="w-3.5 h-3.5 accent-[var(--color-primary)] cursor-pointer"
                    />
                    {onDeleteAlarm && (
                      <button
                        onClick={() => onDeleteAlarm(alarm.id)}
                        aria-label={`Delete alarm for ${alarm.time}`}
                        className="text-[var(--color-danger)] opacity-70 hover:opacity-100 hover:scale-110 transition-all p-0.5 cursor-pointer"
                      >
                        <SvgIcon name="Trash2" size={11} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
