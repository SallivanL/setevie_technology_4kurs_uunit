import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user.slice.js';

export const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
  }),
});
