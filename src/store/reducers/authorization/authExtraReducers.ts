import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import {
  loginUser,
  logoutUser,
  refreshUserToken,
  registerUser,
} from './authAsyncThunk';
import { LoadingStatus } from '../../../interfaces/loadingStatus';
import { Authorization } from './authSlice';

export function extraReducers(builder: ActionReducerMapBuilder<Authorization>) {
  builder.addCase(loginUser.pending, (state) => {
    state.loading = LoadingStatus.LOADING;
  });
  builder.addCase(loginUser.fulfilled, (state) => {
    state.loading = LoadingStatus.SUCCESS;
    state.isLogged = true;
  });
  builder.addCase(loginUser.rejected, (state) => {
    state.loading = LoadingStatus.FAIL;
  });

  builder.addCase(logoutUser.pending, (state) => {
    state.loading = LoadingStatus.LOADING;
  });
  builder.addCase(logoutUser.fulfilled, (state) => {
    state.loading = LoadingStatus.SUCCESS;
    state.isLogged = false;
  });
  builder.addCase(logoutUser.rejected, (state) => {
    state.loading = LoadingStatus.FAIL;
  });

  builder.addCase(refreshUserToken.pending, (state) => {
    state.loading = LoadingStatus.LOADING;
  });
  builder.addCase(refreshUserToken.fulfilled, (state) => {
    state.loading = LoadingStatus.SUCCESS;
    state.isLogged = true;
  });
  builder.addCase(refreshUserToken.rejected, (state) => {
    state.loading = LoadingStatus.FAIL;
    state.isLogged = false;
  });

  builder.addCase(registerUser.pending, (state) => {
    state.loading = LoadingStatus.LOADING;
  });
  builder.addCase(registerUser.fulfilled, (state) => {
    state.loading = LoadingStatus.SUCCESS;
  });
  builder.addCase(registerUser.rejected, (state) => {
    state.loading = LoadingStatus.FAIL;
  });
}
