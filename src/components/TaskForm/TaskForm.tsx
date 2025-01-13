import { FormEvent } from 'react';
import style from './taskForm.module.scss';

interface TaskFormProps {
  handleSumbmit: (e: FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  validateError: string | null;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  handleSumbmit,
  inputRef,
  validateError,
}) => {
  return (
    <form className={style.form} action="" onSubmit={handleSumbmit}>
      <div className={style.inputWrapper}>
        <input
          className={style.input}
          type="text"
          placeholder="Task To Be Done..."
          ref={inputRef}
        />
        {validateError && (
          <div className={style.validateError}>{validateError}</div>
        )}
      </div>
      <button className={style.button}>Add</button>
    </form>
  );
};
