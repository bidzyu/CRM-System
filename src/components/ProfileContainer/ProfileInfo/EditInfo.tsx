import { Form, Input, Flex } from 'antd';
import { useState } from 'react';
import { Profile } from '../../../interfaces/authApi';
import {
  AuthLabels,
  RegisterConfirmInputNames,
  UserFieldType,
} from '../../../interfaces/authForms';
import {
  emailRules,
  nameRules,
  phoneRules,
} from '../../../helpers/validateAuthRules';

import { updateUserProfile } from '../../../api/auth';
import {
  getUpdatedUserFields,
  shouldUserUpdate,
} from '../../../helpers/updateUser';
import MyError from '../../AuthForms/MyAuthFormItems/MyError';
import EditButtons from './EditButtons';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setUserProfile } from '../../../store/reducers/userProfileSlice';
import { getUserProfile } from '../../../store/selectors/getUserProfile';

const getErrorMessage = (status: number = 0) => {
  if (status === 400) return 'Электронная почта уже используется.';
  if (status === 404) return 'Пользователь не найден.';
  if (status === 500) return 'Внутренняя ошибка сервера.';
  return 'Упс, возникла неизвестная ошибка...';
};

interface EditInfoProps {
  isEdit: boolean;
  toggleEdit: () => void;
}

const EditInfo: React.FC<EditInfoProps> = ({ isEdit, toggleEdit }) => {
  const user = useAppSelector(getUserProfile) as Profile;
  const dispatch = useAppDispatch();

  const [error, setError] = useState('');
  const [form] = Form.useForm();

  const handleRemoveError = () => {
    if (error) {
      setError('');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    toggleEdit();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleEdit();
  };

  const handleSubmit = async (event: UserFieldType) => {
    toggleEdit();

    if (shouldUserUpdate(user, event)) {
      const updatedProfile = getUpdatedUserFields(user, event);
      try {
        const newProfile = await updateUserProfile(updatedProfile);
        await dispatch(setUserProfile(newProfile));
      } catch (e: any) {
        setError(getErrorMessage(e.status));
      } finally {
        form.resetFields();
      }
    }
  };

  return (
    <Form
      name="profileInfo"
      autoComplete="off"
      initialValues={{ remember: true }}
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
      onChange={handleRemoveError}
    >
      <Flex gap={15}>
        <EditButtons
          isEdit={isEdit}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
        />
      </Flex>
      <MyError error={error} handleRemoveError={handleRemoveError} />
      <Form.Item label={AuthLabels.NAME}>
        <Form.Item
          name={RegisterConfirmInputNames.NAME}
          initialValue={user.username}
          rules={nameRules}
          noStyle
        >
          <Input
            type={'text'}
            disabled={!isEdit}
            variant={isEdit ? 'outlined' : 'filled'}
            style={
              !isEdit
                ? {
                    cursor: 'default',
                    color: '#333',
                  }
                : {}
            }
          />
        </Form.Item>
      </Form.Item>
      <Form.Item label={AuthLabels.EMAIL}>
        <Form.Item
          name={RegisterConfirmInputNames.EMAIL}
          initialValue={user.email}
          rules={emailRules}
          noStyle
        >
          <Input
            type={'email'}
            disabled={!isEdit}
            variant={isEdit ? 'outlined' : 'filled'}
            style={
              !isEdit
                ? {
                    cursor: 'default',
                    color: '#333',
                  }
                : {}
            }
          />
        </Form.Item>
      </Form.Item>
      <Form.Item
        name={RegisterConfirmInputNames.TEL}
        label={AuthLabels.TEL}
        initialValue={user.phoneNumber}
        rules={phoneRules}
      >
        <Input
          type={'tel'}
          disabled={!isEdit}
          variant={isEdit ? 'outlined' : 'filled'}
          style={
            !isEdit
              ? {
                  cursor: 'default',
                  color: '#333',
                }
              : {}
          }
        />
      </Form.Item>
    </Form>
  );
};

export default EditInfo;
