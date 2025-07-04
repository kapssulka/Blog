import { useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

export default function BookMark() {
  const [isSave, setIsSave] = useState(false);
  return (
    <div>
      {!isSave && (
        <FaRegBookmark
          cursor="pointer"
          size={26}
          opacity={0.8}
          onClick={() => setIsSave((prev) => !prev)}
        />
      )}
      {isSave && (
        <FaBookmark
          cursor="pointer"
          size={26}
          onClick={() => setIsSave((prev) => !prev)}
        />
      )}
    </div>
  );
}
