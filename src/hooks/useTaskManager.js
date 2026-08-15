import { useState, useMemo, useCallback } from 'react';
import { generateId } from '../utils/formatters';

export function useTaskManager(todos, setTodos, onTaskDone, onClick) {
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'done'

  const addTodo = useCallback((text, priority = 'normal') => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo = {
      id: generateId('todo'),
      text: trimmed,
      priority: priority || 'normal',
      done: false,
      createdAt: Date.now()
    };
    setTodos((prev) => [newTodo, ...prev]);
    onClick?.();
  }, [setTodos, onClick]);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          const nextDone = !todo.done;
          if (nextDone) {
            onTaskDone?.();
          } else {
            onClick?.();
          }
          return { ...todo, done: nextDone };
        }
        return todo;
      })
    );
  }, [setTodos, onTaskDone, onClick]);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    onClick?.();
  }, [setTodos, onClick]);

  const clearDone = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.done));
    onClick?.();
  }, [setTodos, onClick]);

  const stats = useMemo(() => {
    const total = todos.length;
    const done = todos.filter((t) => t.done).length;
    const percentage = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, percentage };
  }, [todos]);

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done);
    if (filter === 'done') return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  return {
    todos: filteredTodos,
    allTodosCount: todos.length,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearDone,
    stats
  };
}
