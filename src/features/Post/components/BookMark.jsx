import { useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

export default function BookMark({ onClik, isActiveBookmark }) {
  const [isSave, setIsSave] = useState(false);

  const Icon = isActiveBookmark ? FaBookmark : FaRegBookmark;

  return (
    <Icon className="cursor-pointer opacity-80" size={26} onClick={onClik} />
  );
}
