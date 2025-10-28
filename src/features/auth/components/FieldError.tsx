import cn from "classnames";

interface FieldErrorProps {
  message: string;
  className?: string;
}

export default function FieldError({ message, className }: FieldErrorProps) {
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
