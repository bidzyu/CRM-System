import React from 'react';
import TodoContainer from '../../components/TodoContainer/TodoContainer';
import style from './tasksPage.module.scss';

const TasksPage: React.FC = () => {
  return (
    <div className={style.page}>
      <TodoContainer />
    </div>
  );
};

export default TasksPage;
