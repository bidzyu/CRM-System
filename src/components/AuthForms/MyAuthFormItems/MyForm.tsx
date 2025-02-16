import { Flex, Form } from 'antd';
import illustration from '../../../assets/authIllustration.png';

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
        width: '100%',
        height: '100%',
      }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onChange={onChange}
      autoComplete="off"
      layout="vertical"
    >
      <Flex align={'center'}>
        <div style={{ height: '100vh', width: '60%' }}>
          <img
            loading="lazy"
            src={illustration}
            alt="authIllustration"
            style={{
              display: 'block',
              width: '1100',
              height: '100%',
              minHeight: '100vh',
            }}
          />
        </div>
        <Flex
          vertical
          justify={'center'}
          align="center"
          style={{
            width: '100%',
            marginLeft: -100,
            padding: 20,
          }}
        >
          <div style={{ width: 450 }}>{children}</div>
        </Flex>
      </Flex>
    </Form>
  );
};

export default MyForm;
