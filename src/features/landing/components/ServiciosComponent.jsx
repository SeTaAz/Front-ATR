import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";
import Foto from "./ui/Foto";
import { WA } from "../hooks/useLanding";

// Enlace de WhatsApp con el servicio ya escrito en el mensaje
const waTo = (tema) => WA.split("?")[0] + "?text=" + encodeURIComponent("Hola, quisiera información sobre: " + tema);

// Agrega `img: "/servicios/cuartos-frios.jpg"` a cada servicio cuando tengas las fotos.
const SERVICIOS = [
  { t: "Cuartos Fríos", d: "Espacios diseñados para la conservación y almacenamiento de productos perecederos.",img:"https://i.pinimg.com/736x/fe/70/97/fe7097f245284ab1220247d92d5070c3.jpg" },
  { t: "Aplicaciones Industriales", d: "Sistemas de refrigeración a gran escala para procesos productivos.", img:"https://i.pinimg.com/1200x/45/06/ed/4506edcd357be880e4d4de3abe96ab67.jpg" },
  { t: "Exhibición Refrigerada", d: "Neveras, vitrinas y murales para exhibir tus productos con máxima frescura y atractivo visual.",img:"https://i.pinimg.com/1200x/34/4e/74/344e7467874b8a649430bd9fae0e02cc.jpg" },
  { t: "Aire Acondicionado", d: "Climatización eficiente para ambientes confortables y saludables.",img:"https://i.pinimg.com/736x/b7/a5/85/b7a5858c852f1f8ac7ef4d124bd8f1d0.jpg" },
  { t: "Mantenimiento Preventivo y Correctivo", d: "Servicios técnicos especializados para máximo rendimiento y vida útil.",img:"https://i.pinimg.com/736x/dc/76/fb/dc76fbc0c2a3db2f02349ac741df1f09.jpg" },
];

// Clases escritas completas para que Tailwind las detecte.
const span = (i) => (i < 3 ? "lg:col-span-2" : i === 4 ? "sm:col-span-2 lg:col-span-3" : "lg:col-span-3");

export default function ServiciosComponent() {
  return (
    <section id="servicios" className="bg-verde-claro px-4 py-16 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Servicios" title="Nuestras soluciones"
          text="Instalación, mantenimiento y soporte para cada necesidad de refrigeración y climatización." />
        <Reveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-6 md:mt-14">
          {SERVICIOS.map(({ t, d, img }, i) => (
            <a key={t} href={waTo(t)} target="_blank" rel="noreferrer"
              className={`group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-verde-oscuro/10 transition hover:-translate-y-1 hover:shadow-lg ${span(i)}`}>
              <Foto src={img} alt={t} label={t.toLowerCase()} className="h-44 w-full sm:h-52" />
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-xl font-bold text-verde-oscuro sm:text-2xl">{t}</h3>
                <p className="mt-3 flex-1 text-gray-700">{d}</p>
                <span className="mt-5 font-semibold text-verde-oscuro group-hover:underline">Solicitar información</span>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}