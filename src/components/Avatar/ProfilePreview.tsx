import { Link } from "react-router-dom";
import AvatarIcon from "./AvatarIcon.js";

import AvatarText from "./AvatarText.js";

import cn from "classnames";
import type { ElementType } from "react";

interface ProfilePreviewProps {
  className?: string;
  chatMessageEl?: React.ReactNode;
  linkTo?: string;
  avtor?: string;
  create_at?: string;
  avatar_url?: string;
}

export default function ProfilePreview({
  className,
  chatMessageEl = false,
  linkTo,
  avtor = "",
  create_at = "",
  avatar_url = "",
}: ProfilePreviewProps) {
  const Wrapper = (linkTo ? Link : "div") as ElementType;
  const wrapperProps = linkTo ? { to: linkTo } : {};

  return (
    <Wrapper
      className={cn("inline-flex items-center", className)}
      {...wrapperProps}
    >
      <AvatarIcon className="mr-5" src={avatar_url} />
      {chatMessageEl || <AvatarText create_at={create_at} avtor={avtor} />}
    </Wrapper>
  );
}
