import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoadingKey } from "../../types/models/loading.js";

export interface LoadingState {
  global: number;

  byKey: Partial<Record<LoadingKey, boolean>>;
}

const initialState: LoadingState = {
  global: 0,
  byKey: {
    feedPosts: true,
    bookmarkPosts: true,
    likedPosts: true,
  },
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    incrementGlobal: (state) => {
      state.global++;
    },
    decrementGlobal: (state) => {
      state.global--;
    },
    start: (state, action: PayloadAction<LoadingKey>) => {
      state.byKey[action.payload] = true;
    },
    finish: (state, action: PayloadAction<LoadingKey>) => {
      state.byKey[action.payload] = false;
    },
  },
});

export default loadingSlice.reducer;
export const { incrementGlobal, decrementGlobal, start, finish } =
  loadingSlice.actions;
