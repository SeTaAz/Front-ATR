import { useEffect, useId, useRef } from 'react';
import { FiCheckCircle, FiX } from 'react-icons/fi';
import { Boton } from '../../../shared/components';

export default function LoginModal({
  isOpen,
  emailSent,
  resetEmail,
  setResetEmail,
  isSending,
  error,
  onClose,
  onSubmit,
}) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const formId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => event.preventDefault()}
      onClose={() => {
        if (isOpen) onClose();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border border-slate-200 bg-white p-0 text-slate-800 shadow-2xl backdrop:bg-slate-900/60"
    >
      <header className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-5">
        <h2 id={titleId} className="text-xl font-black text-slate-900">
          {emailSent ? '¡Correo enviado!' : 'Recuperar contraseña'}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar modal"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-verde-oscuro focus:outline-none focus:ring-2 focus:ring-verde-oscuro"
        >
          <FiX aria-hidden="true" />
        </button>
      </header>

      <div className="px-6 py-5">
        {emailSent ? (
          <div className="space-y-4 py-2 text-center">
            <FiCheckCircle
              className="mx-auto h-12 w-12 text-verde-oscuro"
              aria-hidden="true"
            />
            <p className="text-xs leading-relaxed text-slate-500">
              La simulación se completó para{' '}
              <strong className="text-slate-800">{resetEmail}</strong>. No se envió
              ningún correo real.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-xs leading-relaxed text-slate-500">
              Ingresa tu correo institucional para simular el proceso de
              restablecimiento de contraseña.
            </p>
            <form id={formId} onSubmit={onSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="reset-email"
                  className="mb-1.5 block text-xs font-bold text-slate-700"
                >
                  Correo electrónico
                </label>
                <input
                  id="reset-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={resetEmail}
                  onChange={(event) => setResetEmail(event.target.value)}
                  placeholder="usuario@artefrio.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-verde-oscuro focus:bg-white focus:outline-none focus:ring-2 focus:ring-verde-oscuro/20"
                />
              </div>
              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
                >
                  {error}
                </p>
              )}
            </form>
          </>
        )}
      </div>

      <footer className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
        {emailSent ? (
          <Boton variant="secundario" onClick={onClose}>
            Volver al login
          </Boton>
        ) : (
          <Boton type="submit" form={formId} disabled={isSending}>
            {isSending ? 'Enviando instrucciones...' : 'Enviar enlace de recuperación'}
          </Boton>
        )}
      </footer>
    </dialog>
  );
}
