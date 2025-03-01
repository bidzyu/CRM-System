import { Layout, theme } from 'antd';
import { AppMenu } from '../AppMenu/AppMenu';
import ReconnectSpin from '../ReconnectSpin/ReconnectSpin';

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RouterRoutes } from '../../interfaces/routerRoutes';
import { LoadingStatus } from '../../interfaces/loadingStatus';
import { useAuthReconnector } from '../../hooks/useAuthReconnector';
import { UserRoles } from '../../interfaces/userRoles';

const { Content, Sider } = Layout;

const AppLayout: React.FC = () => {
  const { isLogged, loginStatus, profile, profileStatus } =
    useAuthReconnector();
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (!isLogged || !profile) {
    if (
      loginStatus === LoadingStatus.INITIAL ||
      loginStatus === LoadingStatus.LOADING ||
      (loginStatus === LoadingStatus.SUCCESS &&
        profileStatus === LoadingStatus.INITIAL) ||
      (loginStatus === LoadingStatus.SUCCESS &&
        profileStatus === LoadingStatus.LOADING)
    ) {
      return <ReconnectSpin />;
    } else {
      return <Navigate to={RouterRoutes.AUTHORIZATION} replace />;
    }
  }

  if (location.pathname === '/') {
    return <Navigate to={RouterRoutes.TODOS} replace />;
  }

  console.log(123);

  const isAdmin = profile.roles.includes(UserRoles.ADMIN);

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          style={{
            backgroundColor: colorBgContainer,
            position: 'sticky',
            height: '100vh',
            top: 0,
            bottom: 0,
          }}
          trigger={null}
          collapsible
          width={220}
        >
          <AppMenu isAdmin={isAdmin} />
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
