import { RootState } from '../store';

export const getSearchParams = (state: RootState) =>
  state.usersAdmin.searchParams;
