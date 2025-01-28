import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '../../interfaces/authApi';

interface UserProfile {
  user: Profile | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: UserProfile = {
  user: null,
  loading: 'idle',
};

const userProfile = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, { payload }: PayloadAction<Profile>) => {
      state.user = payload;
    },
    updateUserProfile: (state, { payload }: PayloadAction<Profile>) => {
      state.user = payload;
    },
  },
  // extraReducers(builder) {},
});

export default userProfile.reducer;
export const { setUserProfile, updateUserProfile } = userProfile.actions;
