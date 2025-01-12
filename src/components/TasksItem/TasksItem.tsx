import { useEffect, useRef, useState } from 'react';
import { StatusCheckbox, EditingBtns, TitleEditing } from '../';
import { Todo, Status, putData, deleteData } from '../../api';
import { validateInput } from '../../helpers/validateInput';
import style from './tasksItem.module.scss';

interface TasksItemProps {
  task: Todo;
  useTrigger: () => void;
  currStatus: Status;
}

export const TasksItem: React.FC<TasksItemProps> = ({ task, useTrigger }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [itemText, setItemText] = useState(task.title);
  const [checked, setChecked] = useState(task.isDone);
  const [validateError, setValidateError] = useState<string | null>(null);
  const validateTimerRef = useRef<number>();
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number>();
  const isFirstRender = useRef(true);

  const onDelete = async () => {
    await deleteData(task.id);
    useTrigger();
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

  const startEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        // inputRef.current.setSelectionRange(
        //   inputRef.current.value.length,
        //   inputRef.current.value.length
        // );
      }
    });
  };

  const stopEditing = async () => {
    cancelBlur();

    if (validateTimerRef.current) {
      clearTimeout(validateTimerRef.current);
    }

    const err = validateInput(itemText);

    if (err) {
      if (inputRef.current) {
        setValidateError(err);

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
      await putData(task, itemText, checked);
      useTrigger();
    }
  };

  const cancelEditing = () => {
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

      await putData(task, itemText, checked);
      useTrigger();
    })();
  }, [checked]);

  return (
    <li className={style.item}>
      <StatusCheckbox checked={checked} toggleChecked={toggleChecked} />
      <TitleEditing
        isEditing={isEditing}
        itemText={itemText}
        setItemText={setItemText}
        checked={checked}
        inputRef={inputRef}
        onBlur={onBlur}
        error={validateError}
      />
      <EditingBtns
        startEditing={startEditing}
        stopEditing={stopEditing}
        isEditing={isEditing}
        onDelete={onDelete}
        cancelEditing={cancelEditing}
      />
    </li>
  );
};
