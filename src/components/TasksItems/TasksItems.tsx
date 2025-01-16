import { List } from 'antd';
import { TasksItem } from '../';
import type { Todo } from '../../interfaces';

interface TasksItemsProps {
  tasks: Todo[];
  fetchNewData: () => void;
}

export const TasksItems: React.FC<TasksItemsProps> = ({
  tasks,
  fetchNewData,
}) => {
  return (
    <List>
      {tasks.map((task) => (
        <TasksItem
          isDone={task.isDone}
          title={task.title}
          id={task.id}
          key={`${task.id}-${task.title}-${task.isDone}`}
          fetchNewData={fetchNewData}
        />
      ))}
    </List>
  );
};
