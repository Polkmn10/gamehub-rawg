import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const getGames = async (params) => {
  const searchParams = {
    page: params.page,
    search: params.search,
    ordering: params.rating ? '-rating' : undefined,
    genres: params.category !== 'all' ? params.category : undefined,
    dates: params.year ? `${params.year}-01-01,${params.year}-12-31` : undefined,
  };

  const response = await api.get('/games', { 
    params: searchParams
  });
  return response.data;
};

export const getGameDetails = async (id) => {
  const response = await api.get(`/games/${id}`);
  return response.data;
};

export const getGameScreenshots = async (id) => {
  const response = await api.get(`/games/${id}/screenshots`);
  return response.data;
};