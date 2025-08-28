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

export default function DropDownMenu({ className, postId, images = [] }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const dropMenu = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (!dropMenu.current || !buttonRef.current) return;
      if (buttonRef.current.contains(e.target)) return;
      if (!dropMenu.current.contains(e.target)) setOpen(false);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  const handleRemovePost = async (postId, images) => {
    try {
      const pathArr = images.map((item) => item.path);

      const { data, error } = await removeFromSupabaseStorage(pathArr);
      if (error) throw new Error(`Ошибка: ${error}`);

      await dispatch(removePost(postId)).unwrap();

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
        open={open}
        setOpen={setOpen}
      />

      {open && (
        <DropDownList ref={dropMenu}>
          <DropDownItem
            onClick={() => handleRemovePost(postId, images)}
            icon={<MdOutlineDeleteSweep size={25} />}
            text="удалить"
            hoverColor={"red"}
          />
        </DropDownList>
      )}
    </div>
  );
}
