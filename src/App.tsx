import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { defaultState, setUser } from './redux/auth/authSlice';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { GetUser } from './redux/auth/authActions';
import MainNavbar from './components/navigationbar/MainNavbar';
import AuthScreen from './pages/auth/AuthScreen';
import Error from './pages/Error';
import {
  MAIN_AUTH,
  AUTHENTICATE,
  HOME,
  PLAYLISTS,
  SEARCH,
  CREATE_PLAYLIST,
  PLAYLIST_DETAILS,
  ARTIST_DETAILS,
} from './helpers/pathsConsts';
import Home from './pages/Home';
import Authenticate from './pages/auth/Authenticate';
import Playlists from './pages/playlists/Playlists';
import Search from './pages/search/Search';
import { defaultArtists } from './redux/artists/artistsSlice';
import { defaultTracks } from './redux/tracks/tracksSlice';
import CreatePlaylist from './pages/playlists/CreatePlaylist';
import { defaultPlaylists } from './redux/playlists/playlistsSlice';
import PlaylistDetails from './pages/playlists/PlaylistDetails';
import ArtistDetails from './pages/artists/ArtistDetails';

function App() {
  const dispatch = useAppDispatch();

  const { isLoggedIn, images, access_token, display_name } = useAppSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(defaultState());
    dispatch(defaultArtists());
    dispatch(defaultTracks());
    dispatch(defaultPlaylists());
    localStorage.clear();
  };

  const fetchUserData = useCallback(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      dispatch(GetUser());
    }
  }, [dispatch]);

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
  }, [window.location.hash]);

  useEffect(() => {
    fetchAccessToken();
  }, [window.location.hash]);

  useEffect(
    useCallback(() => {
      if (access_token) {
        fetchUserData();
      }
    }, [access_token]),
    [access_token]
  );

  return (
    <Router>
      <MainNavbar
        handleLogout={handleLogout}
        imageSource={images.length !== 0 ? images[0].url! : undefined}
      />
      <Routes>
        <Route
          path={MAIN_AUTH}
          element={!isLoggedIn ? <AuthScreen /> : <Navigate to={HOME} />}
        />
        <Route
          path={AUTHENTICATE}
          element={!isLoggedIn ? <Authenticate /> : <Navigate to={HOME} />}
        />
        <Route
          path={HOME}
          element={
            isLoggedIn ? (
              <Home display_name={display_name!} />
            ) : (
              <Navigate to={MAIN_AUTH} />
            )
          }
        />
        <Route
          path={PLAYLISTS}
          element={isLoggedIn ? <Playlists /> : <Navigate to={MAIN_AUTH} />}
        />
        <Route
          path={PLAYLIST_DETAILS.toString()}
          element={
            isLoggedIn ? <PlaylistDetails /> : <Navigate to={MAIN_AUTH} />
          }
        />
        <Route
          path={CREATE_PLAYLIST}
          element={
            isLoggedIn ? <CreatePlaylist /> : <Navigate to={MAIN_AUTH} />
          }
        />
        <Route
          path={ARTIST_DETAILS}
          element={isLoggedIn ? <ArtistDetails /> : <Navigate to={MAIN_AUTH} />}
        />
        <Route
          path={SEARCH}
          element={isLoggedIn ? <Search /> : <Navigate to={MAIN_AUTH} />}
        />
        <Route
          path="*"
          element={<Error />}
        />
      </Routes>
    </Router>
  );
}

export default App;
