import { useEffect, useState } from 'react';
import { TasksItems, CreateTask, TasksFilter } from '../';
import { Todo, TodoInfo, Status, getData } from '../../api';
import style from './todoContainer.module.scss';

const TodoContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>();
  const [currStatus, setCurrStatus] = useState<Status>(Status.ALL);
  const [trigger, setTrigger] = useState(false);

  const useTrigger = () => {
    setTrigger((prev) => !prev);
  };

  const changeStatus = (status: Status) => {
    setCurrStatus(status);
    useTrigger();
  };

  const fetchNewData = async () => {
    const data = await getData(currStatus);

    if (!data) return;

    setTasks(data.data.sort((a) => (a.isDone ? -1 : 1)));
    setInfo(data.info);
  };

  useEffect(() => {
    fetchNewData();
  }, [trigger]);

  return (
    <div className={style.container}>
      <CreateTask useTrigger={useTrigger} />
      <TasksFilter currStatus={currStatus} info={info} onClick={changeStatus} />
      <TasksItems
        tasks={tasks}
        currStatus={currStatus}
        useTrigger={useTrigger}
      />
    </div>
  );
};

export default TodoContainer;
