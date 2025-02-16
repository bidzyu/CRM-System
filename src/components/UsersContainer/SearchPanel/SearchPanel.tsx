import { Button, Flex, Form, Input, Typography } from 'antd';
import { setUsersSearchTerm } from '../../../store/reducers/usersAdmin/usersAdminSlice';
import { useAppDispatch } from '../../../store/store';

const SearchPanel = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleSumbit = (e: { search: string }) => {
    let value = e.search || '';

    dispatch(setUsersSearchTerm(value.trim()));
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
        onFinish={handleSumbit}
      >
        <Flex align="center" gap={10}>
          <Form.Item name={'search'}>
            <Input type="search" allowClear style={{ minWidth: 250 }} />
          </Form.Item>
          <Form.Item>
            <Button type="default" htmlType="submit">
              Filter
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
};

export default SearchPanel;
