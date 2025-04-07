import { createSlice } from '@reduxjs/toolkit';

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    savedGames: [],
  },
  reducers: {
    toggleBookmark: (state, action) => {
      const gameIndex = state.savedGames.findIndex(
        (game) => game.id === action.payload.id
      );
      if (gameIndex >= 0) {
        state.savedGames.splice(gameIndex, 1);
      } else {
        state.savedGames.push(action.payload);
      }
    },
  },
});

export const { toggleBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;