import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getGames } from '../../services/api';

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (params) => {
    const response = await getGames(params);
    return response;
  }
);

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    filters: {
      category: 'all',
      year: 2023,
      rating: 0,
      search: '',
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.results;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilters } = gamesSlice.actions;
export default gamesSlice.reducer;