import { instance } from '../config';

export const getArtist = async (artistId: string) => {
  const access_token = localStorage.getItem('access_token');

  return await instance
    .get(`/artists/${artistId}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => error?.error?.message || 'An Error has occured');
};

export const getArtistAlbums = async (artistId: string) => {
  const access_token = localStorage.getItem('access_token');

  return await instance
    .get(`/artists/${artistId}/albums`, {
      headers: { Authorization: `Bearer ${access_token}` },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => error?.error?.message || 'An error has occured');
};

export const getAritstTopTracks = async (artistId: string) => {
  const access_token = localStorage.getItem('access_token');

  return await instance
    .get(`/artists/${artistId}/top-tracks?market=US`, {
      headers: { Authorization: `Bearer ${access_token}` },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => error?.error?.message || 'An error has occured');
};

export const getArtistRelatedArtists = async (artistId: string) => {
  const access_token = localStorage.getItem('access_token');

  return await instance
    .get(`/artists/${artistId}/related-artists`, {
      headers: { Authorization: `Bearer ${access_token}` },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => error?.error?.message || 'An error has occured');
};
