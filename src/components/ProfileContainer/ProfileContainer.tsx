import { Flex, Typography } from 'antd';
import LogoutButton from './LogoutButton/LogoutButton';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  fetchUserProfile,
  updateUserProfile,
} from '../../store/reducers/userProfile/userProfileAsyncThunk';
import ShowError from '../ShowError/ShowError';

const ProfileContainer = () => {
  const user = useAppSelector((state) => state.userProfile.user);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const fetchNewUser = async () => {
    try {
      await dispatch(fetchUserProfile()).unwrap();
    } catch (e: any) {
      setError(e);
    }
  };

  const handleRemoveError = () => {
    if (error) {
      setError('');
    }
  };

  useEffect(() => {
    fetchNewUser();
  }, []);

  return (
    <>
      <LogoutButton />
      <ShowError error={error} removeError={handleRemoveError} />
      <Flex vertical style={{ height: '100vh' }}>
        <Typography.Title style={{ margin: '30px auto 50px' }} level={1}>
          Привет{user && ` ${user.username}`}!
        </Typography.Title>
        {user && (
          <ProfileInfo
            user={user}
            profileUpdater={(...args) => dispatch(updateUserProfile(...args))}
            dataUpdater={() => dispatch(fetchUserProfile())}
          />
        )}
      </Flex>
    </>
  );
};

export default ProfileContainer;
