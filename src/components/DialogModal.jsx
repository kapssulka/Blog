import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import cn from "classnames";

export default function DialogModal({
  children,
  isOpen,
  setIsOpen,
  heightCss,
  widthCss,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen?.(false)}
      className="relative z-50 "
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
