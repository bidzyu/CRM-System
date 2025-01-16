import { Form, Button, Input, Flex } from 'antd';
import { todoInputValidator } from '../../helpers/validateTodoInput';

interface TaskFormProps {
  handleSubmit: (taskText: string) => void;
}

const TASK_INPUT = 'taskInput';

export const TaskForm: React.FC<TaskFormProps> = ({ handleSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    handleSubmit(form.getFieldValue(TASK_INPUT));
    form.setFieldValue(TASK_INPUT, '');
  };

  const onFinishFailed = () => {
    form.focusField(TASK_INPUT);
  };

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
      style={{ width: '100%' }}
    >
      <Flex align="center" justify="space-between">
        <Form.Item
          style={{ width: '75%' }}
          name={TASK_INPUT}
          rules={[
            {
              required: true,
              validator: todoInputValidator,
            },
          ]}
        >
          <Input size="large" placeholder="Task To Be Done..." />
        </Form.Item>
        <Form.Item style={{ width: '20%' }}>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
          >
            ADD
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};
