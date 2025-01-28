import { message } from 'antd';
import { useEffect } from 'react';
import { removeTodoError } from '../../../../store/reducers/todosSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

const TaskError = () => {
  const error = useAppSelector((state) => state.todos.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      message.error(error).then(() => dispatch(removeTodoError()));
    }
  }, [error]);

  return null;
};

export default TaskError;
