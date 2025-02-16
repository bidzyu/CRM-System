import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { refreshUserToken } from '../store/reducers/authorization/authAsyncThunk';
import {
  getAuthIsLogged,
  getAuthStatus,
} from '../store/selectors/authorization';
import { LoadingStatus } from '../interfaces/loadingStatus';
import { getUserProfile } from '../store/selectors/userProfile';
import { fetchUserProfile } from '../store/reducers/userProfile/userProfileAsyncThunk';
import { clearStateUserInfo } from '../store/reducers/userProfile/userProfileSlice';

export const useAuthReconnector = () => {
  const isLogged = useAppSelector(getAuthIsLogged);
  const loginStatus = useAppSelector(getAuthStatus);
  const profile = useAppSelector(getUserProfile);
  const profileStatus = useAppSelector((state) => state.userProfile.loading);

  const dispatch = useAppDispatch();

  const reconnect = async () => {
    try {
      await dispatch(refreshUserToken());
    } catch (e) {}
  };

  useEffect(() => {
    if (!isLogged && loginStatus === LoadingStatus.INITIAL) {
      reconnect();
    }
    if (isLogged && !profile) {
      dispatch(fetchUserProfile());
    }
    if (!isLogged && loginStatus === LoadingStatus.FAIL) {
      dispatch(clearStateUserInfo());
    }
  }, [isLogged]);

  return { isLogged, loginStatus, profile, profileStatus };
};
