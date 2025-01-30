import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './userProfileExtraReducers';
import { Profile } from '../../../interfaces/authApi';
import { LoadingStatus } from '../../../interfaces/loadingStatus';

export interface UserProfile {
  user: Profile | null;
  loading: LoadingStatus;
}

const initialState: UserProfile = {
  user: null,
  loading: LoadingStatus.INITIAL,
};

const userProfile = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers,
});

export default userProfile.reducer;
// export const { setUserProfile, updateUserProfile } = userProfile.actions;
