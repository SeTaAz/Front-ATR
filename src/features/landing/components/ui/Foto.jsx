// Muestra la imagen si hay `src`; si no, un espacio reservado. Pásale el tamaño y el redondeo por className.
export default function Foto({ src, alt = "", label = "imagen", className = "" }) {
  if (src) return <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />;
  return (
    <div role="img" aria-label={alt || label}
      className={`flex items-center justify-center border-2 border-dashed border-verde-oscuro/30 bg-verde-claro px-2 text-center text-xs font-semibold text-verde-oscuro/60 sm:text-sm ${className}`}>
      Foto: {label}
    </div>
  );
}