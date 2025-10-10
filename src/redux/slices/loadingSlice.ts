import { createSlice } from "@reduxjs/toolkit";

export interface LoadingState {
  loadingCount: number;
}

const initialState: LoadingState = {
  loadingCount: 0,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    increment: (state) => {
      state.loadingCount++;
    },
    decrement: (state) => {
      state.loadingCount--;
    },
  },
});

export default loadingSlice.reducer;
export const { increment, decrement } = loadingSlice.actions;
