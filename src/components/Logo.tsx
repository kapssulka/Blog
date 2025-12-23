import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes.js";

export default function Logo() {
  return (
    <Link
      to={ROUTES.HOME}
      className="text-3xl font-semibold tracking-tight text-white"
    >
      Blog<span className="text-accent">.</span>
    </Link>
  );
}
