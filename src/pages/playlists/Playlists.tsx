import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { GetCurrentUserPlaylists } from '../../redux/playlists/playlistsActions';
import { colors } from '../../helpers/consts';
import { useNavigate } from 'react-router';
import { filterPlaylists } from '../../redux/playlists/playlistsSlice';
import {
  CREATE_PLAYLIST,
  PLAYLIST_DETAILS,
  PLAYLIST_DETAILS_FN,
} from '../../helpers/pathsConsts';
import PlaylistsItem from '../../components/Playlists/Playlists';
import { CloseIcon, SearchIcon } from '@chakra-ui/icons';

export default function Playlists() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const { playlists, filteredPlaylists, isError, message } = useAppSelector(
    (state) => state.playlists
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    dispatch(filterPlaylists(text));
  };

  const getPlaylists = useCallback(() => {
    dispatch(GetCurrentUserPlaylists(50));
  }, [dispatch]);

  useEffect(() => {
    getPlaylists();
  }, [getPlaylists]);

  return (
    <div>
      <Button
        background={colors.primary}
        onClick={() => navigate(CREATE_PLAYLIST)}
      >
        Create Playlist
      </Button>
      <InputGroup
        style={{ margin: 'auto', width: '50%', justifyContent: 'center' }}
      >
        <InputLeftElement children={<SearchIcon color={colors.primary} />} />
        <Input
          type='text'
          textColor={colors.primary}
          borderColor={colors.primary}
          focusBorderColor={colors.primary}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <InputRightElement
          children={
            search ? (
              <CloseIcon color={colors.primary} onClick={() => setSearch('')} />
            ) : null
          }
        />
      </InputGroup>
      {search && filteredPlaylists.length === 0 && (
        <Text
          color={colors.primary}
          textAlign='center'
        >{`Could not find "${search}"`}</Text>
      )}
      {search
        ? filteredPlaylists.map((playlist) => (
            <PlaylistsItem
              key={playlist.id}
              creator={playlist.owner.display_name}
              images={playlist.images}
              name={playlist.name}
              tracks={playlist.tracks.total}
              onClick={() => navigate(PLAYLIST_DETAILS_FN(playlist.id))}
            />
          ))
        : playlists.map((playlist) => (
            <PlaylistsItem
              onClick={() => navigate(PLAYLIST_DETAILS_FN(playlist.id))}
              key={playlist.id}
              creator={playlist.owner.display_name}
              images={playlist.images}
              name={playlist.name}
              tracks={playlist.tracks.total}
            />
          ))}
      {isError && <Text color='tomato'>{message || message.message}</Text>}
    </div>
  );
}
