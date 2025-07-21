import cn from "classnames";

export default function AvatarIcon({ className, classNameSize }) {
  return (
    <div
      className={cn(
        "rounded-full relative overflow-hidden",
        !classNameSize && "w-15 h-15",
        classNameSize,
        className
      )}
    >
      <img
        className="w-full h-full absolute left-0 top-0"
        src="./../../../../images/avatars/avatar-cat.jpg"
      />
    </div>
  );
}
