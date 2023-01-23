import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { colors } from '../helpers/consts';
import { PLAYLISTS, SEARCH } from '../helpers/pathsConsts';

interface props {
  display_name: string;
}

export default function Home({ display_name }: props) {
  return (
    <>
      <div
        style={{
          color: colors.primary,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 24,
          margin: 47,
        }}
      >
        Welcome {display_name}
      </div>
      <Grid
        style={{
          justifyContent: 'center',
          margin: 'auth',
          alignItems: 'center',
          textAlign: 'center',
        }}
        gridTemplateRows={'10px 1fr 10px'}
        gridTemplateColumns={'100px 1fr'}
        h="200px"
        gap="1"
      >
        <GridItem>
          <Link
            style={{ color: colors.primary, textAlign: 'center' }}
            to={PLAYLISTS}
          >
            PLAYLISTS
          </Link>
        </GridItem>
        <GridItem>
          <Link
            style={{ color: colors.primary }}
            to={SEARCH}
          >
            SEARCH
          </Link>
        </GridItem>
      </Grid>
    </>
  );
}
