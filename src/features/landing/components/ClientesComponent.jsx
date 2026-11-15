import { useMemo } from "react";
import OrbitImages from "@/shared/components/OrbitImages";
import SectionTitle from "./ui/SectionTitle";

// Órbita de logos de clientes. El tamaño llega desde useLanding según el ancho de pantalla.
export default function ClientesComponent({ orbit, clientes }) {
  // Acepta strings u objetos { src, alt }: así se pueden poner nombres reales en data/clientes.js.
  const imagenes = useMemo(
    () =>
      clientes.map((cliente, i) =>
        typeof cliente === "string"
          ? { src: cliente, alt: `Cliente ${i + 1} de Artefrío` }
          : cliente,
      ),
    [clientes],
  );

  return (
    <section
      id="clientes"
      aria-label="Algunos de nuestros clientes"
      className="overflow-hidden bg-verde-claro px-4 py-16 sm:px-8 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Clientes"
          title="Empresas que confían en nosotros"
          text="Instalaciones, comercios e industrias que mantienen sus operaciones con nuestros equipos y servicio técnico."
        />
      </div>

      <div className="mt-10 md:mt-14">
        <OrbitImages
          key={`${orbit.radiusX}-${orbit.itemSize}`}
          images={imagenes}
          altPrefix="Cliente de Artefrío"
          shape="ellipse"
          radiusX={orbit.radiusX}
          radiusY={orbit.radiusY}
          rotation={-8}
          duration={30}
          itemSize={orbit.itemSize}
          depth={0.6}
          showPath
          pathColor="rgba(59,109,52,0.25)"
          pathWidth={2}
          pathDash={6}
          centerContent={
            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white text-center shadow-md ring-1 ring-verde-oscuro/10 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
              <span className="text-lg font-black leading-none text-verde-oscuro sm:text-2xl">
                25+
              </span>
              <span className="mt-1 text-[8px] font-semibold uppercase tracking-widest text-subtitulo sm:text-[10px]">
                Años
              </span>
            </div>
          }
          itemRadius={18}
          shadow={0.45}
          hoverScale={1.08}
          hoverSpeed={0.3}
          direction="normal"
          easing="linear"
          fill
          alignToPath={false}
          draggable
          clickToFront
          paused={false}
          intro
        />

        <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-widest text-verde-oscuro/40 md:text-xs">
          Arrastra para girar
        </p>
      </div>
    </section>
  );
}

