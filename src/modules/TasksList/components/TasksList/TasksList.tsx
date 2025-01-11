import { useEffect } from 'react';
import { useState } from 'react';
import { Todo, TodoInfo } from '../../../../api';
import { fetchData } from '../../api/fetchData';
import TasksFilter from '../TasksFilter/TasksFilter';
import TasksItems from '../TasksItems/TasksItems';

export enum Status {
  ALL = 'all',
  COMPLETED = 'completed',
  INWORK = 'inWork',
}

export const TasksList = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>();
  const [currStatus, setCurrStatus] = useState<Status>(Status.ALL);

  const changeStatus = (status: Status) => {
    setCurrStatus(status);
  };

  const fetchNewData = async () => {
    const data = await fetchData(currStatus);

    if (!data) return;
    console.log('fetchNewData: data updated!');
    setTasks(data.data.sort((a) => (a.isDone ? -1 : 1)));
    setInfo(data.info);
  };

  useEffect(() => {
    console.log('status changed');
    fetchNewData();
  }, [currStatus]);

  return (
    <div className="module tasks-list">
      <TasksFilter currStatus={currStatus} info={info} onClick={changeStatus} />
      <TasksItems
        tasks={tasks}
        currStatus={currStatus}
        fetchNewData={fetchNewData}
      />
    </div>
  );
};
