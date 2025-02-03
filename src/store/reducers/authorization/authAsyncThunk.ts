import { createAsyncThunk } from '@reduxjs/toolkit';
import { appApi } from '../../../api/AppApi';
import { authToken } from '../../../api/AuthToken';
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
      const data = await appApi.post<AuthData, Token>(
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
      await appApi.post('/user/logout');
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

      const respData = await appApi.noInterceptPost<RefreshToken, Token>(
        '/auth/refresh',
        data
      );
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
      await appApi.post<UserRegistration, Profile>('/auth/signup', userData);
    } catch (e: any) {
      return thunkApi.rejectWithValue(getRegisterErrorMessage(e.status));
    }
  }
);
