import { FormEvent } from 'react';

interface TaskFormProps {
  onSubmit: (e: FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  message: string | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, inputRef, message }) => {
  return (
    <form className="create-task__form" action="" onSubmit={onSubmit}>
      {/* <input type="text" ref={ref} required minLength={2} maxLength={64} /> */}
      <div className="create-task__input-wrapper">
        <input
          className="create-task__input"
          type="text"
          placeholder="Task To Be Done..."
          ref={inputRef}
        />
        {message && (
          <div className="create-task__input_validate_error">{message}</div>
        )}
      </div>
      <button className="create-task__button">Add</button>
    </form>
  );
};

export default TaskForm;
