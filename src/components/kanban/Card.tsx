import { CardProps } from '@/types/CardProps';
import { Draggable } from '@hello-pangea/dnd';
import { Check } from 'lucide-react';
import { useAtom } from 'jotai';
import BadgePriority from '../badge/Badge';
import {
  isOpenConfirmAtom,
  isOpenDetailAtom,
  STORAGE_KEY,
  taskAtom,
  tasksAtom,
} from '@/atoms/taskAtom';
import { Task } from '@/types/Task';

export const Card = ({ task, index }: CardProps) => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [, setIsOpenConfirm] = useAtom(isOpenConfirmAtom);
  const [, setIsOpenDetail] = useAtom(isOpenDetailAtom);
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allupdate));
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
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 line-clamp-2">
                  {task.title}
                </h3>

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
                      <Check size={16} className="text-green-600" />
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
