import { ArrowRightOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, Popover, Tag } from 'antd';
import { UserProfile, UserRoles } from '../interfaces/userRoles';
import type { TableColumnsType } from 'antd';
import { getRolesDropdownItems } from './getRolesDropdownItems';
import { getCurrUserRole } from './getCurrUserRole';

export const getUsersTableColumns = (
  renderBlockBtnFn: (_: any, props: any) => any,
  handleNavigate: (id: string) => void,
  handleDeleteUser: (id: string) => void,
  handleUpdateUserRole: (
    id: string,
    currRole: UserRoles,
    newRole: UserRoles
  ) => any
  // rolesItems: MenuProps['items']
): TableColumnsType<UserProfile> => [
  {
    title: 'Имя',
    dataIndex: 'username',
    sorter: true,
    key: 'username',
    width: '20%',
    ellipsis: true,
    fixed: 'left',
  },
  {
    title: 'Почта',
    dataIndex: 'email',
    sorter: true,
    key: 'email',
    width: '20%',
    ellipsis: true,
    fixed: 'left',
  },
  {
    title: 'Телефон',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    width: '10%',
    ellipsis: true,
    fixed: 'left',
  },
  {
    title: 'Роли',
    key: 'roles',
    dataIndex: 'roles',
    width: '8%',
    fixed: 'left',
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
    width: '7%',
    fixed: 'left',
    render: (_: any, { isBlocked }: any) => (isBlocked ? '+' : '-'),
  },
  {
    title: 'Дата регистр',
    dataIndex: 'date',
    key: 'date',
    width: '15%',
    fixed: 'left',
    render: (_: any, { date }: any) => new Date(date).toLocaleString(),
  },
  {
    dataIndex: 'id',
    key: 'userAdminBtns',
    fixed: 'right',
    width: '20%',
    render: (_: any, keys: any) => {
      const content = (
        <Flex gap={10}>
          <Button onClick={() => handleDeleteUser(keys.id)}>
            <UserDeleteOutlined />
          </Button>
          <Dropdown
            menu={{
              items: getRolesDropdownItems(
                keys.id,
                getCurrUserRole(keys.roles),
                handleUpdateUserRole
              ),
            }}
            placement="bottom"
            arrow
          >
            <Button>Roles</Button>
          </Dropdown>
        </Flex>
      );

      return (
        <Flex gap={10}>
          {renderBlockBtnFn(_, keys)}
          <Button onClick={() => handleNavigate(keys.id)}>
            <ArrowRightOutlined color="black" />
          </Button>
          <Popover content={content} trigger="hover">
            <Button type="text">⋮</Button>
          </Popover>
        </Flex>
      );
    },
  },
];
