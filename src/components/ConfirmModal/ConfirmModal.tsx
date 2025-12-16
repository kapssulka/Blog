import { createPortal } from "react-dom";
import type { SetState } from "../../types/utils.types.js";
import { AnimatePresence, motion, type Variants } from "motion/react";
import {
  modalTransition,
  modalVariants,
} from "../../animations/modalAnimations.js";

interface ConfirmModalProps {
  setOpenConfirmModal: SetState<boolean>;
  confirmText: string;
  children: React.ReactNode;
  isOpen: boolean;
}

export default function ConfirmModal({
  setOpenConfirmModal,
  confirmText = "Текст...",
  children,
  isOpen,
}: ConfirmModalProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setOpenConfirmModal(false);
  };

  const modalComtainer = document.getElementById("modal");
  if (!modalComtainer) return;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalVariants}
          initial="bgClose"
          animate="bgOpen"
          exit="bgClose"
          transition={modalTransition}
          onClick={handleClick}
          className="fixed inset-0  z-50 flex items-center justify-center bg-black/60"
        >
          <motion.div
            variants={modalVariants}
            initial="close"
            animate="open"
            exit="close"
            transition={modalTransition}
            className="relative bg-bg-secondary text-white rounded-lg shadow-lg p-6 w-full max-w-80"
          >
            <div className="text-lg font-semibold mb-4">{confirmText}</div>

            <div className="flex justify-between gap-4 mt-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalComtainer
  );
}
