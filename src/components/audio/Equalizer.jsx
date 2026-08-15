import React from 'react';

export function Equalizer({ isPlaying }) {
  return (
    <div
      className={`eq-visualizer flex items-end gap-[3px] h-[22px] py-0.5 px-1 bg-[var(--color-screen-bg)] border border-[var(--color-border)] rounded-xs ${
        isPlaying ? 'playing' : ''
      }`}
      title={isPlaying ? 'Audio Equalizer: Active' : 'Audio Equalizer: Idle'}
      aria-hidden="true"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bar) => (
        <span key={bar} className={`eq-bar bar-${bar}`} />
      ))}
    </div>
  );
}
