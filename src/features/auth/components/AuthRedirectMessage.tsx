import { Link } from "react-router-dom";
import cn from "classnames";

interface AuthRedirectMessageProps {
  message: string;
  textLink: string;
  to: string;
  className?: string;
}

export default function AuthRedirectMessage({
  message,
  textLink,
  to,
  className,
}: AuthRedirectMessageProps) {
  return (
    <div className={cn("text-center", className)}>
      <span>{message}&nbsp;</span>
      <Link
        className="text-blue-500 underline hover:text-blue-600 duration-300"
        to={to}
      >
        {textLink}
      </Link>
    </div>
  );
}
