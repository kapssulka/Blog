import { getUserLikedPostId } from "../../utils/data.js";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store.js";

const selectPosts = (state: RootState) => state.posts.posts;
const selectLikes = (state: RootState) => state.postLikes.likes;

export const selectLikedPosts = createSelector(
  [selectPosts, selectLikes],
  (posts, likes) => {
    const likedIdPostID = getUserLikedPostId(likes);

    return posts.filter((post) => likedIdPostID.includes(post.post_id));
  },
);
