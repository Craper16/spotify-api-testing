import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserPlaylists,
  createUserPlayList,
  createPlaylistData,
} from '../../config/playlists/playlistsConfig';

export interface playlist {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: { width: number | null; url: string | null; height: number | null }[];
  name: string;
  owner: { display_name: string; type: string; id: string; href: string };
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: { href: string; total: number };
  type: string;
  uri: string;
}

export const GetUserPlaylists = createAsyncThunk(
  'playlists/get',
  async (undefined, thunkAPI) => {
    try {
      const response = await getUserPlaylists();

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          response.error?.message || 'An error has occured'
        );
      }

      const data: playlist[] = response.data.items;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'An error has occured');
    }
  }
);

export const CreateUserPlaylist = createAsyncThunk(
  'playlists/create',
  async (playlistForm: createPlaylistData, thunkAPI) => {
    try {
      const response = await createUserPlayList(playlistForm);

      if (response.status !== 201) {
        return thunkAPI.rejectWithValue(
          response.error?.message || 'An Error has occured'
        );
      }
      const data: playlist = response.data;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'An error has occured');
    }
  }
);
