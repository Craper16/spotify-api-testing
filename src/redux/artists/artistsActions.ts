import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchArtists } from '../../config/search/searchConfig';

export interface artist {
  external_urls: { spotify: string };
  id: string;
  name: string;
  genres: string[];
  followers: { href: null | string; total: number };
  images: { height: number | null; url: string | null; width: number | null }[];
  popularity: number;
  type: string;
  uri: string;
}

export const SearchArtists = createAsyncThunk(
  'search/artists',
  async (search: string, thunkAPI) => {
    try {
      const response = await searchArtists(search);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          response?.error.message || 'An error has occured'
        );
      }

      const data: artist[] = response.data.artists.items;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'An error has occured');
    }
  }
);
