import VerticalPosts from "../components/VerticalPosts.js";
import EmptyPosts from "../components/EmptyPosts.js";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks.js";
import { useEffect, useState } from "react";
import { getFeedPosts } from "../redux/slices/postsSlice.js";

export default function Home() {
  const dispatch = useAppDispatch();

  const postsFeedID = useAppSelector((state) => state.posts.posts.feedIds);
  const { byKey } = useAppSelector((state) => state.loading);

  const hasRequestedFeed = useAppSelector(
    (state) => state.posts.hasRequestedPage.feed,
  );

  useEffect(() => {
    if (hasRequestedFeed) return;

    dispatch(getFeedPosts());
  }, [dispatch, hasRequestedFeed]);

  return (
    <div>
      {!byKey.feedPosts && postsFeedID.length < 1 && (
        <EmptyPosts
          showCreatePost
          title="Будь первым, кто поделится чем-то интересным!"
        />
      )}
      <VerticalPosts postsId={postsFeedID} loadingKey="feedPosts" />
    </div>
  );
}
