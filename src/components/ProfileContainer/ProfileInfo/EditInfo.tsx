import { Form, Input, Flex } from 'antd';
import EditButtons from './EditButtons';
import MyError from '../../AuthForms/MyAuthFormItems/MyError';

import { useEffect, useState } from 'react';

import {
  emailRules,
  nameRules,
  phoneRules,
} from '../../../helpers/validateAuthRules';
import {
  getUpdatedUserFields,
  shouldUserUpdate,
} from '../../../helpers/updateUser';

import {
  AuthLabels,
  RegisterConfirmInputNames,
  UserFieldType,
} from '../../../interfaces/authForms';
import type { UpdateUserParams } from '../../../interfaces/userRoles';
import { ProfileInfoProps } from './ProfileInfo';

interface EditInfoProps extends ProfileInfoProps {
  isEdit: boolean;
  toggleEdit: () => void;
}

const EditInfo: React.FC<EditInfoProps> = ({
  isEdit,
  toggleEdit,
  user,
  profileUpdater,
  dataUpdater,
}) => {
  const [error, setError] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [user]);

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
      const updatedParams: UpdateUserParams = {
        requestData: updatedProfile,
        id: String(user.id),
      };

      try {
        await profileUpdater(updatedParams).unwrap();
        if (dataUpdater) {
          await dataUpdater();
        }
      } catch (e: any) {
        setError(e);
      } finally {
        if (dataUpdater) {
          form.resetFields();
        }
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
