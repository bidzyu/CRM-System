import { Form, Input } from 'antd';
import { nameRules } from '../../../helpers/validateAuthRules';
import {
  AuthLabels,
  RegisterConfirmInputNames,
} from '../../../interfaces/authForms';

interface MyNameProps {
  placeholder?: string;
}

const MyName: React.FC<MyNameProps> = ({
  placeholder = 'Введите ваше имя',
}) => {
  return (
    <Form.Item
      name={RegisterConfirmInputNames.NAME}
      label={AuthLabels.NAME}
      rules={nameRules}
    >
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};

export default MyName;
