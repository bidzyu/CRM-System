import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Todo } from '../../../../api';
import { validateInput } from '../../../../helpers/validateInput';
import { deleteData } from '../../api/deleteData';
import { putData } from '../../api/putData';
import { StatusCheckbox, EditingBtns, TitleEditing } from '../TaskEditing';
import { Status } from '../TasksList/TasksList';

interface TasksItemProps {
  task: Todo;
  fetchNewData: () => void;
  currStatus: Status;
}

const TasksItem: React.FC<TasksItemProps> = ({
  task,
  fetchNewData,
  currStatus,
}) => {
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
    await fetchNewData();
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

    setIsEditing(false);

    if (task.title !== itemText) {
      await putData(task, itemText, checked);
      await fetchNewData();
    }
  };

  const cancelEditing = () => {
    cancelBlur();
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

      if (currStatus === Status.INWORK) {
        fetchNewData();
      }
    })();
  }, [checked]);

  return (
    <li className="tasks-item">
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

export default TasksItem;
