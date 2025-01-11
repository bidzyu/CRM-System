import { Todo } from '../../../api/interfaces';

export const createNewTask = (title: string, id: number = 0): Todo => {
  return {
    title,
    id,
    created: new Date().toISOString(),
    isDone: false,
  };
};
