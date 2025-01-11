import { FormEvent, useRef, useState } from 'react';
import { validateInput } from '../../../../helpers/validateInput';
import { postData } from '../../api/postData';
import TaskForm from '../TaskForm/TaskForm';

interface CreateTaskProps {
  changeKey: () => void;
}

export const CreateTask: React.FC<CreateTaskProps> = ({ changeKey }) => {
  const ref = useRef<null | HTMLInputElement>(null);
  const timerRef = useRef<number>();
  const [validateError, setValidateError] = useState<string | null>(null);

  const handleSumbmit = async (e: FormEvent) => {
    e.preventDefault();

    if (ref.current === null) return;

    const value = ref.current.value.trim();

    const error = validateInput(value);

    if (error !== null) {
      setValidateError(error);
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
    await postData(value);
    changeKey();
  };

  return (
    <div className="module create-task">
      <TaskForm
        onSubmit={handleSumbmit}
        inputRef={ref}
        message={validateError}
      />
    </div>
  );
};
