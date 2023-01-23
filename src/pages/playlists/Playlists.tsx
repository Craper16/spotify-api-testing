import React, { useCallback, useEffect } from 'react';
import { Button, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { GetUserPlaylists } from '../../redux/playlists/playlistsActions';
import { colors } from '../../helpers/consts';
import { useNavigate } from 'react-router';
import { CREATE_PLAYLIST } from '../../helpers/pathsConsts';

export default function Playlists() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { playlists } = useAppSelector((state) => state.playlists);

  const getPlaylists = useCallback(() => {
    dispatch(GetUserPlaylists());
  }, [dispatch]);

  useEffect(() => {
    if (playlists.length === 0) getPlaylists();
  }, [getPlaylists]);

  return (
    <div>
      <Button
        background={colors.primary}
        onClick={() => navigate(CREATE_PLAYLIST)}
      >
        Create Playlist
      </Button>
      {playlists.length !== 0 &&
        playlists.map((playlist) => (
          <Text
            key={playlist.id}
            color={colors.primary}
          >
            {playlist.name}
          </Text>
        ))}
    </div>
  );
}
