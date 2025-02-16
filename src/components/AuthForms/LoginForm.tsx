import { Button, Checkbox, Form, Flex } from 'antd';
import {
  MyLogin,
  MyPassword,
  MySubmit,
  MyText,
  MyForm,
  MyError,
} from './MyAuthFormItems';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useState } from 'react';

import { loginUser } from '../../store/reducers/authorization/authAsyncThunk';

import { LoadingStatus } from '../../interfaces/loadingStatus';
import { RouterRoutes } from '../../interfaces/routerRoutes';
import { LoginFormConfirm } from '../../interfaces/authForms';
import { AuthData } from '../../interfaces/authApi';

const LoginForm = () => {
  const status = useAppSelector((state) => state.authorization.loading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState('');

  const onFinish = async (values: LoginFormConfirm) => {
    const { login, password } = values;

    const credentials: AuthData = {
      login,
      password,
    };

    try {
      await dispatch(loginUser(credentials)).unwrap();
    } catch (e: any) {
      setError(e);
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
      <MyError
        error={error ? error : ''}
        handleRemoveError={handleRemoveError}
      />
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
        isSubmiting={status === LoadingStatus.LOADING}
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
