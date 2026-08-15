import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('med');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), priority);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3 space-y-2">
      <div className="flex items-center space-x-1.5">
        <div className="relative flex-1">
          <input
            id="task-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add new task (press Enter)..."
            className="w-full bg-[var(--bg-app)] border border-[var(--border-color)] px-3 py-1.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-dim)] font-mono focus:outline-none focus:border-[var(--text-primary)] focus:shadow-[var(--glow-primary)]"
          />
        </div>

        <button
          type="submit"
          className="bg-[var(--text-primary)] text-[var(--bg-app)] hover:bg-[var(--text-secondary)] px-3 py-1.5 font-pixel text-[10px] flex items-center justify-center transition-all cursor-pointer font-bold shrink-0"
          title="Add Task"
        >
          <Plus className="w-3.5 h-3.5 mr-1 stroke-[3]" />
          ADD
        </button>
      </div>

      {/* Priority Selection Bar */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-dim)] pt-0.5">
        <span className="tracking-wide">PRIORITY:</span>
        <div className="flex items-center space-x-1">
          {['low', 'med', 'high'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`px-2 py-0.5 border text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                priority === p
                  ? p === 'high'
                    ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/15 font-bold shadow-[var(--glow-accent)]'
                    : 'border-[var(--text-primary)] text-[var(--text-primary)] bg-[var(--text-primary)]/15 font-bold'
                  : 'border-[var(--border-color)] text-[var(--text-dim)] hover:text-[var(--text-secondary)]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
