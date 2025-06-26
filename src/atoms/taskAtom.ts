import { Task } from '@/types/Task';
import { atom } from 'jotai';

const initialTasks: Task[] = [
  {
    id: 'SM-1',
    title: 'Create 2 Instagram stories for week 10',
    description: 'des',
    progress: 'todo',
    priority: 'medium',
    isMark: true,
  },
  {
    id: 'SM-2',
    title: 'Visit Hotel Mulia',
    description: 'des2',
    progress: 'todo',
    priority: 'high',
    isMark: false,
  },
];

export const STORAGE_KEY = 'task-management';

export const tasksAtom = atom<Task[]>(initialTasks);

export const taskAtom = atom<Task>();

export const isOpenConfirmAtom = atom<boolean>(false);

export const isOpenDetailAtom = atom<boolean>(false);

export const tasksLoadingAtom = atom<boolean>(true);

export const loadTasksAtom = atom(null, async (get, set) => {
  if (typeof window === 'undefined') return;

  set(tasksLoadingAtom, true);

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed: Task[] = stored ? JSON.parse(stored) : initialTasks;
    set(tasksAtom, parsed);
  } catch {
    set(tasksAtom, initialTasks);
  } finally {
    set(tasksLoadingAtom, false);
  }
});
