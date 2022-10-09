import { combineReducers, createStore } from "@reduxjs/toolkit";
import stateSlice from "./MovieStateSlice";
import genreStateSlice from "./GenreStateSlice";
import favouritesStateSlice from "./FavouritesStateSlice";

const reducer = combineReducers({
    movies: stateSlice,
    genres: genreStateSlice,
    favourites: favouritesStateSlice
});

const store = createStore(reducer);

export default store;

export type State = ReturnType<typeof reducer>;
