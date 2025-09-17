import { IoClose } from "react-icons/io5";

export default function CloseButton({
  onClick,
  position = "absolute",
  top,
  right,
  bottom,
  left,
}) {
  return (
    <button
      style={{
        position: position,
        top: top !== undefined ? `${top}px` : undefined,
        right: right !== undefined ? `${right}px` : undefined,
        bottom: bottom !== undefined ? `${bottom}px` : undefined,
        left: left !== undefined ? `${left}px` : undefined,
      }}
      className={
        "cursor-pointer p-1 bg-red-600 hover:bg-red-700 rounded-[10px] duration-200"
      }
      onClick={onClick}
    >
      <IoClose size={25} />
    </button>
  );
}
