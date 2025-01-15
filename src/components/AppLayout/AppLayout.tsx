import React from 'react';
import { SnippetsOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import AppRouter from '../../router/AppRouter';
import { Link, useLocation } from 'react-router-dom';

const { Content, Sider } = Layout;

const items = [
  { icon: UserOutlined, path: '/', label: 'Профиль' },
  { icon: SnippetsOutlined, path: '/todo', label: 'Список задач' },
].map((obj) => ({
  key: obj.path,
  icon: React.createElement(obj.icon),
  label: <Link to={obj.path}>{obj.label}</Link>,
}));

const AppLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        color=""
        trigger={null}
        collapsible
        style={{ backgroundColor: colorBgContainer }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={items}
          style={{ border: 'none' }}
        />
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
