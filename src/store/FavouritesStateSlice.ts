import {createSlice} from "@reduxjs/toolkit";

const favouritesStateSlice = createSlice({
    name: 'favourites',
    initialState: {
        statusButton: false
    },
    reducers: {
        setFavStatus: (state, { payload }) => {
            state.statusButton = payload;
        },
    },
});
const { actions, reducer } = favouritesStateSlice;

export const {setFavStatus} = favouritesStateSlice.actions;

export default favouritesStateSlice.reducer;