import React from 'react';
import { Equalizer } from './Equalizer';
import { AmbientGen } from './AmbientGen';
import { AlarmList } from './AlarmList';
import { RetroButton } from '../common/RetroButton';
import { SvgIcon } from '../common/SvgIcon';
import { MUSIC_TRACKS } from '../../types';
import { formatTime } from '../../utils/formatters';

export function AudioDeck({
  isPlayingMusic,
  currentTrackIndex,
  currentTrack,
  musicVolume,
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
  alarms,
  onAddAlarm,
  onToggleAlarm,
  onDeleteAlarm,
  isAudioPlaying
}) {
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

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

      {/* Submodule 1: Lo-Fi Tape Deck */}
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

        <div className="deck-screen flex flex-col gap-3">
          {/* Detailed Lo-Fi Cassette Tape Graphic */}
          <div className="relative bg-[#120d0c] border-2 border-[var(--color-border)] rounded-md p-2.5 flex flex-col gap-2 z-[6] shadow-[inset_2px_2px_6px_rgba(0,0,0,0.7)]">
            {/* Cassette Header Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full border border-black/40 ${isPlayingMusic ? 'bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse' : 'bg-amber-700/60'}`} />
                <span className="font-['Press_Start_2P',cursive] text-[9px] text-[var(--color-screen-glow)] tracking-tight truncate max-w-[140px]">
                  SIDE-A • {currentTrack.name}
                </span>
              </div>
              <span className="font-['VT323',monospace] text-lg text-[var(--color-screen-glow)] tabular-nums tracking-widest leading-none">
                {formatTime(Math.floor(currentTime))} / {formatTime(Math.floor(duration))}
              </span>
            </div>

            {/* Cassette Window with Dual Spinning Reels */}
            <div className="relative h-14 bg-[#1e1513] rounded border border-white/10 flex items-center justify-between px-6 overflow-hidden">
              {/* Magnetic Tape Ribbon */}
              <div className="absolute inset-x-12 top-1/2 h-[3px] -translate-y-1/2 bg-[#5c3e34] shadow-[0_0_4px_rgba(0,0,0,0.8)] pointer-events-none" />

              {/* Left Reel */}
              <div className="relative z-10 flex items-center justify-center">
                <div className={`w-9 h-9 rounded-full border-2 border-white/30 bg-[#2c1d1a] flex items-center justify-center ${isPlayingMusic ? 'reel-spinning' : ''}`}>
                  <div className="w-3.5 h-3.5 rounded-full border border-white/40 bg-black/60 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-white/70" />
                  </div>
                  <span className="absolute w-full h-[1.5px] bg-white/20" />
                  <span className="absolute h-full w-[1.5px] bg-white/20" />
                </div>
              </div>

              {/* Center Tape Window Badge */}
              <div className="relative z-10 flex flex-col items-center bg-black/50 px-2 py-0.5 rounded border border-white/10">
                <span className="font-['Press_Start_2P',cursive] text-[7px] text-[var(--color-warning)] tracking-wider">
                  HIGH BIAS
                </span>
                <span className="font-mono text-[8px] text-[var(--color-screen-text)] opacity-70">
                  STEREO 60
                </span>
              </div>

              {/* Right Reel */}
              <div className="relative z-10 flex items-center justify-center">
                <div className={`w-9 h-9 rounded-full border-2 border-white/30 bg-[#2c1d1a] flex items-center justify-center ${isPlayingMusic ? 'reel-spinning' : ''}`}>
                  <div className="w-3.5 h-3.5 rounded-full border border-white/40 bg-black/60 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-white/70" />
                  </div>
                  <span className="absolute w-full h-[1.5px] bg-white/20" />
                  <span className="absolute h-full w-[1.5px] bg-white/20" />
                </div>
              </div>
            </div>

            {/* Track Progress Scrubber */}
            <div className="flex flex-col gap-1 pt-1">
              <input
                type="range"
                min="0"
                max="100"
                step="0.5"
                value={isNaN(progressPercent) ? 0 : progressPercent}
                onChange={(e) => onSeek?.(parseFloat(e.target.value))}
                aria-label="Track progress seek"
                className="w-full h-2 bg-black/70 rounded-xs accent-[var(--color-warning)] cursor-pointer"
              />
            </div>

            {/* Cassette Transport Controls */}
            <div className="flex items-center justify-between gap-2 pt-0.5">
              <button
                onClick={onPrevTrack}
                aria-label="Previous track"
                className="flex-1 py-1.5 px-2 bg-white/10 hover:bg-white/20 rounded border border-white/15 text-[var(--color-screen-text)] transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95"
                title="Previous Track"
              >
                <SvgIcon name="RotateCcw" size={14} />
                <span className="font-mono text-[10px] font-bold">PREV</span>
              </button>

              <RetroButton
                variant={isPlayingMusic ? 'warning' : 'primary'}
                size="sm"
                onClick={onToggleMusic}
                className="flex-[1.5] py-2"
              >
                <SvgIcon name={isPlayingMusic ? 'Pause' : 'Play'} size={15} />
                <span>{isPlayingMusic ? 'PAUSE' : 'PLAY'}</span>
              </RetroButton>

              <button
                onClick={onNextTrack}
                aria-label="Next track"
                className="flex-1 py-1.5 px-2 bg-white/10 hover:bg-white/20 rounded border border-white/15 text-[var(--color-screen-text)] transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95"
                title="Next Track"
              >
                <span className="font-mono text-[10px] font-bold">NEXT</span>
                <SvgIcon name="RotateCcw" size={14} className="scale-x-[-1]" />
              </button>
            </div>
          </div>

          {/* Track Selector List */}
          <div className="flex flex-col gap-1.5 z-[6]">
            {MUSIC_TRACKS.map((track, idx) => {
              const isActive = idx === currentTrackIndex;
              return (
                <button
                  key={track.id}
                  onClick={() => onSelectTrack(idx)}
                  className={`flex items-center justify-between py-2 px-3 rounded-[var(--btn-radius)] border-2 border-[var(--color-border)] font-mono text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[var(--color-warning)] text-[var(--color-border)] shadow-[1px_1px_0_var(--color-btn-shadow)] translate-x-1'
                      : 'bg-[var(--color-card)] text-[var(--color-border)] hover:bg-[var(--color-warning)] shadow-[2px_2px_0_var(--color-btn-shadow)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="font-['Press_Start_2P',cursive] text-[8px] opacity-75">{idx + 1}</span>
                    <span className="truncate">{track.name}</span>
                  </div>
                  <span className="font-['VT323',monospace] text-base">
                    {isActive && isPlayingMusic ? '♪ PLAYING' : '♪ READY'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Volume Control Row with Mute Button */}
          <div className="flex justify-between items-center z-[6] text-xs font-bold pt-1.5 border-t border-white/10">
            <button
              onClick={onToggleMute}
              className="flex items-center gap-1.5 text-[var(--color-screen-text)] hover:text-[var(--color-warning)] transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              <SvgIcon name={isMuted ? 'VolumeX' : 'Volume2'} size={15} />
              <span>VOL: {isMuted ? 'MUTED' : `${Math.round(musicVolume * 100)}%`}</span>
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : musicVolume}
              onChange={(e) => onSetMusicVolume(parseFloat(e.target.value))}
              aria-label="Music Volume"
              className="w-28 accent-[var(--color-primary)] cursor-pointer"
            />
          </div>

          {/* Ambient Noise Generator */}
          <AmbientGen activeAmbient={activeAmbient} onToggleAmbient={onToggleAmbient} />
        </div>
      </div>

      {/* Submodule 2: Scheduled Daily Alarms */}
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
