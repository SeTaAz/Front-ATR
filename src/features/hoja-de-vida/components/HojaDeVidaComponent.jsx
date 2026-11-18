import { FiMapPin, FiPhone, FiSearch, FiTool } from "react-icons/fi";
import { Boton, ModalFormulario, ModalVer, Tarjeta } from "../../../shared/components";
import useHojaDeVida from "../hooks/useHojaDeVida";

export default function HojaDeVidaComponent() {
  const hoja = useHojaDeVida();
  const equipment = hoja.selected;

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-6 md:px-8 md:py-8">
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-slate-900">Hoja de vida</h1>
      </header>

      {equipment ? (
        <Tarjeta>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:max-w-md">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-verde-oscuro" />
              <input
                value={hoja.search}
                onChange={(event) => hoja.setSearch(event.target.value)}
                placeholder="Buscar equipo por ID, modelo o cliente..."
                className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm"
              />
            </div>
            <label className="sm:ml-auto">
              <span className="sr-only">Equipo seleccionado</span>
              <select
                value={equipment?.id || ""}
                onChange={(event) => hoja.setSelectedId(Number(event.target.value))}
                className="min-w-64 cursor-pointer rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
              >
                {hoja.filtered.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.ref} - {item.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="mb-2 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700">
                {equipment.status}
              </span>
              <h2 className="text-2xl font-bold text-slate-900">{equipment.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{equipment.ref}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Boton variant="secundario" onClick={() => hoja.setQrOpen(true)}>
                Generar QR
              </Boton>
              <Boton onClick={() => hoja.setMaintenanceOpen(true)}>
                <FiTool className="mr-2" />Registrar mantenimiento
              </Boton>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_330px]">
            <div className="space-y-5">
              <section className="rounded-xl border border-slate-200 p-5">
                <h3 className="mb-4 text-base">Especificaciones técnicas</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["Marca", equipment.brand],
                    ["Modelo", equipment.model],
                    ["Número de serie", equipment.serial],
                    ["Tipo de gas", equipment.gas],
                    ["Capacidad frigorífica", equipment.capacity],
                    ["Voltaje", equipment.voltage],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">{label}</p>
                      <p className="mt-1 text-sm text-slate-900">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl border border-slate-200 p-3">
                  <p className="text-xs text-slate-500">Notas técnicas</p>
                  <p className="mt-1 text-sm text-slate-700">{equipment.notes}</p>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border border-slate-200">
                <h3 className="border-b border-slate-200 px-5 py-4 text-base">Historial de mantenimiento</h3>
                <div className="p-5">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[620px] text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs text-slate-500">
                        <th className="px-3 py-2">Fecha</th>
                        <th className="px-3 py-2">Tipo</th>
                        <th className="px-3 py-2">Técnico</th>
                        <th className="px-3 py-2">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {equipment.history.map((row) => (
                        <tr key={`${row[0]}-${row[1]}`}>
                          <td className="px-3 py-3">{row[0]}</td>
                          <td className="px-3 py-3">{row[1]}</td>
                          <td className="px-3 py-3">{row[2]}</td>
                          <td className="px-3 py-3">
                            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                              {row[3]}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </div>
              </section>
            </div>

            <aside className="space-y-5">
              <section className="rounded-xl border border-slate-200 p-5">
                <h3 className="mb-4 text-base">Asignación actual</h3>
                <p className="text-sm text-slate-900">{equipment.client}</p>
                <p className="mt-3 flex gap-2 text-sm text-slate-500">
                  <FiMapPin className="mt-0.5 shrink-0" />{equipment.location}
                </p>
                <p className="mt-3 flex gap-2 text-sm text-slate-500">
                  <FiPhone className="mt-0.5 shrink-0" />{equipment.contact}
                </p>
              </section>

              <section className="rounded-xl border border-slate-200 p-5">
                <h3 className="mb-4 text-base">Salud del equipo</h3>
                <p className="text-sm text-slate-600">
                  Vida útil estimada {equipment.health}%
                </p>
                <div className="mt-2 h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-verde-oscuro" style={{ width: `${equipment.health}%` }} />
                </div>
                <p className="mt-4 text-sm text-slate-500">Próximo mantenimiento en 15 días</p>
              </section>
            </aside>
          </div>
        </Tarjeta>
      ) : (
        <div className="rounded-xl border border-slate-200 py-16 text-center text-sm text-slate-500">
          No se encontró un equipo con esa búsqueda.
        </div>
      )}

      <ModalFormulario
        isOpen={hoja.maintenanceOpen}
        onClose={() => hoja.setMaintenanceOpen(false)}
        onSubmit={hoja.registerMaintenance}
        title="Registrar mantenimiento"
      >
        <label className="block text-sm font-normal">
          Tipo de mantenimiento
          <select
            value={hoja.maintenance.type}
            onChange={(event) => hoja.setMaintenance({ ...hoja.maintenance, type: event.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option>Preventivo</option>
            <option>Correctivo</option>
            <option>Inspección</option>
            <option>Instalación</option>
          </select>
        </label>
        <label className="block text-sm font-normal">
          Técnico
          <select
            required
            value={hoja.maintenance.technician}
            onChange={(event) => hoja.setMaintenance({ ...hoja.maintenance, technician: event.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="" disabled>Selecciona un técnico</option>
            {hoja.technicians.map((technician) => (
              <option key={technician}>{technician}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-normal">
          Notas
          <textarea
            rows={3}
            value={hoja.maintenance.notes}
            onChange={(event) => hoja.setMaintenance({ ...hoja.maintenance, notes: event.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
      </ModalFormulario>

      {equipment && (
        <ModalVer isOpen={hoja.qrOpen} onClose={() => hoja.setQrOpen(false)} title="Código QR del equipo">
          <div className="text-center">
            <div className="mx-auto grid h-48 w-48 place-items-center rounded-xl border-4 border-slate-900 bg-white p-4 text-xs">
              QR<br />{equipment.ref}
            </div>
            <p className="mt-4 text-sm text-slate-600">{equipment.name}</p>
          </div>
        </ModalVer>
      )}
    </main>
  );
}
