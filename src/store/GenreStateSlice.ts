import {createSlice} from "@reduxjs/toolkit";

const genreStateSlice = createSlice({
    name: 'genres',
    initialState: {
        genreList: [{
            id: 0,
            name: ''
        }]
    },
    reducers: {
        setGenreList: (state, { payload }) => {
            state.genreList = payload;
        }
    },
});
const { actions, reducer } = genreStateSlice;

export const {setGenreList} = genreStateSlice.actions;

export default genreStateSlice.reducer;