import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { soundSynth } from '../services/soundSynth';

const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Initialize workstation focus block',
    completed: true,
    priority: 'high',
    createdAt: Date.now() - 3600000,
  },
  {
    id: 'task-2',
    title: 'Draft core deliverables & review spec',
    completed: false,
    priority: 'high',
    createdAt: Date.now() - 1800000,
  },
  {
    id: 'task-3',
    title: 'Maintain posture and hydration',
    completed: false,
    priority: 'med',
    createdAt: Date.now(),
  },
];

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage('rp_tasks_list', INITIAL_TASKS);
  const [filter, setFilter] = useState('all');

  const addTask = useCallback((title, priority = 'med') => {
    if (!title || !title.trim()) return;
    soundSynth.playButtonClick();
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: title.trim(),
      completed: false,
      priority,
      createdAt: Date.now(),
    };
    setTasks(prev => [newTask, ...prev]);
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    soundSynth.playButtonClick();
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    soundSynth.playButtonClick();
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  const clearCompleted = useCallback(() => {
    soundSynth.playButtonClick();
    setTasks(prev => prev.filter(task => !task.completed));
  }, [setTasks]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    stats: {
      total: tasks.length,
      active: tasks.filter(t => !t.completed).length,
      completed: tasks.filter(t => t.completed).length,
    },
  };
}
