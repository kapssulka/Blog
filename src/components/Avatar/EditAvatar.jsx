import { useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import AvatarIcon from "./AvatarIcon";
import EditAvatarButton from "./EditAvatarButton";
import DialogModal from "../DialogModal";
import ImageCropperWrapper from "../Crop/ImageCropperWrapper";
import { useSelector } from "react-redux";

export default function EditAvatar() {
  const fileInputRef = useRef(null);

  const { activeProfileUid, users, isCurrentUserProfile } = useSelector(
    (state) => state.users
  );

  const [avatarPreview, setAvatarPreview] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
    }
  };

  const closeCropImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(false);
  };
  return (
    <div className="relative ">
      <AvatarIcon
        classNameSize="h-30 w-30"
        src={users[activeProfileUid]?.avatar_url}
      />

      {isCurrentUserProfile && (
        <EditAvatarButton
          ref={fileInputRef}
          icon={<IoMdAdd className="w-5 h-5 text-black" />}
          handleClick={handleClick}
          handleFileChange={handleFileChange}
        />
      )}

      {/* <EditAvatarButton
        ref={fileInputRef}
        icon={<MdModeEdit className="text-black" />}
        handleClick={handleClick}
        handleFileChange={handleFileChange}
      /> */}

      <DialogModal isOpen={Boolean(avatarPreview)} widthCss="max-w-[50%]">
        {avatarPreview && (
          <ImageCropperWrapper
            image={avatarPreview}
            closeCropImage={closeCropImage}
          />
        )}
      </DialogModal>
    </div>
  );
}
