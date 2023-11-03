import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  message: string | null;
}

const initialState: ErrorState = {
  message: null,
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    Error: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    closeError: state => {
      state.message = null;
    },
    startFetching: state => {
      state.message = null;
    },
  },
});

export const { Error, closeError, startFetching } = errorSlice.actions;

export default errorSlice.reducer;
