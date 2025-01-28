import { Button, Form } from 'antd';
import {
  CheckSquareOutlined,
  CloseSquareOutlined,
  EditOutlined,
} from '@ant-design/icons';

interface EditButtonsProps {
  isEdit: boolean;
  handleCancel: () => void;
  handleEdit: (e: React.MouseEvent) => void;
}

const EditButtons: React.FC<EditButtonsProps> = ({
  isEdit,
  handleCancel,
  handleEdit,
}) => {
  return (
    <>
      {' '}
      {isEdit ? (
        <>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              <CheckSquareOutlined />
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="reset"
              onClick={handleCancel}
              danger
            >
              <CloseSquareOutlined />
            </Button>
          </Form.Item>
        </>
      ) : (
        <Form.Item>
          <Button type="primary" htmlType="button" onClick={handleEdit}>
            <EditOutlined />
          </Button>
        </Form.Item>
      )}
    </>
  );
};

export default EditButtons;
