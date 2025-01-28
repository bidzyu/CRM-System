import { Form, Typography } from 'antd';

interface MyTextProps {
  title: string;
  paragraph?: string;
}

const MyText: React.FC<MyTextProps> = ({ title, paragraph }) => {
  return (
    <Form.Item>
      <Typography.Title
        level={2}
        style={{ marginBottom: 5, textAlign: 'center' }}
      >
        {title}
      </Typography.Title>
      {paragraph && (
        <Typography.Text
          style={{ display: 'block', marginBottom: 10, textAlign: 'center' }}
        >
          {paragraph}
        </Typography.Text>
      )}
    </Form.Item>
  );
};

export default MyText;
