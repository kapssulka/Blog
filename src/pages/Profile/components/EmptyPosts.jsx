import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

export default function EmptyPosts() {
  return (
    <div className="flex flex-col items-center gap-y-6 mt-5">
      <h2 className="text-2xl font-semibold text-gray-500 text-center">
        Похоже, тут пока нет постов 😔
      </h2>

      <Link
        to={ROUTES.NEW_POST}
        className="px-5 py-2 bg-gray-800 text-white font-medium rounded-md 
                   border border-gray-700 hover:bg-gray-700 transition-colors duration-200"
      >
        Создать пост
      </Link>
    </div>
  );
}
