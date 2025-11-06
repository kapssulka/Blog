import {
  createAsyncThunk,
  createSlice,
  current,
  original,
} from "@reduxjs/toolkit";
import { baseUrl, fetchHeaders } from "../../supabase/supabase.js";
import type { ImageData, PostData } from "../../types/models/data.js";

//  POST
export const uploadImages = createAsyncThunk<
  ImageData[],
  Omit<ImageData, "id">
>("posts/uploadImages", async (files, { rejectWithValue }) => {
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
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Ошибка с загрузкой изображения");
  }
});

interface CreatePostArgs {
  text: string;
  user_uid: string;
}

type PostDataWithoutImages = Omit<PostData, "images">;

export const createPost = createAsyncThunk<
  PostDataWithoutImages[],
  CreatePostArgs
>("posts/createPost", async (post, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${baseUrl}/posts?select=*,author:users!posts_user_uid_fkey(*)`,
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
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Ошибка с созданием поста");
  }
});

// GET

export const getPosts = createAsyncThunk<PostData[], string | null>(
  "posts/getPosts",
  async (uid = null, { rejectWithValue }) => {
    // стоит переписать, чтобы images как и users сразу подгружались одним запросом
    try {
      const urlPostDetails = uid
        ? `${baseUrl}/posts?user_uid=eq.${uid}&select=*,author:users!posts_user_uid_fkey(*)`
        : `${baseUrl}/posts?select=*,author:users!posts_user_uid_fkey(*)`;

      const urlPostImages = `${baseUrl}/post_images?select=*`;

      const [postsRes, imagesRes] = await Promise.all([
        fetch(urlPostDetails, { headers: fetchHeaders }),
        fetch(urlPostImages, { headers: fetchHeaders }),
      ]);

      if (!postsRes.ok) throw new Error("Failed to fetch posts");
      if (!imagesRes.ok) throw new Error("Failed to fetch images");

      const posts: PostDataWithoutImages[] = await postsRes.json();
      const images: ImageData[] = await imagesRes.json();

      const postsWithImages = posts.map((post) => ({
        ...post,
        images: images.filter((img) => img.post_id === post.post_id),
      }));

      const sortedPosts = postsWithImages.sort(
        (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
      );

      return sortedPosts;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка с получением постов");
    }
  }
);

// REMOVE

export const removePost = createAsyncThunk<number, number>(
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
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка с удалением поста");
    }
  }
);

export interface postsSliceState {
  posts: PostData[];
  lastAddedImages: ImageData[];
  lastAddedPost: PostDataWithoutImages | null;
}

const initialState: postsSliceState = {
  posts: [],
  lastAddedImages: [],
  lastAddedPost: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addLastPost: (state) => {
      const postsWithImages = {
        ...state.lastAddedPost,
        images: state.lastAddedImages,
      };

      state.posts.unshift(postsWithImages as PostData);
      state.lastAddedImages = [];
      state.lastAddedPost = null;
    },

    // обновление аватарки в постах, при обновлении аватарки
    uploadAvatarForPosts: (state, action) => {
      const changedUserObj = action.payload;
      const { user_uid, avatar_url, avatar_path } = changedUserObj;

      state.posts = state.posts.map((post) => {
        if (post.user_uid === user_uid) {
          post.author = { ...post.author, avatar_url, avatar_path };
        }

        return post;
      });
    },
    changeBioAndNameForPosts: (state, action) => {
      const changedUserObj = action.payload;
      const { user_uid, bio, name } = changedUserObj;

      state.posts = state.posts.map((post) => {
        if (post.user_uid === user_uid) {
          post.author = { ...post.author, bio, name };
        }

        return post;
      });
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
        state.lastAddedPost = action.payload[0] as PostDataWithoutImages;
      })
      .addCase(createPost.rejected, (state, action) => {
        console.log("Неудача: ", action);
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        // добавляем картинки во временный ключ
        state.lastAddedImages.push(action.payload[0] as ImageData);
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
export const { addLastPost, uploadAvatarForPosts, changeBioAndNameForPosts } =
  postsSlice.actions;
export default postsSlice.reducer;
