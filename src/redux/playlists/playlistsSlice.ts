import { createSlice } from '@reduxjs/toolkit';
import { GetUserPlaylists, playlist } from './playlistsActions';

interface playlistsModel {
  playlists: playlist[];
  isLoading: boolean;
  isError: boolean;
  message: any;
}

const initialState: playlistsModel = {
  playlists: [],
  isLoading: false,
  isError: false,
  message: null,
};

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    defaultPlaylists: (state) => {
      state.playlists = initialState.playlists;
      state.isLoading = initialState.isLoading;
      state.isError = initialState.isError;
      state.message = initialState.message;
    },
  },
  extraReducers(builder) {
    builder.addCase(GetUserPlaylists.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
    });
    builder.addCase(GetUserPlaylists.fulfilled, (state, action) => {
      state.playlists = [...action.payload];
      state.isLoading = false;
      state.isError = false;
      state.message = null;
    });
    builder.addCase(GetUserPlaylists.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.error;
    });
  },
});

export const { defaultPlaylists } = playlistsSlice.actions;

export default playlistsSlice.reducer;
