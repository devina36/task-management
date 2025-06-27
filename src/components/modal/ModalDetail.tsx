'use client';

import { useState } from 'react';
import { FormDataProps, PriorityLevel, Task } from '@/types/types';
import { Check, SquarePen, Trash2, X } from 'lucide-react';
import { useAtom } from 'jotai';
import BadgePriority from '../badge/Badge';
import {
  isOpenConfirmAtom,
  STORAGE_KEY,
  taskAtom,
  tasksAtom,
} from '@/atoms/taskAtom';
import Button from '../button/Button';
import useGlobalHooks from '@/hooks/useGlobalHooks';

interface ModalDetailProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

const initialData: FormDataProps = {
  title: '',
  description: '',
  priority: 'medium',
};

const ModalDetail = ({ isOpen, onClose, task }: ModalDetailProps) => {
  const hook = useGlobalHooks();
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [, setTask] = useAtom(taskAtom);
  const [formData, setFormData] = useState<FormDataProps>(initialData);

  const [, setIsOpenConfirm] = useAtom(isOpenConfirmAtom);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const color = hook.getColorProgress(task?.progress);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateTask: Task = {
      ...task,
      ...formData,
    };

    const allupdate: Task[] = tasks.map((item: Task) =>
      item.id === task.id ? updateTask : item
    );

    setTasks(allupdate);
    setTask(updateTask);
    setIsEdit(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allupdate));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-[99] inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-3xl px-3 relative ">
        <div className=" absolute top-4 right-6">
          <button
            type="button"
            className="p-2 rounded-full bg-gray-300 text-gray-600 cursor-pointer"
            onClick={() => {
              onClose();
              setIsEdit(false);
            }}>
            <X size={20} />
          </button>
        </div>
        <div className="flex gap-2 border-b border-neutral-400 p-6 items-center">
          <h2 className="text-xl font-bold">Detail Task</h2>
          <h2
            className={`font-bold text-sm px-[2px] ${color} leading-none uppercase h-fit`}>
            {
              hook.dataProgress?.find((item) => item.value === task.progress)
                ?.label
            }
          </h2>
        </div>

        <div className="space-y-6 px-6 pt-4 pb-6 max-h-[70dvh] overflow-y-auto">
          <div className="flex justify-between gap-2">
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
            {!isEdit && (
              <div className="flex gap-2">
                <Button
                  icon={<SquarePen size={16} />}
                  onClick={() => {
                    setIsEdit(true);
                    setFormData({
                      title: task?.title,
                      description: task?.description,
                      priority: task?.priority,
                    });
                  }}
                  className="px-0 w-fit h-fit text-yellow-500 hover:text-yellow-600 hover:bg-gray-200 bg-transparent transition-all"
                />
                <Button
                  icon={<Trash2 size={16} />}
                  onClick={() => {
                    setIsOpenConfirm(true);
                    setTask(task);
                    onClose();
                  }}
                  className="px-0 w-fit h-fit text-red-500 hover:text-red-600 hover:bg-gray-200 bg-transparent transition-all"
                />
              </div>
            )}
          </div>

          {isEdit ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <textarea
                value={formData?.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter a title"
                className="min-h-[40px] h-[50px] outline-none p-2 w-full focus:ring-2 text-2xl border-2 border-gray-300 rounded-lg focus:ring-blue-500"
                required
              />

              <div className="text-gray-800  flex flex-col gap-2">
                <label className="font-semibold text-xl">Description</label>
                <textarea
                  value={formData?.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Add a more detailed description…"
                  className="min-h-[60px] h-[100px] outline-none p-2 w-full focus:ring-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-blue-500"
                />
              </div>

              <div className="text-gray-800 flex flex-col gap-2">
                <label className="font-semibold text-lg">Priority</label>
                <select
                  value={formData?.priority}
                  onChange={(e) => {
                    const value = e.target.value as PriorityLevel;
                    setFormData({ ...formData, priority: value });
                  }}
                  className="w-[200px] text-sm px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  {hook.dataPriority.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>

                <div className="flex gap-2 justify-end mt-2">
                  <Button
                    type="button"
                    onClick={() => {
                      setIsEdit(false);
                      setFormData(initialData);
                    }}
                    label={'Cancel'}
                    className="bg-gray-200 text-gray-600 w-[100px] hover:bg-gray-300 transition-all"
                  />
                  <Button
                    type="submit"
                    label={'Update'}
                    className="bg-blue-500 text-white w-[100px] px-4 hover:bg-blue-600 transition-all"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-6 mb-4">
              <h3 className="font-semibold text-2xl text-gray-900 line-clamp-2">
                {task?.title}
              </h3>

              <div className="text-gray-800  flex flex-col gap-2">
                <label className="font-semibold text-xl">Description</label>
                <p className=" text-sm">
                  {!!task?.description ? task?.description : '-'}
                </p>
              </div>

              <div className="text-gray-800  flex flex-col gap-2">
                <label className="font-semibold text-lg">Priority</label>
                <div className="flex gap-2 items-center">
                  <BadgePriority priority={task?.priority} />
                  <p className=" text-sm capitalize">{task?.priority}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalDetail;
