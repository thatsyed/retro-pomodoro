import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const priorityLabels = {
  low: 'Low',
  med: 'Med',
  high: 'High',
};

export function TaskInput({ onAddTask, minimal = false }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('med');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), priority);
      setTitle('');
    }
  };

  if (minimal) {
    return (
      <form onSubmit={handleSubmit} className="mb-3 space-y-2">
        <div className="flex items-center gap-2">
          <Input
            id="task-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 rounded-full border-border bg-background text-xs font-sans text-foreground h-9"
          />

          <Button
            type="submit"
            size="icon"
            title="Add Task"
            className="size-9 shrink-0 rounded-full"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Priority Selection Bar */}
        <div className="flex items-center justify-between text-[10px] font-sans pt-0.5">
          <span className="text-muted-foreground">Priority:</span>
          <div className="flex items-center gap-1 p-0.5 rounded-full bg-secondary/60">
            {['low', 'med', 'high'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium transition-all cursor-pointer ${
                  priority === p
                    ? p === 'high'
                      ? 'bg-destructive/15 text-destructive'
                      : 'bg-primary/15 text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {priorityLabels[p]}
              </button>
            ))}
          </div>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-3 space-y-2">
      <div className="flex items-center space-x-1.5">
        <Input
          id="task-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task..."
          className="h-auto flex-1 border-border bg-background px-3 py-1.5 text-xs font-mono text-foreground"
        />

        <Button
          type="submit"
          size="sm"
          title="Add Task"
          className="h-auto shrink-0 px-3 py-1.5 font-pixel text-[10px] font-bold"
        >
          <Plus className="w-3.5 h-3.5 mr-1 stroke-[3]" />
          Add
        </Button>
      </div>

      {/* Priority Selection Bar */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-dim)] pt-0.5">
        <span className="tracking-wide">Priority:</span>
        <div className="flex items-center space-x-1">
          {['low', 'med', 'high'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`px-2 py-0.5 border text-[9px] tracking-wider transition-all cursor-pointer ${
                priority === p
                  ? p === 'high'
                    ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/15 font-bold shadow-[var(--glow-accent)]'
                    : 'border-[var(--text-primary)] text-[var(--text-primary)] bg-[var(--text-primary)]/15 font-bold'
                  : 'border-[var(--border-color)] text-[var(--text-dim)] hover:text-[var(--text-secondary)]'
              }`}
            >
              {priorityLabels[p]}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
