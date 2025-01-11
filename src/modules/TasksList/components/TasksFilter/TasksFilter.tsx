import { Status } from '../TasksList/TasksList';
import { TodoInfo } from '../../../../api';

interface TasksFilterProps {
  onClick: (status: Status) => any;
  info: TodoInfo | undefined;
  currStatus: Status;
}

const TasksFilter: React.FC<TasksFilterProps> = ({
  onClick,
  currStatus,
  info,
}) => {
  return (
    <div className="tasks-list__tasks-filter">
      {Object.entries(Status).map(([key, value]) => {
        let className = 'tasks-list__tasks-filter__button';
        let count = '';

        if (currStatus === value) {
          className += '_selected';
        }

        if (info) {
          count += `(${info[value]})`;
        }

        return (
          <button
            onClick={() => onClick(value)}
            className={className}
            key={key}
          >
            {key + count}
          </button>
        );
      })}
    </div>
  );
};

export default TasksFilter;
