import GridPostsItem from "../GridPostsItem/GridPostsItem.js";
import { returnMainImage } from "../../utils/imagesUtils.js";
import type { PostData } from "../../types/models/data.js";

interface GridPosts {
  posts: PostData[];
  scrollToPost: (index: number) => void;
}

export default function GridPosts({ posts, scrollToPost }: GridPosts) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {posts.map((post) => {
        const mainImage = returnMainImage(post.images);

        return (
          <GridPostsItem
            onClick={() => scrollToPost(post.post_id)}
            key={post.post_id}
            src={mainImage}
            lengthImages={post.images.length}
          />
        );
      })}
    </div>
  );
}
