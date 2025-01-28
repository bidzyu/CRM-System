import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../api/auth';
import { RouterRoutes } from '../../../interfaces/routerRoutes';
import { LogoutOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useAppDispatch } from '../../../store/store';
import { logout } from '../../../store/reducers/authorizationSlice';

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigate(RouterRoutes.AUTHORIZATION);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Tooltip placement="left" title={'Logout'} color="blue">
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
