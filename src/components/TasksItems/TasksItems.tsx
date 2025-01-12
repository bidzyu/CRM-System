import { TasksItem } from '../';
import { Todo, Status } from '../../api';
import style from './tasksItems.module.scss';

interface TasksItemsProps {
  tasks: Todo[];
  useTrigger: () => void;
  currStatus: Status;
}

export const TasksItems: React.FC<TasksItemsProps> = ({
  tasks,
  useTrigger,
  currStatus,
}) => {
  return (
    <ul className={style.items}>
      {tasks.map((task) => (
        <TasksItem
          task={task}
          key={task.id}
          useTrigger={useTrigger}
          currStatus={currStatus}
        />
      ))}
    </ul>
  );
};
