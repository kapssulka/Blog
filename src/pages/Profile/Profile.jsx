import { useState } from "react";
import GridPosts from "../../features/GridPosts/GridPosts";
import ProfileHeader from "./components/ProfileHeader";
import ViewSwitcher from "./components/ViewSwitcher";
import VerticalPosts from "../../components/VerticalPosts";
import { useSelector } from "react-redux";
import EmptyPosts from "./components/EmptyPosts";

export default function Profile() {
  const [activeBlock, setActiveBlock] = useState("grid");

  const { posts } = useSelector((state) => state.posts);
  const { userUid } = useSelector((state) => state.user);

  const postCurrentUser = posts.filter((post) => post.user_uid === userUid);

  const onChangeActiveBlock = (variant) => setActiveBlock(variant);

  return (
    <div className="flex flex-col gap-y-5  h-full  ">
      <div className="bg-zinc-900 px-5 py-10  rounded-2xl">
        <ProfileHeader />
        {postCurrentUser.length > 1 && (
          <ViewSwitcher
            activeView={activeBlock}
            onChange={onChangeActiveBlock}
          />
        )}
      </div>

      {postCurrentUser.length > 1 && activeBlock === "grid" && (
        <GridPosts posts={postCurrentUser} userUid={userUid} />
      )}
      {postCurrentUser.length > 1 && activeBlock === "list" && (
        <VerticalPosts posts={postCurrentUser} />
      )}

      {postCurrentUser.length < 1 && <EmptyPosts />}
    </div>
  );
}
