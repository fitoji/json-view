import { useEffect, useRef } from "react";

export default function Modal({ open, onClose, children, title }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      aria-labelledby={title ? "modal-title" : undefined}
      className="
        fixed inset-0 z-50 m-auto
        bg-transparent shadow-none
        open:flex open:items-center open:justify-center
        backdrop:bg-black/20
        border-0 p-0
      "
    >
      <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 min-w-[300px]">
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-600"
        >
          X
        </button>
        {title && (
          <h2 id="modal-title" className="sr-only">
            {title}
          </h2>
        )}
        {children}
      </div>
    </dialog>
  );
}