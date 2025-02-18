import { Flex } from 'antd';
import { useEffect } from 'react';
import { fetchUsers } from '../../store/reducers/usersAdmin/usersAdminAsyncThunk';
import { setDefaultAdminState } from '../../store/reducers/usersAdmin/usersAdminSlice';
import { getSearchParams } from '../../store/selectors/usersAdmin';
import { useAppDispatch, useAppSelector } from '../../store/store';
import SearchPanel from './SearchPanel/SearchPanel';
import UsersPanel from './UsersPanel/UsersPanel';

const UsersContainer = () => {
  const { totalAmount } = useAppSelector((state) => state.usersAdmin);
  const { search, sortBy, sortOrder, limit, offset, isBlocked } =
    useAppSelector(getSearchParams);

  const page = offset + 1;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [search, sortBy, sortOrder, limit, offset, isBlocked]);

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
      }}
    >
      <SearchPanel />
      <UsersPanel page={page} totalItems={totalAmount} pageSize={limit} />
    </Flex>
  );
};
export default UsersContainer;
