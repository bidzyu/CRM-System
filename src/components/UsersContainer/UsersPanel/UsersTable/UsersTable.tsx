import { App as AntdApp, Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import {
  useModalWarning,
  ModalWarning,
} from '../../../../hooks/useModalWarning';
import { changeUsersSort } from '../../../../store/reducers/usersAdmin/usersAdminSlice';
import { getUserRolesByRole } from '../../../../helpers/getUserRole';
import { getUsersTableColumns } from '../../../../helpers/getUsersTableColumns';
import {
  UserFiltersByField,
  UserProfile,
  UserRoles,
} from '../../../../interfaces/userRoles';
import { RouterRoutes } from '../../../../interfaces/routerRoutes';
import {
  useGetUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
  useUpdateUserRolesMutation,
} from '../../../../api/UsersApi';
import { useEffect } from 'react';

const UsersTable = () => {
  const params = useAppSelector((state) => state.usersAdmin.searchParams);
  const { search, sortBy, sortOrder, limit, offset, isBlocked } = params;
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRoles] = useUpdateUserRolesMutation();

  const { data, isLoading, refetch } = useGetUsersQuery({
    params,
  });
  const users = (data && data.data) || [];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const showModalWarning = useModalWarning();

  const { message } = AntdApp.useApp();

  useEffect(() => {
    refetch();
  }, [search, sortBy, sortOrder, limit, offset, isBlocked]);

  const handleTableChange = (_: any, __: any, sorter: any) => {
    const { order, field } = sorter;
    const newParams: UserFiltersByField = {};

    if (order && field) {
      newParams.sortBy = field;

      if (order && order === 'descend') {
        newParams.sortOrder = 'desc';
      } else {
        newParams.sortOrder = 'asc';
      }
    }

    return dispatch(changeUsersSort(newParams));
  };

  const renderBtnFn = (_: any, { id, isBlocked }: any) => {
    const handleToggleBlockUser = () => {
      if (isBlocked) {
        unblockUser({ id });
      } else {
        blockUser({ id });
      }
    };

    return (
      <Button onClick={handleToggleBlockUser}>
        {isBlocked ? 'Разблокировать' : 'Заблокировать'}
      </Button>
    );
  };

  const handleNavigate = (id: string) => {
    navigate(RouterRoutes.USERS + `/${id}`);
  };

  const handleDeleteUser = async (id: string) => {
    const warningConfig: ModalWarning = {
      title: 'Вы уверены что хотите удалить этого пользователя?',
      content: 'Это действие невозможно будет отменить!',
      onOk: async () => {
        try {
          await deleteUser({ id }).unwrap();
          message.success(`Пользователь с id: ${id} был успешно удален!`);
        } catch (e) {
          message.error(
            'Упс, произошла ошибка, пожалуйста повторите запрос позже.'
          );
        }
      },
    };

    showModalWarning(warningConfig);
  };

  const handleUpdateUserRole = async (
    id: string,
    currRole: UserRoles,
    newRole: UserRoles
  ) => {
    const warningConfig: ModalWarning = {
      title: `Вы уверены что хотите изменить уровень прав этого пользователя?`,
      content: `Сейчас ${currRole}, после обновления ==> ${newRole}`,
      onOk: async () => {
        try {
          const requestData = getUserRolesByRole(newRole);
          await updateUserRoles({ requestData, id }).unwrap();
          message.success(
            `Права пользователя id: ${id} были успешно обновлены на ${newRole}!`
          );
        } catch (e) {
          message.error(
            'Упс, произошла ошибка, пожалуйста повторите запрос позже.'
          );
        }
      },
    };

    showModalWarning(warningConfig);
  };

  const columns = getUsersTableColumns(
    renderBtnFn,
    handleNavigate,
    handleDeleteUser,
    handleUpdateUserRole
  );

  return (
    <Table<UserProfile>
      rowKey={(user) => user.id}
      dataSource={users}
      columns={columns}
      showSorterTooltip={{ target: 'sorter-icon' }}
      pagination={false}
      onChange={handleTableChange}
      loading={isLoading}
      size={'middle'}
    />
  );
};

export default UsersTable;
