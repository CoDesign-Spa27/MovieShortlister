import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieDataType } from '@/hooks/UseMovies';

interface ShortlistedMoviesState {
  movies: MovieDataType[];
}

const initialState: ShortlistedMoviesState = {
  movies: [],
};

const shortlistedMoviesSlice = createSlice({
  name: 'shortlistedMovies',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<MovieDataType>) => {
      state.movies.push(action.payload);
    },
    removeMovie: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload);
    },
  },
});

export const { addMovie, removeMovie } = shortlistedMoviesSlice.actions;
export default shortlistedMoviesSlice.reducer;
