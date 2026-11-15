import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";

const MOTIVOS = [
  ["Experiencia comprobada", "Más de 25 años en el sector de la refrigeración y climatización."],
  ["Atención personalizada", "Diseñamos proyectos a la medida según las necesidades de cada cliente."],
  ["Tecnología de punta", "Trabajamos con equipos de marcas reconocidas a nivel mundial."],
  ["Servicio técnico especializado", "Instalación, mantenimiento y soporte garantizado."],
];

export default function PorqueComponent() {
  return (
    <section id="porque" className="bg-bg-verde px-4 py-16 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle light eyebrow="¿Por qué elegirnos?" title="Soluciones diseñadas para potenciar tu negocio" />
        <Reveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-14">
          {MOTIVOS.map(([t, d]) => (
            <div key={t} className="rounded-3xl border border-white/15 bg-verde-trans p-6 sm:p-8">
              <span className="block h-1 w-10 rounded bg-lima" />
              <h3 className="mt-5 text-lg font-bold text-white sm:text-xl">{t}</h3>
              <p className="mt-3 text-white/75">{d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}