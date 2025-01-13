import { TasksItem } from '../';
import { Todo } from '../../interfaces';
import style from './tasksItems.module.scss';

interface TasksItemsProps {
  tasks: Todo[];
  fetchNewData: () => void;
}

export const TasksItems: React.FC<TasksItemsProps> = ({
  tasks,
  fetchNewData,
}) => {
  return (
    <ul className={style.items}>
      {tasks.map((task) => (
        <TasksItem task={task} key={task.id} fetchNewData={fetchNewData} />
      ))}
    </ul>
  );
};
