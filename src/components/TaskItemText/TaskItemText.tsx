import { Form, Input } from 'antd';
import { todoInputValidator } from '../../helpers/validateTodoInput';
import type { Todo } from '../../interfaces';

const textBlockStyle: React.CSSProperties = { width: '70%' };

interface TaskItemTextProps {
  isChecked: boolean;
  isEditing: boolean;
  task: Todo;
}

export const TaskItemText: React.FC<TaskItemTextProps> = ({
  isChecked,
  isEditing,
  task,
}) => {
  return (
    <Form.Item
      style={textBlockStyle}
      rules={[
        {
          required: true,
          validator: todoInputValidator,
        },
      ]}
      name={String(task.id)}
      initialValue={task.title}
    >
      <Input.TextArea
        autoSize
        disabled={!isEditing}
        style={
          isChecked && !isEditing
            ? { textDecoration: 'line-through' }
            : { color: '#333' }
        }
      />
    </Form.Item>
  );
};
