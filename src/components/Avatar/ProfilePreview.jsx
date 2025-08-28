import { Link } from "react-router-dom";
import AvatarIcon from "./AvatarIcon";
import AvatarText from "./AvatarText";
import cn from "classnames";

export default function ProfilePreview({
  className,
  chatMessageEl = false,
  linkTo = false,
  avtor,
  create_at,
}) {
  const Wrapper = linkTo ? Link : "div"; // динамический контейнер
  const wrapperProps = linkTo ? { to: linkTo } : {};

  return (
    <Wrapper
      className={cn("inline-flex items-center", className)}
      {...wrapperProps}
    >
      <AvatarIcon className="mr-5" />
      {chatMessageEl || <AvatarText create_at={create_at} avtor={avtor} />}
    </Wrapper>
  );
}
