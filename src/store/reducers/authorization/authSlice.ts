import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './authExtraReducers';
import { LoadingStatus } from '../../../interfaces/loadingStatus';

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
  reducers: {},
  extraReducers,
});

export default authorizationSlice.reducer;
// export const {} = authorizationSlice.actions;
