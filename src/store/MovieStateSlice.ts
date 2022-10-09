import {createSlice} from "@reduxjs/toolkit";

const movieStateSlice = createSlice({
    name: 'movies',
    initialState: {
        movieList: [],
        cacheMovieList: [],
        movie: [],
        showMovieInfo: false,
        chooseMovie: {},
        favouritesMovieList: []
    },
    reducers: {
        setMovieList: (state, { payload }) => {
            state.movieList = payload;
        },
        setCacheMovieList: (state, { payload }) => {
            state.cacheMovieList = payload;
        },
        setMovieInfo: (state, { payload }) => {
            state.showMovieInfo = payload
        },
        setChooseMovie: (state, { payload }) => {
            state.chooseMovie = payload
        },
        setFavouritesMovieList: (state, {payload}) => {
            state.favouritesMovieList= payload;
        }
    },
});
const { actions, reducer } = movieStateSlice;

export const {setMovieList, setMovieInfo, setChooseMovie, setCacheMovieList, setFavouritesMovieList} = movieStateSlice.actions;

export default movieStateSlice.reducer;