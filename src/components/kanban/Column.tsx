'use client';

import { Droppable } from '@hello-pangea/dnd';
import { Plus, X } from 'lucide-react';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { ColumnProps, ProgressLevel, Task } from '@/types/types';
import Button from '../button/Button';
import { Card } from './Card';
import { STORAGE_KEY, tasksAtom } from '@/atoms/taskAtom';
import useGlobalHooks from '@/hooks/useGlobalHooks';

export const Column = ({ title, tasks, id }: ColumnProps) => {
  const hook = useGlobalHooks();
  const [allTask, setAllTask] = useAtom(tasksAtom);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const color = hook.getColorProgress(id);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const newTask: Task = {
      id: `SM-${hook.generateId()}`,
      title: value,
      description: '',
      progress: id as ProgressLevel,
      priority: 'medium',
      isMark: false,
    };

    setTimeout(() => {
      setAllTask([...allTask, newTask]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...allTask, newTask]));
      setValue('');
      setIsCreate(false);
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col min-w-[220px] w-[320px] bg-[#f5f7f9] rounded-lg px-2 py-4 h-fit">
      <div className="mb-4 ml-8 flex gap-3 items-center">
        <h2 className={`font-bold text-sm px-[2px] ${color} leading-none`}>
          {title}
        </h2>
        <p className="text-xl text-gray-500 leading-none">{tasks.length}</p>
      </div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={` rounded-lg min-h-[15px] ${
              snapshot.isDraggingOver ? 'bg-[#dadadf]' : ''
            }`}>
            {tasks.map((task, index) => (
              <div key={task.id} className="relative">
                <Card task={task} index={index} />
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {isCreate ? (
        <form className="shadow-md rounded-md bg-white" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 focus-within:ring-2 focus-within:rounded-md rounded-md focus-within:ring-blue-500 border border-gray-100 p-2">
            <textarea
              name="title"
              className="min-h-[100px] w-full rounded-lg text-sm py-2 px-3 outline-none"
              placeholder="What needs to be done?"
              value={value}
              onChange={handleChange}
            />

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                onClick={() => {
                  setIsCreate(false);
                  setValue('');
                }}
                disabled={loading}
                icon={<X size={20} />}
                className="bg-gray-200 text-gray-600 w-fit hover:bg-gray-300 transition-all"
              />
              <Button
                type="submit"
                disabled={!!value ? false : true}
                loading={loading}
                label={'Create'}
                className="bg-blue-500 text-white w-fit px-4 hover:bg-blue-600 transition-all"
              />
            </div>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setIsCreate(true)}
          className="text-gray-600 flex gap-2 items-center hover:bg-gray-200 py-1 px-2 rounded cursor-pointer transition-all">
          <Plus size={16} className="font-semibold" />
          <span>Create</span>
        </button>
      )}
    </div>
  );
};
