import { Flex, Form, Input, Typography } from 'antd';
import { useAppDispatch } from '../../../store/store';
import { setUsersSearchTerm } from '../../../store/reducers/usersAdmin/usersAdminSlice';
import { ChangeEvent, useRef } from 'react';

const SearchPanel = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const timerRef = useRef<number>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      timerRef.current = undefined;
      dispatch(setUsersSearchTerm(value.trim()));
    }, 500);
  };

  return (
    <Flex justify="space-between" align="center">
      <Typography.Title level={2}>Пользователи</Typography.Title>
      <Form
        style={{ marginTop: 25 }}
        form={form}
        name="searchUser"
        autoComplete="off"
        initialValues={{ remember: true }}
      >
        <Flex align="center" gap={10}>
          <Form.Item name={'search'}>
            <Input
              type="search"
              allowClear
              style={{ minWidth: 300 }}
              placeholder="Search..."
              onChange={handleInputChange}
            />
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
};

export default SearchPanel;
