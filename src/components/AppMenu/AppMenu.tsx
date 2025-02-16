import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  SnippetsOutlined,
  UserOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { RouterRoutes } from '../../interfaces/routerRoutes';

const menuAdminItems = [
  { icon: TeamOutlined, path: RouterRoutes.USERS, label: 'Пользователи' },
].map((obj) => ({
  key: obj.path,
  icon: React.createElement(obj.icon),
  label: <Link to={obj.path}>{obj.label}</Link>,
}));

const menuItems = [
  { icon: UserOutlined, path: RouterRoutes.PROFILE, label: 'Профиль' },
  { icon: SnippetsOutlined, path: RouterRoutes.TODOS, label: 'Список задач' },
].map((obj) => ({
  key: obj.path,
  icon: React.createElement(obj.icon),
  label: <Link to={obj.path}>{obj.label}</Link>,
}));

interface AppMenuProps {
  isAdmin: boolean;
}

export const AppMenu: React.FC<AppMenuProps> = ({ isAdmin }) => {
  const location = useLocation();

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[location.pathname]}
      items={isAdmin ? [...menuAdminItems, ...menuItems] : menuItems}
      style={{ border: 'none', width: '100%' }}
    />
  );
};
