import { forwardRef } from "react";
import cn from "classnames";
export default forwardRef(function EditAvatarButton(
  {
    handleFileChange,
    handleClick,
    icon,
    color = "bg-white",
    hoverColor = "hover:bg-gray-300",
    positionClass = "bottom-1 right-1",
    padding = "p-2",
  },
  ref
) {
  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "cursor-pointer absolute rounded-full p-2 shadow-md duration-200",
          positionClass,
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
