import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  SimpleGrid,
  Button,
  Box,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Artists from '../../components/Artists/Artists';
import Tracks from '../../components/Tracks/Tracks';
import { colors } from '../../helpers/consts';
import { ARTIST_DETAILS_FN } from '../../helpers/pathsConsts';
import { SearchArtists } from '../../redux/artists/artistsActions';
import { defaultArtists } from '../../redux/artists/artistsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { GetCurrentUserPlaylists } from '../../redux/playlists/playlistsActions';
import { SearchTracks } from '../../redux/tracks/tracksActions';
import { defaultTracks } from '../../redux/tracks/tracksSlice';

enum SearchType {
  artist = 'Artists',
  tracks = 'Tracks',
}

export default function Search() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchType, setSearchType] = useState<SearchType>(SearchType.artist);
  const [search, setSearch] = useState('');

  const { searchedArtists, isError, isLoading, message } = useAppSelector(
    (state) => state.artists
  );

  const { playlists } = useAppSelector((state) => state.playlists);

  const { searchedTracks } = useAppSelector((state) => state.tracks);
  const trackLoading = useAppSelector((state) => state.tracks.isLoading);
  const trackIsError = useAppSelector((state) => state.tracks.isError);
  const trackMessage = useAppSelector((state) => state.tracks.message);

  useEffect(() => {
    if (search && searchType === SearchType.artist) {
      dispatch(SearchArtists(search));
      dispatch(GetCurrentUserPlaylists(50));
    }
  }, [search, dispatch]);

  useEffect(() => {
    if (search && searchType === SearchType.tracks) {
      dispatch(SearchTracks(search));
      dispatch(GetCurrentUserPlaylists(50));
    }
  }, [search]);

  useEffect(() => {
    if (!search) {
      dispatch(defaultArtists());
      dispatch(defaultTracks());
    }
  }, [search, dispatch]);

  return (
    <>
      <SimpleGrid
        columns={1}
        spacing={1}
        style={{
          justifyContent: 'center',
          margin: 'auto',
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <Box margin={7}>
          <Button
            style={{ width: 300 }}
            background={colors.primary}
            textColor={colors.secondary}
            onClick={() =>
              searchType === SearchType.artist
                ? setSearchType(SearchType.tracks)
                : setSearchType(SearchType.artist)
            }
          >{`Searching for ${searchType}`}</Button>
        </Box>
        <Box>
          <InputGroup
            style={{ margin: 'auto', width: '50%', justifyContent: 'center' }}
          >
            <InputLeftElement
              children={<SearchIcon color={colors.primary} />}
            />
            <Input
              type="text"
              textColor={colors.primary}
              borderColor={colors.primary}
              focusBorderColor={colors.primary}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement
              children={
                search ? (
                  <CloseIcon
                    color={colors.primary}
                    onClick={() => setSearch('')}
                  />
                ) : null
              }
            />
          </InputGroup>
        </Box>
      </SimpleGrid>
      {isLoading ||
        (trackLoading && (
          <Spinner
            size="lg"
            justifyContent="center"
            marginTop={20}
            alignItems="center"
            marginLeft="50%"
            color={colors.primary}
          />
        ))}
      {searchedArtists.length !== 0 && search
        ? searchedArtists.map((artist) => (
            <Artists
              key={artist.id}
              onClick={() => navigate(ARTIST_DETAILS_FN(artist.id))}
              images={artist.images}
              name={artist.name}
              followers={artist.followers}
              popularity={artist.popularity}
            />
          ))
        : null}
      {searchedTracks.length !== 0 && search
        ? searchedTracks.map((track) => (
            <Tracks
              key={track.id}
              onGoToArtist={() =>
                navigate(ARTIST_DETAILS_FN(track.artists[0].id))
              }
              trackId={track.id}
              playlists={playlists}
              artist={track.album.artists[0].name}
              duration={track.duration_ms}
              explicit={track.explicit}
              images={track.album.images}
              name={track.name}
              popularity={track.popularity}
            />
          ))
        : null}
      {search &&
        ((searchedTracks.length === 0 && searchType === SearchType.tracks) ||
          (searchedArtists.length === 0 &&
            searchType === SearchType.artist)) && (
          <Text
            style={{
              textAlign: 'center',
              color: colors.primary,
              marginTop: 23,
            }}
          >{`Couldnt find "${search}"`}</Text>
        )}
      {isError ||
        (trackIsError && (
          <Text style={{ textAlign: 'center', color: 'tomato', marginTop: 23 }}>
            {message || trackMessage || message.message || trackMessage.message}
          </Text>
        ))}
    </>
  );
}
