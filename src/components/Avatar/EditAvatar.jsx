import { useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import AvatarIcon from "./AvatarIcon";
import EditAvatarButton from "./EditAvatarButton";
import DialogModal from "../DialogModal";
import ImageCropperWrapper from "../Crop/ImageCropperWrapper";
import { useSelector } from "react-redux";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import ConfirmButton from "../ConfirmModal/ConfirmButton";
import CloseButton from "../CloseButton";

export default function EditAvatar() {
  const fileInputRef = useRef(null);

  const { activeProfileUid, users, isCurrentUserProfile } = useSelector(
    (state) => state.users
  );
  const avatarUrl = users[activeProfileUid]?.avatar_url || null;

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(false);

  //for add button
  const handleAddAvatar = (closeConfirmModal) => {
    fileInputRef.current?.click();

    if (closeConfirmModal) setOpenConfirmModal(false);
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
    <div className="relative">
      <AvatarIcon classNameSize="h-30 w-30" src={avatarUrl} />

      {isCurrentUserProfile && (
        <EditAvatarButton
          ref={fileInputRef}
          icon={
            avatarUrl ? (
              <MdModeEdit className="w-5 h-5 text-black" />
            ) : (
              <IoMdAdd className="w-5 h-5 text-black" />
            )
          }
          handleClick={
            avatarUrl ? () => setOpenConfirmModal(true) : handleAddAvatar
          }
          handleFileChange={handleFileChange}
        />
      )}

      {openConfirmModal && (
        <ConfirmModal
          setOpenConfirmModal={setOpenConfirmModal}
          confirmText="Изменить аватарку"
        >
          <div className="flex flex-col w-full gap-3">
            <ConfirmButton
              isGreen
              text="Добавить новую"
              onClick={() => handleAddAvatar(true)}
            />
            <ConfirmButton isRed text="Удалить аватарку" />
          </div>

          <CloseButton
            right={10}
            top={10}
            onClick={() => setOpenConfirmModal(false)}
          />
        </ConfirmModal>
      )}

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
