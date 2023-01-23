import React, { useEffect, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { defaultState, setUser } from './redux/auth/authSlice';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { GetUser } from './redux/auth/authActions';
import { searchArtists, searchTracks } from './config/search/searchConfig';
import {
  createUserPlayList,
  getUserPlaylists,
} from './config/playlists/playlistsConfig';
import { Button } from '@chakra-ui/react';
import MainNavbar from './components/navigationbar/MainNavbar';
import AuthScreen from './pages/auth/AuthScreen';
import Error from './pages/Error';
import {
  MAIN_AUTH,
  AUTHENTICATE,
  HOME,
  PLAYLISTS,
  SEARCH,
} from './helpers/pathsConsts';
import Home from './pages/Home';
import Authenticate from './pages/auth/Authenticate';
import Playlists from './pages/playlists/Playlists';
import Search from './pages/search/Search';
import { defaultArtists } from './redux/artists/artistsSlice';

function App() {
  const [searchArtist, setSearchArtist] = useState('');
  const [searchTrack, setSearchTrack] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [isPlaylistPublic, setIsPlaylistPublic] = useState(false);

  const dispatch = useAppDispatch();

  const { isLoggedIn, images, access_token, display_name } = useAppSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(defaultState());
    dispatch(defaultArtists());
    localStorage.clear();
  };

  const fetchUserData = useCallback(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      dispatch(GetUser());
    }
  }, [dispatch]);

  const handleCreatePlaylist = (body: {
    name: string;
    description: string;
    public: boolean;
  }) => {
    createUserPlayList({
      name: body.name,
      description: body.description,
      public: body.public,
    });
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
          element={
            !isLoggedIn ? (
              <AuthScreen />
            ) : (
              <Navigate to={HOME || SEARCH || PLAYLISTS} />
            )
          }
        />
        <Route
          path={AUTHENTICATE}
          element={
            !isLoggedIn ? (
              <Authenticate />
            ) : (
              <Navigate to={HOME || SEARCH || PLAYLISTS} />
            )
          }
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
          path={SEARCH}
          element={isLoggedIn ? <Search /> : <Navigate to={MAIN_AUTH} />}
        />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );

  return (
    <div>
      <MainNavbar
        handleLogout={handleLogout}
        imageSource={images.length !== 0 ? images[0].url! : undefined}
      />
      {!isLoggedIn ? (
        <AuthScreen />
      ) : (
        <>
          {localStorage.getItem('userId') ? (
            <Button onClick={() => getUserPlaylists()}>Fetch Playlists</Button>
          ) : null}
          <div>
            <label id='search_artists'>Search artist</label>
            <input
              type='text'
              id='search_artists'
              value={searchArtist}
              onChange={(e) => setSearchArtist(e.target.value)}
            />
            <Button
              disabled={!searchArtist}
              onClick={() => searchArtists(searchArtist)}
            >
              Search
            </Button>
          </div>
          <div>
            <label id='search_track'>Search Tracks</label>
            <input
              type='text'
              id='search_tracks'
              value={searchTrack}
              onChange={(e) => setSearchTrack(e.target.value)}
            />
            <Button
              disabled={!searchTrack}
              onClick={() => searchTracks(searchTrack)}
            >
              Search
            </Button>
          </div>
          <label id='name'>Name</label>
          <input
            type='text'
            id='name'
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <label id='description'>Description</label>
          <input
            type='text'
            id='description'
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
          />
          <Button
            id='public'
            onClick={() =>
              setIsPlaylistPublic(
                (prevIsPlaylistPublic) => !prevIsPlaylistPublic
              )
            }
          >
            {isPlaylistPublic ? 'Public' : 'Private'}
          </Button>
          <Button
            type='submit'
            onClick={() =>
              handleCreatePlaylist({
                name: playlistName,
                description: playlistDescription,
                public: isPlaylistPublic,
              })
            }
            disabled={!playlistName && !playlistDescription}
          >
            Create Playlist
          </Button>
        </>
      )}
    </div>
  );
}

export default App;
