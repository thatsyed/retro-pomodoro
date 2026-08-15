import React from 'react';

export function SpriteStage({ activeSprite = 'mug', isRunning, currentMode }) {
  return (
    <div className="flex justify-center items-center relative z-[6] w-full h-[64px]" aria-label="Focus companion stage">
      {/* 1. Cozy Mug */}
      {activeSprite === 'mug' && (
        <div className="relative">
          <svg viewBox="0 0 64 64" className="w-14 h-14 overflow-visible" aria-hidden="true">
            {isRunning && currentMode === 'work' && (
              <g className="steam-group">
                <rect x="22" y="8" width="4" height="8" className="steam-particle steam-1" />
                <rect x="36" y="4" width="4" height="8" className="steam-particle steam-2" />
                <rect x="29" y="12" width="4" height="8" className="steam-particle steam-3" />
              </g>
            )}
            <path
              d="M16 28 h32 v24 a 8 8 0 0 1 -8 8 h-16 a 8 8 0 0 1 -8 -8 z"
              className="fill-[var(--color-danger)] stroke-[var(--color-border)]"
              strokeWidth="4"
            />
            <path
              d="M48 36 h6 a 4 4 0 0 1 4 4 v8 a 4 4 0 0 1 -4 4 h-6"
              fill="none"
              className="stroke-[var(--color-border)]"
              strokeWidth="4"
            />
            <line x1="18" y1="32" x2="46" y2="32" className="stroke-[var(--color-screen-glow)]" strokeWidth="4" />
          </svg>
        </div>
      )}

      {/* 2. Pixel Cat */}
      {activeSprite === 'cat' && (
        <div className={`relative ${isRunning ? 'animate-bounce' : ''}`}>
          <svg viewBox="0 0 64 64" className="w-14 h-14" aria-hidden="true">
            <polygon points="18,18 24,6 28,18" className="fill-[var(--color-chassis)] stroke-[var(--color-border)] stroke-2" />
            <polygon points="36,18 40,6 46,18" className="fill-[var(--color-chassis)] stroke-[var(--color-border)] stroke-2" />
            <rect x="16" y="18" width="32" height="22" rx="4" className="fill-[var(--color-chassis)] stroke-[var(--color-border)] stroke-2" />
            <rect x="22" y="24" width="5" height="5" className="fill-[var(--color-border)]" />
            <rect x="37" y="24" width="5" height="5" className="fill-[var(--color-border)]" />
            <polygon points="32,32 30,30 34,30" className="fill-[var(--color-danger)]" />
            <line x1="10" y1="30" x2="18" y2="30" className="stroke-[var(--color-border)] stroke-2" />
            <line x1="10" y1="34" x2="18" y2="33" className="stroke-[var(--color-border)] stroke-2" />
            <line x1="46" y1="30" x2="54" y2="30" className="stroke-[var(--color-border)] stroke-2" />
            <line x1="46" y1="33" x2="54" y2="34" className="stroke-[var(--color-border)] stroke-2" />
            <rect x="20" y="38" width="24" height="18" rx="3" className="fill-[var(--color-chassis)] stroke-[var(--color-border)] stroke-2" />
            <rect x="22" y="52" width="6" height="6" className="fill-[var(--color-border)]" />
            <rect x="36" y="52" width="6" height="6" className="fill-[var(--color-border)]" />
            <path d="M44 48 Q54 44 52 36" fill="none" className="stroke-[var(--color-border)] stroke-4 cat-tail" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* 3. Pixel Bonsai */}
      {activeSprite === 'plant' && (
        <div className="relative">
          <svg viewBox="0 0 64 64" className="w-14 h-14" aria-hidden="true">
            <polygon points="20,44 44,44 40,60 24,60" className="fill-[var(--color-danger)] stroke-[var(--color-border)] stroke-2" />
            <rect x="18" y="42" width="28" height="4" rx="1" className="fill-[var(--color-warning)] stroke-[var(--color-border)] stroke-2" />
            <path d="M32 42 Q30 32 35 24" fill="none" className="stroke-[#5c3826] stroke-4" strokeLinecap="round" />
            <path d="M33 34 Q26 28 22 28" fill="none" className="stroke-[#5c3826] stroke-3" strokeLinecap="round" />
            <circle cx="36" cy="20" r="10" className={`fill-[var(--color-primary)] stroke-[var(--color-border)] stroke-1.5 ${isRunning ? 'animate-pulse' : ''}`} />
            <circle cx="21" cy="26" r="7" className={`fill-[var(--color-primary)] stroke-[var(--color-border)] stroke-1.5 ${isRunning ? 'animate-pulse' : ''}`} />
            <circle cx="43" cy="24" r="6" className="fill-[var(--color-primary)] stroke-[var(--color-border)] stroke-1.5" />
          </svg>
        </div>
      )}

      {/* 4. Lo-Fi Cassette Tape */}
      {activeSprite === 'tape' && (
        <div className="relative">
          <svg viewBox="0 0 64 64" className="w-14 h-14" aria-hidden="true">
            <rect x="8" y="16" width="48" height="34" rx="4" className="fill-[var(--color-screen-bg)] stroke-[var(--color-screen-glow)] stroke-2" />
            <rect x="14" y="22" width="36" height="20" rx="2" className="fill-[var(--color-chassis)] stroke-[var(--color-border)] stroke-1" />
            <circle cx="24" cy="32" r="5" className={`fill-none stroke-[var(--color-border)] stroke-2 origin-[24px_32px] ${isRunning ? 'reel-spinning' : ''}`} />
            <circle cx="40" cy="32" r="5" className={`fill-none stroke-[var(--color-border)] stroke-2 origin-[40px_32px] ${isRunning ? 'reel-spinning' : ''}`} />
            <polygon points="14,48 50,48 44,52 20,52" className="fill-[var(--color-screen-bezel)] stroke-[var(--color-border)] stroke-1" />
          </svg>
        </div>
      )}

      {/* 5. Pixel Ghost */}
      {activeSprite === 'ghost' && (
        <div className={`relative ${isRunning ? 'animate-bounce' : ''}`}>
          <svg viewBox="0 0 64 64" className="w-14 h-14" aria-hidden="true">
            <path
              d="M16 32 C16 18 24 10 32 10 C40 10 48 18 48 32 L48 52 L42 46 L36 52 L32 48 L28 52 L22 46 L16 52 Z"
              className="fill-[var(--color-white)] stroke-[var(--color-border)] stroke-2"
            />
            <circle cx="26" cy="28" r="3" className="fill-[var(--color-border)]" />
            <circle cx="38" cy="28" r="3" className="fill-[var(--color-border)]" />
            <ellipse cx="32" cy="36" rx="3" ry="2" className="fill-[var(--color-border)] opacity-60" />
          </svg>
        </div>
      )}

      {/* 6. Pixel Robot */}
      {activeSprite === 'robot' && (
        <div className={`relative ${isRunning ? 'animate-pulse' : ''}`}>
          <svg viewBox="0 0 64 64" className="w-14 h-14" aria-hidden="true">
            <line x1="32" y1="8" x2="32" y2="16" className="stroke-[var(--color-border)] stroke-2" />
            <circle cx="32" cy="6" r="3" className="fill-[var(--color-warning)] stroke-[var(--color-border)] stroke-2" />
            <rect x="18" y="16" width="28" height="22" rx="3" className="fill-[var(--color-chassis)] stroke-[var(--color-border)] stroke-2" />
            <rect x="22" y="22" width="6" height="5" className="fill-[var(--color-primary)]" />
            <rect x="36" y="22" width="6" height="5" className="fill-[var(--color-primary)]" />
            <line x1="24" y1="32" x2="40" y2="32" className="stroke-[var(--color-border)] stroke-2" />
            <rect x="22" y="40" width="20" height="14" rx="2" className="fill-[var(--color-chassis-dark)] stroke-[var(--color-border)] stroke-2" />
            <circle cx="32" cy="47" r="3" className="fill-[var(--color-danger)]" />
          </svg>
        </div>
      )}
    </div>
  );
}
