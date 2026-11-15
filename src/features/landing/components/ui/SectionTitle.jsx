// Encabezado reutilizable de sección. `light` = versión para fondos oscuros.
export default function SectionTitle({ eyebrow, title, text, light = false, center = false }) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <p className={`text-sm font-semibold ${light ? "text-lima" : "text-verde-oscuro/70"}`}>{eyebrow}</p>
      )}
      <h2 className={`mt-2 text-3xl font-black sm:text-4xl md:text-5xl ${light ? "text-white" : "text-verde-oscuro"}`}>{title}</h2>
      {text && (
        <p className={`mt-4 max-w-2xl text-base md:text-lg ${center ? "mx-auto" : ""} ${light ? "text-white/80" : "text-gray-700"}`}>{text}</p>
      )}
    </div>
  );
}