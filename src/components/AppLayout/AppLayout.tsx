import { Layout, theme } from 'antd';
import { AppMenu } from '../AppMenu/AppMenu';
import ReconnectSpin from '../ReconnectSpin/ReconnectSpin';

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import {
  getAuthIsLogged,
  getAuthStatus,
} from '../../store/selectors/authorization';
import { RouterRoutes } from '../../interfaces/routerRoutes';
import { LoadingStatus } from '../../interfaces/loadingStatus';
import { useAuthReconnector } from '../../hooks/useAuthReconnector';

const { Content, Sider } = Layout;

const AppLayout: React.FC = () => {
  const { isLogged, status } = useAuthReconnector();
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (!isLogged) {
    if (status === LoadingStatus.FAIL || status === LoadingStatus.SUCCESS) {
      return <Navigate to={RouterRoutes.AUTHORIZATION} replace />;
    } else {
      return <ReconnectSpin />;
    }
  }

  if (location.pathname === '/') {
    return <Navigate to={RouterRoutes.TODOS} replace />;
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          style={{
            backgroundColor: colorBgContainer,
          }}
          trigger={null}
          collapsible
          width={220}
        >
          <AppMenu />
        </Sider>
        <Layout>
          <Content style={{ overflowY: 'auto' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AppLayout;
