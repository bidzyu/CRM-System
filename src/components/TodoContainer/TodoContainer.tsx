import { useEffect, useRef, useCallback } from 'react';
import { TasksItems, CreateTask, TasksFilter } from '../';
import { fetchTodos } from '../../api/todos';
import { Flex } from 'antd';

import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  removeTodoError,
  setTodoError,
  updateStateTodos,
} from '../../store/reducers/todosSlice';
import { getTodosList, getTodosStatus } from '../../store/selectors/todos';

const TodoContainer: React.FC = () => {
  const status = useAppSelector(getTodosStatus);
  const list = useAppSelector(getTodosList);
  const dispatch = useAppDispatch();

  const fetchTimerRef = useRef<number>();

  const fetchNewData = useCallback(async () => {
    try {
      const data = await fetchTodos(status);

      dispatch(updateStateTodos(data));
    } catch (e) {
      dispatch(setTodoError('Неудалось получить данные, попробуйте позже.'));
    }
  }, [status]);

  const refetchNewData = useCallback(() => {
    fetchTimerRef.current = setInterval(() => {
      fetchNewData();
    }, 5000);
  }, [status]);

  const cancelRefetch = () => {
    clearInterval(fetchTimerRef.current);
  };

  useEffect(() => {
    cancelRefetch();
    refetchNewData();
  }, [list]);

  useEffect(() => {
    cancelRefetch();
    fetchNewData();
    refetchNewData();

    return () => cancelRefetch();
  }, [status]);

  return (
    <Flex
      vertical
      gap={'middle'}
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '30px 5px',
      }}
    >
      <CreateTask />
      <TasksFilter />
      <TasksItems />
    </Flex>
  );
};

export default TodoContainer;
