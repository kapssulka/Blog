import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineDeleteSweep } from "react-icons/md";
import DropDownList from "./DropDownList";
import DropDownItem from "./DropDownItem";
import DropDownOpenButton from "./DropDownOpenButton";

export default function DropDownMenu({ className }) {
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
            icon={<MdOutlineDeleteSweep size={25} />}
            text="удалить"
            hoverColor={"red"}
          />
        </DropDownList>
      )}
    </div>
  );
}
