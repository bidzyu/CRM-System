import { Button, Form } from 'antd';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { RouterRoutes } from '../../interfaces/routerRoutes';
import { RegisterFormConfirm } from '../../interfaces/authForms';
import { UserRegistration } from '../../interfaces/authApi';
import { registerUser } from '../../api/auth';
import { useState } from 'react';
import GoLogin from './GoLogin';
import MyForm from './MyAuthFormItems/MyForm';
import MyLogin from './MyAuthFormItems/MyLogin';
import MyText from './MyAuthFormItems/MyText';
import MyName from './MyAuthFormItems/MyName';
import MyPassword from './MyAuthFormItems/MyPassword';
import MyConfirmPassword from './MyAuthFormItems/MyConfirmPassword';
import MyEmail from './MyAuthFormItems/MyEmail';
import MyPhone from './MyAuthFormItems/MyPhone';
import MySubmit from './MyAuthFormItems/MySubmit';
import MyError from './MyAuthFormItems/MyError';

const getErrorMessage = (status: number) => {
  if (status === 409) {
    return `Пользователь с такой Почтой или Логином уже существует.`;
  }

  if (status === 400) {
    return 'Ошибка десериализации запроса или неверный ввод.';
  }

  if (status === 500) {
    return 'Внутренняя ошибка сервера.';
  }

  return 'Упс, произошла неизвестная ошибка.';
};

const RegisterForm = () => {
  const [error, setError] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { showNotification } = useOutletContext<any>();

  const navigate = useNavigate();

  const onFinish = async (values: RegisterFormConfirm) => {
    const { login, name, password, email, phone = '' } = values;

    const userData: UserRegistration = {
      login,
      username: name,
      password,
      email,
      phoneNumber: phone,
    };

    try {
      setIsSubmiting(true);
      await registerUser(userData);

      // navigate(RouterRoutes.AUTHORIZATION);
      setSuccess(true);
      showNotification('Регистрация прошла успешно!');
    } catch (e: any) {
      console.log(e);
      setIsSubmiting(false);
      setError(getErrorMessage(e.status || 0));
    }
  };

  const handleRemoveError = () => {
    if (error) {
      setError('');
    }
  };

  if (success) {
    return <GoLogin />;
  }

  return (
    <MyForm name="register" onFinish={onFinish} onChange={handleRemoveError}>
      <MyText title="Зарегистрировать учетную запись" />
      <MyError error={error} handleRemoveError={handleRemoveError} />
      <MyLogin />
      <MyName />
      <MyPassword />
      <MyConfirmPassword />
      <MyEmail />
      <MyPhone />
      <MySubmit
        value="Зарегистрироваться"
        submitValue="Регистрируем..."
        isSubmiting={isSubmiting}
      />
      <Form.Item style={{ marginTop: 50, textAlign: 'center' }}>
        Уже зарегистрированы?
        <Button
          type="link"
          onClick={() => navigate(RouterRoutes.AUTHORIZATION)}
        >
          Войти
        </Button>
      </Form.Item>
    </MyForm>
  );
};

export default RegisterForm;
