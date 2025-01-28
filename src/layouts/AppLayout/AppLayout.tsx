import { Layout, theme } from 'antd';
import { AppMenu } from '../../components/AppMenu/AppMenu';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { RouterRoutes } from '../../interfaces/routerRoutes';
import {
  hasRefreshToken,
  removeAuthTokens,
  saveAuthTokens,
} from '../../helpers/handleAuthToken';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import { refreshUserToken } from '../../api/auth';
import { login } from '../../store/reducers/authorizationSlice';
import ReconnectSpin from '../../components/ReconnectTooltip/ReconnectSpin';

const { Content, Sider } = Layout;

const AppLayout: React.FC = () => {
  const isLogged = useAppSelector((state) => state.authorization.isLogged);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const reconnect = async () => {
      try {
        const token = await refreshUserToken();
        saveAuthTokens(token);
        dispatch(login());
      } catch (e) {
        removeAuthTokens();
        navigate(RouterRoutes.AUTHORIZATION);
      }
    };

    reconnect();
  }, [isLogged]);

  if (!isLogged) {
    if (!hasRefreshToken) {
      return <Navigate to={RouterRoutes.AUTHORIZATION} replace />;
    } else {
      return <ReconnectSpin />;
    }
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          color=""
          trigger={null}
          collapsible
          style={{ backgroundColor: colorBgContainer }}
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
