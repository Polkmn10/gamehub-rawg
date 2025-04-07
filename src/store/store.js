import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from '../features/games/gamesSlice';
import bookmarksReducer from '../features/bookmarks/bookmarksSlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    bookmarks: bookmarksReducer,
  },
});

export default store;