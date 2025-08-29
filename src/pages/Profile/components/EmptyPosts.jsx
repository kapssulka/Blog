import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import TitleMessage from "../../../components/TitleMessage";

export default function EmptyPosts({
  showCreatePost = false,
  title = "Похоже, тут пока нет постов 😔",
  buttonText = "Создать пост",
}) {
  return (
    <div className="flex flex-col items-center gap-y-6 mt-5">
      <TitleMessage title={title} />

      {showCreatePost && (
        <Link
          to={ROUTES.NEW_POST}
          className="px-5 py-2 bg-gray-800 text-white font-medium rounded-md 
                   border border-gray-700 hover:bg-gray-700 transition-colors duration-200"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}
