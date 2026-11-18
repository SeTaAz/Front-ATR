import { useEffect, useMemo, useState } from "react";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiFilter,
  FiPlus,
  FiTrash2,
  FiUserCheck,
} from "react-icons/fi";
import {
  Boton,
  ModalEliminar,
  ModalFormulario,
  Tarjeta,
} from "../../../shared/components";
import { getStoredClients } from "../../clientes/services/clientesService";
import { getStoredEmployees } from "../../empleados/services/empleadosService";

const emptyService = {
  name: "Mantenimiento Preventivo",
  client: "",
  equipment: "",
  technician: "",
  start: "08:00",
  end: "10:00",
  type: "Preventivo",
};

const initialServices = [
  {
    id: 1,
    name: "Cámara Frigorífica #4",
    client: "Frigorífico Andino",
    equipment: "Cámara Frigorífica #4",
    technician: "Ana Garcés",
    start: "08:15",
    end: "10:15",
    type: "Preventivo",
  },
  {
    id: 2,
    name: "Compresor Evaporativo",
    client: "Logística del Norte",
    equipment: "Compresor Evaporativo",
    technician: "Roberto Guzmán",
    start: "12:30",
    end: "15:30",
    type: "Correctivo",
  },
];

export default function AgendaComponent() {
  const [view, setView] = useState("Día");
  const [selectedDate, setSelectedDate] = useState("2026-11-17");
  const [mode, setMode] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [service, setService] = useState(emptyService);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({ type: "Todos", technician: "Todos" });
  const [scheduled, setScheduled] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("atr-agenda-services")) || initialServices;
    } catch {
      return initialServices;
    }
  });

  useEffect(() => {
    localStorage.setItem("atr-agenda-services", JSON.stringify(scheduled));
  }, [scheduled]);

  const clients = getStoredClients()
    .filter((client) => client.status === "Activo")
    .map((client) => client.name);
  const technicians = getStoredEmployees()
    .filter((employee) => employee.status === "Activo")
    .map((employee) => `${employee.firstName} ${employee.lastName}`);
  const equipments = [
    "Cámara Frigorífica #4",
    "Compresor Evaporativo",
    "Evaporador Sala 3",
    "Rack de Compresores",
  ];

  const filteredServices = useMemo(
    () =>
      scheduled.filter(
        (item) =>
          (filters.type === "Todos" || item.type === filters.type) &&
          (filters.technician === "Todos" || item.technician === filters.technician),
      ),
    [scheduled, filters],
  );

  const closeModal = () => {
    setMode(null);
    setSelectedService(null);
  };

  const openCreate = () => {
    setService({
      ...emptyService,
      client: clients[0] || "",
      equipment: equipments[0],
      technician: technicians[0] || "",
    });
    setMode("create");
  };

  const openEdit = (item) => {
    setSelectedService(item);
    setService({ ...item });
    setMode("edit");
  };

  const saveService = (event) => {
    event.preventDefault();
    if (!service.client || !service.equipment || !service.technician) return;

    if (mode === "create") {
      setScheduled((current) => [...current, { ...service, id: Date.now(), name: service.equipment }]);
    } else if (mode === "edit" && selectedService) {
      setScheduled((current) =>
        current.map((item) =>
          item.id === selectedService.id
            ? { ...service, id: item.id, name: service.equipment }
            : item,
        ),
      );
    }
    closeModal();
  };

  const deleteService = () => {
    if (!selectedService) return;
    setScheduled((current) => current.filter((item) => item.id !== selectedService.id));
    closeModal();
  };

  const moveDate = (days) => {
    const date = new Date(`${selectedDate}T12:00:00`);
    date.setDate(date.getDate() + days);
    setSelectedDate(date.toISOString().slice(0, 10));
  };

  const hours = Array.from({ length: 14 }, (_, index) => index + 6);

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-6 md:px-8 md:py-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Agenda Operativa</h1>
          <p className="mt-1 text-sm text-slate-500">
            Programación de mantenimientos y asignación de técnicos.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Boton variant="secundario" onClick={() => setFiltersOpen((open) => !open)}>
            <FiFilter className="mr-2" />Filtros
          </Boton>
          <Boton onClick={openCreate}>
            <FiPlus className="mr-2" />Nuevo servicio
          </Boton>
        </div>
      </header>

      {filtersOpen && (
        <Tarjeta className="mb-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="text-sm">
              Tipo
              <select
                value={filters.type}
                onChange={(event) => setFilters({ ...filters, type: event.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                <option>Todos</option>
                <option>Preventivo</option>
                <option>Correctivo</option>
                <option>Inspección</option>
                <option>Instalación</option>
              </select>
            </label>
            <label className="text-sm">
              Técnico
              <select
                value={filters.technician}
                onChange={(event) => setFilters({ ...filters, technician: event.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                <option>Todos</option>
                {technicians.map((technician) => (
                  <option key={technician}>{technician}</option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Fecha
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
          </div>
        </Tarjeta>
      )}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_290px]">
        <Tarjeta>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => moveDate(-1)} aria-label="Fecha anterior" className="cursor-pointer rounded p-2 hover:bg-verde-claro">
                <FiChevronLeft />
              </button>
              <label className="flex items-center gap-2">
                <FiCalendar className="text-verde-oscuro" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
              <button type="button" onClick={() => moveDate(1)} aria-label="Fecha siguiente" className="cursor-pointer rounded p-2 hover:bg-verde-claro">
                <FiChevronRight />
              </button>
            </div>
            <div className="flex rounded-lg border border-slate-200 p-1">
              {["Día", "Semana", "Mes"].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setView(item)}
                  className={`cursor-pointer rounded px-3 py-1.5 text-xs ${view === item ? "bg-verde-claro font-medium text-verde-oscuro" : "text-slate-500"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-[620px] overflow-y-auto">
            {hours.map((hour) => (
              <div key={hour} className="flex h-[60px] border-t border-slate-100">
                <div className="w-16 px-3 pt-2 text-right text-xs text-slate-400">
                  {String(hour).padStart(2, "0")}:00
                </div>
                <div className="flex-1 border-l border-slate-200" />
              </div>
            ))}

            {filteredServices.map((item, index) => (
              <div
                key={item.id}
                className={`absolute left-16 right-5 rounded-r-lg border-l-4 px-3 py-2 ${
                  item.type === "Correctivo"
                    ? "border-l-amber-500 bg-amber-50"
                    : "border-l-verde-oscuro bg-verde-claro"
                }`}
                style={{ top: `${60 + index * 210}px` }}
              >
                <p className="text-xs text-slate-500">{item.start} - {item.end} · {item.type}</p>
                <p className="font-medium text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-500">{item.client} · {item.technician}</p>
                <div className="mt-1 flex gap-1">
                  <button type="button" onClick={() => openEdit(item)} aria-label={`Editar ${item.name}`} className="cursor-pointer rounded p-1 text-verde-oscuro hover:bg-white">
                    <FiEdit2 />
                  </button>
                  <button type="button" onClick={() => { setSelectedService(item); setMode("delete"); }} aria-label={`Eliminar ${item.name}`} className="cursor-pointer rounded p-1 text-red-600 hover:bg-white">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Tarjeta>

        <aside className="space-y-5">
          <Tarjeta>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-verde-claro p-3">
                <strong className="block text-lg text-verde-oscuro">{scheduled.filter((item) => item.type !== "Correctivo").length}</strong>
                <span className="text-xs">Programados</span>
              </div>
              <div className="rounded-lg bg-amber-50 p-3">
                <strong className="block text-lg text-amber-600">{scheduled.filter((item) => item.type === "Correctivo").length}</strong>
                <span className="text-xs">Correctivos</span>
              </div>
            </div>
          </Tarjeta>

          <Tarjeta>
            <div className="space-y-3">
              {technicians.length ? technicians.map((technician) => (
                <div key={technician} className="flex items-center justify-between">
                  <span className="text-sm">{technician}</span>
                  <span className="text-xs text-verde-oscuro">Disponible</span>
                </div>
              )) : <p className="text-sm text-slate-500">No hay empleados activos.</p>}
            </div>
          </Tarjeta>
        </aside>
      </div>

      <ModalFormulario
        isOpen={mode === "create" || mode === "edit"}
        onClose={closeModal}
        onSubmit={saveService}
        title={mode === "create" ? "Nuevo servicio" : "Editar servicio"}
      >
        <label className="block text-sm font-normal">
          Tipo de servicio
          <select
            value={service.type}
            onChange={(event) => setService({ ...service, type: event.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option>Preventivo</option>
            <option>Correctivo</option>
            <option>Inspección</option>
            <option>Instalación</option>
          </select>
        </label>
        <label className="block text-sm font-normal">
          Cliente
          <select value={service.client} onChange={(event) => setService({ ...service, client: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
            <option value="" disabled>Selecciona un cliente</option>
            {clients.map((client) => <option key={client}>{client}</option>)}
          </select>
        </label>
        <label className="block text-sm font-normal">
          Equipo
          <select value={service.equipment} onChange={(event) => setService({ ...service, equipment: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
            {equipments.map((equipment) => <option key={equipment}>{equipment}</option>)}
          </select>
        </label>
        <label className="block text-sm font-normal">
          Técnico asignado
          <select value={service.technician} onChange={(event) => setService({ ...service, technician: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
            <option value="" disabled>Selecciona un técnico</option>
            {technicians.map((technician) => <option key={technician}>{technician}</option>)}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-normal">Inicio<input type="time" value={service.start} onChange={(event) => setService({ ...service, start: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
          <label className="block text-sm font-normal">Fin<input type="time" value={service.end} onChange={(event) => setService({ ...service, end: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        </div>
      </ModalFormulario>

      <ModalEliminar
        isOpen={mode === "delete" && Boolean(selectedService)}
        onClose={closeModal}
        onConfirm={deleteService}
        title="¿Eliminar servicio?"
      >
        {selectedService && (
          <p className="text-sm text-slate-600">
            Se eliminará <strong>{selectedService.name}</strong> de la agenda.
          </p>
        )}
      </ModalEliminar>
    </main>
  );
}
