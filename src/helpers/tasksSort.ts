import { Todo } from '../interfaces/todosApi';

export const tasksSort = (a: Todo, b: Todo) => {
  if ((a.isDone && b.isDone) || (!a.isDone && !b.isDone)) {
    return a.title > b.title ? 1 : -1;
  }

  return a.isDone ? -1 : 1;
};
