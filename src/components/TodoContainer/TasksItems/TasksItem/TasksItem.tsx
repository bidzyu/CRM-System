import { Checkbox, Card, List, Form, Flex } from 'antd';
import { TaskItemText } from './TaskItemText/TaskItemText';
import { TaskItemBtns } from './TaskItemBtns/TaskItemBtns';
import { TaskItemEditingBtns } from './TaskItemBtns/TaskItemEditingBtns';

import { useEffect, useRef, useState, memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

import {
  updateTodo,
  deleteTodo,
  fetchTodos,
} from '../../../../store/reducers/todos/todosAsyncThunk';
import { getTodosFilter } from '../../../../store/selectors/todos';

import { Todo, UpdateParams } from '../../../../interfaces/todosApi';

const boxStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: 6,
};
const listStyle: React.CSSProperties = { display: 'block', width: '100%' };

type TasksItemProps = Todo;

export const TasksItem: React.FC<TasksItemProps> = memo(
  ({ title, isDone, id }) => {
    const filter = useAppSelector(getTodosFilter);
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

    const handleChangeTask = () => {
      setIsEditing(true);
      focusTextField();
    };

    const updateTasks = async () => {
      return await dispatch(fetchTodos(filter));
    };

    const updateTask = async (itemText: string) => {
      const updateParams: UpdateParams = {
        id,
        newTitle: itemText,
        isDone: isChecked,
      };

      return await dispatch(updateTodo(updateParams));
    };

    const handleDeleteTask = async () => {
      await dispatch(deleteTodo(id));
      await updateTasks();
    };

    const handleSaveChanges = async () => {
      setIsEditing(false);
      const itemText: string = form.getFieldValue(String(id)).trim();

      if (itemText && title !== itemText) {
        await updateTask(itemText);
        await updateTasks();
      }
    };

    const handleCancelChanges = () => {
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
        await updateTask(itemText);
        await updateTasks();
      })();
    }, [isChecked]);

    return (
      <List.Item style={listStyle}>
        <Card>
          <Form
            layout="inline"
            onFinish={handleSaveChanges}
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
                <TaskItemEditingBtns cancelChanges={handleCancelChanges} />
              ) : (
                <TaskItemBtns
                  changeTask={handleChangeTask}
                  deleteTask={handleDeleteTask}
                />
              )}
            </Flex>
          </Form>
        </Card>
      </List.Item>
    );
  }
);
