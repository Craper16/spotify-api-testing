import { createSlice } from '@reduxjs/toolkit';
import {
  artist,
  SearchArtists,
  GetArtist,
  artistTopTrack,
  artistAlbums,
  GetArtistAlbums,
  GetArtistTopTracks,
  GetArtistRelatedArtists,
} from './artistsActions';

interface ArtistsModel {
  searchedArtists: artist[];
  artist: artist | null;
  artistTopTracks: artistTopTrack[];
  artistRelatedArtists: artist[];
  artistAlbums: artistAlbums[];
  isLoading: boolean;
  isError: boolean;
  message: any;
}

const initialState: ArtistsModel = {
  searchedArtists: [],
  artist: null,
  artistTopTracks: [],
  artistRelatedArtists: [],
  artistAlbums: [],
  isLoading: false,
  isError: false,
  message: null,
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    defaultArtists: (state) => {
      state.searchedArtists = initialState.searchedArtists;
      state.artist = initialState.artist;
      state.artistTopTracks = initialState.artistTopTracks;
      state.artistAlbums = initialState.artistAlbums;
      state.artistRelatedArtists = initialState.artistRelatedArtists;
      state.isError = initialState.isError;
      state.isLoading = initialState.isLoading;
      state.message = initialState.message;
    },
  },
  extraReducers(builder) {
    builder.addCase(SearchArtists.pending, (state) => {
      state.isLoading = true;
      state.message = null;
      state.isError = false;
    });
    builder.addCase(SearchArtists.fulfilled, (state, action) => {
      state.searchedArtists = [...action.payload];
      state.isError = false;
      state.isLoading = false;
      state.message = null;
    });
    builder.addCase(SearchArtists.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.error || action.payload;
    });
    builder.addCase(GetArtist.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
      state.message = null;
    });
    builder.addCase(GetArtist.fulfilled, (state, action) => {
      state.artist = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.message = null;
    });
    builder.addCase(GetArtist.rejected, (state, action) => {
      state.isError = true;
      state.message = action.error || action.payload;
      state.isLoading = false;
    });
    builder.addCase(GetArtistAlbums.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
    });
    builder.addCase(GetArtistAlbums.fulfilled, (state, action) => {
      state.artistAlbums = [...action.payload];
      state.isLoading = false;
      state.isError = false;
      state.message = null;
    });
    builder.addCase(GetArtistAlbums.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.error || action.payload;
    });
    builder.addCase(GetArtistTopTracks.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
      state.message = null;
    });
    builder.addCase(GetArtistTopTracks.fulfilled, (state, action) => {
      state.artistTopTracks = [...action.payload];
      state.isLoading = false;
      state.isError = false;
      state.message = null;
    });
    builder.addCase(GetArtistTopTracks.rejected, (state, action) => {
      state.isError = true;
      state.message = action.error || action.payload;
      state.isLoading = false;
    });
    builder.addCase(GetArtistRelatedArtists.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
    });
    builder.addCase(GetArtistRelatedArtists.fulfilled, (state, action) => {
      state.artistRelatedArtists = [...action.payload];
      state.isLoading = false;
      state.isError = false;
      state.message = null;
    });
    builder.addCase(GetArtistRelatedArtists.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.error || action.payload;
    });
  },
});

export const { defaultArtists } = artistsSlice.actions;

export default artistsSlice.reducer;
