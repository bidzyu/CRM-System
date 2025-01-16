import React from 'react';
import { Layout, theme } from 'antd';
import AppRouter from '../../router/AppRouter';
import { AppMenu } from '../AppMenu/AppMenu';

const { Content, Sider } = Layout;

const AppLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
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
          <AppRouter />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
