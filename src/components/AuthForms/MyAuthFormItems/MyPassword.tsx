import { Form, Input } from 'antd';
import { passwordRules } from '../../../helpers/validateAuthRules';
import {
  AuthLabels,
  RegisterConfirmInputNames,
} from '../../../interfaces/authForms';

interface MyPasswordProps {
  placeholder?: string;
}

const MyPassword: React.FC<MyPasswordProps> = ({
  placeholder = '*****************',
}) => {
  return (
    <Form.Item
      name={RegisterConfirmInputNames.PASSWORD}
      label={AuthLabels.PASSWORD}
      rules={passwordRules}
    >
      <Input.Password placeholder={placeholder} autoComplete="on" />
    </Form.Item>
  );
};

export default MyPassword;
