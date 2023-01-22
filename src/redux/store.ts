import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';

const rootReducer = combineReducers({
  auth: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
