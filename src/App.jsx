import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] p-4 flex items-center justify-center">
      <div className="retro-bezel p-6 bg-[var(--bg-deck)] max-w-lg text-center">
        <h1 className="font-pixel text-lg text-[var(--text-primary)] glow-text mb-2">
          RETRO POMODORO // v2.0
        </h1>
        <p className="font-mono text-xs text-[var(--text-dim)]">
          8-Bit Cyberpunk Workstation Scaffolding Active
        </p>
      </div>
    </div>
  );
}
