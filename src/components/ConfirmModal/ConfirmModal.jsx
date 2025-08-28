import ConfirmButton from "./ConfirmButton";

export default function ConfirmModal({ setOpenConfirmModal, onClick }) {
  const handleClick = (e) => {
    if (e.target === e.currentTarget) setOpenConfirmModal(false);
  };
  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <div className="bg-zinc-900 text-white rounded-lg shadow-lg p-6 w-full max-w-80">
        <div className="text-lg font-semibold mb-4">
          Вы действительно хотите удалить пост?
        </div>

        <div className="flex justify-between gap-4 mt-5">
          <ConfirmButton onClick={() => onClick()} isRed text="Удалить" />
          <ConfirmButton
            onClick={() => setOpenConfirmModal(false)}
            text="Отмена"
          />
        </div>
      </div>
    </div>
  );
}
