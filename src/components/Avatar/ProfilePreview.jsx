import { Link } from "react-router-dom";
import AvatarIcon from "./AvatarIcon";
import AvatarText from "./AvatarText";

import cn from "classnames";

export default function ProfilePreview({
  className,
  chatMessageEl = false,
  linkTo = false,
}) {
  if (linkTo) {
    return (
      <Link to={linkTo} className={cn("flex items-center", className)}>
        <AvatarIcon className="mr-5" />

        {!chatMessageEl && <AvatarText />}
        {chatMessageEl && chatMessageEl}
      </Link>
    );
  } else {
    return (
      <div className={cn("flex items-center", className)}>
        <AvatarIcon className="mr-5" />

        {!chatMessageEl && <AvatarText />}
        {chatMessageEl && chatMessageEl}
      </div>
    );
  }
}
