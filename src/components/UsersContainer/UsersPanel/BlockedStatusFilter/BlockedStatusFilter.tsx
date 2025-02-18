import { Segmented } from 'antd';
import { UsersSwitcherValues } from '../../../../interfaces/userRoles';
import { changeIsBlockedFilter } from '../../../../store/reducers/usersAdmin/usersAdminSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

const usersSwitcherValues = Object.values(UsersSwitcherValues);

const BlockedStatusFilter = () => {
  const isBlocked = useAppSelector(
    (state) => state.usersAdmin.searchParams.isBlocked
  );
  const dispatch = useAppDispatch();

  const blockedValue =
    typeof isBlocked === 'undefined'
      ? UsersSwitcherValues.ALL
      : isBlocked === true
      ? UsersSwitcherValues.BLOCKED
      : UsersSwitcherValues.ACTIVE;

  return (
    <Segmented
      options={usersSwitcherValues}
      defaultValue={UsersSwitcherValues.ALL}
      value={blockedValue}
      onChange={(value) => dispatch(changeIsBlockedFilter(value))}
      accessKey={'true'}
      size={'large'}
      style={{ marginBottom: 3 }}
    />
  );
};

export default BlockedStatusFilter;
