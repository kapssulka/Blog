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
      y: "calc(-85vh + 100px)",
    },
  };
  const variantsBg: Variants = {
    open: {
      opacity: 1,
      visibility: "visible",
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
        className="absolute left-0 top-0 bg-zinc-900/70 w-screen h-screen"
      ></motion.div>
      <motion.div
        variants={variants}
        animate={open ? "open" : "close"}
        initial="close"
        transition={{ duration: 0.6 }}
        className="
            absolute 
            left-0 top-0
            w-screen h-[85vh]
            bg-bg-secondary 
            shadow-[0_4px_16px_rgba(0,0,0,0.3)]
            rounded-b-2xl 
            px-10 py-3 pt-[100px]
            backdrop-blur-sm"
      >
        <BurgerNav />
      </motion.div>
    </div>
  );
}
