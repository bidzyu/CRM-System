import { Flex, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../api/auth';
import { removeAuthTokens } from '../../helpers/handleAuthToken';
import { Profile } from '../../interfaces/authApi';
import { RouterRoutes } from '../../interfaces/routerRoutes';
import { setUserProfile } from '../../store/reducers/userProfileSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import LogoutButton from './LogoutButton/LogoutButton';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const ProfileContainer = () => {
  const user = useAppSelector((state) => state.userProfile.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const profile = await fetchUserProfile();
        dispatch(setUserProfile(profile));
      } catch (e: any) {
        if (e.status === 401) {
          navigate(RouterRoutes.AUTHORIZATION);
        } else {
          removeAuthTokens();
          navigate(RouterRoutes.AUTHORIZATION);
        }
      }
    })();
  }, []);

  return (
    <>
      <LogoutButton />
      <Flex vertical style={{ height: '100vh' }}>
        <Typography.Title style={{ margin: '30px auto 50px' }} level={1}>
          Привет{user && ` ${user.username}`}!
        </Typography.Title>
        {user && <ProfileInfo />}
      </Flex>
    </>
  );
};

export default ProfileContainer;
