import { Flex } from 'antd';
import SearchPanel from './SearchPanel/SearchPanel';
import UsersPanel from './UsersPanel/UsersPanel';
import { useEffect } from 'react';
import { setDefaultAdminState } from '../../store/reducers/usersAdmin/usersAdminSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

interface UsersContainerProps {
  display: string | undefined;
}

const UsersContainer: React.FC<UsersContainerProps> = ({ display }) => {
  const totalAmount = useAppSelector((state) => state.usersAdmin.totalAmount);
  const offset = useAppSelector(
    (state) => state.usersAdmin.searchParams.offset
  );
  const limit = useAppSelector((state) => state.usersAdmin.searchParams.limit);

  const dispatch = useAppDispatch();

  const page = offset + 1;

  useEffect(() => {
    return () => {
      dispatch(setDefaultAdminState());
    };
  }, []);

  return (
    <Flex
      vertical
      style={{
        padding: 25,
        maxWidth: 1480,
        margin: '20px auto 0',
        borderRadius: 8,
        border: '1px solid #ddd',
        display,
      }}
    >
      <SearchPanel />
      <UsersPanel page={page} totalItems={totalAmount} pageSize={limit} />
    </Flex>
  );
};
export default UsersContainer;
