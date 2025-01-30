import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { api, noInterceptApi } from '../../../api/axiosConfig';
import {
  getRefreshToken,
  hasRefreshToken,
  removeAuthTokens,
  saveAuthTokens,
} from '../../../helpers/handleAuthToken';
import {
  getLoginErrorMessage,
  getRegisterErrorMessage,
} from '../../../helpers/getErrorMessage';
import type {
  AuthData,
  RefreshToken,
  Token,
  Profile,
  UserRegistration,
} from '../../../interfaces/authApi';

export const loginUser = createAsyncThunk(
  'authorization/loginUser',
  async (credentials: AuthData, thunkApi) => {
    try {
      const data = await noInterceptApi.post<AuthData, AxiosResponse<Token>>(
        '/auth/signin',
        credentials
      );
      const token = data.data;
      saveAuthTokens(token);
      return token;
    } catch (e: any) {
      return thunkApi.rejectWithValue(getLoginErrorMessage(e.status));
    }
  }
);

export const logoutUser = createAsyncThunk(
  'authorization/logoutUser',
  async (_, thunkApi) => {
    try {
      await api.post('/user/logout');
      removeAuthTokens();
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const refreshUserToken = createAsyncThunk(
  'authorization/refreshUserToken',
  async (_, thunkApi) => {
    if (!hasRefreshToken()) {
      throw new Error('No auth token.');
    }

    try {
      const refToken = getRefreshToken();
      const data = {
        refreshToken: refToken,
      } as RefreshToken;

      const respData = await noInterceptApi.post<
        RefreshToken,
        AxiosResponse<Token>
      >('/auth/refresh', data);
      const tokens = respData.data;
      saveAuthTokens(tokens);
      return tokens;
    } catch (e: any) {
      removeAuthTokens();
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async (userData: UserRegistration, thunkApi) => {
    try {
      await noInterceptApi.post<UserRegistration, AxiosResponse<Profile>>(
        '/auth/signup',
        userData
      );
    } catch (e: any) {
      return thunkApi.rejectWithValue(getRegisterErrorMessage(e.status));
    }
  }
);
