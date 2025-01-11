import { Todo } from '../../../../api';
import TasksItem from '../TasksItem.tsx/TasksItem';
import { Status } from '../TasksList/TasksList';

interface TasksItemsProps {
  tasks: Todo[];
  fetchNewData: () => void;
  currStatus: Status;
}

const TasksItems: React.FC<TasksItemsProps> = ({
  tasks,
  fetchNewData,
  currStatus,
}) => {
  return (
    <ul className="tasks-items">
      {tasks.map((task) => (
        <TasksItem
          task={task}
          key={task.id}
          fetchNewData={fetchNewData}
          currStatus={currStatus}
        />
      ))}
    </ul>
  );
};

export default TasksItems;
