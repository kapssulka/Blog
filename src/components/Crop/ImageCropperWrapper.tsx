import ConfirmButton from "../ConfirmModal/ConfirmButton.js";
import CloseButton from "../CloseButton.js";
import ImageCropper from "./ImageCropper.js";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getCroppedImage } from "../../utils/cropImage.js";
import {
  removeFromSupabaseStorage,
  uploadAvatarToSupabaseStorage,
} from "../../supabase/services/storageService.js";
import { fetchUploadAvatar } from "../../redux/slices/currentUserSlice.js";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.js";
import type { Area, Point } from "react-easy-crop";

interface ImageCropperWrapperProps {
  image: string;
  closeCropImage: () => void;
}

export default function ImageCropperWrapper({
  image,
  closeCropImage,
}: ImageCropperWrapperProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { user_uid } = useAppSelector((state) => state.user);
  const { users } = useAppSelector((state) => state.users);

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const el = contentRef.current;

      if (el && e.target instanceof Node && !el.contains(e.target))
        toast.info("Завершите редактирование!");
    };

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [contentRef]);

  // будет срабатывать, после окончания кропа
  const handleCropComplete = (croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  };

  // созание кроп изображения
  const handleAdd = async () => {
    if (!croppedAreaPixels) return;
    // если кроп был, то с помощью Canvas (getCroppedImage) обрезаем и создаем изображение

    try {
      const file = await getCroppedImage(image, croppedAreaPixels);

      if (!(file instanceof File)) return;

      const currenUser = users[user_uid];
      if (!currenUser) return;
      const currentAvatarPath = currenUser.avatar_path;

      // Загрузка нового файла
      const { path, publicUrl } = await uploadAvatarToSupabaseStorage(
        file,
        dispatch
      );
      // Удаление старого файла
      if (currentAvatarPath) {
        const { data, error } = await removeFromSupabaseStorage(
          currentAvatarPath,
          "avatars"
        );
        if (error) {
          console.warn("Ошибка удаления старой аватарки:", error);
        }
      }
      // Загрузка нового url и path в БД

      const newObj = {
        user_uid,
        data: { avatar_url: publicUrl, avatar_path: path },
      };

      await dispatch(fetchUploadAvatar(newObj)).unwrap();

      toast.success("Аватарка успешно добавлена!");
      closeCropImage();
    } catch (error) {
      toast.error("Непредвиденная ошибка с загрузкой аватарки!");
    }
  };

  return (
    <div ref={contentRef} className="flex flex-col p-10">
      <CloseButton top={10} right={10} onClick={closeCropImage} />
      <ImageCropper
        image={image}
        crop={crop}
        setCrop={setCrop}
        zoom={zoom}
        setZoom={setZoom}
        handleCropComplete={handleCropComplete}
      />
      <ConfirmButton
        isGreen
        text="Добавить"
        className="mt-5"
        onClick={handleAdd}
      />
    </div>
  );
}
