import { instance } from '../config';

export const searchArtists = async (search: string) => {
  const access_token = localStorage.getItem('access_token');

  return await instance
    .get('search', {
      params: { q: search, type: 'artist' },
      headers: { Authorization: `Bearer ${access_token}` },
    })
    .then((response) => response)
    .catch((error) => error || 'An Error has occured');
};

export const searchTracks = async (search: string) => {
  const access_token = localStorage.getItem('access_token');

  return await instance
    .get('search', {
      params: { q: search, type: 'track' },
      headers: { Authorization: `Bearer ${access_token}` },
    })
    .then((response) => response)
    .catch((error) => error  || 'An Error has occured');
};
