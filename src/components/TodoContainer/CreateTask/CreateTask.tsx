import { TaskForm } from '../..';
import ShowError from '../../ShowError/ShowError';

import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';

import {
  createTodo,
  fetchTodos,
} from '../../../store/reducers/todos/todosAsyncThunk';
import {
  createStateTodo,
  removeTodoError,
} from '../../../store/reducers/todos/todosSlice';
import { getTodosFilter } from '../../../store/selectors/todos';

export const CreateTask: React.FC = memo(() => {
  const filter = useAppSelector(getTodosFilter);
  const error = useAppSelector((state) => state.todos.error);
  const dispatch = useAppDispatch();

  const handleSubmit = async (taskText: string) => {
    const text = taskText.trim();
    dispatch(createStateTodo(text));
    await dispatch(createTodo(text));
    await dispatch(fetchTodos(filter));
  };

  const handleRemoveError = () => {
    dispatch(removeTodoError());
  };

  return (
    <>
      <TaskForm handleSubmit={handleSubmit} />
      <ShowError error={error} removeError={handleRemoveError} />
    </>
  );
});
