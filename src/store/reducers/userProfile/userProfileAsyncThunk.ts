import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api/axiosConfig';
import { getUserUpdateErrorMessage } from '../../../helpers/getErrorMessage';
import type {
  PasswordRequest,
  ProfileRequest,
  Profile,
} from '../../../interfaces/authApi';
import { AxiosResponse } from 'axios';

export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (_, thunkApi) => {
    try {
      const resp = await api.get<Profile>('/user/profile');
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
  async (changes: ProfileRequest, thunkApi) => {
    try {
      const resp = await api.put<ProfileRequest, AxiosResponse<Profile>>(
        '/user/profile',
        changes
      );
      return resp.data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(getUserUpdateErrorMessage(e.status));
    }
  }
);

export const resetUserPassword = createAsyncThunk(
  'userProfile/resetUserPassword',
  async (password: PasswordRequest, thunkApi) => {
    try {
      await api.put<PasswordRequest>('/user/profile/reset-password', password);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
