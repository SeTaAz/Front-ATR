import { useMemo, useState } from "react";
import { FiCalendar, FiDollarSign, FiSearch } from "react-icons/fi";
import { BotonCrear, ModalFormulario, Tarjeta } from "../../../shared/components";
import { getStoredClients } from "../../clientes/services/clientesService";
import { getInitialParts } from "../../repuestos/services/repuestosService";

const sales = [
  { client: "Frigorífico Andino", service: "Mantenimiento Preventivo", date: "12 Nov 2026", cost: "$1.200.000 COP", supplies: ["Filtro deshidratador", "Aceite mineral"] },
  { client: "Logística del Norte", service: "Reparación de Compresor", date: "10 Nov 2026", cost: "$3.500.000 COP", supplies: ["Válvula de expansión"] },
  { client: "Supermercados El Sol", service: "Limpieza de Evaporador", date: "08 Nov 2026", cost: "$800.000 COP", supplies: ["Desengrasante", "Filtro lavable"] },
];

export default function VentasComponent() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [salesList, setSalesList] = useState(sales);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ client: "", service: "Mantenimiento Preventivo", cost: "", supplies: [] });
  const clients = getStoredClients().filter((client) => client.status === "Activo").map((client) => client.name);
  const parts = getInitialParts();
  const filtered = useMemo(() => salesList.filter((item) =>
    `${item.client} ${item.service}`.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  ), [salesList, search]);
  function createSale(event) {
    event.preventDefault();
    if (!form.client.trim() || !form.service.trim()) return;
    setSalesList((current) => [{
      client: form.client,
      service: form.service,
      date: date || "Hoy",
      cost: form.cost
        ? `$${Number(form.cost).toLocaleString("es-CO")} COP`
        : "$0 COP",
      supplies: form.supplies,
    }, ...current]);
    setForm({ client: "", service: "Mantenimiento Preventivo", cost: "", supplies: [] });
    setCreateOpen(false);
  }
  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-6 md:px-8 md:py-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-3xl font-bold text-slate-900">Panel de Ventas</h1><p className="mt-1 text-sm text-slate-500">Resumen de ingresos por servicios de refrigeración industrial.</p></div><BotonCrear entidad="venta" onClick={() => setCreateOpen(true)} /></header>
      <div className="mb-4 flex items-center gap-3"><div className="relative max-w-md flex-1"><FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por cliente o ID de servicio..." className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm" /></div><label className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 text-sm"><FiCalendar /><input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="outline-none" /></label></div>
      <Tarjeta>
      <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="bg-verde-claro/50 text-xs font-medium text-slate-600"><tr><th className="px-4 py-3">CLIENTE</th><th className="px-4 py-3">TIPO DE SERVICIO</th><th className="px-4 py-3">FECHA</th><th className="px-4 py-3">VALOR DEL SERVICIO</th><th className="px-4 py-3">REPUESTOS / INSUMOS</th></tr></thead><tbody>{filtered.map((item) => <tr key={`${item.client}-${item.date}`} className="border-t border-slate-200 text-sm"><td className="px-4 py-4 font-medium">{item.client}</td><td className="px-4 py-4">{item.service}</td><td className="px-4 py-4">{item.date}</td><td className="px-4 py-4 text-verde-oscuro">{item.cost}</td><td className="px-4 py-4">{item.supplies.length ? item.supplies.join(", ") : "Ninguno"}</td></tr>)}</tbody></table></div>
      <p className="mt-3 text-xs text-slate-500">Mostrando 1-{filtered.length} de {salesList.length} registros</p>
      </Tarjeta>
      <ModalFormulario isOpen={createOpen} onClose={() => setCreateOpen(false)} onSubmit={createSale} title="Nueva venta">
        <label className="block text-sm font-normal">Cliente<select required value={form.client} onChange={(event) => setForm({ ...form, client: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"><option value="" disabled>Selecciona un cliente</option>{clients.map((client) => <option key={client} value={client}>{client}</option>)}</select></label>
        <label className="block text-sm font-normal">Tipo de servicio<select required value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"><option>Mantenimiento Preventivo</option><option>Reparación Correctiva</option><option>Diagnóstico e Inspección</option><option>Instalación</option><option>Recarga de Refrigerante</option></select></label>
        <label className="block text-sm font-normal">Valor del servicio<input value={form.cost} onChange={(event) => setForm({ ...form, cost: event.target.value })} placeholder="Ej. 1200000" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <fieldset>
          <div className="grid max-h-40 gap-2 overflow-y-auto rounded-lg border border-slate-200 p-3 sm:grid-cols-2">
            {parts.map((part) => (
              <label key={part.ref} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.supplies.includes(part.name)} onChange={(event) => setForm({ ...form, supplies: event.target.checked ? [...form.supplies, part.name] : form.supplies.filter((name) => name !== part.name) })} />
                {part.name}
              </label>
            ))}
          </div>
        </fieldset>
      </ModalFormulario>
    </main>
  );
}