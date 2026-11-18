import { useMemo, useState } from "react";
import { FiExternalLink, FiFilter, FiPlus, FiSearch } from "react-icons/fi";
import { Boton, BotonCrear, ModalFormulario } from "../../../shared/components";

const initialCases = [
  { id: "GAR-2026-142", client: "Planta Procesadora Sur", site: "Línea de Congelación A", date: "24 Nov 2026", category: "Repuesto", status: "Pendiente", description: "Compresor con ruido excesivo tras instalación reciente. Vibración anormal en tuberías de descarga. Se requiere revisión urgente.", technician: "Carlos Mendoza" },
  { id: "GAR-2026-141", client: "Distribuidora Central", site: "Cámara Frigorífica 3", date: "22 Nov 2026", category: "Servicio", status: "Nuevo", description: "El equipo presenta fallas intermitentes al alcanzar la temperatura configurada.", technician: "Ana Silva" },
  { id: "GAR-2026-138", client: "Supermercados El Rey", site: "Exhibidor Lácteos", date: "15 Nov 2026", category: "Repuesto", status: "Aprobado", description: "Cambio preventivo de empaque y válvula de expansión.", technician: "Luis Méndez" },
  { id: "GAR-2026-135", client: "Frigorífico Andino", site: "Túnel de Congelación", date: "10 Nov 2026", category: "Servicio", status: "Rechazado", description: "Revisión solicitada por pérdida de eficiencia en el túnel.", technician: "Roberto Guzmán" },
];

const statusClass = {
  Pendiente: "bg-amber-100 text-amber-700",
  Nuevo: "bg-sky-100 text-sky-700",
  Aprobado: "bg-emerald-100 text-emerald-700",
  Rechazado: "bg-red-100 text-red-700",
};

export default function GarantiasComponent() {
  const [cases, setCases] = useState(initialCases);
  const [selectedId, setSelectedId] = useState(initialCases[0].id);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Todos");
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ id: "", client: "", description: "" });

  const filtered = useMemo(() => cases.filter((item) =>
    (status === "Todos" || item.status === status) &&
    `${item.id} ${item.client} ${item.description}`.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  ), [cases, search, status]);
  const selected = cases.find((item) => item.id === selectedId) ?? filtered[0] ?? cases[0];

  function createClaim(event) {
    event.preventDefault();
    if (!form.id || !form.client) return;
    const item = { id: form.id, client: form.client, site: "Pendiente de asignar", date: "Hoy", category: "Servicio", status: "Nuevo", description: form.description || "Sin descripción", technician: "Por asignar" };
    setCases((current) => [item, ...current]);
    setSelectedId(item.id);
    setCreateOpen(false);
    setForm({ id: "", client: "", description: "" });
  }

  function changeStatus(nextStatus) {
    setCases((current) => current.map((item) => item.id === selected.id ? { ...item, status: nextStatus } : item));
  }

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-6 md:px-8 md:py-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><h1 className="text-3xl font-extrabold text-slate-900">Gestión de Garantías</h1><p className="mt-1 text-sm text-slate-500">Monitoreo y resolución de reclamaciones de servicio y repuestos.</p></div>
        <BotonCrear entidad="Reclamación" onClick={() => setCreateOpen(true)} />
      </header>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
        <section>
          <div className="mb-4 flex flex-col gap-3 rounded-xl border border-slate-200 p-3 sm:flex-row sm:items-center">
            <span className="flex items-center gap-2 text-sm text-slate-600"><FiFilter /> Filtros:</span>
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm"><option>Todos</option><option>Nuevo</option><option>Pendiente</option><option>Aprobado</option><option>Rechazado</option></select>
            <div className="relative min-w-64 flex-1 sm:max-w-xs"><FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar garantías..." className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm" /></div>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left"><thead className="bg-verde-claro/50 text-xs font-bold text-slate-600"><tr><th className="px-4 py-3">ID Caso</th><th className="px-4 py-3">Cliente / Sitio</th><th className="px-4 py-3">Fecha</th><th className="px-4 py-3">Categoría</th><th className="px-4 py-3">Estado</th></tr></thead>
              <tbody>{filtered.map((item) => <tr key={item.id} onClick={() => setSelectedId(item.id)} className={`cursor-pointer border-t border-slate-200 ${selected?.id === item.id ? "bg-verde-claro/60" : "hover:bg-slate-50"}`}><td className="px-4 py-4 text-sm font-semibold text-verde-oscuro">{item.id}</td><td className="px-4 py-4"><p className="text-sm font-semibold">{item.client}</p><p className="text-xs text-slate-500">{item.site}</p></td><td className="px-4 py-4 text-sm">{item.date}</td><td className="px-4 py-4 text-sm">{item.category}</td><td className="px-4 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[item.status]}`}>{item.status}</span></td></tr>)}</tbody>
            </table>
          </div>
        </section>
        {selected && <aside className="h-fit rounded-xl border border-slate-200 p-5"><div className="mb-4 flex items-center justify-between"><div><p className="text-xs text-slate-500">Detalle de caso</p><h2 className="text-lg font-extrabold">{selected.id}</h2></div><span className={`rounded-full px-2 py-1 text-xs font-bold ${statusClass[selected.status]}`}>{selected.status}</span></div><h3 className="mt-5 text-xs font-bold text-slate-500">Descripción</h3><p className="mt-2 rounded-lg border border-slate-200 p-3 text-sm">{selected.description}</p><div className="mt-5 grid grid-cols-2 gap-3 text-xs"><div><p className="font-bold text-slate-500">CLIENTE</p><p className="mt-1 font-semibold">{selected.client}</p></div><div><p className="font-bold text-slate-500">FECHA REPORTE</p><p className="mt-1">{selected.date}</p></div></div><p className="mt-5 text-xs font-bold text-slate-500">TÉCNICO ASIGNADO</p><p className="mt-2 rounded-lg border border-slate-200 p-3 text-sm">{selected.technician}</p><div className="mt-5 grid grid-cols-2 gap-2"><Boton variant="secundario" onClick={() => changeStatus("Rechazado")}>Rechazar</Boton><Boton onClick={() => changeStatus("Aprobado")}>Aprobar insp.</Boton></div></aside>}
      </div>
      <ModalFormulario isOpen={createOpen} onClose={() => setCreateOpen(false)} onSubmit={createClaim} title="Nueva reclamación"><label className="block text-sm font-semibold">ID del caso<input value={form.id} onChange={(event) => setForm({ ...form, id: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label><label className="block text-sm font-semibold">Cliente<input value={form.client} onChange={(event) => setForm({ ...form, client: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label><label className="block text-sm font-semibold">Descripción<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={4} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label></ModalFormulario>
    </main>
  );
}