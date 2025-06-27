import { PriorityLevel } from '@/types/types';

interface TProps {
  label: string;
  value: PriorityLevel;
}

export default function useGlobalHooks() {
  const getColorProgress = (progress: string) => {
    switch (progress) {
      case 'in-progress':
        return 'text-blue-600 bg-blue-100';
      case 'done':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-500 bg-gray-200';
    }
  };

  const generateId = () => {
    const now = new Date();

    const year = now.getFullYear().toString().slice(-2);
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');
    const millisecond = now.getMilliseconds().toString().padStart(3, '0');

    return year + minute + second + millisecond;
  };

  const dataPriority: TProps[] = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  const dataProgress = [
    { label: 'To do', value: 'todo' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Done', value: 'done' },
  ];

  return {
    generateId,
    getColorProgress,
    dataPriority,
    dataProgress,
  };
}
