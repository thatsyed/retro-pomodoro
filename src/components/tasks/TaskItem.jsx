import React from 'react';
import { Check, Trash2 } from 'lucide-react';

const priorityStyles = {
  minimal: {
    low: 'text-muted-foreground bg-secondary/60',
    med: 'text-secondary-foreground bg-secondary/80 font-medium',
    high: 'text-destructive bg-destructive/10 font-medium',
  },
  retro: {
    low: 'text-[var(--text-dim)] border-[var(--border-color)] bg-[var(--bg-app)]',
    med: 'text-[var(--text-secondary)] border-[var(--border-color)] bg-[var(--bg-app)]',
    high: 'text-[var(--accent)] border-[var(--accent)]/40 bg-[var(--accent)]/10',
  },
};

const priorityLabels = {
  low: 'Low',
  med: 'Med',
  high: 'High',
};

export function TaskItem({ task, onToggle, onDelete, minimal = false }) {
  const priorityColors = priorityStyles[minimal ? 'minimal' : 'retro'];

  if (minimal) {
    return (
      <div
        className={`flex items-center justify-between p-2.5 rounded-xl border border-border transition-all duration-150 ${
          task.completed ? 'opacity-50' : 'bg-background/40 hover:bg-secondary/30'
        }`}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0 pr-2">
          {/* Round Checkbox */}
          <button
            type="button"
            onClick={() => onToggle(task.id)}
            className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
              task.completed
                ? 'bg-primary border-primary text-primary-foreground'
                : 'border-muted-foreground/40 hover:border-primary'
            }`}
            title={task.completed ? 'Mark uncompleted' : 'Mark completed'}
            aria-label={task.completed ? 'Mark uncompleted' : 'Mark completed'}
          >
            {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
          </button>

          {/* Task Title */}
          <span
            className={`text-xs font-sans truncate select-none ${
              task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
            }`}
            title={task.title}
          >
            {task.title}
          </span>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          {/* Priority Badge */}
          <span className={`text-[9px] font-sans px-2 py-0.5 rounded-full ${priorityColors[task.priority] || priorityColors.med}`}>
            {priorityLabels[task.priority] || 'Med'}
          </span>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="text-muted-foreground hover:text-destructive p-1 transition-colors cursor-pointer"
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-between p-2.5 my-1.5 border transition-all duration-150 ${
      task.completed
        ? 'bg-[var(--bg-surface)]/60 border-[var(--border-color)]/60 opacity-60'
        : 'bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-[var(--text-secondary)]'
    }`}>
      <div className="flex items-center space-x-3 flex-1 min-w-0 pr-2">
        {/* Retro Square Checkbox */}
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`w-5 h-5 flex items-center justify-center border transition-all cursor-pointer ${
            task.completed
              ? 'bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--bg-app)]'
              : 'border-[var(--text-secondary)] bg-[var(--bg-app)] hover:border-[var(--text-primary)]'
          }`}
          title={task.completed ? 'Mark uncompleted' : 'Mark completed'}
          aria-label={task.completed ? 'Mark uncompleted' : 'Mark completed'}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Task Title */}
        <span
          className={`text-xs font-mono truncate select-none ${
            task.completed ? 'line-through text-[var(--text-dim)]' : 'text-[var(--text-primary)]'
          }`}
          title={task.title}
        >
          {task.title}
        </span>
      </div>

      <div className="flex items-center space-x-2 shrink-0">
        {/* Priority Badge */}
        <span className={`text-[9px] font-mono px-1.5 py-0.5 border tracking-wider ${priorityColors[task.priority] || priorityColors.med}`}>
          {priorityLabels[task.priority] || 'Med'}
        </span>

        {/* Delete Button */}
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="text-[var(--text-dim)] hover:text-[var(--danger)] p-1 transition-colors cursor-pointer"
          title="Delete task"
          aria-label="Delete task"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
