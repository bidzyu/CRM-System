import { Radio } from 'antd';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getTodosInfo, getTodosFilter} from '../../../store/selectors/todos';
import { changeStateTodosStatus } from '../../../store/reducers/todos/todosSlice';
import { TodoFilterStatus } from '../../../interfaces/todosApi';

const translatedStatus: Record<TodoFilterStatus, string> = {
  [TodoFilterStatus.ALL]: 'Все',
  [TodoFilterStatus.COMPLETED]: 'Выполненные',
  [TodoFilterStatus.INWORK]: 'В работе',
};

export const TasksFilter = memo(() => {
  const filter = useAppSelector(getTodosFilter);
  const info = useAppSelector(getTodosInfo);
  const dispatch = useAppDispatch();

  return (
    <Radio.Group block value={filter} size="large" style={{ width: '100%' }}>
      {Object.entries(TodoFilterStatus).map(([key, status]) => {
        let groupItemsCount = '';

        if (info && info[status]) {
          groupItemsCount += `(${info[status]})`;
        }

        const changeStatus = () => {
          dispatch(changeStateTodosStatus(status));
        };

        return (
          <Radio.Button value={status} onClick={changeStatus} key={key}>
            {`${translatedStatus[status]}${groupItemsCount}`}
          </Radio.Button>
        );
      })}
    </Radio.Group>
  );
});
