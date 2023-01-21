import { instance } from '../config';

export const getUser = async () => {
  const access_token = localStorage.getItem('access_token');

  return await instance
    .get('/me', { headers: { Authorization: `Bearer ${access_token}` } })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => error.error?.message || 'An Error has occured');
};

export const getUserPlaylists = async () => {
  const access_token = localStorage.getItem('access_token');
  const userId = localStorage.getItem('userId');
  if (!userId) {
    return 'Could not fetch userId';
  }

  return await instance
    .get(`/users/${userId}/playlists`, {
      headers: { Authorization: `Bearer ${access_token}` },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => error?.error?.message || 'An Error has occured');
};

export const createUserPlayList = async (body: {
  name: string;
  description: string;
  public: boolean;
}) => {
  const access_token = localStorage.getItem('access_token');
  const userId = localStorage.getItem('userId');

  if (!access_token) {
    return console.log('No Access Token');
  }

  if (!userId) {
    return console.log('Could not fetch userId');
  }

  return await instance
    .post(
      `/users/${userId}/playlists`,
      {
        body: body,
      },
      { headers: { Authorization: `Bearer ${access_token}` } }
    )
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => error?.error?.message || 'An Error has occured');
};
