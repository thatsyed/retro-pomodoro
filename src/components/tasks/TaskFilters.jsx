import React from 'react';

const filterLabels = {
  all: 'All',
  active: 'Active',
  completed: 'Done',
};

export function TaskFilters({ filter, onFilterChange, stats, onClearCompleted, minimal = false }) {
  if (minimal) {
    return (
      <div className="pt-3 border-t border-border mt-3">
        <div className="flex items-center justify-between text-[10px] font-sans text-muted-foreground mb-2">
          <span>
            {stats.completed} of {stats.total} completed
          </span>
          {stats.completed > 0 && (
            <button
              type="button"
              onClick={onClearCompleted}
              className="text-destructive hover:underline cursor-pointer text-[10px] font-medium"
            >
              Clear done
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 p-1 rounded-full bg-secondary/60">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => onFilterChange(f)}
              className={`flex-1 py-1 rounded-full text-[11px] font-sans font-medium transition-all cursor-pointer ${
                filter === f
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {filterLabels[f]} ({stats[f === 'all' ? 'total' : f === 'active' ? 'active' : 'completed']})
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-2 border-t border-[var(--border-color)] mt-3">
      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-dim)] mb-2">
        <span>
          {stats.completed} of {stats.total} completed
        </span>
        {stats.completed > 0 && (
          <button
            type="button"
            onClick={onClearCompleted}
            className="text-[var(--danger)] hover:underline cursor-pointer tracking-wider text-[9px]"
          >
            Clear done
          </button>
        )}
      </div>

      <div className="flex items-center space-x-1">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => onFilterChange(f)}
            className={`flex-1 py-1 text-[10px] font-mono tracking-wider border transition-all cursor-pointer ${
              filter === f
                ? 'bg-[var(--text-primary)] text-[var(--bg-app)] border-[var(--text-primary)] font-bold'
                : 'bg-[var(--bg-app)] text-[var(--text-dim)] border-[var(--border-color)] hover:text-[var(--text-primary)]'
            }`}
          >
            {filterLabels[f]} {f === 'all' ? `(${stats.total})` : f === 'active' ? `(${stats.active})` : `(${stats.completed})`}
          </button>
        ))}
      </div>
    </div>
  );
}
