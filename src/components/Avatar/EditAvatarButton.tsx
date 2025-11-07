import { forwardRef } from "react";
import cn from "classnames";
import type {
  PositionClassObject,
  TailwindBgColor,
  TailwindBgHoverColor,
  TailwindBgPadding,
} from "../../types/tailwind.js";

type RefType = React.ForwardedRef<HTMLInputElement>;

interface EditAvatarButtonProps {
  handleFileChange: React.ChangeEventHandler<HTMLInputElement>;
  // handleClick: () => void;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactNode;
  color?: TailwindBgColor;
  hoverColor?: TailwindBgHoverColor;
  positionClass?: PositionClassObject;
  padding?: TailwindBgPadding;
}

export default forwardRef(function EditAvatarButton(
  {
    handleFileChange,
    handleClick,
    icon,
    color = "bg-white",
    hoverColor = "hover:bg-gray-300",
    positionClass = { right: "right-1", bottom: "bottom-1" },
    padding = "p-2",
  }: EditAvatarButtonProps,
  ref: RefType
) {
  const positionClassToString = Object.values(positionClass)
    .filter(Boolean) // убираем undefined
    .join(" ");

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "cursor-pointer absolute rounded-full p-2 shadow-md duration-200",
          positionClassToString,
          padding,
          color,
          hoverColor
        )}
      >
        {icon}
      </button>
      <input
        type="file"
        ref={ref}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
});
