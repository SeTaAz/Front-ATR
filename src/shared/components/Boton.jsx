const estilos = {
  principal: 'border border-verde-oscuro bg-verde-oscuro text-white shadow-sm hover:border-verde-trans hover:bg-verde-trans active:bg-verde-trans focus:ring-verde-oscuro',
  secundario: 'border border-slate-300 bg-white text-slate-700 shadow-sm hover:border-verde-oscuro/40 hover:bg-verde-claro hover:text-verde-oscuro active:bg-verde-claro/80 focus:ring-verde-oscuro',
  peligro: 'border border-red-600 bg-red-600 text-white shadow-sm hover:border-red-700 hover:bg-red-700 active:bg-red-800 focus:ring-red-600',
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
      className={`inline-flex cursor-pointer items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${estilos[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
