import { instance } from '../config';

export const getUser = async () => {
  const access_token = localStorage.getItem('access_token');

  return await instance
    .get('/me', { headers: { Authorization: `Bearer ${access_token}` } })
    .then((response) => response)
    .catch(
      (error) => error|| 'An Error has occured'
    );
};
