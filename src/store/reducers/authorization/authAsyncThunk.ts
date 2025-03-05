import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, noInterceptApi } from '../../../api/AppApi';
import { authToken } from '../../../api/AuthToken';
import {
  getLoginErrorMessage,
  getRegisterErrorMessage,
} from '../../../helpers/getErrorMessage';
import type {
  AuthData,
  RefreshToken,
  Token,
  UserRegistration,
} from '../../../interfaces/authApi';
import type { UserProfile } from '../../../interfaces/userRoles';
import { AxiosResponse } from 'axios';

export const loginUser = createAsyncThunk(
  'authorization/loginUser',
  async (credentials: AuthData, thunkApi) => {
    try {
      const data = await noInterceptApi.post<AuthData, AxiosResponse<Token>>(
        '/auth/signin',
        credentials
      );
      const token = data.data;
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
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const refreshUserToken = createAsyncThunk(
  'authorization/refreshUserToken',
  async (_, thunkApi) => {
    if (!authToken.hasRefresh()) {
      throw new Error('No auth token.');
    }

    try {
      const refToken = authToken.getRefresh();
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
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async (userData: UserRegistration, thunkApi) => {
    try {
      await noInterceptApi.post<UserRegistration, UserProfile>(
        '/auth/signup',
        userData
      );
    } catch (e: any) {
      return thunkApi.rejectWithValue(getRegisterErrorMessage(e.status));
    }
  }
);
