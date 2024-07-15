import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: [],
};

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },
  },
});

export const { setGames } = gameSlice.actions;

export default gameSlice.reducer;
