import { RootState } from '../store';

export const getUserProfile = (state: RootState) => state.userProfile.user;
