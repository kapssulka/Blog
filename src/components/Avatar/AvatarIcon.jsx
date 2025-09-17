import cn from "classnames";

export default function AvatarIcon({
  className,
  classNameSize,
  src,
  alt = "User avatar",
}) {
  const emptyAvatarUrl = "/images/avatars/avatar.jpg";
  const urlAvatar = src || emptyAvatarUrl;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full",
        !classNameSize && "w-15 h-15",
        classNameSize,
        className
      )}
    >
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={urlAvatar}
        alt={alt}
      />
      <span className="absolute inset-0 bg-zinc-900/20" />
    </div>
  );
}
