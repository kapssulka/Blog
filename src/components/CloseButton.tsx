import { IoClose } from "react-icons/io5";

interface CloseButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  position?: React.CSSProperties["position"];
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export default function CloseButton({
  onClick,
  position = "absolute",
  top,
  right,
  bottom,
  left,
}: CloseButtonProps) {
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
        "cursor-pointer z-20 p-1 bg-error hover:bg-error-hover rounded-[10px] duration-200"
      }
      onClick={onClick}
    >
      <IoClose size={25} />
    </button>
  );
}
