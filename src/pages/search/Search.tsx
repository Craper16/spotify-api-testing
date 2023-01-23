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
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Artists from '../../components/navigationbar/Artists/Artists';
import { searchTracks } from '../../config/search/searchConfig';
import { colors } from '../../helpers/consts';
import { SearchArtists } from '../../redux/artists/artistsActions';
import { defaultArtists } from '../../redux/artists/artistsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

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

  useEffect(() => {
    if (search) {
      dispatch(SearchArtists(search));
    }
  }, [search, dispatch]);

  useEffect(() => {
    if (!search) {
      dispatch(defaultArtists());
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
              external_urls={artist.external_urls}
              followers={artist.followers}
              genres={artist.genres}
              id={artist.id}
              popularity={artist.popularity}
              type={artist.type}
              uri={artist.uri}
            />
          ))
        : null}
    </>
  );
}
