import GridPostsItem from "../GridPostsItem/GridPostsItem.js";
import { returnMainImage } from "../../utils/imagesUtils.js";
import GridPostsSkeleton from "../../components/skeleton/GridPostsSkeleton.js";
import { useAppSelector } from "../../hooks/reduxHooks.js";
import type { LoadingKey } from "../../types/models/loading.js";

interface GridPosts {
  postsId: number[];
  scrollToPost: (index: number) => void;
  loadingKey: LoadingKey;
}

export default function GridPosts({ postsId, scrollToPost }: GridPosts) {
  const { byKey } = useAppSelector((state) => state.loading);
  const postsById = useAppSelector((state) => state.posts.posts.byId);

  return (
    <>
      {byKey.loadingKey ? (
        <GridPostsSkeleton />
      ) : (
        <div className="grid grid-cols-2 xs:grid-cols-3 gap-3">
          {postsId.map((id) => {
            const post = postsById[id];

            if (!post) return null;

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
      )}
    </>
  );
}
