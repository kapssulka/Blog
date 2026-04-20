import { isValidElement } from "react";
import { Link, useNavigate } from "react-router-dom";

interface TitlePageProps {
  text: string;
  iconComponent?: React.ReactElement;
  linkTo?: string;
}

export default function TitlePage({ text, iconComponent }: TitlePageProps) {
  return (
    <div className="flex items-center gap-x-2">
      {iconComponent}
      <h1 className="text-2xl">{text}</h1>
    </div>
  );
}
