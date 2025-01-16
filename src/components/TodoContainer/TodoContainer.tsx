import { useEffect, useState, useRef, useCallback } from 'react';
import { TasksItems, CreateTask, TasksFilter } from '../';
import { fetchTodos } from '../../api/todos';
import { TodoFilterStatus, type Todo, type TodoInfo } from '../../interfaces';
import { Flex } from 'antd';

const TodoContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>();
  const [currStatus, setCurrStatus] = useState<TodoFilterStatus>(
    TodoFilterStatus.ALL
  );
  const fetchTimerRef = useRef<number>();

  const fetchNewData = useCallback(async () => {
    try {
      const data = await fetchTodos(currStatus);

      setTasks(data.data.sort((a) => (a.isDone ? -1 : 1)));
      setInfo(data.info);
    } catch (e) {
      alert('Неудалось получить данные, попробуйте позже.');
    }
  }, [currStatus]);

  const refetchNewData = useCallback(() => {
    fetchTimerRef.current = setInterval(() => {
      fetchNewData();
    }, 5000);
  }, [currStatus]);

  const cancelRefetch = () => {
    clearInterval(fetchTimerRef.current);
  };

  const changeStatus = useCallback(
    (status: TodoFilterStatus) => {
      setCurrStatus(status);
    },
    [currStatus]
  );

  useEffect(() => {
    fetchNewData();
    refetchNewData();

    return () => cancelRefetch();
  }, [currStatus]);

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
      <CreateTask fetchNewData={fetchNewData} />
      <TasksFilter
        all={info?.all}
        inWork={info?.inWork}
        completed={info?.completed}
        currStatus={currStatus}
        changeStatus={changeStatus}
      />
      <TasksItems tasks={tasks} fetchNewData={fetchNewData} />
    </Flex>
  );
};

export default TodoContainer;
