import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { SnippetsOutlined, UserOutlined } from '@ant-design/icons';

const items = [
  { icon: UserOutlined, path: '/', label: 'Профиль' },
  { icon: SnippetsOutlined, path: '/todo', label: 'Список задач' },
].map((obj) => ({
  key: obj.path,
  icon: React.createElement(obj.icon),
  label: <Link to={obj.path}>{obj.label}</Link>,
}));

export const AppMenu: React.FC = () => {
  const location = useLocation();

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[location.pathname]}
      items={items}
      style={{ border: 'none' }}
    />
  );
};
