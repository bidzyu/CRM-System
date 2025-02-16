import { RootState } from '../store';

export const getAuthIsLogged = (state: RootState) =>
  state.authorization.isLogged;
  
export const getAuthStatus = (state: RootState) => state.authorization.loading;
