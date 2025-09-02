import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineDeleteSweep } from "react-icons/md";
import DropDownList from "./DropDownList";
import DropDownItem from "./DropDownItem";
import DropDownOpenButton from "./DropDownOpenButton";
import { removeFromSupabaseStorage } from "../../supabase/services/storageService";
import { useDispatch } from "react-redux";
import { removePost } from "../../redux/slices/postsSlice";
import { toast } from "sonner";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { deleteAllLike } from "../../redux/slices/postLikesSlice";

export default function DropDownMenu({ className, post_id, images = [] }) {
  const dispatch = useDispatch();

  const [openDropDown, setOpenDropDown] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const dropMenu = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!openDropDown) return;
    const handleClick = (e) => {
      if (!dropMenu.current || !buttonRef.current) return;
      if (buttonRef.current.contains(e.target)) return;
      if (!dropMenu.current.contains(e.target)) setOpenDropDown(false);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [openDropDown]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        if (openDropDown) setOpenDropDown(false);
        if (openConfirmModal) setOpenConfirmModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openDropDown, openConfirmModal]);

  const handleRemovePost = async (post_id, images) => {
    try {
      const pathArr = images.map((item) => item.path);

      const { data, error } = await removeFromSupabaseStorage(pathArr);
      if (error) throw new Error(`Ошибка: ${error}`);

      await dispatch(deleteAllLike(post_id)).unwrap();
      await dispatch(removePost(post_id)).unwrap();

      toast.success("Пост успешно удалён!");
    } catch (error) {
      toast.error("Ошибка с удалением поста!");
      console.error(error.message);
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
          onClick={() => handleRemovePost(post_id, images)}
          setOpenConfirmModal={setOpenConfirmModal}
          buttonRef={buttonRef}
        />
      )}
    </div>
  );
}
