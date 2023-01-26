import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../helpers/consts';
import { PLAYLISTS, SEARCH } from '../helpers/pathsConsts';
import { useAppSelector } from '../redux/hooks';

interface props {
  display_name: string;
}

export default function Home({ display_name }: props) {
  const { isLoading, isError, message } = useAppSelector((state) => state.auth);

  if (isError) {
    return (
      <Text textAlign='center' color='tomato'>
        {message || message.message}
      </Text>
    );
  }

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
        {!isLoading && `Welcome ${display_name}`}
      </div>
      <SimpleGrid
        style={{
          justifyContent: 'center',
          margin: 'auto',
          alignItems: 'center',
          textAlign: 'center',
        }}
        columns={2}
        spacing={0}
      >
        <Box>
          <Link
            style={{ color: colors.primary, fontWeight: 'bold' }}
            to={PLAYLISTS}
          >
            PLAYLISTS
          </Link>
        </Box>
        <Box>
          <Link
            style={{ color: colors.primary, fontWeight: 'bold' }}
            to={SEARCH}
          >
            SEARCH
          </Link>
        </Box>
      </SimpleGrid>
    </>
  );
}
