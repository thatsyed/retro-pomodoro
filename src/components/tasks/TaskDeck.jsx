import React from 'react';
import { ListTodo, CheckCircle2 } from 'lucide-react';
import { TaskInput } from './TaskInput';
import { TaskItem } from './TaskItem';
import { TaskFilters } from './TaskFilters';

export function TaskDeck({
  tasks,
  filter,
  onFilterChange,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onClearCompleted,
  stats,
  theme = 'classic',
}) {
  const minimal = theme === 'minimal';

  if (minimal) {
    return (
      <div className="rounded-2xl border border-border bg-card p-4 flex flex-col shadow-sm lg:h-full">
        {/* Deck Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <ListTodo className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-sans text-sm font-semibold tracking-tight text-foreground">Tasks</h2>
          </div>
          <span className="text-[10px] font-sans font-medium text-muted-foreground rounded-full bg-secondary/60 px-2 py-0.5">
            {stats.active} active
          </span>
        </div>

        {/* Input */}
        <TaskInput onAddTask={onAddTask} minimal />

        {/* Task List (Scrollable) */}
        <div className="flex-1 min-h-[120px] overflow-y-auto space-y-1.5 pr-1">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
                minimal
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-36 text-center rounded-xl border border-dashed border-border p-4">
              <CheckCircle2 className="w-6 h-6 mb-2 text-muted-foreground/60" />
              <span className="text-xs text-muted-foreground">No tasks here.</span>
              <span className="text-[10px] text-muted-foreground/70 mt-1">Press Alt + T to add one.</span>
            </div>
          )}
        </div>

        {/* Filter and Summary Footer */}
        <TaskFilters
          filter={filter}
          onFilterChange={onFilterChange}
          stats={stats}
          onClearCompleted={onClearCompleted}
          minimal
        />
      </div>
    );
  }

  return (
    <div className="retro-bezel bg-[var(--bg-deck)] p-4 flex flex-col h-full">
      {/* Deck Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-color)]">
        <div className="flex items-center space-x-2">
          <ListTodo className="w-4 h-4 text-[var(--text-primary)]" />
          <h2 className="font-pixel text-xs text-[var(--text-primary)] tracking-wider">
            Tasks
          </h2>
        </div>
        <span className="text-[10px] font-mono text-[var(--text-secondary)] border border-[var(--border-color)] px-1.5 py-0.5 bg-[var(--bg-surface)]">
          {stats.active} active
        </span>
      </div>

      {/* Input */}
      <TaskInput onAddTask={onAddTask} />

      {/* Task List (Scrollable) */}
      <div className="flex-1 min-h-[120px] overflow-y-auto space-y-1 pr-1">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-36 text-center border border-dashed border-[var(--border-color)] p-4 text-[var(--text-dim)] font-mono text-xs">
            <CheckCircle2 className="w-6 h-6 mb-2 opacity-50 text-[var(--text-secondary)]" />
            <span>No tasks here.</span>
            <span className="text-[10px] text-[var(--text-dim)] mt-1">Press Alt + T to add one.</span>
          </div>
        )}
      </div>

      {/* Filter and Summary Footer */}
      <TaskFilters
        filter={filter}
        onFilterChange={onFilterChange}
        stats={stats}
        onClearCompleted={onClearCompleted}
      />
    </div>
  );
}
