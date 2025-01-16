import { useEffect, useRef, useState, memo } from 'react';
import { Checkbox, Card, List, Form, Flex } from 'antd';
import { deleteTodo, updateTodo } from '../../api/todos';
import type { Todo } from '../../interfaces';
import { TaskItemText } from '../TaskItemText/TaskItemText';
import { TaskItemBtns } from '../TaskItemBtns/TaskItemBtns';
import { TaskItemEditingBtns } from '../TaskItemBtns/TaskItemEditingBtns';

interface TasksItemProps extends Omit<Todo, 'created'> {
  // task: Todo;
  fetchNewData: () => void;
}

const boxStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: 6,
};
const listStyle: React.CSSProperties = { display: 'block', width: '100%' };

export const TasksItem: React.FC<TasksItemProps> = memo(
  ({ fetchNewData, title, isDone, id }) => {
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

    const deleteTask = async () => {
      try {
        await deleteTodo(id);
        await fetchNewData();
      } catch (e) {
        alert('Неудалось удалить задачу, попробуйте позже.');
      }
    };

    const saveChanges = async () => {
      setIsEditing(false);
      const itemText = form.getFieldValue(String(id)).trim();

      if (title !== itemText) {
        try {
          await updateTodo(id, itemText, isChecked);
          await fetchNewData();
        } catch (e) {
          alert('Неудалось обновить задачу, попробуйте позже.');
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

        try {
          const itemText = form.getFieldValue(String(id));
          await updateTodo(id, itemText, isChecked);
          await fetchNewData();
        } catch (e) {
          alert('Неудалось обновить задачу, попробуйте позже.');
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
                <TaskItemBtns changeTask={changeTask} deleteTask={deleteTask} />
              )}
            </Flex>
          </Form>
        </Card>
      </List.Item>
    );
  }
);
