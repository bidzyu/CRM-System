import { AxiosResponse } from 'axios';
import {
  UserRegistration,
  AuthData,
  PasswordRequest,
  Profile,
  ProfileRequest,
  RefreshToken,
  Token,
} from '../interfaces/authApi';
import {
  getRefreshToken,
  hasRefreshToken,
  removeAuthTokens,
  saveAuthTokens,
} from '../helpers/handleAuthToken';
import { api, noInterceptApi } from './axiosConfig';

export const registerUser = async (userData: UserRegistration) => {
  try {
    const data = await api.post<UserRegistration, AxiosResponse<Profile>>(
      '/auth/signup',
      userData
    );
    // const user = data.data;
    // return user;
  } catch (e) {
    throw e;
  }
};

export const loginUser = async (credentials: AuthData) => {
  try {
    const data = await api.post<AuthData, AxiosResponse<Token>>(
      '/auth/signin',
      credentials
    );
    const tokens = data.data;
    saveAuthTokens(tokens);
  } catch (e) {
    throw e;
  }
};

export const refreshUserToken = async () => {
  try {
    if (!hasRefreshToken()) {
      throw new Error('No token');
    }

    const refToken = getRefreshToken();
    const data = {
      refreshToken: refToken,
    } as RefreshToken;
    const respData = await noInterceptApi.post<
      RefreshToken,
      AxiosResponse<Token>
    >('/auth/refresh', data);
    const tokens = respData.data;
    return tokens;
  } catch (e: any) {
    throw e;
  }
};

export const fetchUserProfile = async () => {
  try {
    const respData = await api.get<Profile>('/user/profile');
    return respData.data;
  } catch (e) {
    throw e;
  }
};

export const updateUserProfile = async (changes: ProfileRequest) => {
  try {
    const data = await api.put<ProfileRequest, AxiosResponse<Profile>>(
      '/user/profile',
      changes
    );
    const profile = data.data;
    return profile;
  } catch (e) {
    throw e;
  }
};

export const resetUserPassword = async (password: PasswordRequest) => {
  try {
    await api.put<PasswordRequest>('/user/profile/reset-password', password);

    removeAuthTokens();
    console.log('Password has been reset!');
  } catch (e) {
    console.log('resetPassword', e);
    throw e;
  }
};

export const logoutUser = async () => {
  try {
    await api.post('/user/logout');
    removeAuthTokens();
    console.log('Logout!');
  } catch (e) {
    console.log('logout', e);
    throw e;
  }
};
