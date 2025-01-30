import { Flex } from 'antd';
import { TasksItems, CreateTask, TasksFilter } from '../';
import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchTodos } from '../../store/reducers/todos/todosAsyncThunk';
import { getTodosList, getTodosFilter } from '../../store/selectors/todos';

const TodoContainer: React.FC = () => {
  const filter = useAppSelector(getTodosFilter);
  const list = useAppSelector(getTodosList);
  const dispatch = useAppDispatch();

  const fetchTimerRef = useRef<number>();

  const fetchNewData = useCallback(async () => {
    dispatch(fetchTodos(filter));
  }, [filter]);

  const refetchNewData = useCallback(() => {
    fetchTimerRef.current = setInterval(() => {
      fetchNewData();
    }, 5000);
  }, [filter]);

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
  }, [filter]);

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
