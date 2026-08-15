import React from 'react';

export function CrtOverlay({ enabled }) {
  if (!enabled) return null;

  return (
    <div className="crt-overlay pointer-events-none select-none">
      <div className="crt-scanlines" />
      <div className="crt-vignette" />
      <div className="crt-flicker" />
    </div>
  );
}
