import React from 'react';
import { useState } from 'react';
import { CreateTask } from '../modules/CreateTask';
import { TasksList } from '../modules/TasksList';

const TasksPage: React.FC = () => {
  const [state, setState] = useState(false);

  const changeKey = () => {
    setState((prev) => !prev);
  };

  return (
    <div className="page page-tasks">
      <CreateTask changeKey={changeKey} />
      <TasksList key={Number(state)} />
    </div>
  );
};

export default TasksPage;
