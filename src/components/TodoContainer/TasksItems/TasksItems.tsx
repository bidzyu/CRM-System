import { List } from 'antd';
import { TasksItem } from '../..';
import { useAppSelector } from '../../../store/store';

export const TasksItems: React.FC = () => {
  const list = useAppSelector((state) => state.todos.list);

  return (
    <List>
      {list.map((task) => (
        <TasksItem
          isDone={task.isDone}
          title={task.title}
          id={task.id}
          created={task.created}
          key={`${task.id}-${task.title}-${task.isDone}`}
        />
      ))}
    </List>
  );
};
