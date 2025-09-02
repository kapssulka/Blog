import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl, fetchHeaders } from "../../supabase/supabase";

export const getBookmarks = createAsyncThunk(
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

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getBookmark = createAsyncThunk(
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

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addBookmark = createAsyncThunk(
  "bookmarks/addBookmark",
  async (bookmarksObj, { rejectWithValue }) => {
    try {
      console.log(bookmarksObj);

      const response = await fetch(`${baseUrl}/post_bookmarks`, {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify(bookmarksObj),
      });

      if (!response.ok) throw new Error("Ошибка с ДОБАВЛЕНИЕМ лайков");

      return bookmarksObj.post_id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteBookmark = createAsyncThunk(
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
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteAllBookmarks = createAsyncThunk(
  "bookmarks/deleteAllBookmarks",
  async (post_id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${baseUrl}/post_bookmarks?post_id=eq.${post_id}`,
        {
          method: "DELETE",
          headers: fetchHeaders,
        }
      );

      if (!response.ok) throw new Error("Ошибка с ДОБАВЛЕНИЕМ лайков");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postBookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    bookmarks: [],
  },

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
