import { Form } from 'antd';

interface FormProps {
  name: string;
  children: React.ReactNode;
  onFinish: (FormFields: any) => void;
  onChange?: () => void;
}

const MyForm: React.FC<FormProps> = ({
  children,
  name,
  onFinish,
  onChange,
}) => {
  return (
    <Form
      name={name}
      style={{
        maxWidth: 400,
        width: '100%',
        height: '100%',
      }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onChange={onChange}
      autoComplete="off"
      layout="vertical"
    >
      {children}
    </Form>
  );
};

export default MyForm;
