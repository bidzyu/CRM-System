import { memo } from 'react';
import { TaskForm } from '../..';
import { createTodo, fetchTodos } from '../../../api/todos';
import {
  createStateTodo,
  setTodoError,
  updateStateTodos,
} from '../../../store/reducers/todosSlice';
import { getTodosStatus } from '../../../store/selectors/todos';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import TaskError from './TaskError/TaskError';

export const CreateTask: React.FC = memo(() => {
  const status = useAppSelector(getTodosStatus);
  const dispatch = useAppDispatch();

  const handleSubmit = async (taskText: string) => {
    const text = taskText.trim();
    dispatch(createStateTodo(text));

    try {
      await createTodo(text);
      const newTodos = await fetchTodos(status);
      dispatch(updateStateTodos(newTodos));
    } catch (e) {
      dispatch(setTodoError('Неудалось создать задачу, попробуйте позже.'));
    }
  };

  return (
    <>
      <TaskForm handleSubmit={handleSubmit} />
      <TaskError />
    </>
  );
});
