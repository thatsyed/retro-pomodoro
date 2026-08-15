import React, { useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { TaskList } from './TaskList';
import { RetroButton } from '../common/RetroButton';
import { SvgIcon } from '../common/SvgIcon';

export function TaskDeck({
  todos,
  stats,
  filter,
  onSetFilter,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
  onClearDone
}) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('normal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text, priority);
      setText('');
    }
  };

  return (
    <section
      className="console-deck deck-side deck-tasks-panel h-full flex flex-col gap-3.5"
      id="deck-tasks"
      aria-labelledby="deck-tasks-title"
    >
      {/* Deck Header */}
      <div className="flex justify-between items-center border-b-2 border-dashed border-[var(--color-border)] pb-2.5">
        <div className="flex items-center gap-2">
          <SvgIcon name="CheckSquare" size={18} className="text-[var(--color-border)]" />
          <h2 id="deck-tasks-title" className="font-['VT323',monospace] text-2xl tracking-wider text-[var(--color-border)]">
            TASKS
          </h2>
        </div>
        <span className="font-['VT323',monospace] text-lg bg-[var(--color-screen-bg)] text-[var(--color-screen-glow)] border border-[var(--color-border)] px-2 py-0.5 rounded-xs tabular-nums">
          {stats.done}/{stats.total}
        </span>
      </div>

      {/* CRT Screen Panel */}
      <div className="deck-screen flex-1 flex flex-col min-h-0 gap-3">
        {/* Progress Bar */}
        <ProgressBar percentage={stats.percentage} />

        {/* Filter Bar */}
        <div className="flex justify-between items-center border-b border-white/10 pb-2 z-[6]">
          <div className="flex gap-1" role="tablist" aria-label="Task filters">
            {[
              { id: 'all', label: 'ALL' },
              { id: 'active', label: 'ACTIVE' },
              { id: 'done', label: 'DONE' }
            ].map(({ id, label }) => {
              const isActive = filter === id;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSetFilter(id)}
                  className={`font-mono text-xs font-bold py-1 px-2 rounded-xs uppercase cursor-pointer transition-all ${
                    isActive
                      ? 'text-[var(--color-screen-glow)] bg-white/10 font-bold'
                      : 'text-[var(--color-screen-text)] opacity-60 hover:opacity-100 hover:bg-white/5'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <button
            onClick={onClearDone}
            className="font-mono text-[10px] text-[var(--color-danger)] border border-white/15 py-0.5 px-1.5 rounded-xs hover:bg-[var(--color-danger)] hover:text-white transition-colors cursor-pointer"
          >
            CLEAR
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-1.5 z-[6]">
          <div className="flex flex-1 gap-1">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="New task..."
              maxLength={70}
              required
              className="retro-input text-xs py-1.5 px-2 bg-white border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] font-mono text-[var(--color-border)] flex-1 focus:outline-none"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              aria-label="Task Priority"
              className="font-mono text-[11px] font-bold bg-white border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] py-1 px-1.5 text-[var(--color-border)] cursor-pointer focus:outline-none max-w-[85px]"
            >
              <option value="normal">Norm</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </div>
          <RetroButton variant="primary" size="sm" type="submit">
            <SvgIcon name="Plus" size={14} />
            <span>ADD</span>
          </RetroButton>
        </form>

        {/* Task List (expands to fill remaining height) */}
        <TaskList todos={todos} onToggleTodo={onToggleTodo} onDeleteTodo={onDeleteTodo} />
      </div>
    </section>
  );
}
