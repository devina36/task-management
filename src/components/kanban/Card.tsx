'use client';

import { useState } from 'react';
import { CardProps, Task } from '@/types/types';
import { Draggable } from '@hello-pangea/dnd';
import { Check, SquarePen, Trash2, X } from 'lucide-react';
import { useAtom } from 'jotai';
import BadgePriority from '../badge/Badge';
import {
  isOpenConfirmAtom,
  isOpenDetailAtom,
  STORAGE_KEY,
  taskAtom,
  tasksAtom,
} from '@/atoms/taskAtom';
import Button from '../button/Button';

export const Card = ({ task, index }: CardProps) => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [, setTask] = useAtom(taskAtom);
  const [title, setTitle] = useState<string>('');

  // Modal
  const [, setIsOpenConfirm] = useAtom(isOpenConfirmAtom);
  const [, setIsOpenDetail] = useAtom(isOpenDetailAtom);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateTask: Task = {
      ...task,
      isMark: e.target.checked,
    };

    const allupdate: Task[] = tasks.map((item: Task) =>
      item.id === task.id ? updateTask : item
    );

    setTasks(allupdate);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allupdate));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const updateTask: Task = {
      ...task,
      title: title,
    };

    const allupdate: Task[] = tasks.map((item: Task) =>
      item.id === task.id ? updateTask : item
    );

    setTimeout(() => {
      setTasks(allupdate);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allupdate));
      setIsEdit(false);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="mb-4">
            <div
              className={`p-4 shadow-md transition-shadow hover:shadow-lg cursor-pointer relative rounded-lg bg-white`}
              onClick={() => {
                setIsOpenDetail(true);
                setTask(task);
              }}>
              <div className="flex gap-2 justify-end mb-1">
                {isEdit ? (
                  <Button
                    icon={<X size={16} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEdit(false);
                      setTitle('');
                    }}
                    className="px-0 w-fit h-fit text-gray-600 hover:text-gray-700 hover:bg-gray-200 bg-gray-100 transition-all rounded-full"
                  />
                ) : (
                  <>
                    <Button
                      icon={<SquarePen size={16} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEdit(true);
                        setTitle(task.title);
                      }}
                      className="px-0 w-fit h-fit text-yellow-500 hover:text-yellow-600 hover:bg-gray-200 bg-transparent transition-all"
                    />
                    <Button
                      icon={<Trash2 size={16} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpenConfirm(true);
                        setTask(task);
                      }}
                      className="px-0 w-fit h-fit text-red-500 hover:text-red-600 hover:bg-gray-200 bg-transparent transition-all"
                    />
                  </>
                )}
              </div>
              <div className="space-y-5">
                {isEdit ? (
                  <form
                    className="shadow-md rounded-md bg-white"
                    onSubmit={handleSubmit}>
                    <div
                      className="flex flex-col gap-2 focus-within:ring-2 focus-within:rounded-md rounded-md focus-within:ring-blue-500 border border-gray-100 p-2"
                      onClick={(e) => e.stopPropagation()}>
                      <textarea
                        name="title"
                        className="min-h-[100px] w-full rounded-lg text-sm py-2 px-3 outline-none"
                        placeholder="What needs to be done?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />

                      <div className="flex gap-2 justify-end">
                        <Button
                          type="submit"
                          disabled={!!title ? false : true}
                          label={'Update'}
                          loading={loading}
                          className="bg-blue-500 text-white w-fit px-4 hover:bg-blue-600 transition-all"
                        />
                      </div>
                    </div>
                  </form>
                ) : (
                  <h3 className="font-medium text-gray-900 line-clamp-2">
                    {task.title}
                  </h3>
                )}

                <div className="flex justify-between gap-1 items-center">
                  <div className="flex gap-2 items-center">
                    <div
                      className="inline-flex items-center"
                      onClick={(e) => e.stopPropagation()}>
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
                    <p className="text-sm">{task.id}</p>
                  </div>

                  <div className="flex gap-2">
                    {task.progress === 'done' && (
                      <Check size={20} className="text-green-600" />
                    )}
                    <BadgePriority priority={task.priority} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};
