import { Todo } from '../../../api/interfaces';

export const updateTask = (
  task: Todo,
  title: string,
  isDone: boolean
): Todo => {
  return { ...task, title, isDone };
};
