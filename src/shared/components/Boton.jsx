const estilos = {
  principal: 'bg-verde-oscuro text-white hover:bg-verde-trans focus:ring-verde-oscuro',
  secundario: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-verde-oscuro',
  peligro: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
};

export default function Boton({
  variant = 'principal',
  type = 'button',
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${estilos[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
