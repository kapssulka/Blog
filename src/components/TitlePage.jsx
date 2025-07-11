import { isValidElement } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TitlePage({
  text,
  iconComponent = false,
  linkTo = false,
}) {
  const navigate = useNavigate();
  const goToBack = () => {
    if (typeof linkTo === "boolean" && linkTo) {
      navigate(-1);
    } else navigate(linkTo);
  };

  if (isValidElement(iconComponent) && !linkTo) {
    return (
      <div className="flex items-center gap-x-2">
        {iconComponent}
        <h1 className="text-2xl">{text}</h1>
      </div>
    );
  } else if (isValidElement(iconComponent) && linkTo) {
    return (
      <Link
        to={linkTo}
        onClick={goToBack}
        className="inline-flex items-center gap-x-2 
        hover:underline"
      >
        {iconComponent}
        <h1 className="text-2xl">{text}</h1>
      </Link>
    );
  } else return <h1 className="text-2xl">{text}</h1>;
}
