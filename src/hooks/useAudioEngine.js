import { useState, useEffect, useRef, useCallback } from 'react';
import { MUSIC_TRACKS } from '../types';
import {
  playClickSound,
  playTaskDoneSound,
  playTimerCompleteSound,
  playAlarmChime,
  createAmbientGenerator
} from '../utils/audioSynth';

export function useAudioEngine(settings) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeAmbient, setActiveAmbient] = useState(null);
  const [ambientVolume, setAmbientVolume] = useState(0.4);

  const audioRef = useRef(null);
  const ambientGenRef = useRef(null);

  // Initialize background audio element
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = MUSIC_TRACKS[0]?.src || '';
    audio.volume = musicVolume;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const onEnded = () => {
      // Auto-advance to next track in loop
      setCurrentTrackIndex((prev) => {
        const nextIndex = (prev + 1) % MUSIC_TRACKS.length;
        audio.src = MUSIC_TRACKS[nextIndex].src;
        audio.play().then(() => setIsPlayingMusic(true)).catch(() => setIsPlayingMusic(false));
        return nextIndex;
      });
    };

    const onPlay = () => setIsPlayingMusic(true);
    const onPause = () => setIsPlayingMusic(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : musicVolume;
    }
  }, [musicVolume, isMuted]);

  // SFX Triggers
  const triggerClick = useCallback(() => {
    playClickSound(settings?.volume ?? 0.6, settings?.soundEnabled ?? true);
  }, [settings?.volume, settings?.soundEnabled]);

  const triggerTaskDone = useCallback(() => {
    playTaskDoneSound(settings?.volume ?? 0.6, settings?.soundEnabled ?? true);
  }, [settings?.volume, settings?.soundEnabled]);

  const triggerTimerComplete = useCallback((mode) => {
    playTimerCompleteSound(mode, settings?.volume ?? 0.6, settings?.soundEnabled ?? true);
  }, [settings?.volume, settings?.soundEnabled]);

  const triggerAlarmAlert = useCallback(() => {
    playAlarmChime(settings?.volume ?? 0.6, settings?.soundEnabled ?? true);
  }, [settings?.volume, settings?.soundEnabled]);

  // Track Playback Controls
  const playTrack = useCallback((index) => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = MUSIC_TRACKS[index] || MUSIC_TRACKS[0];
    
    if (index !== currentTrackIndex || !audio.src.includes(track.src)) {
      audio.src = track.src;
      setCurrentTrackIndex(index);
    }

    audio.play().then(() => {
      setIsPlayingMusic(true);
    }).catch((err) => {
      console.warn('Playback waiting for user interaction:', err);
      setIsPlayingMusic(false);
    });
  }, [currentTrackIndex]);

  const pauseTrack = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlayingMusic(false);
    }
  }, []);

  const toggleMusic = useCallback(() => {
    triggerClick();
    if (isPlayingMusic) {
      pauseTrack();
    } else {
      playTrack(currentTrackIndex);
    }
  }, [isPlayingMusic, playTrack, pauseTrack, currentTrackIndex, triggerClick]);

  const nextTrack = useCallback(() => {
    triggerClick();
    const nextIdx = (currentTrackIndex + 1) % MUSIC_TRACKS.length;
    playTrack(nextIdx);
  }, [currentTrackIndex, playTrack, triggerClick]);

  const prevTrack = useCallback(() => {
    triggerClick();
    const prevIdx = (currentTrackIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    playTrack(prevIdx);
  }, [currentTrackIndex, playTrack, triggerClick]);

  const seek = useCallback((percentage) => {
    const audio = audioRef.current;
    if (audio && duration > 0) {
      const newTime = (percentage / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }, [duration]);

  const toggleMute = useCallback(() => {
    triggerClick();
    setIsMuted((prev) => !prev);
  }, [triggerClick]);

  // Ambient Generator Controls
  const toggleAmbient = useCallback((type) => {
    triggerClick();
    if (activeAmbient === type) {
      if (ambientGenRef.current) {
        ambientGenRef.current.stop();
        ambientGenRef.current = null;
      }
      setActiveAmbient(null);
    } else {
      if (ambientGenRef.current) {
        ambientGenRef.current.stop();
      }
      ambientGenRef.current = createAmbientGenerator(type, (settings?.volume ?? 0.6) * ambientVolume);
      setActiveAmbient(type);
    }
  }, [activeAmbient, settings?.volume, ambientVolume, triggerClick]);

  return {
    isPlayingMusic,
    currentTrackIndex,
    currentTrack: MUSIC_TRACKS[currentTrackIndex] || MUSIC_TRACKS[0],
    musicVolume,
    setMusicVolume,
    currentTime,
    duration,
    isMuted,
    toggleMute,
    seek,
    toggleMusic,
    playTrack,
    pauseTrack,
    nextTrack,
    prevTrack,
    activeAmbient,
    toggleAmbient,
    ambientVolume,
    setAmbientVolume,
    triggerClick,
    triggerTaskDone,
    triggerTimerComplete,
    triggerAlarmAlert,
    isAudioPlaying: isPlayingMusic || !!activeAmbient
  };
}
