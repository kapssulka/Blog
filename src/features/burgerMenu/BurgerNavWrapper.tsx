import type { Variants } from "motion/react";
import { motion } from "motion/react";
import BurgerNav from "./BurgerNav.js";

interface BurgerNavWrapperProps {
  open: boolean;
}

export default function BurgerNavWrapper({ open }: BurgerNavWrapperProps) {
  const variants: Variants = {
    open: {
      y: 0,
    },
    close: {
      y: "-100%",
    },
  };
  const variantsBg: Variants = {
    open: {
      opacity: 1,
      visibility: "visible",
      transition: { duration: 0.2, delay: 0.2 },
    },
    close: {
      opacity: 0,
      visibility: "hidden",
    },
  };

  return (
    <div>
      <motion.div
        variants={variantsBg}
        animate={open ? "open" : "close"}
        className="absolute -z-10 left-0 top-0 bg-zinc-900/70 w-screen h-screen"
      ></motion.div>
      <motion.div
        variants={variants}
        animate={open ? "open" : "close"}
        initial="close"
        transition={{ duration: 0.4 }}
        className="
            absolute 
            -z-10
            left-0 top-0
            w-screen h-[85vh]
            bg-bg-secondary 
            rounded-b-2xl 
            px-10  pt-[100px] pb-5
            overflow-y-auto
            "
      >
        <BurgerNav />
      </motion.div>
    </div>
  );
}
