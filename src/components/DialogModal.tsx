import { Dialog, DialogPanel } from "@headlessui/react";
import cn from "classnames";
import type { SetState } from "../types/utils.types.js";
import type {
  TailwindClass,
  TailwindHeight,
  TailwindWidth,
} from "../types/tailwind.js";
import { AnimatePresence, motion } from "motion/react";
import {
  modalTransition,
  modalVariants,
} from "../animations/modalAnimations.js";

interface DialogModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen?: SetState<boolean>;
  heightCss?: TailwindClass<TailwindHeight>;
  widthCss?: TailwindClass<TailwindWidth>;
}

export default function DialogModal({
  children,
  isOpen,
  setIsOpen,
  // высота через tailwind
  heightCss,
  // ширина через tailwind
  widthCss,
}: DialogModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen?.(false)}
          className="relative z-40 "
        >
          <motion.div
            key="overlay"
            variants={modalVariants}
            initial="bgClose"
            animate="bgOpen"
            exit="bgClose"
            transition={modalTransition}
            className="fixed inset-0 bg-zinc-900/70"
          />
          <motion.div
            variants={modalVariants}
            initial="close"
            animate="open"
            exit="close"
            transition={modalTransition}
            className={cn(
              "fixed inset-0 m-auto bg-bg-secondary rounded-2xl shadow-lg",
              widthCss ?? "max-w-lg",
              heightCss ?? "h-max"
            )}
          >
            <DialogPanel className="w-full h-full text-white border-2 border-bg-main  rounded-2xl">
              {children}
            </DialogPanel>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
