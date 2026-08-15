import React from 'react';
import { PixelCheckbox } from '../common/PixelCheckbox';
import { SvgIcon } from '../common/SvgIcon';

export function TaskList({ todos, onToggleTodo, onDeleteTodo }) {
  if (todos.length === 0) {
    return (
      <div className="text-center font-mono text-[var(--color-screen-text)] opacity-65 py-8 px-3 flex flex-col items-center justify-center gap-2 my-auto z-[6]">
        <div className="p-3 rounded-full bg-white/5 border border-white/10">
          <SvgIcon name="ClipboardList" size={32} className="text-[var(--color-screen-glow)]" />
        </div>
        <div className="font-['VT323',monospace] text-2xl text-[var(--color-screen-glow)] tracking-wider">NO ACTIVE SPRINT TASKS</div>
        <div className="text-xs max-w-[200px]">Add your priority tasks above to start logging deep work.</div>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1 z-[6]" aria-label="Task list">
      {todos.map((todo) => {
        const priorityColor =
          todo.priority === 'high'
            ? 'bg-[var(--color-priority-high)] shadow-[0_0_6px_var(--color-priority-high)]'
            : todo.priority === 'low'
            ? 'bg-[var(--color-priority-low)]'
            : 'bg-[var(--color-priority-med)]';

        return (
          <li
            key={todo.id}
            className="group flex items-center gap-2.5 bg-[var(--color-card)] border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] p-2.5 shadow-[2px_2px_0_var(--color-btn-shadow)] text-[var(--color-border)] transition-all hover:translate-x-0.5"
          >
            {/* Priority Indicator Dot */}
            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${priorityColor}`} title={`Priority: ${todo.priority}`} />

            {/* Checkbox */}
            <PixelCheckbox checked={todo.done} onChange={() => onToggleTodo(todo.id)} ariaLabel={`Mark ${todo.text} as complete`} />

            {/* Task Label */}
            <span
              onClick={() => onToggleTodo(todo.id)}
              className={`flex-1 text-xs font-mono break-words cursor-pointer select-none transition-opacity ${
                todo.done ? 'line-through opacity-40 italic' : 'font-medium'
              }`}
            >
              {todo.text}
            </span>

            {/* Delete Button */}
            <button
              onClick={() => onDeleteTodo(todo.id)}
              aria-label={`Delete ${todo.text}`}
              className="text-[var(--color-danger)] opacity-70 group-hover:opacity-100 hover:scale-125 transition-all p-1 cursor-pointer"
            >
              <SvgIcon name="Trash2" size={14} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
