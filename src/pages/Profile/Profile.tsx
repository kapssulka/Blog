import { useEffect } from "react";
import ProfileHeader from "./components/ProfileHeader.js";
import { useParams } from "react-router-dom";
import {
  fetchUserById,
  setActiveProfileUid,
  setIsCurrentUserProfile,
} from "../../redux/slices/usersSlice.js";
import PostsSwitcher from "../../components/PostsSwitcher.js";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.js";
import ProfileSkeleton from "../../components/skeleton/Profile/ProfileSkeleton.js";
import { getUserPosts } from "../../redux/slices/postsSlice.js";

export default function Profile() {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { byKey } = useAppSelector((state) => state.loading);

  const { users, isCurrentUserProfile } = useAppSelector(
    (state) => state.users,
  );

  const postIdsByUser = useAppSelector((state) => state.posts.postIdsByUser);
  const { user_uid: currentUserUid } = useAppSelector((state) => state.user);

  const hasRequestedProfile = useAppSelector(
    (state) => !!state.posts.hasRequestedPage.profile[id!],
  );

  useEffect(() => {
    dispatch(setActiveProfileUid(id));

    if (id && !users[id]) dispatch(fetchUserById(id));

    if (id === currentUserUid) dispatch(setIsCurrentUserProfile(true));
    else dispatch(setIsCurrentUserProfile(false));
  }, [id, users, currentUserUid, dispatch]);

  // посты пользователя
  useEffect(() => {
    if (id && !hasRequestedProfile) dispatch(getUserPosts(id));
  }, [dispatch, id, hasRequestedProfile]);

  return (
    <div className="flex flex-col gap-y-5  h-full  ">
      {byKey.profile ? (
        <ProfileSkeleton />
      ) : (
        <PostsSwitcher
          loadingKey="profile"
          postsId={id ? (postIdsByUser[id] ?? []) : []}
          topContent={
            <ProfileHeader
              countPosts={id ? (postIdsByUser[id]?.length ?? 0) : 0}
            />
          }
          showCreatePost={isCurrentUserProfile}
        />
      )}
    </div>
  );
}
