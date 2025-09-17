import ConfirmButton from "../ConfirmModal/ConfirmButton";
import CloseButton from "../CloseButton";
import ImageCropper from "./ImageCropper";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getCroppedImage } from "../../utils/cropImage";
import { useDispatch, useSelector } from "react-redux";
import { uploadAvatarToSupabaseStorage } from "../../supabase/services/storageService";
import { fetchUploadAvatar } from "../../redux/slices/currentUserSlice";

export default function ImageCropperWrapper({ image, closeCropImage }) {
  const contentRef = useRef(null);

  const dispath = useDispatch();
  const { user_uid } = useSelector((state) => state.user);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (!contentRef.current.contains(e.target))
        toast.info("Завершите редактирование!");
    };

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [contentRef]);

  // будет срабатывать, после окончания кропа
  const handleCropComplete = (croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  // созание кроп изображения
  const handleAdd = async () => {
    if (!croppedAreaPixels) return;
    // если кроп был, то с помощью Canvas (getCroppedImage) обрезаем и создаем изображение
    try {
      const file = await getCroppedImage(image, croppedAreaPixels);

      const { path, publicUrl } = await uploadAvatarToSupabaseStorage(
        file,
        dispath
      );
      await dispath(
        fetchUploadAvatar({
          user_uid,
          data: { avatar_url: publicUrl, avatar_path: path },
        })
      ).unwrap();
      toast.success("Аватарка успещно добавлена!");
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
