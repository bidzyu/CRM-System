import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authorization from './reducers/authorization/authSlice';
import todos from './reducers/todos/todosSlice';
import userProfile from './reducers/userProfile/userProfileSlice';
import usersAdmin from './reducers/usersAdmin/usersAdminSlice';
import { AxiosInterceptors } from '../api/AppApi';
import { usersApi } from '../api/UsersApi';

const rootReducer = combineReducers({
  userProfile,
  todos,
  authorization,
  usersAdmin,
  [usersApi.reducerPath]: usersApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = (() => useDispatch)();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

AxiosInterceptors.setup(store);
