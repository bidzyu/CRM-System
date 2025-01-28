import { Button, Form } from 'antd';

interface MySubmitProps {
  value: string;
  isSubmiting?: boolean;
  submitValue?: string;
}

const MySubmit: React.FC<MySubmitProps> = ({
  value,
  submitValue,
  isSubmiting = false,
}) => {
  return (
    <Form.Item style={{ marginTop: 50 }}>
      <Button
        block
        type="primary"
        size="large"
        htmlType="submit"
        disabled={isSubmiting}
      >
        {isSubmiting ? submitValue : value}
      </Button>
    </Form.Item>
  );
};

export default MySubmit;
