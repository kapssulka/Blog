import { useEffect, useMemo, useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchUserById,
  setActiveProfileUid,
  setIsCurrentUserProfile,
} from "../../redux/slices/usersSlice";
import PostsSwitcher from "../../components/PostsSwitcher.js";

export default function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { users, isCurrentUserProfile } = useSelector((state) => state.users);

  const { posts } = useSelector((state) => state.posts);
  const { user_uid: currentUserUid } = useSelector((state) => state.user);

  const postCurrentUser = useMemo(
    () => posts.filter((post) => post?.user_uid === id),
    [posts, id]
  );

  useEffect(() => {
    dispatch(setActiveProfileUid(id));

    if (!users[id]) dispatch(fetchUserById(id));

    if (id === currentUserUid) dispatch(setIsCurrentUserProfile(true));
    else dispatch(setIsCurrentUserProfile(false));
  }, [id, users, currentUserUid, dispatch]);

  return (
    <div className="flex flex-col gap-y-5  h-full  ">
      <PostsSwitcher
        posts={postCurrentUser}
        topContent={<ProfileHeader />}
        showCreatePost={isCurrentUserProfile}
      />
    </div>
  );
}
