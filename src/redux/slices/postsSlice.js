import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl, fetchHeaders } from "../../supabase/supabase";

//  POST
export const uploadImages = createAsyncThunk(
  "posts/uploadImages",
  async (files, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/post_images`, {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify(files),
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

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post, { rejectWithValue }) => {
    try {
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

// GET

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (uid = null, { rejectWithValue }) => {
    try {
      const urlPostDetails = uid
        ? `${baseUrl}/posts?user_uid=eq.${uid}&select=*`
        : `${baseUrl}/posts?select=*`;

      const urlPostImages = `${baseUrl}/post_images?select=*`;

      const [postsRes, imagesRes] = await Promise.all([
        fetch(urlPostDetails, { headers: fetchHeaders }),
        fetch(urlPostImages, { headers: fetchHeaders }),
      ]);

      if (!postsRes.ok) throw new Error("Failed to fetch posts");
      if (!imagesRes.ok) throw new Error("Failed to fetch images");

      const posts = await postsRes.json();
      const images = await imagesRes.json();

      const postsWithImages = posts.map((post) => ({
        ...post,
        images: images.filter((img) => img.post_id === post.id),
      }));

      return postsWithImages;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        console.log("Неудача: ", action);
      })
      .addCase(createPost.rejected, (state, action) => {
        console.log("Неудача: ", action);
      })
      .addCase(uploadImages.rejected, (state, action) => {
        console.log("Неудача: ", action);
      });
  },
});

export default postsSlice.reducer;
