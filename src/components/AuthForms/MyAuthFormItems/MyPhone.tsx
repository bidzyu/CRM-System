import { Form, Input } from 'antd';
import { phoneRules } from '../../../helpers/validateAuthRules';
import {
  AuthLabels,
  RegisterConfirmInputNames,
} from '../../../interfaces/authForms';

interface MyPhoneProps {
  placeholder?: string;
}

const MyPhone: React.FC<MyPhoneProps> = ({
  placeholder = '+1 (234) 567-89-10',
}) => {
  return (
    <Form.Item
      name={RegisterConfirmInputNames.TEL}
      label={AuthLabels.TEL}
      rules={phoneRules}
    >
      <Input type={'tel'} placeholder={placeholder} />
    </Form.Item>
  );
};

export default MyPhone;
