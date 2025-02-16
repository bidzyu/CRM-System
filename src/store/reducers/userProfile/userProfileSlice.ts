import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './userProfileExtraReducers';
import { LoadingStatus } from '../../../interfaces/loadingStatus';
import type { UserProfile } from '../../../interfaces/userRoles';
export interface UserProfileState {
  user: UserProfile | null;
  loading: LoadingStatus;
}

const initialState: UserProfileState = {
  user: null,
  loading: LoadingStatus.INITIAL,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    clearStateUserInfo(state) {
      state.user = null;
      state.loading = LoadingStatus.INITIAL;
    },
  },
  extraReducers,
});

export default userProfileSlice.reducer;
export const { clearStateUserInfo } = userProfileSlice.actions;
