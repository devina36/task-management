export interface Task {
  id: string;
  title: string;
  description: string;
  progress: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  isMark: boolean;
}
