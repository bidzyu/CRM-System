import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './authExtraReducers';
import { LoadingStatus } from '../../../interfaces/loadingStatus';
import { removeAuthTokens } from '../../../helpers/handleAuthToken';

export interface Authorization {
  isLogged: boolean;
  loading: LoadingStatus;
}

const initialState: Authorization = {
  isLogged: false,
  loading: LoadingStatus.INITIAL,
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    logoutStateUser: (state) => {
      state.isLogged = false;
      removeAuthTokens();
    },
  },
  extraReducers,
});

export default authorizationSlice.reducer;
export const { logoutStateUser } = authorizationSlice.actions;
