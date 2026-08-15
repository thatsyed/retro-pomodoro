import React from 'react';

export function CassetteReels({ isPlaying }) {
  return (
    <div className="flex items-center justify-between px-6 py-2">
      {/* Left Reel */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className={`w-14 h-14 tape-reel ${isPlaying ? 'spinning' : ''}`}
        >
          <circle cx="50" cy="50" r="46" fill="#141122" stroke="var(--border-color)" strokeWidth="3" />
          <circle cx="50" cy="50" r="34" fill="#0d0a17" stroke="var(--text-secondary)" strokeWidth="2" strokeDasharray="3 3" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 50 50)`}>
              <rect x="47" y="16" width="6" height="18" fill="var(--text-primary)" rx="1" />
            </g>
          ))}
          <circle cx="50" cy="50" r="14" fill="#1f1b33" stroke="var(--text-primary)" strokeWidth="2" />
          <circle cx="50" cy="50" r="6" fill="#08080f" />
        </svg>
      </div>

      {/* Center Magnetic Tape Strip */}
      <div className="flex-1 mx-4 flex flex-col items-center justify-center space-y-1">
        <div className="w-full flex items-center justify-between text-[8px] font-mono text-[var(--text-dim)] px-1">
          <span>Side A</span>
          <span className="text-[var(--text-primary)]">Lo-Fi Focus</span>
          <span>Tape 1</span>
        </div>
        <div className="w-full h-1 bg-[#422513] border border-[#2b170a] relative overflow-hidden">
          <div
            className={`h-full bg-[var(--text-primary)] transition-all duration-300 ${
              isPlaying ? 'opacity-80' : 'opacity-20'
            }`}
            style={{ width: isPlaying ? '65%' : '40%' }}
          />
        </div>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((dot) => (
            <div
              key={dot}
              className={`w-1 h-1 rounded-full ${
                isPlaying ? 'bg-[var(--text-primary)] animate-pulse' : 'bg-[var(--text-dim)]'
              }`}
              style={{ animationDelay: `${dot * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Right Reel */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className={`w-14 h-14 tape-reel ${isPlaying ? 'spinning' : ''}`}
        >
          <circle cx="50" cy="50" r="46" fill="#141122" stroke="var(--border-color)" strokeWidth="3" />
          <circle cx="50" cy="50" r="34" fill="#0d0a17" stroke="var(--text-secondary)" strokeWidth="2" strokeDasharray="3 3" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 50 50)`}>
              <rect x="47" y="16" width="6" height="18" fill="var(--text-primary)" rx="1" />
            </g>
          ))}
          <circle cx="50" cy="50" r="14" fill="#1f1b33" stroke="var(--text-primary)" strokeWidth="2" />
          <circle cx="50" cy="50" r="6" fill="#08080f" />
        </svg>
      </div>
    </div>
  );
}
