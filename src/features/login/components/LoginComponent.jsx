import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import LoginForm from './LoginForm';
import LoginModal from './LoginModal';
import backgroundLogin from '../assets/background-login.jpg';
import logoImg from '../../../shared/assets/Logo.jpeg';

export default function LoginComponent({
  error,
  isSubmitting,
  onSubmit,
  onForgotPassword,
  resetModal,
}) {
  return (
    <main className="relative flex min-h-screen flex-col bg-[#0f1d2d] md:flex-row">
      <Link
        to="/"
        className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-lg bg-slate-200/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow transition hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-verde-oscuro"
      >
        <FiArrowLeft aria-hidden="true" />
        Volver al inicio
      </Link>

      <section
        aria-label="Información de Artefrío"
        className="relative flex min-h-[300px] flex-col justify-end overflow-hidden bg-cover bg-center p-10 text-white md:min-h-screen md:w-1/2 lg:p-20"
        style={{ backgroundImage: `url(${backgroundLogin})` }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#3B6D34]/90 via-[#0f1d2d]/80 to-[#0f1d2d]/40"
        />
        <div className="relative z-10 max-w-lg space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-md lg:text-5xl">
            Control y confiabilidad industrial.
          </h1>
          <p className="text-sm leading-relaxed text-slate-200 drop-shadow lg:text-base">
            Gestión avanzada en refrigeración y mantenimiento térmico de alta
            precisión.
          </p>
        </div>
      </section>

      <section className="flex min-h-[calc(100vh-300px)] items-center justify-center bg-slate-50 p-8 md:min-h-screen md:w-1/2 lg:p-12">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 sm:p-10">
          <header className="mb-8 flex flex-col items-center text-center">
            <img
              src={logoImg}
              alt="Artefrío C.A."
              className="mb-2 h-auto w-48 object-contain"
            />
            <p className="text-[11px] font-bold text-slate-400">
              Login al Sistema de Control
            </p>
          </header>

          <LoginForm
            error={error}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            onForgotPassword={onForgotPassword}
          />

          <footer className="mt-6 text-center">
            <p className="text-[10px] font-bold text-slate-400">
              Uso exclusivo para personal autorizado
            </p>
          </footer>
        </div>
      </section>

      <LoginModal {...resetModal} />
    </main>
  );
}
