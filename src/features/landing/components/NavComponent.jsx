import { useState } from "react";
import { Link } from "react-router-dom";
import { LOGO } from "../data/logo";

const links = [["Nosotros", "#nosotros"], ["Servicios", "#servicios"], ["Sectores", "#sectores"], ["Contacto", "#contacto"]];

// `visible` pasa a true cuando el hero termina su animación.
export default function NavComponent({ visible }) {
  const [open, setOpen] = useState(false); // menú del celular
  const P = (o, i) => <path key={i} d={o.d} transform={`translate(${o.x} ${o.y})`} fill={o.f} />;
  return (
    <header
      aria-hidden={!visible}
      className="fixed inset-x-0 top-0 z-40 h-16 border-b border-green-900/10 bg-white/90 backdrop-blur transition-transform duration-700"
      style={{ transform: visible ? "none" : "translateY(-110%)", pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-8">
        <a href="#top" aria-label="Inicio">
          <svg viewBox="190 185 1700 310" className="h-9 w-auto">
            {LOGO.letters.map(P)}{P(LOGO.outline, "o")}{P(LOGO.mercury, "m")}{P(LOGO.fan, "f")}{LOGO.ca.map(P)}
          </svg>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-neutral-700 md:flex">
          {links.map(([t, h]) => (
            <a key={t} href={h} className="transition-colors hover:text-lima">{t}</a>
          ))}
          <Link to="/login"
            className="rounded-full bg-verde-oscuro px-5 py-2 text-white transition-colors hover:bg-lima">
            Iniciar sesión
          </Link>
        </nav>

        {/* Botón de menú (solo celular) */}
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-verde-oscuro md:hidden">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Menú desplegable (solo celular) */}
      {open && visible && (
        <nav className="absolute inset-x-0 top-full flex flex-col border-b border-green-900/10 bg-white px-4 pb-5 pt-2 md:hidden">
          {links.map(([t, h]) => (
            <a key={t} href={h} onClick={() => setOpen(false)} className="py-3 text-base font-semibold text-neutral-700 hover:text-lima">{t}</a>
          ))}
          <Link to="/login"
            className="mt-2 rounded-full bg-verde-oscuro px-5 py-3 text-center font-semibold text-white hover:bg-lima">
            Iniciar sesión
          </Link>
        </nav>
      )}
    </header>
  );
}
