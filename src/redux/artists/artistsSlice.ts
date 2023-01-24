import { createSlice } from '@reduxjs/toolkit';
import { artist, SearchArtists, GetArtist } from './artistsActions';

interface ArtistsModel {
  searchedArtists: artist[];
  artist: artist | null;
  isLoading: boolean;
  isError: boolean;
  message: any;
}

const initialState: ArtistsModel = {
  searchedArtists: [],
  artist: null,
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
  },
});

export const { defaultArtists } = artistsSlice.actions;

export default artistsSlice.reducer;
