import { Flex } from 'antd';
import ReconnectSpin from '../ReconnectSpin/ReconnectSpin';

import { Navigate, Outlet } from 'react-router-dom';
import { useRef } from 'react';
import { useMyNotification } from '../../hooks/useMyNotification';
import { authToken } from '../../api/AuthToken';

import { LoadingStatus } from '../../interfaces/loadingStatus';
import { RouterRoutes } from '../../interfaces/routerRoutes';
import { useAuthReconnector } from '../../hooks/useAuthReconnector';

const AuthLayout: React.FC = (): React.ReactElement => {
  const { isLogged, loginStatus, profile, profileStatus } =
    useAuthReconnector();
  const firstRecconRef = useRef(authToken.hasRefresh());

  const [showNotification, notificationHolder] = useMyNotification();

  if (isLogged && profile) {
    return <Navigate to={RouterRoutes.TODOS} replace />;
  } else {
    if (
      loginStatus === LoadingStatus.INITIAL ||
      profileStatus === LoadingStatus.LOADING
    ) {
      return <ReconnectSpin />;
    }
    if (loginStatus === LoadingStatus.LOADING && firstRecconRef.current) {
      firstRecconRef.current = false;
      return <ReconnectSpin />;
    }
  }

  return (
    <>
      {notificationHolder}
      <Flex
        style={{
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#fff',
        }}
      >
        <Outlet context={{ showNotification }} />
      </Flex>
    </>
  );
};

export default AuthLayout;
