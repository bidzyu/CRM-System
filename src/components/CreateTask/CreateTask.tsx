import { memo } from 'react';
import { TaskForm } from '../';
import { createTodo } from '../../api/todos';
interface CreateTaskProps {
  fetchNewData: () => void;
}

export const CreateTask: React.FC<CreateTaskProps> = memo(
  ({ fetchNewData }) => {
    const handleSubmit = async (taskText: string) => {
      try {
        await createTodo(taskText.trim());
        await fetchNewData();
      } catch (e) {
        alert('Неудалось создать задачу, попробуйте позже.');
      }
    };

    return <TaskForm handleSubmit={handleSubmit} />;
  }
);
