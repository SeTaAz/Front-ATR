import { LOGO } from "../../data/logo";

// Logo estático con los colores originales (menú y pie de página).
export default function Logo({ className = "h-9 w-auto" }) {
  const P = (o, i) => <path key={i} d={o.d} transform={`translate(${o.x} ${o.y})`} fill={o.f} />;
  return (
    <svg viewBox="190 185 1700 310" className={className} role="img" aria-label="Artefrío C.A.">
      {LOGO.letters.map(P)}{P(LOGO.outline, "o")}{P(LOGO.mercury, "m")}{P(LOGO.fan, "f")}{LOGO.ca.map(P)}
    </svg>
  );
}