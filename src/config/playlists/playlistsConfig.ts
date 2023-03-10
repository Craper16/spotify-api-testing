import { instance } from '../config';

export interface createPlaylistData {
  name: string;
  description: string;
  public: boolean;
}

export interface trackToDelete {
  uri: string;
  positions: number[];
}

export const getCurrentUserPlaylists = async (limit: number) => {
  const access_token = localStorage.getItem('access_token');
  return await instance
    .get(`/me/playlists`, {
      params: { limit: limit },
      headers: { Authorization: `Bearer ${access_token}` },
    })
    .then((response) => response)
    .catch((error) => error || 'An Error has occured');
};

export const getPlaylist = async (playlistId: string) => {
  const access_token = localStorage.getItem('access_token');

  return await instance
    .get(`/playlists/${playlistId}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    })
    .then((response) => response)
    .catch((error) => error || 'An Error has occured');
};

export const createUserPlayList = async (data: createPlaylistData) => {
  const access_token = localStorage.getItem('access_token');
  const userId = localStorage.getItem('userId');

  if (!access_token) {
    return console.log('No Access Token');
  }

  if (!userId) {
    return console.log('Could not fetch userId');
  }

  return await instance
    .post(`/users/${userId}/playlists`, data, {
      headers: { Authorization: `Bearer ${access_token}` },
    })
    .then((response) => response)
    .catch((error) => error || 'An Error has occured');
};

export const addTrackToPlaylist = async (
  playlistId: string,
  trackId: string
) => {
  const access_token = localStorage.getItem('access_token');

  return await instance
    .post(
      `/playlists/${playlistId}/tracks?uris=spotify%3Atrack%3A${trackId}`,
      trackId,
      { headers: { Authorization: `Bearer ${access_token}` } }
    )
    .then((response) => response)
    .catch((error) => error || 'An error has occured');
};

export const removeTracksFromPlaylist = async (
  playlistId: string,
  data: trackToDelete[]
) => {
  const access_token = localStorage.getItem('access_token');

  return await instance
    .delete(`/playlists/${playlistId}/tracks`, {
      headers: { Authorization: `Bearer ${access_token}` },
      data: { tracks: data },
    })
    .then((response) => response)
    .catch((error) => error || 'An Error has occured');
};
