import { Link, Text } from '@chakra-ui/react';
import React from 'react';

import {
  AUTH_ENDPOINT,
  RESPONSE_TYPE,
  CLIENT_ID,
  REDIRECT_URI,
  colors,
} from '../../helpers/consts';

export default function AuthScreen() {
  return (
    <Link
      style={{
        marginLeft: '45%',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.primary,
      }}
      href={`${AUTH_ENDPOINT}?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=playlist-modify-public%20playlist-modify-private`}
    >
      Login to spotify
    </Link>
  );
}
