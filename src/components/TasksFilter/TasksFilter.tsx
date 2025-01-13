import { TodoFilterStatus, TodoInfo } from '../../interfaces';
import style from './tasksFilter.module.scss';

const translatedStatus: Record<TodoFilterStatus, string> = {
  [TodoFilterStatus.ALL]: 'Все',
  [TodoFilterStatus.COMPLETED]: 'Выполненные',
  [TodoFilterStatus.INWORK]: 'В работе',
};
interface TasksFilterProps {
  changeStatus: (status: TodoFilterStatus) => any;
  info: TodoInfo | undefined;
  currStatus: TodoFilterStatus;
}

export const TasksFilter: React.FC<TasksFilterProps> = ({
  changeStatus,
  currStatus,
  info,
}) => {
  return (
    <div className={style.filter}>
      {Object.entries(TodoFilterStatus).map(([key, status]) => {
        let count = '';

        if (info) {
          count += `(${info[status]})`;
        }

        return (
          <button
            onClick={() => changeStatus(status)}
            className={
              style[currStatus === status ? 'buttonSelected' : 'button']
            }
            key={key}
          >
            {`${translatedStatus[status]}${count}`}
          </button>
        );
      })}
    </div>
  );
};
