import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authModel {
  access_token: string | null;
  isLoggedIn: boolean;
}

const initialState: authModel = {
  access_token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ access_token: string }>) => {
      state.access_token = action.payload.access_token;
      state.isLoggedIn = state.access_token !== null;
      localStorage.setItem('access_token', action.payload.access_token);
    },
    defaultState: (state) => {
      state.access_token = initialState.access_token;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, defaultState } = authSlice.actions;

export default authSlice.reducer;
