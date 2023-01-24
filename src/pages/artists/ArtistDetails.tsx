import { Grid, GridItem, Image, Link } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getAritstTopTracks,
  getArtistAlbums,
  getArtistRelatedArtists,
} from '../../config/artists/artistsConfig';
import { colors } from '../../helpers/consts';
import { GetArtist } from '../../redux/artists/artistsActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export default function ArtistDetails() {
  const dispatch = useAppDispatch();
  const { artistId } = useParams();

  const { artist, isError, isLoading, message } = useAppSelector(
    (state) => state.artists
  );

  useEffect(() => {
    if (artistId) {
      dispatch(GetArtist(artistId));
      getArtistAlbums(artistId);
      getAritstTopTracks(artistId);
      getArtistRelatedArtists(artistId);
    }
  }, [dispatch]);

  return (
    <div>
      {!isLoading && (
        <Grid
          marginTop={4}
          h="200px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
          bg={colors.primary}
        >
          <GridItem
            rowSpan={2}
            colSpan={1}
          >
            <Image src={artist?.images[0].url || undefined} />
          </GridItem>
          <GridItem
            colSpan={2}
            textAlign="center"
            marginTop="30px"
            fontSize={30}
            fontWeight="bold"
            color={colors.secondary}
          >
            {artist?.name}
          </GridItem>
          <GridItem
            colSpan={2}
            textAlign="center"
            marginTop="30px"
            fontSize={30}
            fontWeight="bold"
            color={colors.secondary}
          >{`Followers: ${artist?.followers.total}`}</GridItem>
          <GridItem
            colSpan={4}
            textAlign="center"
            marginTop="30px"
            fontSize={20}
            fontWeight="bold"
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
    </div>
  );
}
