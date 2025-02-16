import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserUpdateErrorMessage } from '../../../helpers/getErrorMessage';
import { api } from '../../../api/AppApi';
import type {
  UserProfile,
  UserRequest,
  UserPasswordRequest,
  UpdateUserParams,
} from '../../../interfaces/userRoles';
import { AxiosResponse } from 'axios';

export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (_, thunkApi) => {
    try {
      const resp = await api.get<UserProfile>('/user/profile');
      return resp.data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(
        'Возникла ошибка при получении данных пользователя.'
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'userProfile/updateUserProfile',
  async ({ requestData }: UpdateUserParams, thunkApi) => {
    try {
      const resp = await api.put<UserRequest, AxiosResponse<UserProfile>>(
        '/user/profile',
        requestData
      );
      return resp.data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(getUserUpdateErrorMessage(e.status));
    }
  }
);

export const resetUserPassword = createAsyncThunk(
  'userProfile/resetUserPassword',
  async (password: UserPasswordRequest, thunkApi) => {
    try {
      await api.put<UserPasswordRequest>(
        '/user/profile/reset-password',
        password
      );
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
