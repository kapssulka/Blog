import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    loadingCount: 0,
  },
  reducers: {
    increment: (state, action) => {
      state.loadingCount++;
    },
    decrement: (state, action) => {
      state.loadingCount--;
    },
  },
});

export default loadingSlice.reducer;
export const { increment, decrement } = loadingSlice.actions;
