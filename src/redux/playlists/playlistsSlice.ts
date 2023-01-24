import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GetUserPlaylists,
  playlist,
  CreateUserPlaylist,
  GetPlaylist,
  playlistData,
} from './playlistsActions';

interface playlistsModel {
  playlists: playlist[];
  playlist: playlistData | null;
  filteredPlaylists: playlist[];
  isLoading: boolean;
  isError: boolean;
  message: any;
}

const initialState: playlistsModel = {
  playlists: [],
  playlist: null,
  filteredPlaylists: [],
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
      state.filteredPlaylists = initialState.filteredPlaylists;
      state.playlist = initialState.playlist;
      state.isError = initialState.isError;
      state.message = initialState.message;
    },
    filterPlaylists: (state, action: PayloadAction<string>) => {
      state.filteredPlaylists = state.playlists.filter((playlist) =>
        playlist.name.includes(action.payload)
      );
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
    builder.addCase(GetPlaylist.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
    });
    builder.addCase(GetPlaylist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.playlist = action.payload;
      state.isError = false;
      state.message = null;
    });
    builder.addCase(GetPlaylist.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.error;
    });
    builder.addCase(CreateUserPlaylist.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
    });
    builder.addCase(CreateUserPlaylist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.playlists = [action.payload, ...state.playlists];
      state.isError = false;
      state.message = null;
    });
    builder.addCase(CreateUserPlaylist.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.error;
    });
  },
});

export const { defaultPlaylists, filterPlaylists } = playlistsSlice.actions;

export default playlistsSlice.reducer;
