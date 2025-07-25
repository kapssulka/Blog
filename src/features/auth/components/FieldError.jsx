import cn from "classnames";

export default function FieldError({ message = "", className = "" }) {
  return (
    <p
      className={cn(
        "rounded-[8px] border-red-400 border py-1 px-5 text-[14px]",
        className
      )}
    >
      {message}
    </p>
  );
}
