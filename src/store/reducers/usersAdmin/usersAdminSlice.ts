import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  UserProfile,
  UserFilters,
  UserFiltersByField,
  UsersSwitcherValues,
} from '../../../interfaces/userRoles';

export interface UsersAdminState {
  users: UserProfile[];
  totalAmount: number;
  searchParams: UserFilters;
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
      state.searchParams = defaultSearchParams;
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
});

export default usersAdminSlice.reducer;
export const {
  setUsersSearchTerm,
  changeUsersPage,
  setDefaultAdminState,
  setDefaultSearchParams,
  changeUsersSort,
  changeIsBlockedFilter,
} = usersAdminSlice.actions;
