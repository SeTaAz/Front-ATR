import { useState } from 'react';
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { Boton } from '../../../shared/components';

export default function LoginForm({
  error,
  isSubmitting,
  onSubmit,
  onForgotPassword,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="login-email"
          className="mb-1.5 block text-xs font-bold text-slate-700"
        >
          Correo electrónico
        </label>
        <div className="relative">
          <FiMail
            aria-hidden="true"
            className="absolute inset-y-0 left-3.5 my-auto text-sm text-verde-oscuro"
          />
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="username"
            required
            placeholder="usuario@artefrio.com"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-verde-oscuro focus:bg-white focus:outline-none focus:ring-2 focus:ring-verde-oscuro/20"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="login-password"
          className="mb-1.5 block text-xs font-bold text-slate-700"
        >
          Contraseña
        </label>
        <div className="relative">
          <FiLock
            aria-hidden="true"
            className="absolute inset-y-0 left-3.5 my-auto text-sm text-verde-oscuro"
          />
          <input
            id="login-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-12 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-verde-oscuro focus:bg-white focus:outline-none focus:ring-2 focus:ring-verde-oscuro/20"
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-sm text-slate-400 transition-colors hover:text-verde-oscuro focus:outline-none focus:ring-2 focus:ring-verde-oscuro"
          >
            {showPassword
              ? <FiEyeOff aria-hidden="true" />
              : <FiEye aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between py-1 text-xs">
        <label
          htmlFor="remember-me"
          className="flex cursor-pointer items-center font-medium text-slate-600"
        >
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-[#3B6D34]"
          />
          <span className="ml-2">Recordar contraseña</span>
        </label>
        <button
          type="button"
          onClick={onForgotPassword}
          className="cursor-pointer border-0 bg-transparent p-0 text-xs font-semibold text-verde-oscuro transition hover:text-lima focus:outline-none focus:underline"
        >
          ¿Olvidé mi contraseña?
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
        >
          {error}
        </p>
      )}

      <Boton
        type="submit"
        disabled={isSubmitting}
        style={{ width: '100%' }}
      >
        <span>{isSubmitting ? 'Ingresando...' : 'Ingresar'}</span>
        {!isSubmitting && <FiArrowRight aria-hidden="true" />}
      </Boton>
    </form>
  );
}
