import { useEffect, useMemo, useState } from "react";
import GridPosts from "../../features/GridPosts/GridPosts";
import ProfileHeader from "./components/ProfileHeader";
import ViewSwitcher from "./components/ViewSwitcher";
import VerticalPosts from "../../components/VerticalPosts";
import { useDispatch, useSelector } from "react-redux";
import EmptyPosts from "./components/EmptyPosts";
import { useParams } from "react-router-dom";
import {
  fetchUserById,
  setActiveProfileUid,
  setIsCurrentUserProfile,
} from "../../redux/slices/usersSlice";

export default function Profile() {
  const [activeBlock, setActiveBlock] = useState("grid");

  const dispatch = useDispatch();
  const { id } = useParams();

  const { users } = useSelector((state) => state.users);

  const { posts } = useSelector((state) => state.posts);
  const { userUid: currentUserUid } = useSelector((state) => state.user);

  const postCurrentUser = useMemo(
    () => posts.filter((post) => post.user_uid === id),
    [posts, id]
  );

  const onChangeActiveBlock = (variant) => setActiveBlock(variant);

  useEffect(() => {
    dispatch(setActiveProfileUid(id));

    if (!users[id]) dispatch(fetchUserById(id));

    if (id === currentUserUid) dispatch(setIsCurrentUserProfile(true));
    else dispatch(setIsCurrentUserProfile(false));
  }, [id, users, currentUserUid, dispatch]);

  return (
    <div className="flex flex-col gap-y-5  h-full  ">
      <div className="bg-zinc-900 px-5 py-10  rounded-2xl">
        <ProfileHeader />
        {postCurrentUser.length > 0 && (
          <ViewSwitcher
            activeView={activeBlock}
            onChange={onChangeActiveBlock}
          />
        )}
      </div>

      {postCurrentUser.length > 0 && activeBlock === "grid" && (
        <GridPosts posts={postCurrentUser} userUid={id} />
      )}
      {postCurrentUser.length > 0 && activeBlock === "list" && (
        <VerticalPosts posts={postCurrentUser} />
      )}

      {postCurrentUser.length < 1 && <EmptyPosts />}
    </div>
  );
}
