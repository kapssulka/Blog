import GridPostsItem from "./../GridPostsItem/GridPostsItem";
import { returnMainImage } from "../../utils/imagesUtils";

export default function GridPosts({ posts }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {posts.map((post) => {
        const mainImage = returnMainImage(post.images);
        return <GridPostsItem key={post.post_id} src={mainImage} />;
      })}
    </div>
  );
}
