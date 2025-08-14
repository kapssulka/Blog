import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl, fetchHeaders } from "../../supabase/supabase";

export const uploadImages = createAsyncThunk(
  "posts/uploadImages",
  async (files, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/post_images`, {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify(files),
      });
      console.log("a");

      console.log(response.statusText);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post, { rejectWithValue }) => {
    try {
      console.log(`${baseUrl}/posts`);

      const response = await fetch(`${baseUrl}/posts`, {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, () => {
        console.log("pending");
      })
      .addCase(createPost.fulfilled, (action, payload) => {
        console.log(payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        console.log("Неудача: ", action);
      })
      .addCase(uploadImages.pending, () => {
        console.log("pending");
      })
      .addCase(uploadImages.fulfilled, () => {
        console.log("fulfilled");
      })
      .addCase(uploadImages.rejected, (state, action) => {
        console.log("Неудача: ", action);
      });
  },
});

export default postsSlice.reducer;
