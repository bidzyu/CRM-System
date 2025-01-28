import { Token } from '../interfaces/authApi';

enum AuthTokens {
  ACCESS = 'accessToken',
  REFRESH = 'refreshToken',
}

export const getAccessToken = () => {
  return localStorage.getItem(AuthTokens.ACCESS);
};

export const getRefreshToken = () => {
  return localStorage.getItem(AuthTokens.REFRESH);
};

export const hasAccessToken = () => {
  return !!localStorage.getItem(AuthTokens.ACCESS);
};

export const hasRefreshToken = () => {
  return !!localStorage.getItem(AuthTokens.REFRESH);
};

export const saveAuthTokens = (tokens: Token) => {
  localStorage.setItem(AuthTokens.ACCESS, tokens[AuthTokens.ACCESS]);
  localStorage.setItem(AuthTokens.REFRESH, tokens[AuthTokens.REFRESH]);
};

export const removeAuthTokens = () => {
  localStorage.removeItem(AuthTokens.ACCESS);
  localStorage.removeItem(AuthTokens.REFRESH);
};
