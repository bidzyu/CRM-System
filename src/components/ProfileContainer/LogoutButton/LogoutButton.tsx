import { Button, theme, Tooltip } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../store/store';
import { logoutUser } from '../../../store/reducers/authorization/authAsyncThunk';
import { clearStateUserInfo } from '../../../store/reducers/userProfile/userProfileSlice';

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(clearStateUserInfo());
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Tooltip placement="left" title={'Logout'}>
      <Button
        type="primary"
        onClick={handleLogout}
        style={{ position: 'absolute', top: 10, right: 10 }}
      >
        <LogoutOutlined />
      </Button>
    </Tooltip>
  );
};

export default LogoutButton;
