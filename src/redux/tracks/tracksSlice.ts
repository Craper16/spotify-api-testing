import { createSlice } from '@reduxjs/toolkit';
import { SearchTracks, track } from './tracksActions';

interface tracksModel {
  searchedTracks: track[];
  isLoading: boolean;
  isError: boolean;
  message: any;
}

const initialState: tracksModel = {
  searchedTracks: [],
  isError: false,
  isLoading: false,
  message: null,
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    defaultTracks: (state) => {
      state.searchedTracks = initialState.searchedTracks;
      state.isLoading = initialState.isLoading;
      state.isError = initialState.isError;
      state.message = initialState.message;
    },
  },
  extraReducers(builder) {
    builder.addCase(SearchTracks.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
    });
    builder.addCase(SearchTracks.fulfilled, (state, action) => {
      state.searchedTracks = [...action.payload];
      state.isError = false;
      state.isLoading = false;
      state.message = null;
    });
    builder.addCase(SearchTracks.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload || action.error;
    });
  },
});

export const { defaultTracks } = tracksSlice.actions;

export default tracksSlice.reducer;
