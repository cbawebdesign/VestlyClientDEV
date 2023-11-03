import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/types';

interface UserState {
  user: User | undefined;
  isNewRegistration: boolean;
  isNewUser: boolean;
  fetching: boolean;
}

const initialState: UserState = {
  user: undefined,
  isNewRegistration: false,
  isNewUser: false,
  fetching: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startFetching: state => {
      state.fetching = true;
    },
    stopFetching: state => {
      state.fetching = false;
    },
    auth: (
      state,
      action: PayloadAction<{
        user: User;
        isNewRegistration: boolean;
        isNewUser: boolean;
        publicGameBalance: number;
      }>,
    ) => {
      state.user = action.payload.user;
      state.isNewRegistration = action.payload.isNewRegistration;
      state.isNewUser = action.payload.isNewUser;
    },
    updateUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
    Error: state => {
      state.fetching = false;
    },
  },
});

export const { auth, startFetching, stopFetching, updateUser, Error } =
  userSlice.actions;

export default userSlice.reducer;
