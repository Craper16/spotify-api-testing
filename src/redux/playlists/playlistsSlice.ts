import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GetCurrentUserPlaylists,
  playlist,
  CreateUserPlaylist,
  GetPlaylist,
  playlistData,
  RemoveTrackFromPlaylist,
} from './playlistsActions';

interface playlistsModel {
  playlists: playlist[];
  playlist: playlistData | null;
  filteredPlaylists: playlist[];
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  message: any;
}

const initialState: playlistsModel = {
  playlists: [],
  playlist: null,
  filteredPlaylists: [],
  isSuccess: false,
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
      state.isSuccess = initialState.isSuccess;
      state.playlist = initialState.playlist;
      state.isError = initialState.isError;
      state.message = initialState.message;
    },
    resetIsSuccess: (state) => {
      state.isSuccess = initialState.isSuccess;
    },
    filterPlaylists: (state, action: PayloadAction<string>) => {
      state.filteredPlaylists = state.playlists.filter((playlist) =>
        playlist.name.includes(action.payload)
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(GetCurrentUserPlaylists.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
    });
    builder.addCase(GetCurrentUserPlaylists.fulfilled, (state, action) => {
      state.playlists = [...action.payload];
      state.isLoading = false;
      state.isError = false;
      state.message = null;
    });
    builder.addCase(GetCurrentUserPlaylists.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload || action.error;
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
      state.message = action.payload || action.error;
    });
    builder.addCase(CreateUserPlaylist.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
      state.isSuccess = false;
    });
    builder.addCase(CreateUserPlaylist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.playlists = [action.payload!, ...state.playlists];
      state.isSuccess = true;
      state.isError = false;
      state.message = null;
    });
    builder.addCase(CreateUserPlaylist.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload || action.error;
    });
    builder.addCase(RemoveTrackFromPlaylist.pending, (state) => {
      state.isError = false;
      state.message = null;
    });
    builder.addCase(RemoveTrackFromPlaylist.fulfilled, (state) => {
      state.isError = false;
      state.message = null;
      state.isSuccess = true;
    });
    builder.addCase(RemoveTrackFromPlaylist.rejected, (state, action) => {
      state.isError = true;
      state.message = action.payload || action.error;
    });
  },
});

export const { defaultPlaylists, filterPlaylists, resetIsSuccess } =
  playlistsSlice.actions;

export default playlistsSlice.reducer;
