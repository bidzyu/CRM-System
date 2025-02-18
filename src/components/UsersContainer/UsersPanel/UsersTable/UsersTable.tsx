import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  useModalWarning,
  ModalWarning,
} from '../../../../hooks/useModalWarning';
import { LoadingStatus } from '../../../../interfaces/loadingStatus';
import {
  UserFiltersByField,
  UserProfile,
  UserRoles,
} from '../../../../interfaces/userRoles';
import { changeUsersSort } from '../../../../store/reducers/usersAdmin/usersAdminSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { App as AntdApp, Button } from 'antd';

import {
  blockUser,
  deleteUser,
  fetchUsers,
  unblockUser,
  updateUserRoles,
} from '../../../../store/reducers/usersAdmin/usersAdminAsyncThunk';
import { RouterRoutes } from '../../../../interfaces/routerRoutes';
import { getUserRolesByRole } from '../../../../helpers/getCurrUserRole';
import { getUsersTableColumns } from '../../../../helpers/getUsersTableColumns';

const UsersTable = () => {
  const users = useAppSelector((state) => state.usersAdmin.users);
  const status = useAppSelector((state) => state.usersAdmin.status);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const showModalWarning = useModalWarning();

  const { message } = AntdApp.useApp();

  const isLoading = status === LoadingStatus.LOADING;

  const handleTableChange = (_: any, __: any, sorter: any) => {
    const { order, field } = sorter;
    const newParams: UserFiltersByField = {
      // sortOrder: 'asc',
    };
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
    const toggleBlockUser = isBlocked ? unblockUser : blockUser;

    return (
      <Button onClick={() => dispatch(toggleBlockUser(id))}>
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
          await dispatch(deleteUser(id)).unwrap();
          message.success(`Пользователь с id: ${id} был успешно удален!`);
          await dispatch(fetchUsers()).unwrap();
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

          await dispatch(updateUserRoles({ requestData, id })).unwrap();
          message.success(
            `Права пользователя id: ${id} были успешно обновлены на ${newRole}!`
          );
          await dispatch(fetchUsers()).unwrap();
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
