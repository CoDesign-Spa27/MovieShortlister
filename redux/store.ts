import { configureStore } from '@reduxjs/toolkit';
import shortlistedMoviesReducer from '@/redux/shortlistedMoviesSlice';

export const store = configureStore({
  reducer: {
    shortlistedMovies: shortlistedMoviesReducer,
  },
});
