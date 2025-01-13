import { useEffect, useRef, useState } from 'react';
import { StatusCheckbox } from '../';
import { Cancel, Done, Editing, Trash } from '../icons';
import { deleteTodo, updateTodo } from '../../api/todos';
import { validateTodoInput } from '../../helpers/validateTodoInput';
import { getTodoValidateError } from '../../helpers/getTodoValidateError';
import { Todo } from '../../interfaces';
import style from './tasksItem.module.scss';
interface TasksItemProps {
  task: Todo;
  fetchNewData: () => void;
}

export const TasksItem: React.FC<TasksItemProps> = ({ task, fetchNewData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [itemText, setItemText] = useState(task.title);
  const [checked, setChecked] = useState(task.isDone);
  const [validateError, setValidateError] = useState<string | null>(null);
  const validateTimerRef = useRef<number>();
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number>();
  const isFirstRender = useRef(true);

  const deleteTask = async () => {
    try {
      await deleteTodo(task.id);
      fetchNewData();
    } catch (e) {
      alert('Неудалось удалить задачу, попробуйте позже.');
    }
  };

  const cancelBlur = () => {
    clearTimeout(timerRef.current);
  };

  const onBlur = () => {
    timerRef.current = setTimeout(() => {
      setItemText(task.title);
      setIsEditing(false);
    }, 100);
  };

  const changeTask = () => {
    setIsEditing(true);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
  };

  const saveChanges = async () => {
    cancelBlur();

    if (validateTimerRef.current) {
      clearTimeout(validateTimerRef.current);
    }

    if (!validateTodoInput(itemText)) {
      if (inputRef.current) {
        setValidateError(getTodoValidateError(itemText));

        validateTimerRef.current = setTimeout(() => {
          setValidateError(null);
        }, 3000);
        inputRef.current.focus();
      }
      return;
    }

    setValidateError(null);
    setIsEditing(false);

    if (task.title !== itemText) {
      try {
        await updateTodo(task.id, itemText, checked);
        fetchNewData();
      } catch (e) {
        alert('Неудалось обновить задачу, попробуйте позже.');
      }
    }
  };

  const cancelChanges = () => {
    cancelBlur();
    setValidateError(null);
    setIsEditing(false);
    setItemText(task.title);
  };

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      try {
        await updateTodo(task.id, itemText, checked);
        fetchNewData();
      } catch (e) {
        alert('Неудалось обновить задачу, попробуйте позже.');
      }
    })();
  }, [checked]);

  return (
    <li className={style.item}>
      <StatusCheckbox checked={checked} toggleChecked={toggleChecked} />
      <div className={style.inputWrapper}>
        {' '}
        {isEditing ? (
          <>
            {' '}
            <input
              ref={inputRef}
              value={itemText}
              onBlur={onBlur}
              onChange={(e) => setItemText(e.target.value)}
              className={style.input}
            />
            {validateError && (
              <div className={style.validateError}>{validateError}</div>
            )}
          </>
        ) : (
          <p className={style[checked ? 'titleActive' : 'title']}>{itemText}</p>
        )}
      </div>
      {isEditing ? (
        <>
          {' '}
          <button onClick={saveChanges}>
            <Done />{' '}
          </button>
          <button onClick={cancelChanges}>
            <Cancel />
          </button>
        </>
      ) : (
        <>
          {' '}
          <button onClick={changeTask}>
            <Editing />
          </button>
          <button onClick={deleteTask}>
            <Trash />
          </button>
        </>
      )}
    </li>
  );
};
