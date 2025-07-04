import AvatarIcon from "./AvatarIcon";
import AvatarText from "./AvatarText";

import cn from "classnames";

export default function AvatarWrapper({ className }) {
  return (
    <div className={cn("flex items-center", className)}>
      <AvatarIcon className="mr-5" />

      <AvatarText />
    </div>
  );
}
