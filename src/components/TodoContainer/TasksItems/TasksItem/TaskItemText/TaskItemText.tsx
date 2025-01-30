import { Form, Input } from 'antd';
import { todoInputValidator } from '../../../../../helpers/validateTodoInput';
import { Todo } from '../../../../../interfaces/todosApi';

const textBlockStyle: React.CSSProperties = { width: '70%' };

interface TaskItemTextProps extends Pick<Todo, 'title' | 'id'> {
  isChecked: boolean;
  isEditing: boolean;
}

export const TaskItemText: React.FC<TaskItemTextProps> = ({
  isChecked,
  isEditing,
  title,
  id,
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
      name={String(id)}
      initialValue={title}
    >
      <Input.TextArea
        autoSize
        disabled={!isEditing}
        variant={isEditing ? 'outlined' : 'borderless'}
        style={
          isChecked && !isEditing
            ? { textDecoration: 'line-through' }
            : { color: '#333' }
        }
      />
    </Form.Item>
  );
};
