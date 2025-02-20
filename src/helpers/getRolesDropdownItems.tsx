import { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UserRoles } from '../interfaces/userRoles';

export const getRolesDropdownItems = (
  id: string,
  currRole: UserRoles,
  handleClick: (id: string, currRole: UserRoles, newRole: UserRoles) => any
): MenuProps['items'] => [
  {
    key: '1',
    label: (
      <a onClick={() => handleClick(id, currRole, UserRoles.USER)}>
        {UserRoles.USER}
      </a>
    ),
    disabled: currRole === UserRoles.USER,
    icon: <UserOutlined />,
  },
  {
    key: '2',
    label: (
      <a onClick={() => handleClick(id, currRole, UserRoles.MODERATOR)}>
        {UserRoles.MODERATOR}
      </a>
    ),
    disabled: currRole === UserRoles.MODERATOR,
    icon: <UserOutlined />,
  },
  {
    key: '3',
    label: (
      <a onClick={() => handleClick(id, currRole, UserRoles.ADMIN)}>
        {UserRoles.ADMIN}
      </a>
    ),
    danger: true,
    disabled: currRole === UserRoles.ADMIN,
    icon: <UserOutlined />,
  },
];
