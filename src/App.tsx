import './App.css';

import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=');
      (initial as any)[(parts as any)[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

function App() {
  const [spotifyToken, setSpotifyToken] = useState('');
  const [nowPlaying, setNowPLaying] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log('Running', getTokenFromUrl());
    const spotifyToken: string = getTokenFromUrl().access_token;

    window.location.hash = '';

    console.log('This is our spotify token');

    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
      // useSpotify api
      setLoggedIn(true);
    }
  });

  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      console.log(response);
      setNowPLaying({
        name: response.item?.name,
        albumArt: response.item?.album?.images[0].url,
      });
    });
  };

  return (
    <div className="App">
      {!loggedIn && <a href="http://localhost:8888">Login to spotify</a>}
    </div>
  );
}

export default App;
