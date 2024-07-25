interface ITaskDTO {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

export default class TaskDTO implements ITaskDTO {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  constructor(mode: ITaskDTO) {
    this.id = mode.id;
    this.name = mode.name;
    this.description = mode.description;
    this.completed = mode.completed;
  }
}
