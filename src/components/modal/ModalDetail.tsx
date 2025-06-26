'use client';

import { Task } from '@/types/Task';
import { Check, X } from 'lucide-react';
import { useAtom } from 'jotai';
import BadgePriority from '../badge/Badge';
import { STORAGE_KEY, taskAtom, tasksAtom } from '@/atoms/taskAtom';

interface ModalDetailProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

const ModalDetail = ({ isOpen, onClose, task }: ModalDetailProps) => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [, setTask] = useAtom(taskAtom);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateTask: Task = {
      ...task,
      isMark: e.target.checked,
    };

    const allupdate: Task[] = tasks.map((item: Task) =>
      item.id === task.id ? updateTask : item
    );

    setTasks(allupdate);
    setTask(updateTask);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allupdate));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-[99] inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-3xl modal-content max-h-[95dvh] overflow-y-auto px-3 relative ">
        <div className=" absolute top-4 right-6">
          <button
            type="button"
            className="p-2 rounded-full bg-gray-300 text-gray-600 cursor-pointer"
            onClick={() => onClose()}>
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-2 border-b border-neutral-400 p-6">
          <h2 className="text-xl font-bold">Detail Task</h2>
        </div>

        <div className="space-y-6 px-6 pt-4 pb-6 ">
          <div className="flex gap-2 items-center">
            <div className="inline-flex items-center">
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  checked={task.isMark}
                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
                  onChange={handleCheck}
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Check size={14} />
                </span>
              </label>
            </div>
            <p className="text-gray-800 text-sm">{task?.id}</p>
          </div>

          <h3 className="font-semibold text-2xl text-gray-900 line-clamp-2">
            {task?.title}
          </h3>

          <div className="text-gray-800">
            <p className="font-semibold text-xl">Description</p>
            <p className=" text-sm">
              {!!task?.description ? task?.description : '-'}
            </p>
          </div>

          <div className="text-gray-800">
            <p className="font-semibold text-lg">Priority</p>
            <div className="flex gap-2 items-center">
              <BadgePriority priority={task?.priority} />
              <p className=" text-sm capitalize">{task?.priority}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetail;
