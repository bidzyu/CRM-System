import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../../interfaces/loadingStatus';
import type { UserProfile, UserFilters } from '../../../interfaces/userRoles';
import { extraReducers } from './usersAdminExtraReducers';

export interface UsersAdminState {
  users: UserProfile[];
  totalAmount: number;
  // sortBy: 'email' | 'username' | 'id';
  searchParams: UserFilters;
  currUser: UserProfile | null;
  status: LoadingStatus;
}

const defaultSearchParams: UserFilters = {
  search: '',
  sortBy: '',
  sortOrder: 'asc',
  limit: 20,
  offset: 0,
};

const initialState: UsersAdminState = {
  users: [],
  totalAmount: 0,
  searchParams: defaultSearchParams,
  currUser: null,
  status: LoadingStatus.INITIAL,
};

const usersAdminSlice = createSlice({
  name: 'usersAdmin',
  initialState,
  reducers: {
    setUsersSearchTerm: (state, { payload }: PayloadAction<string>) => {
      state.searchParams.search = payload;
    },
    changeUsersPage: (state, { payload }: PayloadAction<number>) => {
      state.searchParams.offset = payload;
    },
    setDefaultAdminState: (state) => {
      state.currUser = null;
      state.searchParams = defaultSearchParams;
      state.status = initialState.status;
      state.totalAmount = initialState.totalAmount;
      state.users = [];
    },
    setDefaultSearchParams: (state) => {
      state.searchParams = defaultSearchParams;
    },
    changeUsersSort: (state, { payload }) => {
      state.searchParams.sortBy = payload.sortBy;
      state.searchParams.sortOrder = payload.sortOrder;
    },
    clearCurrUserState: (state) => {
      state.currUser = null;
    },
  },
  extraReducers,
});

export default usersAdminSlice.reducer;
export const {
  setUsersSearchTerm,
  changeUsersPage,
  setDefaultAdminState,
  setDefaultSearchParams,
  changeUsersSort,
  clearCurrUserState,
} = usersAdminSlice.actions;
