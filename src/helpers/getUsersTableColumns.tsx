import { ArrowRightOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import { RouterRoutes } from '../interfaces/routerRoutes';
import { UserProfile, UserRoles } from '../interfaces/userRoles';
import type { TableColumnsType } from 'antd';

export const getUsersTableColumns = (
  renderBlockBtnFn: any
): TableColumnsType<UserProfile> => [
  {
    title: 'Имя',
    dataIndex: 'username',
    sorter: true,
    key: 'username',
  },
  {
    title: 'Почта',
    dataIndex: 'email',
    sorter: true,
    key: 'email',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
  },
  {
    title: 'Телефон',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Роли',
    key: 'roles',
    dataIndex: 'roles',
    render: (_: any, { roles }: any) => {
      if (!roles) {
        roles = [];
      }

      return (
        <>
          {roles.map((role: UserRoles) => {
            let color = 'green';

            if (role === UserRoles.ADMIN) {
              color = 'volcano';
            }
            if (role === UserRoles.MODERATOR) {
              color = 'geekblue';
            }

            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </>
      );
    },
  },
  {
    title: 'Блокировка',
    dataIndex: 'isBlocked',
    key: 'isBlocked',
    render: (_: any, { isBlocked }: any) => (isBlocked ? '+' : '-'),
  },
  {
    title: 'Дата регистр',
    dataIndex: 'date',
    key: 'date',
    render: (_: any, { date }: any) => new Date(date).toLocaleString(),
  },
  {
    dataIndex: 'isBlocked',
    key: 'handleBlock',
    render: renderBlockBtnFn,
  },
  {
    dataIndex: 'id',
    key: 'userDetails',
    render: (_: any, { id }: any) => (
      <Link to={RouterRoutes.USERDETAILS + id} style={{ color: '#121212' }}>
        <ArrowRightOutlined color="black" />
      </Link>
    ),
  },
];
