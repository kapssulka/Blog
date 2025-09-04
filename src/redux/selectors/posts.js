import { getUserLikedPostId } from "../../utils/data";
import { createSelector } from "@reduxjs/toolkit";

const selectPosts = (state) => state.posts.posts;
const selectLikes = (state) => state.postLikes.likes;
const selectBookmarks = (state) => state.bookmarks.bookmarks;

export const selectLikedPosts = createSelector(
  [selectPosts, selectLikes],
  (posts, likes) => {
    const likedIdPostID = getUserLikedPostId(likes);

    return posts.filter((post) => likedIdPostID.includes(post.post_id));
  }
);

export const selectBookmarksPosts = createSelector(
  [selectPosts, selectBookmarks],
  (posts, bookmarks) => posts.filter((post) => bookmarks.includes(post.post_id))
);
