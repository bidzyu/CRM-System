import { Flex, Pagination } from 'antd';
import BlockedStatusFilter from './BlockedStatusFilter/BlockedStatusFilter';
import UsersTable from './UsersTable/UsersTable';
import { useAppDispatch } from '../../../store/store';
import { changeUsersPage } from '../../../store/reducers/usersAdmin/usersAdminSlice';

interface UsersPanelProps {
  page: number;
  totalItems: number;
  pageSize: number;
}

const UsersPanel: React.FC<UsersPanelProps> = ({
  page,
  totalItems,
  pageSize,
}) => {
  const dispatch = useAppDispatch();

  const handlePageChange = (page: number) => {
    dispatch(changeUsersPage(page - 1));
  };

  return (
    <Flex vertical>
      <BlockedStatusFilter />
      <UsersTable />
      {totalItems > pageSize && (
        <Pagination
          simple
          current={page}
          total={totalItems}
          pageSize={pageSize}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      )}
    </Flex>
  );
};

export default UsersPanel;
