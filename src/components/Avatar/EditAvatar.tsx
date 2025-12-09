import { useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import AvatarIcon from "./AvatarIcon.js";
import EditAvatarButton from "./EditAvatarButton.js";
import DialogModal from "../DialogModal.js";
import ImageCropperWrapper from "../Crop/ImageCropperWrapper.js";
import ConfirmModal from "../ConfirmModal/ConfirmModal.js";
import ConfirmButton from "../ConfirmModal/ConfirmButton.js";
import CloseButton from "../CloseButton.js";
import { fetchDeleteAvatar } from "../../redux/slices/currentUserSlice.js";
import { toast } from "sonner";
import { removeFromSupabaseStorage } from "../../supabase/services/storageService.js";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.js";

export default function EditAvatar() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const { activeProfileUid, users, isCurrentUserProfile } = useAppSelector(
    (state) => state.users
  );

  const avatarUrl = users[activeProfileUid!]?.avatar_url ?? "";

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");

  //for add button
  const handleAddAvatar = (closeConfirmModal?: boolean) => {
    fileInputRef.current?.click();

    if (closeConfirmModal) setOpenConfirmModal(false);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

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
    setAvatarPreview("");
  };

  // логика удаления аватарки

  const handleDeleteAvatar = async () => {
    const obj = {
      user_uid: activeProfileUid as string,
      data: { avatar_url: null, avatar_path: null },
    };

    const avatar_path = users[activeProfileUid!]?.avatar_path;
    if (!avatar_path) {
      toast.error("Ошибка с удалением!");
      return;
    }

    const { data, error } = await removeFromSupabaseStorage(
      avatar_path,
      "avatars"
    );
    if (error) throw new Error(`Ошибка: ${error}`);

    await dispatch(fetchDeleteAvatar(obj)).unwrap();
    setOpenConfirmModal(false);
    toast.success("Аватарка успешно удалена!");
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
            avatarUrl
              ? () => setOpenConfirmModal(true)
              : () => handleAddAvatar()
          }
          handleFileChange={handleFileChange}
        />
      )}

      <ConfirmModal
        isOpen={openConfirmModal}
        setOpenConfirmModal={setOpenConfirmModal}
        confirmText="Изменить аватарку"
      >
        <div className="flex flex-col w-full gap-3">
          <ConfirmButton
            isGreen
            text="Добавить новую"
            onClick={() => handleAddAvatar(true)}
          />
          <ConfirmButton
            isRed
            text="Удалить аватарку"
            onClick={() => handleDeleteAvatar()}
          />
        </div>

        <CloseButton
          right={10}
          top={10}
          onClick={() => setOpenConfirmModal(false)}
        />
      </ConfirmModal>

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
