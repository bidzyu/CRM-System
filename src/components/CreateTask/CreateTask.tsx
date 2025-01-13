import { FormEvent, useRef, useState } from 'react';
import { TaskForm } from '../';
import { createTodo } from '../../api/todos';
import { getTodoValidateError } from '../../helpers/getTodoValidateError';
import { validateTodoInput } from '../../helpers/validateTodoInput';

interface CreateTaskProps {
  fetchNewData: () => void;
}

export const CreateTask: React.FC<CreateTaskProps> = ({ fetchNewData }) => {
  const ref = useRef<null | HTMLInputElement>(null);
  const timerRef = useRef<number>();
  const [validateError, setValidateError] = useState<string | null>(null);

  const handleSumbmit = async (e: FormEvent) => {
    e.preventDefault();

    if (ref.current === null) return;

    const value = ref.current.value.trim();

    if (!validateTodoInput(value)) {
      setValidateError(getTodoValidateError(value));
      ref.current.focus();

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setValidateError(null);
      }, 3000);

      return;
    }

    if (validateError !== null) {
      setValidateError(null);
    }
    ref.current.value = '';

    try {
      await createTodo(value);
      fetchNewData();
    } catch (e) {
      alert('Неудалось создать задачу, попробуйте позже.');
    }
  };

  return (
    <div className="module create-task">
      <TaskForm
        handleSumbmit={handleSumbmit}
        inputRef={ref}
        validateError={validateError}
      />
    </div>
  );
};
