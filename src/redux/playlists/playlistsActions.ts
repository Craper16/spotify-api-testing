import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCurrentUserPlaylists,
  createUserPlayList,
  createPlaylistData,
  getPlaylist,
  trackToDelete,
  removeTracksFromPlaylist,
} from '../../config/playlists/playlistsConfig';
import { track } from '../tracks/tracksActions';

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

interface trackData {
  added_at: string;
  added_by: { external_urls: { spotify: string }; href: string; id: string };
  is_local: boolean;
  track: track;
}

export interface playlistData {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  followers: { href: string | null; total: number };
  href: string;
  id: string;
  images: { height: number | null; url: string | null; width: number | null }[];
  name: string;
  owner: { display_name: string; id: string };
  public: boolean;
  tracks: { href: string; items: trackData[]; total: number };
}

export const GetCurrentUserPlaylists = createAsyncThunk(
  'playlists/get',
  async (limit: number, thunkAPI) => {
    try {
      const response = await getCurrentUserPlaylists(limit);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          response?.response?.data?.error?.message || 'An error has occured'
        );
      }

      const data: playlist[] = response.data.items;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'An error has occured');
    }
  }
);

export const GetPlaylist = createAsyncThunk(
  'playlists/playlist',
  async (playlistId: string, thunkAPI) => {
    try {
      const response = await getPlaylist(playlistId);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          response?.response?.data?.error?.message || 'An Error has occured'
        );
      }

      const data: playlistData = response.data;
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
          response?.response?.data?.error?.message || 'An Error has occured'
        );
      }
      const data: playlist = response.data;
      return data;
    } catch (error: any) {}
  }
);

export const RemoveTrackFromPlaylist = createAsyncThunk(
  'playlists/delete-track',
  async (
    deletedTracks: { data: trackToDelete[]; playlistId: string },
    thunkAPI
  ) => {
    try {
      const response = await removeTracksFromPlaylist(
        deletedTracks.playlistId,
        deletedTracks.data
      );
      console.log(response);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          response?.response?.data?.error?.message || 'An error has occured'
        );
      }
      return deletedTracks;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'An error has occured');
    }
  }
);
