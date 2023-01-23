import React, { useEffect } from 'react';
import { Text } from '@chakra-ui/react';

import { getUserPlaylists } from '../../config/playlists/playlistsConfig';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { GetUserPlaylists } from '../../redux/playlists/playlistsActions';
import { colors } from '../../helpers/consts';

export default function Playlists() {
  const dispatch = useAppDispatch();

  const { playlists } = useAppSelector((state) => state.playlists);

  console.log(playlists);

  useEffect(() => {
    dispatch(GetUserPlaylists());
  }, [dispatch]);

  return (
    <div>
      {playlists.length !== 0 &&
        playlists.map((playlist) => (
          <Text color={colors.primary}>{playlist.name}</Text>
        ))}
    </div>
  );
}
