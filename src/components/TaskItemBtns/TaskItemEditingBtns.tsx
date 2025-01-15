import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';

interface TaskItemEditingBtnsProps {
  cancelChanges: () => void;
}

export const TaskItemEditingBtns: React.FC<TaskItemEditingBtnsProps> = ({
  cancelChanges,
}) => {
  return (
    <>
      <Form.Item>
        <Button htmlType="submit" variant="solid" color="primary">
          <CheckOutlined />
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="reset"
          variant="solid"
          color="danger"
          onClick={cancelChanges}
        >
          <CloseOutlined />
        </Button>
      </Form.Item>
    </>
  );
};
