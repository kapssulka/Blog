import type { Transition, Variants } from "motion/react";

export const modalVariants: Variants = {
  close: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0 },
  bgClose: { opacity: 0 },
  bgOpen: { opacity: 1 },
};

export const modalTransition: Transition = {
  duration: 0.3,
  ease: "easeOut",
};
