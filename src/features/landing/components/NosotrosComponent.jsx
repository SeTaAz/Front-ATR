import CountUp from "@/shared/components/CountUp";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";
import Foto from "./ui/Foto";

const FOTO_NOSOTROS = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4NPmahDBHScJvwJB2YHB0haNOVOdmTBepvGZ6-nTKA&s=10"; // reemplázala por una foto propia

const VALORES = [
  ["Responsabilidad", "Cumplimos con los tiempos y necesidades de cada cliente, asegurando calidad en cada proyecto."],
  ["Compromiso", "Trabajamos con dedicación, transparencia y un enfoque centrado en la excelencia."],
  ["Confiabilidad", "Ofrecemos seguridad en cada servicio, respaldados por nuestra experiencia y conocimientos."],
];

const countCls = "count-up-text text-4xl font-bold text-verde-oscuro sm:text-5xl";
const labelCls = "mt-2 text-sm text-gray-600";

// Cifra con etiqueta. `children` reemplaza al contador cuando el valor es texto.
const Stat = ({ label, children }) => (
  <div className="px-6 py-6 text-center sm:py-2">
    {children}
    <p className={labelCls}>{label}</p>
  </div>
);

const NosotrosComponent = () => {
  return (
    <div className="w-full">
      {/* 1. Presentación */}
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-16 sm:px-8 md:grid-cols-2 md:gap-16 md:pt-28">
        <Reveal>
          <SectionTitle eyebrow="Nosotros" title="Somos Artefrio" />
          <p className="mt-6 text-base leading-relaxed text-gray-700 md:text-lg">
            Nos especializamos en <strong>refrigeración comercial e industrial</strong>: instalación y mantenimiento preventivo y correctivo con altos estándares de calidad. Construimos relaciones de confianza para que cada sistema funcione con máxima eficiencia, durabilidad y sostenibilidad.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
            Atendemos almacenes refrigerados, plantas procesadoras de alimentos, embotelladoras, supermercados, restaurantes, hoteles, farmacias y más.
          </p>
        </Reveal>

        <Reveal delay={120} className="relative">
          <div aria-hidden className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-3xl bg-verde-claro sm:-bottom-6 sm:-right-6" />
          <Foto src={FOTO_NOSOTROS} alt="Equipo de Artefrio" label="equipo o instalación"
            className="h-64 w-full rounded-3xl sm:h-80 md:h-[26rem]" />
        </Reveal>
      </div>

      {/* 2. Cifras */}
      <Reveal className="mx-auto mt-14 max-w-5xl px-4 sm:px-8 md:mt-20">
        <div className="grid divide-y divide-verde-oscuro/15 rounded-3xl bg-verde-claro py-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-8">
          <Stat label="años de experiencia">
            <CountUp from={0} to={25} mode="count" easing="spring" format="standard" separator="," suffix="+"
              direction="up" duration={2.5} delay={0} trigger="view" replayOnHover className={countCls} />
          </Stat>
          <Stat label="sectores que atendemos">
            <CountUp from={0} to={5} mode="count" easing="spring" format="standard" separator=","
              direction="up" duration={2.5} delay={0} trigger="view" replayOnHover className={countCls} />
          </Stat>
          <Stat label="sede, con proyectos en otras ciudades">
            <p className={countCls}>Caracas</p>
          </Stat>
        </div>
      </Reveal>

      {/* 3. Valores */}
      <Reveal className="mx-auto max-w-7xl px-4 py-16 sm:px-8 md:py-24">
        <h3 className="text-3xl font-black text-verde-oscuro sm:text-4xl">Lo que nos guía</h3>
        <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {VALORES.map(([titulo, texto]) => (
            <div key={titulo} className="border-t-4 border-lima pt-5">
              <h4 className="text-xl font-bold text-verde-oscuro sm:text-2xl">{titulo}</h4>
              <p className="mt-3 text-gray-700">{texto}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
};

export default NosotrosComponent;