import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/types';

interface AuthState {
  fetching: boolean;
  accessToken: string | null;
  userSignedOut: boolean;
}

const initialState: AuthState = {
  fetching: false,
  accessToken: null,
  userSignedOut: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startFetching: state => {
      state.fetching = true;
    },
    stopFetching: state => {
      state.fetching = false;
    },
    auth: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.userSignedOut = false;
      state.fetching = false;
    },
    logout: state => {
      state.accessToken = null;
      state.userSignedOut = true;
      state.fetching = false;
    },
    Error: state => {
      state.fetching = false;
    },
  },
});

export const { startFetching, stopFetching, auth, logout, Error } =
  authSlice.actions;

export default authSlice.reducer;
