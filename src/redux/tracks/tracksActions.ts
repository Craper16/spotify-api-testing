import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchTracks } from '../../config/search/searchConfig';

export interface track {
  album: {
    album_type: string;
    artists: {
      external_urls: { spotify: string };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    id: string;
    images: { height: number; url: string; width: number }[];
    href: string;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  artists: {
    external_urls: { spotify: string };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
  duration_ms: number;
  explicit: boolean;
  id: string;
  name: string;
  popularity: number;
}

export const SearchTracks = createAsyncThunk(
  'search/tracks',
  async (search: string, thunkAPI) => {
    try {
      const response = await searchTracks(search);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          response?.error || 'An error has occured'
        );
      }

      const data: track[] = response.data.tracks.items;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'An error has occured');
    }
  }
);
