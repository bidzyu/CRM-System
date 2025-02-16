import { Form, Input } from 'antd';
import { loginRules } from '../../../helpers/validateAuthRules';
import {
  AuthLabels,
  RegisterConfirmInputNames,
} from '../../../interfaces/authForms';

interface MyLoginProps {
  placeholder?: string;
}

const MyLogin: React.FC<MyLoginProps> = ({
  placeholder = 'Введите ваш логин',
}) => {
  return (
    <Form.Item
      name={RegisterConfirmInputNames.LOGIN}
      label={AuthLabels.LOGIN}
      rules={loginRules}
    >
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};

export default MyLogin;
