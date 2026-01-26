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
      },
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

// export const getPosts = createAsyncThunk<PostData[], string | null | undefined>(
//   "posts/getPosts",
//   async (uid = null, { rejectWithValue }) => {
//     // стоит переписать, чтобы images как и users сразу подгружались одним запросом
//     try {
//       const urlPostDetails = uid
//         ? `${baseUrl}/posts?user_uid=eq.${uid}&select=*,author:users!posts_user_uid_fkey(*)`
//         : `${baseUrl}/posts?select=*,author:users!posts_user_uid_fkey(*)`;

//       const urlPostImages = `${baseUrl}/post_images?select=*`;

//       const [postsRes, imagesRes] = await Promise.all([
//         fetch(urlPostDetails, { headers: fetchHeaders }),
//         fetch(urlPostImages, { headers: fetchHeaders }),
//       ]);

//       if (!postsRes.ok) throw new Error("Failed to fetch posts");
//       if (!imagesRes.ok) throw new Error("Failed to fetch images");

//       const posts: PostDataWithoutImages[] = await postsRes.json();
//       const images: ImageData[] = await imagesRes.json();

//       const postsWithImages = posts.map((post) => ({
//         ...post,
//         images: images.filter((img) => img.post_id === post.post_id),
//       }));

//       const sortedPosts = postsWithImages.sort(
//         (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at),
//       );

//       return sortedPosts;
//     } catch (error) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message);
//       }
//       return rejectWithValue("Ошибка с получением постов");
//     }
//   },
// );

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
        },
      );

      if (!responseImagesDelete.ok) throw new Error("Filled remove images");

      const responsePostDelete = await fetch(
        `${baseUrl}/posts?post_id=eq.${post_id}`,
        {
          method: "DELETE",
          headers: fetchHeaders,
        },
      );
      if (!responsePostDelete.ok) throw new Error("Filled remove post");

      return post_id;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка с удалением поста");
    }
  },
);

// GET

export const getFeedPosts = createAsyncThunk<
  PostData[],
  { limit?: number; page?: number } | undefined
>("posts/getFeedPosts", async ({ limit, page } = {}, { rejectWithValue }) => {
  try {
    let query = `${baseUrl}/posts?select=*,author:users!posts_user_uid_fkey(*),images:post_images(*)&order=created_at.desc`;

    if (limit !== undefined && page !== undefined) {
      const offset = (page - 1) * limit;
      query += `&limit=${limit}&offset=${offset}`;
    }

    const res = await fetch(query, {
      headers: fetchHeaders,
    });

    if (!res.ok) throw new Error("Failed to fetch posts");

    const posts: PostData[] = await res.json();

    return posts;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Ошибка с получением постов");
  }
});

export const getUserPosts = createAsyncThunk<PostData[], string>(
  "posts/getFeedPosts",
  async (uid, { rejectWithValue }) => {
    try {
      const url = `${baseUrl}/posts?select=*,author:users!posts_user_uid_fkey(*),images:post_images(*)&user_uid=eq.${uid}&order=created_at.desc`;

      const res = await fetch(url, {
        headers: fetchHeaders,
      });

      if (!res.ok) throw new Error("Failed to fetch posts");

      const posts: PostData[] = await res.json();

      return posts;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка с получением постов");
    }
  },
);

export interface postsSliceState {
  posts: {
    byId: Record<number, PostData>;
    feedIds: number[];
  };
  postIdsByUser: Record<string, number[]>;
  likedPostIds: number[];
  bookmarkedPostIds: number[];

  lastAddedImages: ImageData[];
  lastAddedPost: PostDataWithoutImages | null;
}

const initialState: postsSliceState = {
  posts: {
    byId: {},
    feedIds: [],
  },

  postIdsByUser: {
    user1: [],
    user2: [],
  },

  likedPostIds: [],
  bookmarkedPostIds: [],

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
      .addCase(getFeedPosts.fulfilled, (state, action) => {
        const feedIds: number[] = [];

        const objectPost = action.payload.reduce(
          (acc: Record<number, PostData>, item) => {
            const id = item.post_id;
            feedIds.push(id);

            acc[id] = item;
            return acc;
          },
          {},
        );

        state.posts.byId = objectPost;
        state.posts.feedIds = feedIds;
      })
      .addCase(getFeedPosts.rejected, (state, action) => {
        console.log("Неудача c получением feedPosts: ", action);
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
          (post) => post.post_id !== action.payload,
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
