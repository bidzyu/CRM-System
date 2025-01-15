import { TodoFilterStatus, type TodoInfo } from '../../interfaces';
import { Radio } from 'antd';

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
    <Radio.Group
      block
      value={currStatus}
      size="large"
      style={{ width: '100%' }}
    >
      {Object.entries(TodoFilterStatus).map(([key, status]) => {
        let count = '';

        if (info) {
          count += `(${info[status]})`;
        }

        return (
          <Radio.Button
            value={status}
            onClick={() => changeStatus(status)}
            key={key}
            
          >
            {`${translatedStatus[status]}${count}`}
          </Radio.Button>
        );
      })}
    </Radio.Group>
  );
};
