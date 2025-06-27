export type PriorityLevel = 'low' | 'medium' | 'high';
export type ProgressLevel = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  progress: ProgressLevel;
  priority: PriorityLevel;
  isMark: boolean;
}

export interface CardProps {
  task: Task;
  index: number;
}

export interface ColumnProps {
  title: string;
  tasks: Task[];
  id: string;
}

export interface FormDataProps {
  title: string;
  description: string;
  priority: PriorityLevel;
}
