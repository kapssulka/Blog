import { useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import AvatarIcon from "./AvatarIcon";
import EditAvatarButton from "./EditAvatarButton";

export default function EditAvatar() {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    console.log("Я кнопка добавления!");
  };

  return (
    <div className="relative">
      <AvatarIcon classNameSize="h-30 w-30" />

      <EditAvatarButton
        ref={fileInputRef}
        icon={<IoMdAdd size={20} className="text-black" />}
        handleClick={handleClick}
      />

      {/* <EditAvatarButton
        ref={fileInputRef}
        icon={<MdModeEdit className="text-black" />}
        handleClick={handleClick}
        handleFileChange={handleFileChange}
      /> */}
    </div>
  );
}
