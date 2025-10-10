import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl, fetchHeaders } from "../../supabase/supabase.js";
import type { BookmarksArgs } from "../types/postBookmarks.type.js";
import type { PostInteractionData } from "../../types/models/data.js";

export const getBookmarks = createAsyncThunk<PostInteractionData[], string>(
  "bookmarks/getBookmarks",
  async (user_uid, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${baseUrl}/post_bookmarks?user_uid=eq.${user_uid}`,
        {
          headers: fetchHeaders,
        }
      );

      if (!response.ok) throw new Error("Ошибка с ДОБАВЛЕНИЕМ лайков");
      const data = await response.json();

      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("Ошибка с получением закладок");
    }
  }
);
export const getBookmark = createAsyncThunk<PostInteractionData, BookmarksArgs>(
  "bookmarks/getBookmark",
  async (bookmarkObj, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${baseUrl}/post_bookmarks?post_id=eq.${bookmarkObj.post_id}&user_uid=eq.${bookmarkObj.user_uid}`,
        {
          headers: fetchHeaders,
        }
      );

      if (!response.ok) throw new Error("Ошибка с ДОБАВЛЕНИЕМ лайков");

      const data = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("Ошибка с получением 1 закладки");
    }
  }
);
export const addBookmark = createAsyncThunk<number, BookmarksArgs>(
  "bookmarks/addBookmark",
  async (bookmarksObj, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/post_bookmarks`, {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify(bookmarksObj),
      });

      if (!response.ok) throw new Error("Ошибка с ДОБАВЛЕНИЕМ лайков");
      return bookmarksObj.post_id;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка с добавлением закладки");
    }
  }
);
export const deleteBookmark = createAsyncThunk<number, BookmarksArgs>(
  "bookmarks/deleteBookmark",
  async (bookmarkObj, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${baseUrl}/post_bookmarks?post_id=eq.${bookmarkObj.post_id}&user_uid=eq.${bookmarkObj.user_uid}`,
        {
          method: "DELETE",
          headers: fetchHeaders,
        }
      );

      if (!response.ok) throw new Error("Ошибка с ДОБАВЛЕНИЕМ лайков");
      return bookmarkObj.post_id;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка с удалением закладки");
    }
  }
);
export const deleteAllBookmarks = createAsyncThunk<
  PostInteractionData[],
  number
>("bookmarks/deleteAllBookmarks", async (post_id, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${baseUrl}/post_bookmarks?post_id=eq.${post_id}`,
      {
        method: "DELETE",
        headers: fetchHeaders,
      }
    );

    if (!response.ok) throw new Error("Ошибка с ДОБАВЛЕНИЕМ лайков");

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Ошибка с удалением всех закладок");
  }
});

export interface BookmarksState {
  bookmarks: number[];
}

const initialState: BookmarksState = { bookmarks: [] };

export const postBookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    resetAllBookmarks: (state, action) => {
      state.bookmarks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.bookmarks.push(action.payload);
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        state.bookmarks = state.bookmarks.filter(
          (post_id) => post_id !== action.payload
        );
      })

      .addCase(getBookmarks.fulfilled, (state, action) => {
        action.payload.forEach((bookmark) => {
          state.bookmarks.push(bookmark.post_id);
        });
      });
  },
});

export const { resetAllBookmarks } = postBookmarksSlice.actions;
export default postBookmarksSlice.reducer;
