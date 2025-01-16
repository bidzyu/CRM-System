import { TodoFilterStatus } from '../../interfaces';
import { Radio } from 'antd';
import { memo } from 'react';

const translatedStatus: Record<TodoFilterStatus, string> = {
  [TodoFilterStatus.ALL]: 'Все',
  [TodoFilterStatus.COMPLETED]: 'Выполненные',
  [TodoFilterStatus.INWORK]: 'В работе',
};

type StatusInfo = Record<TodoFilterStatus, number | undefined>;
interface TasksFilterProps extends StatusInfo {
  changeStatus: (status: TodoFilterStatus) => any;
  currStatus: TodoFilterStatus;
}

export const TasksFilter: React.FC<TasksFilterProps> = memo(
  ({ changeStatus, currStatus, all, inWork, completed }) => {
    return (
      <Radio.Group
        block
        value={currStatus}
        size="large"
        style={{ width: '100%' }}
      >
        {Object.entries(TodoFilterStatus).map(([key, status]) => {
          const info: StatusInfo = { all, inWork, completed };

          let count = '';

          if (info[status]) {
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
  }
);
