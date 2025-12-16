import cn from "classnames";

interface ConfirmButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  text: string;
  isRed?: boolean;
  isGreen?: boolean;
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ConfirmButton({
  text = "Кнопка",
  isRed,
  isGreen,
  className,
  onClick,
  ...props
}: ConfirmButtonProps) {
  return (
    <button
      {...props}
      onClick={onClick}
      className={cn(
        "cursor-pointer flex-1  text-white px-4 py-2 rounded transition",
        className,
        isRed && "bg-error hover:bg-error-hover",
        isGreen && "bg-success hover:bg-success-hover",
        !isRed && !isGreen && "bg-accent-grey hover:bg-accent-grey-hover"
      )}
    >
      {text}
    </button>
  );
}
