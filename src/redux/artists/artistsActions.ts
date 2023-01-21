import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArtists } from '../../config/artists/artistsConfig';

interface response {
  href: string;
  items: {}[];
}

export const FetchArtists = createAsyncThunk(
  'v1/artists',
  async (limit: number, thunkAPI) => {
    try {
      const response = await fetchArtists(limit);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          response?.error.message || 'An error has occured'
        );
      }

      const data = response.data;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'An error has occured');
    }
  }
);
