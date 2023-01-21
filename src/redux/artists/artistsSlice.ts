import { createSlice } from '@reduxjs/toolkit';
import { FetchArtists, responseItems } from './artistsActions';

interface artistsModel {
  artistData: responseItems[];
  isLoading: boolean;
  isError: boolean;
  message: any;
}

const initialState: artistsModel = {
  artistData: [],
  isLoading: false,
  isError: false,
  message: null,
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    defaultArtists: (state) => {
      state.artistData = initialState.artistData;
      state.isError = initialState.isError;
      state.isLoading = initialState.isLoading;
      state.message = initialState.message;
    },
  },
  extraReducers(builder) {
    builder.addCase(FetchArtists.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null;
    });
    builder.addCase(FetchArtists.fulfilled, (state, action) => {
      state.artistData = [...state.artistData, ...action.payload];
      state.isError = false;
      state.isLoading = false;
      state.message = null;
    });
    builder.addCase(FetchArtists.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload;
    });
  },
});

export const { defaultArtists } = artistsSlice.actions;

export default artistsSlice.reducer;
