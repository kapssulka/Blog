import cn from "classnames";
import type { SetState } from "../../types/utils.types.js";
import {
  motion,
  useAnimation,
  type TargetAndTransition,
  type Variants,
} from "motion/react";
import { useEffect, useState } from "react";

interface BurgerIconProps {
  open: boolean;
  setOpen: SetState<boolean>;
}

export default function BurgerIcon({ open, setOpen }: BurgerIconProps) {
  const lineTop = useAnimation();
  const lineCenter = useAnimation();
  const lineBottom = useAnimation();

  const lineStyle = "w-full h-1 bg-white rounded";

  const openAnimate = async () => {
    lineTop.start({ top: 0 });
    await lineBottom.start({ bottom: 0 });
    await lineCenter.start({ opacity: 0, transition: { duration: 0 } });
    lineTop.start({ rotate: 45 });
    lineBottom.start({ rotate: -45 });
  };
  const closeAnimate = async () => {
    lineTop.start({ rotate: 0 });
    await lineBottom.start({ rotate: 0 });
    await lineCenter.start({ opacity: 1, transition: { duration: 0 } });
    lineTop.start({ top: 16 });
    lineBottom.start({ bottom: 16 });
  };

  const handleClick = () => {
    if (open) closeAnimate();
    else openAnimate();

    setOpen((prev) => !prev);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col justify-center w-12 h-12 bg-bg-secondary"
    >
      <div className="relative">
        <motion.div
          animate={lineTop}
          className={cn(lineStyle, "absolute top-4")}
        ></motion.div>

        <motion.div animate={lineCenter} className={cn(lineStyle)}></motion.div>

        <motion.div
          animate={lineBottom}
          className={cn(lineStyle, "absolute bottom-4")}
        ></motion.div>
      </div>
    </div>
  );
}
