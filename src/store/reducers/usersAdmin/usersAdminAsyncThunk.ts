import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api/AppApi';
import { getUserUpdateErrorMessage } from '../../../helpers/getErrorMessage';
import { AxiosResponse } from 'axios';
import { RootState } from '../../store';
import type {
  MetaResponse,
  UserProfile,
  UserRequest,
  UpdateUserParams,
  UserRolesRequest,
  UpdateUserRoles,
} from '../../../interfaces/userRoles';


export const fetchUsers = createAsyncThunk(
  'usersAdmin/fetchUsers',
  async (_: undefined, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const stateSearchParams = state.usersAdmin.searchParams;

    try {
      const resp = await api.get<MetaResponse<UserProfile>>('/admin/users', {
        params: { ...stateSearchParams },
      });
      const data = resp.data;

      return data;
    } catch (e: any) {
      console.log(e);
      return thunkApi.rejectWithValue(
        e.message || 'An error occurred while fetching users, try again later.'
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
        e.message || 'An error occurred while fetching user, try again later.'
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
        e.message || 'An error occurred while blocking user, try again later.'
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
        e.message || 'An error occurred while unblocking user, try again later'
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  'usersAdmin/deleteUser',
  async (id: string, thunkApi) => {
    try {
      await api.delete(`/admin/users/${id}`);
    } catch (e: any) {
      return thunkApi.rejectWithValue(
        e.message || 'An error occurred while deleting user, try again later.'
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

export const updateUserRoles = createAsyncThunk(
  'usersAdmin/updateUserRoles',

  async ({ requestData, id }: UpdateUserRoles, thunkApi) => {
    try {
      const resp = await api.post<UserRolesRequest, AxiosResponse<UserProfile>>(
        `/admin/users/${id}/rights`,
        { roles: requestData }
      );
      const data = resp.data;

      return data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(
        e.message ||
          'An error occurred while updating user roles, try again later.'
      );
    }
  }
);
