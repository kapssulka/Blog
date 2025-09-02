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
      const response = await fetch(
        `${baseUrl}/posts?select=*,users:users!posts_user_uid_fkey(*)`,
        {
          method: "POST",
          headers: fetchHeaders,
          body: JSON.stringify(post),
        }
      );

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
        ? `${baseUrl}/posts?user_uid=eq.${uid}&select=*,users:users!posts_user_uid_fkey(*)`
        : `${baseUrl}/posts?select=*,users:users!posts_user_uid_fkey(*)`;

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
        images: images.filter((img) => img.post_id === post.post_id),
      }));

      const sortedPosts = postsWithImages.sort(
        (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
      );
      return sortedPosts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// REMOVE

export const removePost = createAsyncThunk(
  "posts/removePost",
  async (post_id, { rejectWithValue }) => {
    try {
      const responseImagesDelete = await fetch(
        `${baseUrl}/post_images?post_id=eq.${post_id}`,
        {
          method: "DELETE",
          headers: fetchHeaders,
        }
      );

      if (!responseImagesDelete.ok) throw new Error("Filled remove images");

      const responsePostDelete = await fetch(
        `${baseUrl}/posts?post_id=eq.${post_id}`,
        {
          method: "DELETE",
          headers: fetchHeaders,
        }
      );
      if (!responsePostDelete.ok) throw new Error("Filled remove post");

      return post_id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    lastAddedImages: [],
    lastAddedPost: null,
  },
  reducers: {
    addLastPost: (state) => {
      const postsWithImages = {
        ...state.lastAddedPost,
        images: state.lastAddedImages,
      };

      state.posts.unshift(postsWithImages);
      state.lastAddedImages = [];
      state.lastAddedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        console.log("Неудача: ", action);
      })
      .addCase(createPost.fulfilled, (state, action) => {
        // добавляем пост во временный ключ
        state.lastAddedPost = action.payload[0];
      })
      .addCase(createPost.rejected, (state, action) => {
        console.log("Неудача: ", action);
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        // добавляем картинки во временный ключ
        state.lastAddedImages.push(action.payload[0]);
      })
      .addCase(uploadImages.rejected, (state, action) => {
        console.log("Неудача: ", action);
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post.post_id !== action.payload
        );
      })
      .addCase(removePost.rejected, (state, action) => {
        console.log("Неудача: ", action.payload);
      });
  },
});
export const { addLastPost } = postsSlice.actions;
export default postsSlice.reducer;
