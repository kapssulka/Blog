import { IoHeart } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { useState } from "react";

export default function Like() {
  const [isLike, setIsLike] = useState(false);

  return (
    <div>
      {!isLike && (
        <FaRegHeart
          cursor="pointer"
          opacity={0.8}
          size={28}
          onClick={() => setIsLike((prev) => !prev)}
        />
      )}
      {isLike && (
        <IoHeart
          cursor="pointer"
          className="text-red-500"
          onClick={() => setIsLike((prev) => !prev)}
          size={28}
        />
      )}
    </div>
  );
}
