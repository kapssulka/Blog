import { useEffect, useState } from "react";
import BurgerIcon from "./BurgerIcon.js";
import BurgerNavWrapper from "./BurgerNavWrapper.js";

interface BurgerMenuProps {}

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const body = document.body;
    body.style.overflow = open ? "hidden" : "";

    return () => {
      body.style.overflow = "";
    };
  }, [open]);
  return (
    <div className="block md:hidden">
      <BurgerIcon open={open} setOpen={setOpen} />
      <BurgerNavWrapper open={open} />
    </div>
  );
}
