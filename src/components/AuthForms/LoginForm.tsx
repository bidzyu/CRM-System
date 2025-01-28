import { Button, Checkbox, Form, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RouterRoutes } from '../../interfaces/routerRoutes';
import { LoginFormConfirm } from '../../interfaces/authForms';
import { AuthData } from '../../interfaces/authApi';
import { useState } from 'react';
import MyLogin from './MyAuthFormItems/MyLogin';
import MyPassword from './MyAuthFormItems/MyPassword';
import MySubmit from './MyAuthFormItems/MySubmit';
import MyText from './MyAuthFormItems/MyText';
import MyForm from './MyAuthFormItems/MyForm';
import MyError from './MyAuthFormItems/MyError';
import { login as loginStore } from '../../store/reducers/authorizationSlice';
import { useAppDispatch } from '../../store/store';
import { loginUser } from '../../api/auth';

const getErrorMessage = (status: number) => {
  if (status === 400) {
    return `Ошибка десериализации запроса или неверный ввод.`;
  }

  if (status === 401) {
    return 'Неверные учетные данные.';
  }

  if (status === 500) {
    return 'Внутренняя ошибка сервера.';
  }

  return 'Упс, произошла неизвестная ошибка.';
};

const LoginForm = () => {
  const [error, setError] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async (values: LoginFormConfirm) => {
    const { login, password } = values;

    const credentials: AuthData = {
      login,
      password,
    };

    try {
      setIsSubmiting(true);
      await loginUser(credentials);
      dispatch(loginStore());
      navigate(RouterRoutes.TODOS);
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

  return (
    <MyForm name="auth" onFinish={onFinish} onChange={handleRemoveError}>
      <MyText
        title="Войдите в свою учетную запись"
        paragraph="Посмотрите, что происходит с вашим бизнесом"
      />
      <MyError error={error} handleRemoveError={handleRemoveError} />
      <MyLogin />
      <MyPassword />
      <Form.Item>
        <Flex align={'top'} justify={'space-between'}>
          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="link"
              onClick={() => navigate(RouterRoutes.FORGOTPASSWORD)}
            >
              Забыли пароль?
            </Button>
          </Form.Item>
        </Flex>
      </Form.Item>
      <MySubmit
        value="Войти"
        submitValue="Входим..."
        isSubmiting={isSubmiting}
      />
      <Form.Item style={{ marginTop: 50, textAlign: 'center' }}>
        Еще не зарегистрированы?
        <Button type="link" onClick={() => navigate(RouterRoutes.REGISTRATION)}>
          Создать аккаунт
        </Button>
      </Form.Item>
    </MyForm>
  );
};

export default LoginForm;
