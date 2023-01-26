import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Link,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { colors } from '../../helpers/consts';
import { ARTIST_DETAILS_FN } from '../../helpers/pathsConsts';
import {
  GetArtist,
  GetArtistAlbums,
  GetArtistRelatedArtists,
  GetArtistTopTracks,
} from '../../redux/artists/artistsActions';
import { defaultArtists } from '../../redux/artists/artistsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export default function ArtistDetails() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { artistId } = useParams();

  const [showAllTracks, setShowAllTracks] = useState(false);
  const [showAllAlbums, setShowAllAlbums] = useState(false);
  const [showAllRelatedArtists, setShowAllRelatedArtists] = useState(false);

  const {
    artist,
    artistAlbums,
    artistRelatedArtists,
    artistTopTracks,
    isError,
    isLoading,
    message,
  } = useAppSelector((state) => state.artists);

  const tracksToShow = showAllTracks
    ? artistTopTracks
    : artistTopTracks.slice(0, 5);

  const albumsToShow = showAllAlbums ? artistAlbums : artistAlbums.slice(0, 10);

  const relatedArtistsToShow = showAllRelatedArtists
    ? artistRelatedArtists
    : artistRelatedArtists.slice(0, 5);

  useEffect(() => {
    if (artistId) {
      dispatch(GetArtist(artistId));
      dispatch(GetArtistAlbums(artistId));
      dispatch(GetArtistTopTracks(artistId));
      dispatch(GetArtistRelatedArtists(artistId));
    }
  }, [dispatch, artistId]);

  if (isError) {
    return (
      <Text textAlign='center' color='tomato'>
        {message || message.message}
      </Text>
    );
  }

  return (
    <>
      {!isLoading && (
        <Grid
          marginTop={4}
          h='200px'
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(5, 1fr)'
          gap={4}
          bg={colors.primary}
        >
          <GridItem rowSpan={2} colSpan={1}>
            <Image src={artist?.images[0].url || undefined} />
          </GridItem>
          <GridItem
            colSpan={2}
            textAlign='center'
            marginTop='30px'
            fontSize={30}
            fontWeight='bold'
            color={colors.secondary}
          >
            {artist?.name}
          </GridItem>
          <GridItem
            colSpan={2}
            textAlign='center'
            marginTop='30px'
            fontSize={30}
            fontWeight='bold'
            color={colors.secondary}
          >{`Followers: ${artist?.followers.total}`}</GridItem>
          <GridItem
            colSpan={4}
            textAlign='center'
            marginTop='30px'
            fontSize={20}
            fontWeight='bold'
            color={colors.secondary}
          >
            <Link
              isExternal
              margin={2}
              href={`${artist?.external_urls.spotify}`}
            >
              Open In Spotify
            </Link>
            {`Genres: ${artist?.genres.map((genre) => `${genre}`)}`}
          </GridItem>
        </Grid>
      )}
      <Text
        margin={10}
        marginTop={50}
        color={colors.primary}
        fontWeight='bold'
        textAlign='center'
      >
        Top Tracks
      </Text>
      <Button
        marginLeft='80%'
        alignItems='flex-end'
        justifyContent='flex-end'
        variant='unstyled'
        leftIcon={showAllTracks ? <ChevronUpIcon /> : <ChevronDownIcon />}
        onClick={() =>
          setShowAllTracks((prevShowAllTracks) => !prevShowAllTracks)
        }
        textColor={colors.primary}
      >
        {showAllTracks ? 'View Less' : 'View All'}
      </Button>
      <SimpleGrid columns={5} marginTop={3}>
        {tracksToShow.map((track) => (
          <Box key={track.id}>
            <Text color={colors.primary} noOfLines={1}>
              {track.name}
            </Text>
            <Image
              boxSize='100px'
              src={track.album.images[0].url || undefined}
            />
          </Box>
        ))}
      </SimpleGrid>
      <Text
        margin={10}
        color={colors.primary}
        fontWeight='bold'
        textAlign='center'
      >
        Artist Albums
      </Text>
      <Button
        marginLeft='80%'
        alignItems='flex-end'
        justifyContent='flex-end'
        variant='unstyled'
        leftIcon={showAllAlbums ? <ChevronUpIcon /> : <ChevronDownIcon />}
        onClick={() =>
          setShowAllAlbums((prevShowAllAlbums) => !prevShowAllAlbums)
        }
        textColor={colors.primary}
      >
        {showAllAlbums ? 'View Less' : 'View All'}
      </Button>
      <SimpleGrid columns={5} marginTop={3}>
        {albumsToShow.map((album, i) =>
          album.album_type === 'album' &&
          album.name !== artistAlbums[(i === 0 ? 1 : i) - 1].name ? (
            <div key={album.id}>
              <Text color={colors.primary}>{album.name}</Text>
              <Image boxSize='100px' src={album.images[0].url || undefined} />
            </div>
          ) : null
        )}
      </SimpleGrid>
      <Text
        margin={10}
        color={colors.primary}
        fontWeight='bold'
        textAlign='center'
      >
        Related Artists
      </Text>
      <Button
        marginLeft='80%'
        alignItems='flex-end'
        justifyContent='flex-end'
        variant='unstyled'
        leftIcon={
          showAllRelatedArtists ? <ChevronUpIcon /> : <ChevronDownIcon />
        }
        onClick={() =>
          setShowAllRelatedArtists(
            (prevShowAllRelatedArtists) => !prevShowAllRelatedArtists
          )
        }
        textColor={colors.primary}
      >
        {showAllAlbums ? 'View Less' : 'View All'}
      </Button>
      <SimpleGrid columns={5} marginBottom={30}>
        {relatedArtistsToShow.map((artist) => (
          <div
            key={artist.id}
            onClick={() => navigate(ARTIST_DETAILS_FN(artist.id))}
          >
            <Text color={colors.primary}>{artist.name}</Text>
            <Image boxSize='100px' src={artist.images[0].url || undefined} />
          </div>
        ))}
      </SimpleGrid>
    </>
  );
}
