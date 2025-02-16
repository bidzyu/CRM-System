import { Button, Flex, Pagination, Table } from 'antd';
import { UserProfile } from '../../../interfaces/userRoles';
import {
  changeUsersPage,
  changeUsersSort,
} from '../../../store/reducers/usersAdmin/usersAdminSlice';
import { useAppDispatch } from '../../../store/store';
import { LoadingStatus } from '../../../interfaces/loadingStatus';
import { getUsersTableColumns } from '../../../helpers/getUsersTableColumns';
import {
  blockUser,
  unblockUser,
} from '../../../store/reducers/usersAdmin/usersAdminAsyncThunk';

interface UsersPanelProps {
  users: UserProfile[];
  page: number;
  totalItems: number;
  pageSize: number;
  status: LoadingStatus;
}

const UsersPanel: React.FC<UsersPanelProps> = ({
  users,
  page,
  totalItems,
  pageSize,
  status,
}) => {
  const dispatch = useAppDispatch();

  const isLoading = status === LoadingStatus.LOADING;

  const handleChange = (page: number) => {
    dispatch(changeUsersPage(page - 1));
  };

  const handleTableChange = (_: any, __: any, sorter: any) => {
    const { order, field } = sorter;
    const newParams = {
      sortBy: '',
      sortOrder: 'asc',
    };

    if (order && order === 'descend') {
      newParams.sortOrder = 'desc';
    }
    if (field) {
      newParams.sortBy = field;
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

  const columns = getUsersTableColumns(renderBtnFn);

  return (
    <Flex vertical>
      <Table<UserProfile>
        rowKey={(user) => user.id}
        dataSource={users}
        columns={columns}
        showSorterTooltip={{ target: 'sorter-icon' }}
        pagination={false}
        onChange={handleTableChange}
        loading={isLoading}
      />
      {totalItems > pageSize && (
        <Pagination
          simple
          defaultCurrent={page}
          total={totalItems}
          pageSize={pageSize}
          showSizeChanger={false}
          onChange={handleChange}
        />
      )}
    </Flex>
  );
};

export default UsersPanel;
