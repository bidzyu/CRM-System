import { FormEvent } from 'react';
import style from './taskForm.module.scss';

interface TaskFormProps {
  onSubmit: (e: FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  message: string | null;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  inputRef,
  message,
}) => {
  return (
    <form className={style.form} action="" onSubmit={onSubmit}>
      <div className={style.inputWrapper}>
        <input
          className={style.input}
          type="text"
          placeholder="Task To Be Done..."
          ref={inputRef}
        />
        {message && <div className={style.validateError}>{message}</div>}
      </div>
      <button className={style.button}>Add</button>
    </form>
  );
};
