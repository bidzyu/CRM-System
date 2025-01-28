import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';

interface TaskItemBtnsProps {
  changeTask: () => void;
  deleteTask: () => void;
}

export const TaskItemBtns: React.FC<TaskItemBtnsProps> = ({
  changeTask,
  deleteTask,
}) => {
  return (
    <>
      <Form.Item>
        <Button
          htmlType="button"
          variant="solid"
          color="primary"
          onClick={changeTask}
        >
          <FormOutlined />
        </Button>
      </Form.Item>
      <Form.Item>
        <Button htmlType="button" type="primary" danger onClick={deleteTask}>
          <DeleteOutlined />
        </Button>
      </Form.Item>
    </>
  );
};
