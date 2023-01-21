import React, { useEffect, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { defaultState, setUser } from './redux/auth/authSlice';
import {
  CLIENT_ID,
  AUTH_ENDPOINT,
  REDIRECT_URI,
  RESPONSE_TYPE,
} from './helpers/consts';
import { FetchArtists } from './redux/artists/artistsActions';
import { Spinner } from '@chakra-ui/spinner';

function App() {
  const [limit, setLimit] = useState(10);

  const dispatch = useAppDispatch();

  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { artistData, isError, isLoading, message } = useAppSelector(
    (state) => state.artists
  );

  const handleLogout = () => {
    dispatch(defaultState());
    localStorage.clear();
  };

  const retrieveDataFromAccessToken = useCallback(async () => {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      dispatch(
        setUser({
          access_token: access_token,
        })
      );
    }
  }, [dispatch]);

  const fetchAccessToken = async () => {
    const access_token = await new URLSearchParams(window.location.hash).get(
      '#access_token'
    );

    if (access_token) {
      dispatch(setUser({ access_token: access_token }));
    }

    window.location.hash = '';
  };

  useEffect(() => {
    retrieveDataFromAccessToken();
  }, [retrieveDataFromAccessToken]);

  useEffect(() => {
    fetchAccessToken();
  });

  return (
    <div className="App">
      {!isLoggedIn ? (
        <a
          href={`${AUTH_ENDPOINT}?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`}
        >
          Login to spotify
        </a>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => dispatch(FetchArtists(limit))}>
            Fetch Artists
          </button>
          {isLoading && <Spinner size={'md'} />}
          {artistData
            ? artistData.map((artist, i) => (
                <div key={i}>
                  {artist.artists.map((art) => (
                    <div key={art.id}>{art.name}</div>
                  ))}
                </div>
              ))
            : null}
          <button onClick={() => setLimit((prevLimit) => prevLimit + 10)}>
            Load more
          </button>
          {isError && <div>{message}</div>}
        </>
      )}
    </div>
  );
}

export default App;
