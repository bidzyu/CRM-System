import { useEffect, useRef, useState, memo } from 'react';
import { Checkbox, Card, List, Form, Flex } from 'antd';
import { deleteTodo, fetchTodos, updateTodo } from '../../../../api/todos';
import type { Todo } from '../../../../interfaces/todosApi';
import { TaskItemText } from './TaskItemText/TaskItemText';
import { TaskItemBtns } from './TaskItemBtns/TaskItemBtns';
import { TaskItemEditingBtns } from './TaskItemBtns/TaskItemEditingBtns';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import {
  deleteStateTodo,
  setTodoError,
  updateStateTodo,
  updateStateTodos,
} from '../../../../store/reducers/todosSlice';
import { getTodosStatus } from '../../../../store/selectors/todos';

const boxStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: 6,
};
const listStyle: React.CSSProperties = { display: 'block', width: '100%' };

type TasksItemProps = Todo;

export const TasksItem: React.FC<TasksItemProps> = memo(
  ({ title, isDone, id, created }) => {
    const status = useAppSelector(getTodosStatus);
    const dispatch = useAppDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [isChecked, setIsChecked] = useState(isDone);
    const [form] = Form.useForm();
    const isFirstRender = useRef(true);

    const focusTextField = () => {
      setTimeout(() => {
        form.focusField(String(id));
      });
    };

    const changeTask = () => {
      setIsEditing(true);
      focusTextField();
    };

    const updateStateTask = (text?: string, done?: boolean) => {
      const updatedTodo: Todo = {
        title: text || title,
        created,
        id,
        isDone: typeof done === 'boolean' ? done : isDone,
      };
      dispatch(updateStateTodo(updatedTodo));
    };

    const updateTasks = async () => {
      const newTodos = await fetchTodos(status);
      dispatch(updateStateTodos(newTodos));
    };

    const deleteStateTask = async () => {
      dispatch(deleteStateTodo(id));

      try {
        await deleteTodo(id);
        await updateTasks();
      } catch (e) {
        dispatch(setTodoError('Неудалось удалить задачу, попробуйте позже.'));
      }
    };

    const saveChanges = async () => {
      setIsEditing(false);
      const itemText = form.getFieldValue(String(id)).trim();

      if (title !== itemText) {
        updateStateTask(itemText);

        try {
          await updateTodo(id, itemText, isChecked);
          await updateTasks();
        } catch (e) {
          dispatch(
            setTodoError('Неудалось обновить задачу, попробуйте позже.')
          );
        }
      }
    };

    const cancelChanges = () => {
      setIsEditing(false);
      form.setFieldValue(String(id), title);
    };

    const toggleChecked = () => {
      setIsChecked((prev) => !prev);
    };

    useEffect(() => {
      (async () => {
        if (isFirstRender.current) {
          isFirstRender.current = false;
          return;
        }
        const itemText = form.getFieldValue(String(id));
        updateStateTask(title, isChecked);
        try {
          await updateTodo(id, itemText, isChecked);
          await updateTasks();
        } catch (e) {
          dispatch(
            setTodoError('Неудалось обновить задачу, попробуйте позже.')
          );
        }
      })();
    }, [isChecked]);

    return (
      <List.Item style={listStyle}>
        <Card>
          <Form
            layout="inline"
            onFinish={saveChanges}
            onFinishFailed={focusTextField}
            form={form}
          >
            <Flex style={boxStyle} align={'center'} justify={'space-between'}>
              <Form.Item>
                <Checkbox onChange={toggleChecked} checked={isChecked} />
              </Form.Item>
              <TaskItemText
                isChecked={isChecked}
                isEditing={isEditing}
                title={title}
                id={id}
              />
              {isEditing ? (
                <TaskItemEditingBtns cancelChanges={cancelChanges} />
              ) : (
                <TaskItemBtns
                  changeTask={changeTask}
                  deleteTask={deleteStateTask}
                />
              )}
            </Flex>
          </Form>
        </Card>
      </List.Item>
    );
  }
);
