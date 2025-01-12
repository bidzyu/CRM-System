import { TodoInfo, Status } from '../../api';
import style from './tasksFilter.module.scss';

interface TasksFilterProps {
  onClick: (status: Status) => any;
  info: TodoInfo | undefined;
  currStatus: Status;
}

export const TasksFilter: React.FC<TasksFilterProps> = ({
  onClick,
  currStatus,
  info,
}) => {
  return (
    <div className={style.filter}>
      {Object.entries(Status).map(([key, value]) => {
        let className = 'button';
        let count = '';

        if (currStatus === value) {
          className += 'Selected';
        }

        if (info) {
          count += `(${info[value]})`;
        }

        return (
          <button
            onClick={() => onClick(value)}
            className={style[className]}
            key={key}
          >
            {key + count}
          </button>
        );
      })}
    </div>
  );
};
