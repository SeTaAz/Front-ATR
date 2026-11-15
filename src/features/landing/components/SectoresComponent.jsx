import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";
import Foto from "./ui/Foto";

// Agrega `img: "/sectores/alimentaria.jpg"` a cada sector cuando tengas las fotos.
const SECTORES = [
  { t: "Industria Alimentaria y Procesadora",img:'https://i.pinimg.com/1200x/74/02/d1/7402d1c8237a58ea0cacd55bc1b36bbf.jpg' },
  { t: "Comercio y Distribución de Alimentos",img:'https://i.pinimg.com/736x/27/c7/13/27c7133df5bd26497805a9eb935ce7ab.jpg' },
  { t: "Hospitalidad y Consumo Masivo",img:"https://i.pinimg.com/736x/d7/02/2a/d7022a8caf8121e9cd80dd0c1b9204e2.jpg" },
  { t: "Sector Farmacéutico y de Salud",img:"https://i.pinimg.com/736x/51/4c/86/514c860f8b92cfe4ecf1a0446cf03c59.jpg" },
  { t: "Logística y Almacenamiento",img:"https://i.pinimg.com/1200x/ae/fc/5a/aefc5aec917966b2dabad0e1cfdc4b32.jpg" },
   { t: "Hogar y empresarial",img:"https://i.pinimg.com/1200x/de/67/ff/de67ffb0d7120b095ffc5acb34774977.jpg" },
];

export default function SectoresComponent() {
  return (
    <section id="sectores" className="px-4 py-16 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Sectores" title="Sectores que atendemos"
          text="Mantenemos las operaciones de quienes confían en nosotros en condiciones óptimas de temperatura y climatización." />
        <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
          {SECTORES.map(({ t, img }) => (
            <div key={t} className="relative flex h-52 items-end overflow-hidden rounded-3xl p-5 sm:h-60 lg:h-72">
              {img
                ? <Foto src={img} alt={t} className="absolute inset-0 h-full w-full" />
                : <div className="absolute inset-0 bg-verde-oscuro" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="relative text-lg font-bold leading-snug text-white sm:text-xl">{t}</h3>
            </div>
          ))}
        </Reveal>
        <p className="mx-auto mt-8 max-w-3xl text-center text-base text-gray-700 md:mt-10 md:text-lg">
          Con <strong>más de 25 años de experiencia</strong> abordamos cada proyecto con amplios conocimientos y brindamos soluciones innovadoras, de calidad y sostenibles con el medioambiente.
        </p>
      </div>
    </section>
  ); 
}