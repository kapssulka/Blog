import type { SetState } from "../../types/utils.types.js";
import ShowPasswordItem from "./ShowPasswordItem.js";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // глаз и перечёркнутый глаз

interface ShowPasswordProps {
  showPassword: "text" | "password";
  setShowPassword: SetState<"text" | "password">;
  className?: string;
}

export default function ShowPassword({
  showPassword,
  setShowPassword,
  className,
}: ShowPasswordProps) {
  return (
    <div
      className={`flex items-center justify-center w-8 h-8 cursor-pointer 
      rounded-md p-1 bg-accent-grey hover:bg-accent-grey-hover
       hover:text-white transition-all duration-200 ${className}`}
    >
      {showPassword === "password" && (
        <ShowPasswordItem
          setShowPassword={() => setShowPassword("text")}
          children={<AiOutlineEye size={20} />}
        />
      )}
      {showPassword === "text" && (
        <ShowPasswordItem
          setShowPassword={() => setShowPassword("password")}
          children={<AiOutlineEyeInvisible size={20} />}
        />
      )}
    </div>
  );
}
