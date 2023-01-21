import './App.css';

import React, { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { defaultState, setUser } from './redux/auth/authSlice';
import {
  CLIENT_ID,
  AUTH_ENDPOINT,
  REDIRECT_URI,
  RESPONSE_TYPE,
} from './helpers/consts';

function App() {
  const dispatch = useAppDispatch();

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(defaultState());
    localStorage.clear();
  };

  const retrieveDataFromAccessToken = useCallback(async () => {
    const access_token = await localStorage.getItem('access_token');

    if (access_token) {
      dispatch(
        setUser({
          access_token: access_token,
        })
      );
    }
  }, [dispatch]);

  const fetchAccessToken = async () => {
    console.log(window.location.hash);

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
    <div className='App'>
      {!isLoggedIn ? (
        <a
          href={`${AUTH_ENDPOINT}?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`}
        >
          Login to spotify
        </a>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default App;
