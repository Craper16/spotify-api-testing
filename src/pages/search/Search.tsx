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
import Artists from '../../components/Artists/Artists';
import Tracks from '../../components/Tracks/Tracks';
import { colors } from '../../helpers/consts';
import { SearchArtists } from '../../redux/artists/artistsActions';
import { defaultArtists } from '../../redux/artists/artistsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { SearchTracks } from '../../redux/tracks/tracksActions';
import { defaultTracks } from '../../redux/tracks/tracksSlice';

enum SearchType {
  artist = 'Artists',
  tracks = 'Tracks',
}

export default function Search() {
  const dispatch = useAppDispatch();

  const [searchType, setSearchType] = useState<SearchType>(SearchType.artist);
  const [search, setSearch] = useState('');

  const { searchedArtists, isError, isLoading, message } = useAppSelector(
    (state) => state.artists
  );

  const { searchedTracks } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    if (search && searchType === SearchType.artist) {
      dispatch(SearchArtists(search));
    }
  }, [search, dispatch]);

  useEffect(() => {
    if (search && searchType === SearchType.tracks) {
      dispatch(SearchTracks(search));
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
              type='text'
              textColor={colors.primary}
              borderColor={colors.primary}
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
      {isLoading && (
        <Spinner
          size='lg'
          justifyContent='center'
          marginTop={20}
          alignItems='center'
          marginLeft='50%'
          color={colors.primary}
        />
      )}
      {searchedArtists.length !== 0
        ? searchedArtists.map((artist) => (
            <Artists
              key={artist.id}
              images={artist.images}
              name={artist.name}
              followers={artist.followers}
              popularity={artist.popularity}
            />
          ))
        : null}
      {searchedTracks.length !== 0
        ? searchedTracks.map((track) => (
            <Tracks
              key={track.id}
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
        (searchedTracks.length === 0 || searchedArtists.length === 0) && (
          <Text
            style={{
              textAlign: 'center',
              color: colors.primary,
              marginTop: 23,
            }}
          >{`Couldnt find "${search}"`}</Text>
        )}
      {isError && (
        <Text style={{ textAlign: 'center', color: 'tomato', marginTop: 23 }}>
          {message.message}
        </Text>
      )}
    </>
  );
}
