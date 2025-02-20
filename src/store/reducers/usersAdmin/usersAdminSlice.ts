import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  UserProfile,
  UserFilters,
  UserFiltersByField,
  UsersSwitcherValues,
} from '../../../interfaces/userRoles';
import { extraReducers } from './usersAdminExtraReducers';
import { LoadingStatus } from '../../../interfaces/loadingStatus';

export interface UsersAdminState {
  users: UserProfile[];
  totalAmount: number;
  searchParams: UserFilters;
  currUser: UserProfile | null;
  status: LoadingStatus;
}

const defaultSearchParams: UserFilters = {
  search: '',
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
      state.searchParams.offset = 0;
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
    changeUsersSort: (
      state,
      { payload }: PayloadAction<UserFiltersByField>
    ) => {
      const newSearchParams = {
        ...defaultSearchParams,
        search: state.searchParams.search,
        isBlocked: state.searchParams.isBlocked,
        ...payload,
      };

      state.searchParams = newSearchParams;
    },
    clearCurrUserState: (state) => {
      state.currUser = null;
    },
    changeIsBlockedFilter: (
      state,
      { payload }: PayloadAction<UsersSwitcherValues>
    ) => {
      if (payload === UsersSwitcherValues.ALL) {
        delete state.searchParams.isBlocked;
      }
      if (payload === UsersSwitcherValues.ACTIVE) {
        state.searchParams.isBlocked = false;
      }
      if (payload === UsersSwitcherValues.BLOCKED) {
        state.searchParams.isBlocked = true;
      }
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
  changeIsBlockedFilter,
} = usersAdminSlice.actions;
