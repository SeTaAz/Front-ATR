import { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiX,
} from 'react-icons/fi';

const variantes = {
  success: {
    Icon: FiCheckCircle,
    role: 'status',
    className: 'border-green-200 bg-green-50 text-green-800',
  },
  error: {
    Icon: FiAlertCircle,
    role: 'alert',
    className: 'border-red-200 bg-red-50 text-red-800',
  },
  info: {
    Icon: FiInfo,
    role: 'status',
    className: 'border-blue-200 bg-blue-50 text-blue-800',
  },
};

export default function Notificacion({
  message,
  variant = 'success',
  onClose,
  duration = 4000,
}) {
  useEffect(() => {
    if (!message || !onClose || duration <= 0) return undefined;

    const timeoutId = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timeoutId);
  }, [message, onClose, duration]);

  if (!message) return null;

  const { Icon, role, className } = variantes[variant] ?? variantes.success;

  return (
    <div
      role={role}
      aria-live={role === 'alert' ? 'assertive' : 'polite'}
      className={`fixed right-4 top-4 z-50 flex max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${className}`}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar notificación"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current"
        >
          <FiX aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
