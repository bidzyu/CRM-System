import { Token } from '../interfaces/authApi';

class AuthToken {
  private ACCESS_KEY: 'accessToken' = 'accessToken';
  private REFRESH_KEY: 'refreshToken' = 'refreshToken';
  private accessToken: string | null;
  private refreshToken: string | null;

  constructor() {
    this.accessToken = localStorage.getItem(this.ACCESS_KEY);
    this.refreshToken = localStorage.getItem(this.REFRESH_KEY);
  }

  save(tokens: Token) {
    localStorage.setItem(this.ACCESS_KEY, tokens.accessToken);
    localStorage.setItem(this.REFRESH_KEY, tokens.refreshToken);
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
  }

  remove() {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    this.accessToken = null;
    this.refreshToken = null;
  }

  getAccess() {
    return this.accessToken;
  }

  getRefresh() {
    return this.refreshToken;
  }
  hasAccess() {
    return !!this.accessToken;
  }

  hasRefresh() {
    return !!this.refreshToken;
  }
}

export const authToken = new AuthToken();

// export class AuthToken {
//   save(tokens: Token) {
//     localStorage.setItem(AuthTokens.ACCESS, tokens[AuthTokens.ACCESS]);
//     localStorage.setItem(AuthTokens.REFRESH, tokens[AuthTokens.REFRESH]);
//   }

//   remove() {
//     localStorage.removeItem(AuthTokens.ACCESS);
//     localStorage.removeItem(AuthTokens.REFRESH);
//   }

//   getAccess() {
//     return localStorage.getItem(AuthTokens.ACCESS);
//   }

//   getRefresh() {
//     return localStorage.getItem(AuthTokens.REFRESH);
//   }
//   hasAccess() {
//     return !!localStorage.getItem(AuthTokens.ACCESS);
//   }

//   hasRefresh() {
//     return !!localStorage.getItem(AuthTokens.REFRESH);
//   }
// }
// export const authToken = new AuthToken();
