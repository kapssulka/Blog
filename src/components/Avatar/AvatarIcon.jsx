import cn from "classnames";

export default function AvatarIcon({ className }) {
  return (
    <div
      className={cn(
        "w-15 h-15 rounded-full relative overflow-hidden",
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
