import Like from "./Like";
import Comment from "./Comment";
import BookMark from "./BookMark";

export default function ActivePanel() {
  return (
    <div className="flex justify-between">
      <div className="flex gap-x-2">
        <Like />
        <Comment />
      </div>

      <div>
        <BookMark />
      </div>
    </div>
  );
}
