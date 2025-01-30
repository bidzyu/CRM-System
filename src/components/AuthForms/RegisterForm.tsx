import { Button, Form } from 'antd';
import GoLogin from './GoLogin';
import {
  MyEmail,
  MyForm,
  MyLogin,
  MyText,
  MyName,
  MyPassword,
  MyConfirmPassword,
  MyPhone,
  MySubmit,
  MyError,
} from './MyAuthFormItems';

import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';

import { registerUser } from '../../store/reducers/authorization/authAsyncThunk';
import { getAuthStatus } from '../../store/selectors/authorization';

import { RouterRoutes } from '../../interfaces/routerRoutes';
import { LoadingStatus } from '../../interfaces/loadingStatus';
import { RegisterFormConfirm } from '../../interfaces/authForms';
import { UserRegistration } from '../../interfaces/authApi';

const RegisterForm = () => {
  const status = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();

  const [error, setError] = useState('');
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
      await dispatch(registerUser(userData)).unwrap();
      setSuccess(true);
      showNotification('Регистрация прошла успешно!');
    } catch (e: any) {
      setError(e);
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
        isSubmiting={status === LoadingStatus.LOADING}
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
