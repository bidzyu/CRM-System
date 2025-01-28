import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  saveAuthTokens,
  hasRefreshToken,
  removeAuthTokens,
} from '../helpers/handleAuthToken';
import { Token } from '../interfaces/authApi';
import { refreshUserToken } from './auth';
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
    if (error.response.status === 401 && hasRefreshToken()) {
      try {
        const token = await refreshUserToken();
        if (token) {
          saveAuthTokens(token);
        } else {
          throw error;
        }
      } catch (e) {
        removeAuthTokens();
        return Promise.reject(e);
      }

      const newAccessToken = getAccessToken();
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);
