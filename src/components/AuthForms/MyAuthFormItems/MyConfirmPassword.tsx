import { Form, Input } from 'antd';
import { confirmPasswordRules } from '../../../helpers/validateAuthRules';
import {
  AuthLabels,
  RegisterConfirmInputNames,
} from '../../../interfaces/authForms';

interface MyConfirmPasswordProps {
  placeholder?: string;
}

const MyConfirmPassword: React.FC<MyConfirmPasswordProps> = ({
  placeholder = '*****************',
}) => {
  return (
    <Form.Item
      name="confirm"
      label={AuthLabels.CONFIRMPASS}
      dependencies={[RegisterConfirmInputNames.PASSWORD]}
      hasFeedback
      rules={confirmPasswordRules}
    >
      <Input.Password placeholder={placeholder} autoComplete="on" />
    </Form.Item>
  );
};

export default MyConfirmPassword;
