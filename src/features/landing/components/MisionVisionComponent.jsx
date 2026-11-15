const MISION_VISION = [
  ["Misión", "Ofrecer soluciones de refrigeración comercial e industrial innovadoras y sostenibles, enfocadas en la eficiencia, seguridad y confiabilidad. Nos comprometemos a satisfacer las necesidades de nuestros clientes con un servicio de alta calidad, asegurando el cumplimiento de normativas y promoviendo el desarrollo responsable del sector."],
  ["Visión", "Ser la empresa referente y líder en refrigeración comercial e industrial en Venezuela, reconocida por la excelencia en instalación y mantenimiento de equipos, con soluciones que optimizan el consumo energético y prolongan la vida útil de los sistemas."],
];

export default function MisionVisionComponent() {
  return (
    <section id="mision-vision" className="bg-verde-claro px-4 py-14 sm:px-8 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 md:gap-8">
        {MISION_VISION.map(([titulo, texto]) => (
          <div key={titulo} className="rounded-3xl border border-verde-oscuro/10 border-t-4 border-t-lima bg-white p-6 shadow-sm sm:p-10">
            <h3 className="text-2xl font-bold text-verde-oscuro sm:text-3xl">{titulo}</h3>
            <p className="mt-4 leading-relaxed text-gray-700">{texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
