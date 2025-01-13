import { useEffect, useState } from 'react';
import { TasksItems, CreateTask, TasksFilter } from '../';
import { fetchTodos } from '../../api/todos';
import { TodoFilterStatus, Todo, TodoInfo } from '../../interfaces';
import style from './todoContainer.module.scss';

const TodoContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>();
  const [currStatus, setCurrStatus] = useState<TodoFilterStatus>(
    TodoFilterStatus.ALL
  );

  useEffect(() => {
    fetchNewData();
  }, [currStatus]);

  const changeStatus = (status: TodoFilterStatus) => {
    setCurrStatus(status);
  };

  const fetchNewData = async () => {
    try {
      const data = await fetchTodos(currStatus);

      setTasks(data.data.sort((a) => (a.isDone ? -1 : 1)));
      setInfo(data.info);
    } catch (e) {
      alert('Неудалось получить данные, попробуйте позже.');
    }
  };

  return (
    <div className={style.container}>
      <CreateTask fetchNewData={fetchNewData} />
      <TasksFilter
        info={info}
        currStatus={currStatus}
        changeStatus={changeStatus}
      />
      <TasksItems tasks={tasks} fetchNewData={fetchNewData} />
    </div>
  );
};

export default TodoContainer;
