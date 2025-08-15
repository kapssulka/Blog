import { useSelector } from "react-redux";
import GridPostsItem from "./../GridPostsItem/GridPostsItem";
import { returnMainImage } from "../../utils/imagesUtils";
import EmptyPosts from "../../pages/Profile/components/EmptyPosts";

export default function GridPosts() {
  const { posts } = useSelector((state) => state.posts);
  const { userUid } = useSelector((state) => state.user);

  const postCurrentUser = posts.filter((post) => post.user_uid === userUid);
  console.log(postCurrentUser);

  return (
    <>
      {postCurrentUser.length < 1 && <EmptyPosts />}
      <div className="grid grid-cols-3 gap-3">
        {postCurrentUser.map((post) => {
          const mainImage = returnMainImage(post.images);
          return <GridPostsItem key={post.id} src={mainImage} />;
        })}
      </div>
    </>
  );
}
