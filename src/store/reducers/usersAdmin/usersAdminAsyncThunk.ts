import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { api } from '../../../api/AppApi';
import { getUserUpdateErrorMessage } from '../../../helpers/getErrorMessage';
import { getSearchParamsByObj } from '../../../helpers/getSearchParamsByObj';
import type {
  MetaResponse,
  UserProfile,
  UserRequest,
  UpdateUserParams,
} from '../../../interfaces/userRoles';
import { RootState } from '../../store';

export const fetchUsers = createAsyncThunk(
  'usersAdmin/fetchUsers',
  async (_: undefined, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const stateSearchParams = state.usersAdmin.searchParams;

    const searchParams = getSearchParamsByObj(stateSearchParams);

    try {
      const resp = await api.get<MetaResponse<UserProfile>>(
        '/admin/users' + searchParams
      );
      const data = resp.data;

      return data;
    } catch (e: any) {
      console.log(e);
      return thunkApi.rejectWithValue(
        e.message || 'An error occurred while fetching users, try later again.'
      );
    }
  }
);

export const fetchUser = createAsyncThunk(
  'usersAdmin/fetchUser',
  async (id: string, thunkApi) => {
    try {
      const resp = await api.get<UserProfile>(`/admin/users/${id}`);
      const data = resp.data;

      return data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(
        e.message || 'An error occurred while fetching user, try later again.'
      );
    }
  }
);

export const blockUser = createAsyncThunk(
  'usersAdmin/blockUser',
  async (id: string, thunkApi) => {
    try {
      const resp = await api.post<undefined, AxiosResponse<UserProfile>>(
        `/admin/users/${id}/block`
      );
      const data = resp.data;

      return data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(
        e.message || 'An error occurred while blocking user, try later again.'
      );
    }
  }
);

export const unblockUser = createAsyncThunk(
  'usersAdmin/unblockUser',
  async (id: string, thunkApi) => {
    try {
      const resp = await api.post<undefined, AxiosResponse<UserProfile>>(
        `/admin/users/${id}/unblock`
      );
      const data = resp.data;

      return data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(
        e.message || 'An error occurred while unblocking user, try later again.'
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  'usersAdmin/updateUser',

  async ({ requestData, id }: UpdateUserParams, thunkApi) => {
    try {
      const resp = await api.put<UserRequest, AxiosResponse<UserProfile>>(
        `/admin/users/${id}`,
        requestData
      );
      const data = resp.data;

      return data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(getUserUpdateErrorMessage(e.status));
    }
  }
);
