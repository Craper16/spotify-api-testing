import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAritstTopTracks,
  getArtist,
  getArtistAlbums,
  getArtistRelatedArtists,
} from '../../config/artists/artistsConfig';
import { searchArtists } from '../../config/search/searchConfig';

export interface artistTopTrack {
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
    external_urls: { spotify: string };
    href: string;
    id: string;
    images: {
      height: number | null;
      url: string | null;
      width: number | null;
    }[];
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
  id: string;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  track_number: number;
  type: string;
}

export interface artistAlbums {
  album_group: string;
  album_type: string;
  artists: {
    external_urls: { spotify: string };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: { height: number | null; url: string | null; width: number | null }[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface artist {
  external_urls: { spotify: string };
  id: string;
  name: string;
  genres: string[];
  href: string;
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

export const GetArtist = createAsyncThunk(
  'artists/artist',
  async (artistId: string, thunkAPI) => {
    try {
      const response = await getArtist(artistId);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          response?.error.message || 'An error has occured'
        );
      }

      const data: artist = response?.data;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'An error has occured');
    }
  }
);

export const GetArtistAlbums = createAsyncThunk(
  '/artists/artist/albums',
  async (artistId: string, thunkAPI) => {
    try {
      const response = await getArtistAlbums(artistId);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          response?.error.message || 'An error has occured'
        );
      }

      const data: artistAlbums[] = response?.data.items;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'An error has occured');
    }
  }
);

export const GetArtistTopTracks = createAsyncThunk(
  '/artists/artist/top-tracks',
  async (artistId: string, thunkAPI) => {
    try {
      const response = await getAritstTopTracks(artistId);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          response?.error.message || 'An error has occured'
        );
      }
      const data: artistTopTrack[] = response?.data?.tracks;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'An error has occured');
    }
  }
);

export const GetArtistRelatedArtists = createAsyncThunk(
  '/artists/artist/related-artist',
  async (artistId: string, thunkAPI) => {
    try {
      const response = await getArtistRelatedArtists(artistId);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          response?.error.message || 'An error has occured'
        );
      }
      const data: artist[] = response?.data?.artists;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'An error has occured');
    }
  }
);
