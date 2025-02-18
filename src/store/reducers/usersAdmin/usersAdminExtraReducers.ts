import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../../interfaces/loadingStatus';
import {
  fetchUser,
  fetchUsers,
  blockUser,
  unblockUser,
  updateUser,
  deleteUser,
} from './usersAdminAsyncThunk';
import { UsersAdminState } from './usersAdminSlice';

export function extraReducers(
  builder: ActionReducerMapBuilder<UsersAdminState>
) {
  builder.addCase(fetchUsers.pending, (state) => {
    state.status = LoadingStatus.LOADING;
  });
  builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
    const { data, meta } = payload;
    state.status = LoadingStatus.SUCCESS;
    state.users = data || [];
    state.totalAmount = meta.totalAmount;
  });
  builder.addCase(fetchUsers.rejected, (state) => {
    state.status = LoadingStatus.FAIL;
  });

  builder.addCase(fetchUser.pending, (state) => {
    state.status = LoadingStatus.LOADING;
  });
  builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
    state.status = LoadingStatus.SUCCESS;
    state.currUser = payload;
  });
  builder.addCase(fetchUser.rejected, (state) => {
    state.status = LoadingStatus.FAIL;
    state.currUser = null;
  });

  builder.addCase(updateUser.pending, (state) => {
    state.status = LoadingStatus.LOADING;
  });
  builder.addCase(updateUser.fulfilled, (state, { payload }) => {
    state.status = LoadingStatus.SUCCESS;
    state.currUser = payload;
  });
  builder.addCase(updateUser.rejected, (state) => {
    state.status = LoadingStatus.FAIL;
  });

  builder.addCase(blockUser.pending, (state) => {
    state.status = LoadingStatus.LOADING;
  });
  builder.addCase(blockUser.fulfilled, (state, { payload }) => {
    state.status = LoadingStatus.SUCCESS;
    const index = state.users.findIndex((user) => user.id === payload.id);
    state.users[index] = payload;
  });
  builder.addCase(blockUser.rejected, (state) => {
    state.status = LoadingStatus.FAIL;
  });

  builder.addCase(unblockUser.pending, (state) => {
    state.status = LoadingStatus.LOADING;
  });
  builder.addCase(unblockUser.fulfilled, (state, { payload }) => {
    state.status = LoadingStatus.SUCCESS;
    const index = state.users.findIndex((user) => user.id === payload.id);
    state.users[index] = payload;
  });
  builder.addCase(unblockUser.rejected, (state) => {
    state.status = LoadingStatus.FAIL;
  });

  builder.addCase(deleteUser.pending, (state) => {
    state.status = LoadingStatus.LOADING;
  });
  builder.addCase(deleteUser.fulfilled, (state) => {
    state.status = LoadingStatus.SUCCESS;
  });
  builder.addCase(deleteUser.rejected, (state) => {
    state.status = LoadingStatus.FAIL;
  });
}
