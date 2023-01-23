import { combineReducers, configureStore } from '@reduxjs/toolkit';
import artistsSlice from './artists/artistsSlice';
import authSlice from './auth/authSlice';
import tracksSlice from './tracks/tracksSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  artists: artistsSlice,
  tracks: tracksSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
