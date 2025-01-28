import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  UserRegistration,
  AuthData,
  PasswordRequest,
  Profile,
  ProfileRequest,
  RefreshToken,
  Token,
} from '../../interfaces/authApi';
import { api, noInterceptApi } from '../../api/axiosConfig';
import {
  removeAuthTokens,
  saveAuthTokens,
} from '../../helpers/handleAuthToken';
import { AxiosResponse } from 'axios';

// export const loginUser = createAsyncThunk(
//   'authorization/loginUser',
//   async (credentials: AuthData, thunkApi) => {
//     const data = await api.post<AuthData, AxiosResponse<Token>>(
//       '/auth/signin',
//       credentials
//     );
//     const token = data.data;
//     return token;
//   }
// );
// export const logoutUser = createAsyncThunk(
//   'authorization/logoutUser',
//   async (_, thunkApi) => {
//     await api.post('/user/logout');
//   }
// );

enum AuthorizationStatus {
  INITIAL = 'idle',
  LOADING = 'pending',
  SUCCESS = 'succeeded',
  FAIL = 'failed',
}

interface Authorization {
  isLogged: boolean;
  loading: AuthorizationStatus;
}

const initialState: Authorization = {
  isLogged: false,
  loading: AuthorizationStatus.INITIAL,
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    login: (state) => {
      state.isLogged = true;
    },
    logout: (state) => {
      state.isLogged = false;
    },
  },
  // extraReducers(builder) {
  //   builder.addCase(loginUser.pending, (state) => {
  //     state.loading = AuthorizationStatus.LOADING;
  //   });
  //   builder.addCase(loginUser.fulfilled, (state, { payload }) => {
  //     state.loading = AuthorizationStatus.SUCCESS;
  //     state.isLogged = true;
  //     saveAuthTokens(payload);
  //   });
  //   builder.addCase(loginUser.rejected, (state, { error }) => {
  //     console.log(error);
  //     state.loading = AuthorizationStatus.FAIL;
  //   });
  //   builder.addCase(logoutUser.pending, (state) => {
  //     state.loading = AuthorizationStatus.LOADING;
  //   });
  //   builder.addCase(logoutUser.fulfilled, (state) => {
  //     state.loading = AuthorizationStatus.INITIAL;
  //     removeAuthTokens();
  //   });
  //   builder.addCase(logoutUser.rejected, (state, { error }) => {
  //     console.log(error);
  //     state.loading = AuthorizationStatus.FAIL;
  //   });
  // },
});

export default authorizationSlice.reducer;
export const { login, logout } = authorizationSlice.actions;
