import { Button, Form } from 'antd';
import { MyEmail, MyError, MyForm, MySubmit, MyText } from './MyAuthFormItems';
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { RouterRoutes } from '../../interfaces/routerRoutes';
import { ForgotFormConfirm } from '../../interfaces/authForms';

const ForgotForm = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showNotification } = useOutletContext<any>();

  const onFinish = (values: ForgotFormConfirm) => {
    const { email } = values;

    console.log(email);
    setIsSubmiting(true);
    try {
      //...processing
      showNotification('Пароль восстановлен, проверьте почту!');
      navigate(RouterRoutes.AUTHORIZATION);
    } catch (e: any) {
      setIsSubmiting(false);
      setError(typeof e === 'string' ? e : e?.message || 'Unhandled error');
    }
  };
  const handleRemoveError = () => {
    if (error) {
      setError('');
    }
  };

  return (
    <MyForm name="forgot" onFinish={onFinish}>
      <MyText title="Восстановить пароль" />
      <MyError error={error} handleRemoveError={handleRemoveError} />
      <MyEmail />
      <MySubmit
        value="Восстановить пароль"
        submitValue="Восстанавливаем..."
        isSubmiting={isSubmiting}
      />

      <Form.Item style={{ marginTop: 50, textAlign: 'center' }}>
        <Button
          type="link"
          onClick={() => navigate(RouterRoutes.AUTHORIZATION)}
        >
          Обратно к авторизации
        </Button>
      </Form.Item>
    </MyForm>
  );
};

export default ForgotForm;
