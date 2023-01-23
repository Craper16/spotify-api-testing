import { createSlice } from '@reduxjs/toolkit';
import { artist, SearchArtists } from './artistsActions';

interface ArtistsModel {
  searchedArtists: artist[];
  isLoading: boolean;
  isError: boolean;
  message: any;
}

const initialState: ArtistsModel = {
  searchedArtists: [],
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
  },
});

export const { defaultArtists } = artistsSlice.actions;

export default artistsSlice.reducer;
