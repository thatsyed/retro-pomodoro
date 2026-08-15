import React from 'react';
import { PixelCheckbox } from '../common/PixelCheckbox';
import { SvgIcon } from '../common/SvgIcon';

export function TaskList({ todos, onToggleTodo, onDeleteTodo }) {
  if (todos.length === 0) {
    return (
      <div className="text-center font-mono text-[var(--color-screen-text)] opacity-60 py-6 px-2.5 flex flex-col items-center gap-1.5 my-auto z-[6]">
        <SvgIcon name="ClipboardList" size={32} className="text-[var(--color-screen-glow)] mb-1" />
        <div className="font-['VT323',monospace] text-xl text-[var(--color-screen-glow)]">NO TASKS LOGGED</div>
        <div className="text-xs">Add a task above to start your focus sprint.</div>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-1.5 max-h-[290px] overflow-y-auto pr-1 z-[6]" aria-label="Task list">
      {todos.map((todo) => {
        const priorityColor =
          todo.priority === 'high'
            ? 'bg-[var(--color-priority-high)] shadow-[0_0_4px_var(--color-priority-high)]'
            : todo.priority === 'low'
            ? 'bg-[var(--color-priority-low)]'
            : 'bg-[var(--color-priority-med)]';

        return (
          <li
            key={todo.id}
            className="flex items-center gap-2 bg-[var(--color-card)] border-2 border-[var(--color-border)] rounded-[var(--btn-radius)] p-2 shadow-[2px_2px_0_var(--color-btn-shadow)] text-[var(--color-border)] transition-transform hover:translate-x-0.5"
          >
            {/* Priority Indicator */}
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityColor}`} title={`Priority: ${todo.priority}`} />

            {/* Checkbox */}
            <PixelCheckbox checked={todo.done} onChange={() => onToggleTodo(todo.id)} ariaLabel={`Mark ${todo.text} as complete`} />

            {/* Task Label */}
            <span
              onClick={() => onToggleTodo(todo.id)}
              className={`flex-1 text-xs font-mono break-words cursor-pointer select-none ${
                todo.done ? 'line-through opacity-45' : ''
              }`}
            >
              {todo.text}
            </span>

            {/* Delete Button */}
            <button
              onClick={() => onDeleteTodo(todo.id)}
              aria-label={`Delete ${todo.text}`}
              className="text-[var(--color-danger)] hover:scale-125 transition-transform p-0.5 cursor-pointer"
            >
              <SvgIcon name="Trash2" size={14} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
