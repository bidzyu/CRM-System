import { Token } from '../interfaces/authApi';

enum AuthTokens {
  ACCESS = 'accessToken',
  REFRESH = 'refreshToken',
}

class AuthToken {
  private access: string | null;
  private refresh: string | null;

  constructor() {
    this.access = localStorage.getItem(AuthTokens.ACCESS);
    this.refresh = localStorage.getItem(AuthTokens.REFRESH);
  }

  save(tokens: Token) {
    localStorage.setItem(AuthTokens.ACCESS, tokens[AuthTokens.ACCESS]);
    localStorage.setItem(AuthTokens.REFRESH, tokens[AuthTokens.REFRESH]);
    this.access = tokens[AuthTokens.ACCESS];
    this.refresh = tokens[AuthTokens.REFRESH];
  }

  remove() {
    localStorage.removeItem(AuthTokens.ACCESS);
    localStorage.removeItem(AuthTokens.REFRESH);
    this.access = null;
    this.refresh = null;
  }

  getAccess() {
    return this.access;
  }

  getRefresh() {
    return this.refresh;
  }
  hasAccess() {
    return !!this.access;
  }

  hasRefresh() {
    return !!this.refresh;
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
