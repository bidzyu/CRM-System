import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import {
  updateUserProfile,
  fetchUserProfile,
  resetUserPassword,
} from './userProfileAsyncThunk';
import { LoadingStatus } from '../../../interfaces/loadingStatus';
import type { UserProfile } from './userProfileSlice';

export function extraReducers(builder: ActionReducerMapBuilder<UserProfile>) {
  builder.addCase(fetchUserProfile.pending, (state) => {
    state.loading = LoadingStatus.LOADING;
  });
  builder.addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
    state.user = payload;
    state.loading = LoadingStatus.SUCCESS;
  });
  builder.addCase(fetchUserProfile.rejected, (state) => {
    state.loading = LoadingStatus.FAIL;
  });

  builder.addCase(updateUserProfile.pending, (state) => {
    state.loading = LoadingStatus.LOADING;
  });
  builder.addCase(updateUserProfile.fulfilled, (state, { payload }) => {
    state.user = payload;
    state.loading = LoadingStatus.SUCCESS;
  });
  builder.addCase(updateUserProfile.rejected, (state, { payload, error }) => {
    state.loading = LoadingStatus.FAIL;
  });

  builder.addCase(resetUserPassword.pending, (state) => {
    state.loading = LoadingStatus.LOADING;
  });
  builder.addCase(resetUserPassword.fulfilled, (state) => {
    state.loading = LoadingStatus.SUCCESS;
  });
  builder.addCase(resetUserPassword.rejected, (state) => {
    state.loading = LoadingStatus.FAIL;
  });
}
