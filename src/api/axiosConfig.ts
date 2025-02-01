import axios from 'axios';
import { getAccessToken, hasRefreshToken } from '../helpers/handleAuthToken';
import { refreshUserToken } from '../store/reducers/authorization/authAsyncThunk';
import { logoutStateUser } from '../store/reducers/authorization/authSlice';
import type { Store } from '../store/store';
import { BASE_URL } from './config';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const noInterceptApi = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const AxiosInterceptors = {
  setup: (store: Store) => {
    api.interceptors.request.use(
      (config) => {
        const accessToken = getAccessToken();

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const { dispatch } = store;
        if (
          error.response &&
          error.response.status === 401 &&
          hasRefreshToken()
        ) {
          try {
            await dispatch(refreshUserToken()).unwrap();
          } catch (e) {
            return Promise.reject(e);
          }

          const newAccessToken = getAccessToken();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } else if (error.response && error.response.status === 401) {
          dispatch(logoutStateUser());
        }

        return Promise.reject(error);
      }
    );
  },
};
