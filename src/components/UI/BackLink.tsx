import React from "react";
import { useNavigate } from "react-router-dom";

interface BackLinkPageProps {
  text: string;
  iconComponent?: React.ReactElement;
  linkTo?: string;
  className?: string;
}

export default function BackLink({
  linkTo,
  iconComponent,
  text,
  className,
}: BackLinkPageProps) {
  const navigate = useNavigate();
  const goToBack = () => {
    if (!linkTo) {
      navigate(-1);
    } else navigate(linkTo);
  };
  return (
    <button
      onClick={goToBack}
      className={`
      cursor-pointer group inline-flex items-center gap-3
      px-4 py-2 rounded-xl
      bg-bg-primary/40 backdrop-blur-sm
      border border-white/5
      transition-all duration-200

      hover:bg-bg-primary/70
      hover:border-white/10
      hover:shadow-md
      active:scale-[0.98]
      ${className}
        `}
    >
      <div
        className="
      flex items-center justify-center
      w-8 h-8 rounded-lg
      bg-white/5
      transition-all duration-200

      group-hover:-translate-x-0.5
      group-hover:bg-white/10
    "
      >
        {iconComponent}
      </div>

      <h1
        className="
      text-lg font-semibold tracking-tight
      text-white/90
      transition-colors duration-200

      group-hover:text-white
    "
      >
        {text}
      </h1>
    </button>
  );
}
