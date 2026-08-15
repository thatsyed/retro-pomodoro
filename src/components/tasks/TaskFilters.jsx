import React from 'react';

export function TaskFilters({ filter, onFilterChange, stats, onClearCompleted }) {
  return (
    <div className="pt-2 border-t border-[var(--border-color)] mt-3">
      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-dim)] mb-2">
        <span>
          COMPLETED: {stats.completed} / {stats.total}
        </span>
        {stats.completed > 0 && (
          <button
            type="button"
            onClick={onClearCompleted}
            className="text-[var(--danger)] hover:underline cursor-pointer tracking-wider uppercase text-[9px]"
          >
            Clear Done ({stats.completed})
          </button>
        )}
      </div>

      <div className="flex items-center space-x-1">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => onFilterChange(f)}
            className={`flex-1 py-1 text-[10px] uppercase font-mono tracking-wider border transition-all cursor-pointer ${
              filter === f
                ? 'bg-[var(--text-primary)] text-[var(--bg-app)] border-[var(--text-primary)] font-bold'
                : 'bg-[var(--bg-app)] text-[var(--text-dim)] border-[var(--border-color)] hover:text-[var(--text-primary)]'
            }`}
          >
            {f} {f === 'all' ? `(${stats.total})` : f === 'active' ? `(${stats.active})` : `(${stats.completed})`}
          </button>
        ))}
      </div>
    </div>
  );
}
