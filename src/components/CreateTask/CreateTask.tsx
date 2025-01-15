import { TaskForm } from '../';
import { createTodo } from '../../api/todos';
interface CreateTaskProps {
  fetchNewData: () => void;
}

export const CreateTask: React.FC<CreateTaskProps> = ({ fetchNewData }) => {
  const handleSumbmit = async (taskText: string) => {
    try {
      await createTodo(taskText.trim());
      fetchNewData();
    } catch (e) {
      alert('Неудалось создать задачу, попробуйте позже.');
    }
  };

  return <TaskForm handleSumbmit={handleSumbmit} />;
};
