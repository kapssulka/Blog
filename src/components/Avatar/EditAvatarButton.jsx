import cn from "classnames";

export default function EditAvatarButton({
  handleClick,
  icon,
  color = "bg-white",
  hoverColor = "hover:bg-blue-300",
  positionClass = "bottom-1 right-1",
  size = "w-[35px] h-[35px]",
}) {
  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "flex items-center justify-center cursor-pointer absolute rounded-full p-1 shadow-md duration-200",
          positionClass,
          color,
          hoverColor,
          size
        )}
      >
        {icon}
      </button>
    </div>
  );
}
