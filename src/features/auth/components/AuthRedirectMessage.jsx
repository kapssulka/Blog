import { Link } from "react-router-dom";
import cn from "classnames";

export default function AuthRedirectMessage({
  message,
  textLink,
  to,
  className,
}) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <p>{message}&nbsp;</p>
      <Link
        className="text-blue-500 underline hover:text-blue-600 duration-300"
        to={to}
      >
        {textLink}
      </Link>
    </div>
  );
}
