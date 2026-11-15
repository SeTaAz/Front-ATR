import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";
import { WA, WA_SECUNDARIO } from "../hooks/useLanding";

const DATOS = [
  ["Dirección", "Colinas de Bello Monte, Caracas, Venezuela"],
  ["Correo", "info@artefrio.com.ve", "mailto:info@artefrio.com.ve"],
  ["Instagram", "@artefrio.ca", "https://www.instagram.com/artefrio.ca"],
];

export default function ContactoComponent() {
  return (
    <section id="contacto" className="bg-bg-verde px-4 py-16 text-center sm:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionTitle light center eyebrow="Contacto" title="¿Empezamos tu proyecto?"
            text="Cuéntanos qué necesitas y te asesoramos con la mejor solución de refrigeración o climatización para tu negocio." />
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a href={WA} target="_blank" rel="noreferrer"
              className="rounded-full bg-lima px-8 py-4 font-bold text-verde-oscuro transition hover:brightness-110">
              Escribir por WhatsApp
            </a>
            <a href={WA_SECUNDARIO} target="_blank" rel="noreferrer"
              className="rounded-full border-2 border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white/10">
              Segunda línea: +58 414 250 6540
            </a>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 text-left md:mt-16 md:grid-cols-3">
          {DATOS.map(([t, v, h]) => (
            <div key={t} className="rounded-2xl border border-white/15 bg-verde-trans p-5 sm:p-6">
              <p className="text-sm font-semibold text-lima">{t}</p>
              {h
                ? <a href={h} target="_blank" rel="noreferrer" className="mt-1 block break-words font-semibold text-white hover:underline">{v}</a>
                : <p className="mt-1 font-semibold text-white">{v}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}