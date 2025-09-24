import { createPortal } from "react-dom";

export default function ConfirmModal({
  setOpenConfirmModal,
  confirmText = "Текст...",
  children,
}) {
  const handleClick = (e) => {
    if (e.target === e.currentTarget) setOpenConfirmModal(false);
  };
  return createPortal(
    <div
      onClick={handleClick}
      className="fixed inset-0  z-50 flex items-center justify-center bg-black/60"
    >
      <div className="relative bg-zinc-900 text-white rounded-lg shadow-lg p-6 w-full max-w-80">
        <div className="text-lg font-semibold mb-4">{confirmText}</div>

        <div className="flex justify-between gap-4 mt-5">{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
