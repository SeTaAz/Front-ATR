import { useEffect, useId, useRef } from 'react';

export default function Modal({ isOpen, onClose, title, children, footer }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
      }}
      onClose={() => {
        if (isOpen) onClose();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border-0 bg-white p-0 text-slate-800 shadow-2xl backdrop:bg-slate-950/50"
    >
      <header className="border-b border-slate-200 px-6 py-5">
        <h2 id={titleId} className="text-lg font-bold text-verde-oscuro">
          {title}
        </h2>
      </header>

      <div className="px-6 py-5">{children}</div>

      {footer && (
        <footer className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
          {footer}
        </footer>
      )}
    </dialog>
  );
}
