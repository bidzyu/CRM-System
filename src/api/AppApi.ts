import axios, {
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios';
import { authToken } from './AuthToken';
import { refreshUserToken } from '../store/reducers/authorization/authAsyncThunk';
import { logoutStateUser } from '../store/reducers/authorization/authSlice';
import { Store } from '../store/store';
import { BASE_URL } from './config';

const BASE_AXIOS_CONFIG: CreateAxiosDefaults = {
  baseURL: BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

class AppApi {
  private api: AxiosInstance;
  private noInterceptApi: AxiosInstance;

  constructor(axiosConfig: CreateAxiosDefaults) {
    this.api = axios.create(axiosConfig);
    this.noInterceptApi = axios.create(axiosConfig);
  }

  get<T>(endpoint: string) {
    return this.api.get<T>(endpoint);
  }

  post<T, R>(endpoint: string, data?: T) {
    return this.api.post<T, AxiosResponse<R>>(endpoint, data);
  }

  put<T, R>(endpoint: string, data: T) {
    return this.api.put<T, AxiosResponse<R>>(endpoint, data);
  }

  delete<R>(endpoint: string) {
    return this.api.delete<AxiosResponse<R>>(endpoint);
  }

  noInterceptPost<T, R>(endpoint: string, data: T) {
    return this.noInterceptApi.post<T, AxiosResponse<R>>(endpoint, data);
  }

  setup(store: Store) {
    this.api.interceptors.request.use(
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
    this.api.interceptors.response.use(
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
          return this.api(originalRequest);
        }

        return Promise.reject(error);
      }
    );
  }
}

export const appApi = new AppApi(BASE_AXIOS_CONFIG);
