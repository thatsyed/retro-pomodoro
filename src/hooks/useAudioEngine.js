import { useState, useEffect, useRef, useCallback } from 'react';
import { MUSIC_TRACKS } from '../types';
import {
  playClickSound,
  playTaskDoneSound,
  playTimerCompleteSound,
  playAlarmChime,
  createAmbientGenerator
} from '../utils/audioSynth';

export function useAudioEngine(settings, saveSettings) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [musicVolume, setMusicVolume] = useState(0.4);
  const [activeAmbient, setActiveAmbient] = useState(null);

  const audioRef = useRef(null);
  const ambientGenRef = useRef(null);

  // Initialize background music element
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = musicVolume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  const triggerClick = useCallback(() => {
    playClickSound(settings.volume, settings.soundEnabled);
  }, [settings.volume, settings.soundEnabled]);

  const triggerTaskDone = useCallback(() => {
    playTaskDoneSound(settings.volume, settings.soundEnabled);
  }, [settings.volume, settings.soundEnabled]);

  const triggerTimerComplete = useCallback((mode) => {
    playTimerCompleteSound(mode, settings.volume, settings.soundEnabled);
  }, [settings.volume, settings.soundEnabled]);

  const triggerAlarmAlert = useCallback(() => {
    playAlarmChime(settings.volume, settings.soundEnabled);
  }, [settings.volume, settings.soundEnabled]);

  const playMusic = useCallback((index = currentTrackIndex) => {
    if (!audioRef.current) return;
    const track = MUSIC_TRACKS[index] || MUSIC_TRACKS[0];
    setCurrentTrackIndex(index);
    audioRef.current.src = track.src;
    audioRef.current.volume = musicVolume;
    audioRef.current.play().then(() => {
      setIsPlayingMusic(true);
    }).catch((err) => {
      console.warn('Playback requires user interaction', err);
      setIsPlayingMusic(false);
    });
  }, [currentTrackIndex, musicVolume]);

  const pauseMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    }
  }, []);

  const toggleMusic = useCallback(() => {
    triggerClick();
    if (isPlayingMusic) {
      pauseMusic();
    } else {
      playMusic(currentTrackIndex);
    }
  }, [isPlayingMusic, playMusic, pauseMusic, currentTrackIndex, triggerClick]);

  const selectTrack = useCallback((index) => {
    triggerClick();
    if (index === currentTrackIndex && isPlayingMusic) {
      pauseMusic();
    } else {
      playMusic(index);
    }
  }, [currentTrackIndex, isPlayingMusic, playMusic, pauseMusic, triggerClick]);

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
      ambientGenRef.current = createAmbientGenerator(type, settings.volume);
      setActiveAmbient(type);
    }
  }, [activeAmbient, settings.volume, triggerClick]);

  return {
    isPlayingMusic,
    currentTrackIndex,
    currentTrack: MUSIC_TRACKS[currentTrackIndex] || MUSIC_TRACKS[0],
    musicVolume,
    setMusicVolume,
    activeAmbient,
    toggleMusic,
    selectTrack,
    toggleAmbient,
    triggerClick,
    triggerTaskDone,
    triggerTimerComplete,
    triggerAlarmAlert,
    isAudioPlaying: isPlayingMusic || !!activeAmbient
  };
}
