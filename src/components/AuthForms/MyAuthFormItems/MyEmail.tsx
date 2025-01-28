import { Form, Input } from 'antd';
import { emailRules } from '../../../helpers/validateAuthRules';
import {
  AuthLabels,
  RegisterConfirmInputNames,
} from '../../../interfaces/authForms';

interface MyEmailProps {
  placeholder?: string;
}

const MyEmail: React.FC<MyEmailProps> = ({ placeholder = 'mail@abc.com' }) => {
  return (
    <Form.Item
      name={RegisterConfirmInputNames.EMAIL}
      label={AuthLabels.EMAIL}
      rules={emailRules}
    >
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};

export default MyEmail;
