import { instance } from '../config';

export const fetchArtists = async (limit: number) => {
  return await instance
    .get(
      `artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=${
        limit || 10
      }`
    )
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => error.message || 'An error has occured');
};
