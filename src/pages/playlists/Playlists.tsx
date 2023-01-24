import React, { useCallback, useEffect, useState } from 'react';
import { Button, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { GetUserPlaylists } from '../../redux/playlists/playlistsActions';
import { colors } from '../../helpers/consts';
import { useNavigate } from 'react-router';
import { CREATE_PLAYLIST } from '../../helpers/pathsConsts';
import PlaylistsItem from '../../components/Playlists/Playlists';

export default function Playlists() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [limit, setLimit] = useState(20);

  const { playlists } = useAppSelector((state) => state.playlists);

  const getPlaylists = useCallback(() => {
    dispatch(GetUserPlaylists(limit));
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
          <PlaylistsItem
            key={playlist.id}
            creator={playlist.owner.display_name}
            images={playlist.images}
            name={playlist.name}
            tracks={playlist.tracks.total}
          />
        ))}
    </div>
  );
}
