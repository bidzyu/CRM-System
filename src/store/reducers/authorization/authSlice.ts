import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './authExtraReducers';
import { authToken } from '../../../api/AuthToken';
import { LoadingStatus } from '../../../interfaces/loadingStatus';

export interface AuthorizationState {
  isLogged: boolean;
  loading: LoadingStatus;
}

const initialState: AuthorizationState = {
  isLogged: false,
  loading: LoadingStatus.INITIAL,
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    logoutStateUser: (state) => {
      state.isLogged = false;
      authToken.remove();
    },
  },
  extraReducers,
});

export default authorizationSlice.reducer;
export const { logoutStateUser } = authorizationSlice.actions;
