import { TodoFilterStatus } from '../../../interfaces/todosApi';
import { Radio } from 'antd';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getTodosInfo, getTodosStatus } from '../../../store/selectors/todos';
import { changeStateTodosStatus } from '../../../store/reducers/todosSlice';

const translatedStatus: Record<TodoFilterStatus, string> = {
  [TodoFilterStatus.ALL]: 'Все',
  [TodoFilterStatus.COMPLETED]: 'Выполненные',
  [TodoFilterStatus.INWORK]: 'В работе',
};

export const TasksFilter = memo(() => {
  const status = useAppSelector(getTodosStatus);
  const info = useAppSelector(getTodosInfo);
  const dispatch = useAppDispatch();

  return (
    <Radio.Group block value={status} size="large" style={{ width: '100%' }}>
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
