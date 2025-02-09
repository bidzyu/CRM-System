import axios, { CreateAxiosDefaults } from 'axios';
import { authToken } from './AuthToken';
import { refreshUserToken } from '../store/reducers/authorization/authAsyncThunk';
import { logoutStateUser } from '../store/reducers/authorization/authSlice';
import { Store } from '../store/store';

const BASE_DOMAIN = 'https://easydev.club';
const API_VERSION = '/api/v1';
const BASE_URL = BASE_DOMAIN + API_VERSION;

const BASE_AXIOS_CONFIG: CreateAxiosDefaults = {
  baseURL: BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export const api = axios.create(BASE_AXIOS_CONFIG);
export const noInterceptApi = axios.create(BASE_AXIOS_CONFIG);

export const AxiosInterceptors = {
  setup(store: Store) {
    api.interceptors.request.use(
      (config) => {
        if (authToken.hasAccess()) {
          config.headers.Authorization = `Bearer ${authToken.getAccess()}`;
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
        if (error.response && error.response.status === 401) {
          if (!authToken.hasRefresh()) {
            dispatch(logoutStateUser());
            return Promise.reject(error);
          }

          try {
            await dispatch(refreshUserToken()).unwrap();
          } catch (e) {
            return Promise.reject(e);
          }

          const newAccessToken = authToken.getAccess();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }

        return Promise.reject(error);
      }
    );
  },
};
