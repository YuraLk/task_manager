import TaskDTO from '@/dtos/task_dto';
import { create } from 'zustand';

interface ITaskStore {
  get tasks(): TaskDTO[];
  setTasks(tasks: TaskDTO[]): void;
}

export const useTaskStore = create<ITaskStore>(set => ({
  tasks: [] as TaskDTO[],
  setTasks: tasks => set({ tasks }),
}));
