import { createApi } from '@reduxjs/toolkit/query/react';
import { api } from './AppApi';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import {
  MetaResponse,
  QueryUserId,
  UpdateUserParams,
  UpdateUserRoles,
  UserFilters,
  UserProfile,
} from '../interfaces/userRoles';

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await api({
        url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Users'],
  endpoints: (build) => ({
    getUsers: build.query<MetaResponse<UserProfile>, { params: UserFilters }>({
      query: ({ params }) => ({
        url: '/admin/users',
        params,
      }),
      providesTags: ['Users'],
    }),
    getUser: build.query<UserProfile, QueryUserId>({
      query: ({ id }) => ({
        url: `/admin/users/${id}`,
      }),
      providesTags: (result, error, arg, meta) => [
        { type: 'Users', id: arg.id },
      ],
    }),
    blockUser: build.mutation<UserProfile, QueryUserId>({
      query: ({ id }) => ({
        url: `/admin/users/${id}/block`,
        method: 'POST',
      }),
      invalidatesTags: () => ['Users'],
    }),
    unblockUser: build.mutation<UserProfile, QueryUserId>({
      query: ({ id }) => ({
        url: `/admin/users/${id}/unblock`,
        method: 'POST',
      }),
      invalidatesTags: () => ['Users'],
    }),
    deleteUser: build.mutation<void, QueryUserId>({
      query: ({ id }: { id: string }) => ({
        url: `/admin/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => ['Users'],
    }),
    updateUser: build.mutation<UserProfile, UpdateUserParams>({
      query: ({ id, requestData }) => ({
        url: `/admin/users/${id}`,
        data: requestData,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Users', id: arg.id },
        'Users',
      ],
    }),
    updateUserRoles: build.mutation<UserProfile, UpdateUserRoles>({
      query: ({ id, requestData }) => ({
        url: `/admin/users/${id}/rights`,
        data: { roles: requestData },
        method: 'POST',
      }),
      invalidatesTags: () => ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdateUserRolesMutation,
} = usersApi;
