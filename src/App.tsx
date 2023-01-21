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
import { fetchTracks } from './config/artists/artistsConfig';
import { GetUser } from './redux/auth/authActions';
import { searchArtists, searchTracks } from './config/search/searchConfig';
import {
  createUserPlayList,
  getUserPlaylists,
} from './config/playlists/playlistsConfig';

function App() {
  const [limit, setLimit] = useState(10);
  const [searchArtist, setSearchArtist] = useState('');
  const [searchTrack, setSearchTrack] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [isPlaylistPublic, setIsPlaylistPublic] = useState(false);

  const dispatch = useAppDispatch();

  const { isLoggedIn, display_name, images } = useAppSelector(
    (state) => state.auth
  );
  const { artistData, isError, isLoading, message } = useAppSelector(
    (state) => state.artists
  );

  const handleLogout = () => {
    dispatch(defaultState());
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
  }, [retrieveDataFromAccessToken]);

  useEffect(() => {
    fetchAccessToken();
  });

  return (
    <div>
      {!isLoggedIn ? (
        <a
          href={`${AUTH_ENDPOINT}?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=playlist-modify-public%20playlist-modify-private`}
        >
          Login to spotify
        </a>
      ) : (
        <>
          {display_name && <div>{display_name}</div>}
          {images.length !== 0 && <img src={images[0].url || ''} />}
          {localStorage.getItem('userId') ? (
            <button onClick={() => getUserPlaylists()}>Fetch Playlists</button>
          ) : null}
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => dispatch(FetchArtists(limit))}>
            Fetch Artists
          </button>
          <button onClick={() => setLimit((prevLimit) => prevLimit + 10)}>
            Load more
          </button>
          <button onClick={() => fetchTracks()}>Fetch Tracks</button>
          <button onClick={() => fetchUserData()}>Fetch user profile</button>
          <div>
            <label id="search_artists">Search artist</label>
            <input
              type="text"
              id="search_artists"
              value={searchArtist}
              onChange={(e) => setSearchArtist(e.target.value)}
            />
            <button
              disabled={!searchArtist}
              onClick={() => searchArtists(searchArtist)}
            >
              Search
            </button>
          </div>
          <div>
            <label id="search_track">Search Tracks</label>
            <input
              type="text"
              id="search_tracks"
              value={searchTrack}
              onChange={(e) => setSearchTrack(e.target.value)}
            />
            <button
              disabled={!searchTrack}
              onClick={() => searchTracks(searchTrack)}
            >
              Search
            </button>
          </div>
          <label id="name">Name</label>
          <input
            type="text"
            id="name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <label id="description">Description</label>
          <input
            type="text"
            id="description"
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
          />
          <button
            id="public"
            onClick={() =>
              setIsPlaylistPublic(
                (prevIsPlaylistPublic) => !prevIsPlaylistPublic
              )
            }
          >
            {isPlaylistPublic ? 'Public' : 'Private'}
          </button>
          <button
            type="submit"
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
          {isError && <div>{message}</div>}
        </>
      )}
    </div>
  );
}

export default App;
