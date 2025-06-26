'use client';

import React, { useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useAtom } from 'jotai';
import { Task } from '@/types/Task';
import { Column } from './Column';
import {
  isOpenConfirmAtom,
  isOpenDetailAtom,
  loadTasksAtom,
  STORAGE_KEY,
  taskAtom,
  tasksAtom,
  tasksLoadingAtom,
} from '@/atoms/taskAtom';
import ModalConfirm from '../modal/ModalConfirm';
import ModalDetail from '../modal/ModalDetail';

const Board = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [loading] = useAtom(tasksLoadingAtom);
  const [, loadTasks] = useAtom(loadTasksAtom);
  const [isOpenConfirm, setIsConfirm] = useAtom(isOpenConfirmAtom);
  const [isOpenDetail, setIsOpenDetail] = useAtom(isOpenDetailAtom);
  const [task] = useAtom(taskAtom);

  useEffect(() => {
    loadTasks();
  }, []);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const projectTask = tasks.find((p: Task) => p.id === draggableId);
    if (!projectTask) return;

    const newTasks = Array.from(tasks);
    const projectIndex = tasks.findIndex((p: Task) => p.id === draggableId);

    newTasks.splice(projectIndex, 1);

    const updatedProject = {
      ...projectTask,
      progress: destination.droppableId,
    };

    newTasks.splice(destination.index, 0, updatedProject);
    setTasks(newTasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
  };

  const getTaskByProgress = (progress: string) => {
    return tasks.filter((task: Task) => task.progress === progress);
  };

  const handleDelete = () => {
    const updateData = tasks.filter((item: Task) => item.id !== task.id);
    setTasks(updateData);
  };

  if (loading)
    return (
      <div className="flex gap-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-[120px] bg-gray-300 rounded-lg w-[320px]" />
        ))}
      </div>
    );

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          <Column title="TO DO" tasks={getTaskByProgress('todo')} id="todo" />
          <Column
            title="IN PROGRESS"
            tasks={getTaskByProgress('in-progress')}
            id="in-progress"
          />
          <Column title="DONE" tasks={getTaskByProgress('done')} id="done" />
        </div>
      </DragDropContext>

      <ModalConfirm
        isOpen={isOpenConfirm}
        onClose={() => setIsConfirm(false)}
        handleConfirm={handleDelete}
        title="Confirm delete"
        message={`Are you sure want to delete ${task?.id}?`}
      />

      <ModalDetail
        isOpen={isOpenDetail}
        onClose={() => setIsOpenDetail(false)}
        task={task}
      />
    </>
  );
};

export default Board;
