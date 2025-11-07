import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import cn from "classnames";
import type { SetState } from "../types/utils.types.js";
import type { TailwindHeight, TailwindWidth } from "../types/tailwind.js";

interface DialogModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen?: SetState<boolean>;
  heightCss?: TailwindHeight;
  widthCss?: TailwindWidth;
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
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen?.(false)}
      className="relative z-40 "
    >
      <DialogBackdrop className="fixed inset-0 bg-zinc-900/70" />
      <DialogPanel
        className={cn(
          "fixed inset-0  m-auto  w-full border-2 border-amber-50 rounded-2xl text-amber-50 bg-zinc-900 ",
          heightCss ? heightCss : "h-max",
          widthCss ? widthCss : "max-w-lg"
        )}
      >
        {children}
      </DialogPanel>
    </Dialog>
  );
}
