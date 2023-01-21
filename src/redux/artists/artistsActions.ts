import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArtists } from '../../config/artists/artistsConfig';

export interface artists {
  external_urls: { spotify: string };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface responseItems {
  album_group: string;
  album_type: string;
  artists: artists[];
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: { height: number; url: string; width: string }[];
  release_date: string;
  release_date_percision: string;
  total_tracks: number;
  type: string;
  uri: string;
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

      const data: responseItems[] = response.data.items;
      console.log(data);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'An error has occured');
    }
  }
);
