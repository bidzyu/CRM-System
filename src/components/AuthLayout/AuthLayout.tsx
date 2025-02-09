import { Flex } from 'antd';
import ReconnectSpin from '../ReconnectSpin/ReconnectSpin';

import { Navigate, Outlet } from 'react-router-dom';
import { useRef } from 'react';
import { useMyNotification } from '../../hooks/useMyNotification';
import { useAppSelector } from '../../store/store';

import { authToken } from '../../api/AuthToken';
import {
  getAuthIsLogged,
  getAuthStatus,
} from '../../store/selectors/authorization';

import { LoadingStatus } from '../../interfaces/loadingStatus';
import { RouterRoutes } from '../../interfaces/routerRoutes';
import { useAuthReconnector } from '../../hooks/useAuthReconnector';

const AuthLayout: React.FC = (): React.ReactElement => {
  const { isLogged, status } = useAuthReconnector();
  const firstRecconRef = useRef(authToken.hasRefresh());

  const [showNotification, notificationHolder] = useMyNotification();

  if (isLogged) {
    return <Navigate to={RouterRoutes.TODOS} replace />;
  } else {
    if (status === LoadingStatus.INITIAL) {
      return <ReconnectSpin />;
    }
    if (status === LoadingStatus.LOADING && firstRecconRef.current) {
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
