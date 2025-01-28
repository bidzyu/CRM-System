import { Flex } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';
import { hasAccessToken, hasRefreshToken } from '../../helpers/handleAuthToken';
import { RouterRoutes } from '../../interfaces/routerRoutes';
import { useMyNotification } from '../../hooks/useMyNotification';

const AuthLayout: React.FC = (): React.ReactElement => {
  if (hasAccessToken() && hasRefreshToken()) {
    return <Navigate to={RouterRoutes.TODOS} replace />;
  }
  const [showNotification, notificationHolder] = useMyNotification();

  return (
    <>
      {notificationHolder}
      <Flex
        justify={'center'}
        style={{
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#fff',
          paddingTop: 50,
        }}
      >
        <Outlet context={{ showNotification }} />
      </Flex>
    </>
  );
};

export default AuthLayout;
