import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineDeleteSweep } from "react-icons/md";
import DropDownList from "./DropDownList.js";
import DropDownItem from "./DropDownItem.js";
import DropDownOpenButton from "./DropDownOpenButton.js";
import { removeFromSupabaseStorage } from "../../supabase/services/storageService.js";
import { removePost } from "../../redux/slices/postsSlice.js";
import { toast } from "sonner";
import ConfirmModal from "../ConfirmModal/ConfirmModal.js";
import { deleteAllLike } from "../../redux/slices/postLikesSlice.js";
import { deleteAllBookmarks } from "../../redux/slices/postBookmarksSlice.js";
import ConfirmButton from "../ConfirmModal/ConfirmButton.js";
import type { ImageData } from "../../types/models/data.js";
import { useAppDispatch } from "../../hooks/reduxHooks.js";
import {
  decrementGlobal,
  incrementGlobal,
} from "../../redux/slices/loadingSlice.js";

interface DropDownMenuProps {
  className: string;
  post_id: number;
  images: ImageData[];
}

export default function DropDownMenu({
  className,
  post_id,
  images = [],
}: DropDownMenuProps) {
  const dispatch = useAppDispatch();

  const [openDropDown, setOpenDropDown] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const dropMenu = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!openDropDown) return;
    const handleClick = (e: MouseEvent) => {
      if (!dropMenu.current || !buttonRef.current) return;
      if (buttonRef.current.contains(e.target as Node)) return;

      if (!dropMenu.current.contains(e.target as Node)) setOpenDropDown(false);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [openDropDown]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        if (openDropDown) setOpenDropDown(false);
        if (openConfirmModal) setOpenConfirmModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openDropDown, openConfirmModal]);

  const handleRemovePost = async (post_id: number, images: ImageData[]) => {
    try {
      dispatch(incrementGlobal());
      const pathArr = images.map((item) => item.path);

      const { data, error } = await removeFromSupabaseStorage(pathArr, "posts");
      if (error) throw new Error(`Ошибка: ${error}`);

      await dispatch(deleteAllLike(post_id)).unwrap();
      await dispatch(deleteAllBookmarks(post_id)).unwrap();
      await dispatch(removePost(post_id)).unwrap();

      dispatch(decrementGlobal());
      toast.success("Пост успешно удалён!");
    } catch (error) {
      dispatch(decrementGlobal());
      toast.error("Ошибка с удалением поста!");
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className={`absolute ${className} z-20`}>
      <DropDownOpenButton
        ref={buttonRef}
        icon={<BsThreeDotsVertical size={20} />}
        openDropDown={openDropDown}
        setOpenDropDown={setOpenDropDown}
      />

      {openDropDown && (
        <DropDownList ref={dropMenu}>
          <DropDownItem
            onClick={() => {
              setOpenConfirmModal(true);
              setOpenDropDown(false);
            }}
            icon={<MdOutlineDeleteSweep size={25} />}
            text="удалить"
            hoverColor={"red"}
          />
        </DropDownList>
      )}

      {openConfirmModal && (
        <ConfirmModal
          setOpenConfirmModal={setOpenConfirmModal}
          confirmText="Вы действительно хотите удалить пост?"
        >
          <ConfirmButton
            onClick={() => handleRemovePost(post_id, images)}
            isRed
            text="Удалить"
          />
          <ConfirmButton
            onClick={() => setOpenConfirmModal(false)}
            text="Отмена"
          />
        </ConfirmModal>
      )}
    </div>
  );
}
