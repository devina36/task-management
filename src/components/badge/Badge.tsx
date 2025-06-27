import { ChevronDown, Equal, ChevronUp } from 'lucide-react';

const getIcon = (priority: string) => {
  switch (priority) {
    case 'high':
      return <ChevronDown size={20} className="text-red-400" />;
    case 'medium':
      return <Equal size={20} className="text-yellow-400" />;
    case 'low':
      return <ChevronUp size={20} className="text-blue-400" />;
    default:
      return <Equal size={20} className="text-gray-400" />;
  }
};

const BadgePriority = ({ priority }: { priority: string }) => {
  const theme = getIcon(priority);

  return <div className="flex">{theme}</div>;
};

export default BadgePriority;
