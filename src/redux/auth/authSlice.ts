import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { string } from 'prop-types';
import { GetUser } from './authActions';

export interface imagesModel {
  height: number | null;
  url: string | null;
  width: string | null;
}

interface authModel {
  access_token: string | null;
  display_name: string | null;
  images: imagesModel[];
  id: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  message: any;
}

const initialState: authModel = {
  access_token: null,
  display_name: null,
  images: [],
  id: null,
  isLoggedIn: false,
  isError: false,
  isLoading: false,
  message: null,
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
      state.isLoggedIn = initialState.isLoggedIn;
      state.images = initialState.images;
      state.isError = initialState.isError;
      state.isLoading = initialState.isLoading;
      state.message = initialState.message;
      state.display_name = initialState.display_name;
      state.id = initialState.id;
    },
  },
  extraReducers(builder) {
    builder.addCase(GetUser.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
    });
    builder.addCase(GetUser.fulfilled, (state, action) => {
      state.display_name = action.payload.display_name;
      state.images = action.payload.images;
      state.id = action.payload.id;
      state.isLoading = false;
      localStorage.setItem('userId', action.payload.id);
    });
    builder.addCase(GetUser.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload;
    });
  },
});

export const { setUser, defaultState } = authSlice.actions;

export default authSlice.reducer;
