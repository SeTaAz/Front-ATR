import { FiEdit2, FiEye, FiSearch, FiTrash2, FiTool } from "react-icons/fi";
import { BotonCrear, ModalEliminar, ModalFormulario, ModalVer, Notificacion, Tarjeta } from "../../../shared/components";
import useEmpleados from "../hooks/useEmpleados";
import { CARGOS_EMPLEADO, ESTADOS_EMPLEADO } from "../services/empleadosService";

const inputClass = "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-verde-oscuro";

export default function EmpleadosComponent() {
  const data = useEmpleados();
  const isForm = data.mode === "create" || data.mode === "edit";
  return (
    <>
      <main className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-6 md:px-8 md:py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div><h1 className="text-3xl font-bold text-slate-900">Empleados</h1><p className="mt-1 text-sm text-slate-500">Técnicos y personal disponible para asignación de servicios.</p></div>
          <BotonCrear entidad="empleado" onClick={data.openCreate} />
        </header>
        <Tarjeta>
          <div className="flex flex-col gap-3 border-b border-slate-200 bg-verde-claro/40 p-4 sm:flex-row">
            <div className="relative w-full sm:max-w-md"><FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-verde-oscuro" /><input value={data.search} onChange={(event) => data.setSearch(event.target.value)} placeholder="Buscar por nombre, documento o correo..." className="w-full rounded-xl border border-slate-200 py-2 pl-10 pr-3 text-sm" /></div>
            <select value={data.status} onChange={(event) => data.setStatus(event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm sm:ml-auto"><option value="Todos">Todos los estados</option>{ESTADOS_EMPLEADO.map((status) => <option key={status}>{status}</option>)}</select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead><tr className="border-b border-slate-200 bg-verde-claro/70 text-xs font-medium text-verde-oscuro"><th className="px-4 py-3">Empleado</th><th className="px-4 py-3">Documento</th><th className="px-4 py-3">Cargo</th><th className="px-4 py-3">Contacto</th><th className="px-4 py-3">Estado</th><th className="px-4 py-3 text-center">Acciones</th></tr></thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {data.paginated.length ? data.paginated.map((employee) => (
                  <tr key={employee.id} className="hover:bg-verde-claro/40">
                    <td className="px-4 py-3.5"><p className="font-medium text-slate-900">{employee.firstName} {employee.lastName}</p><p className="text-xs text-slate-500">{employee.identifier}</p></td>
                    <td className="px-4 py-3.5">{employee.documentType} {employee.documentNumber}</td>
                    <td className="px-4 py-3.5">{employee.position}</td>
                    <td className="px-4 py-3.5"><p>{employee.phone}</p><p className="text-xs text-slate-500">{employee.email}</p></td>
                    <td className="px-4 py-3.5"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${employee.status === "Activo" ? "bg-emerald-100 text-emerald-700" : employee.status === "Vacaciones" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}>{employee.status}</span></td>
                    <td className="px-4 py-3.5"><div className="flex justify-center gap-2"><button onClick={() => data.openView(employee)} className="cursor-pointer rounded-lg bg-verde-claro p-2 text-verde-oscuro" aria-label={`Ver ${employee.firstName}`}><FiEye /></button><button onClick={() => data.openEdit(employee)} className="cursor-pointer rounded-lg bg-verde-claro p-2 text-verde-oscuro" aria-label={`Editar ${employee.firstName}`}><FiEdit2 /></button><button onClick={() => data.openDelete(employee)} className="cursor-pointer rounded-lg bg-rose-50 p-2 text-rose-600" aria-label={`Eliminar ${employee.firstName}`}><FiTrash2 /></button></div></td>
                  </tr>
                )) : <tr><td colSpan={6} className="py-10 text-center text-slate-500">No se encontraron empleados.</td></tr>}
              </tbody>
            </table>
          </div>
        </Tarjeta>
      </main>
      <ModalVer isOpen={data.mode === "view" && Boolean(data.selected)} onClose={data.close} title="Detalles del empleado">
        {data.selected && (
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Empleado", `${data.selected.firstName} ${data.selected.lastName}`],
              ["Código", data.selected.identifier],
              ["Documento", `${data.selected.documentType} ${data.selected.documentNumber}`],
              ["Cargo", data.selected.position],
              ["Celular", data.selected.phone],
              ["Correo", data.selected.email],
              ["Estado", data.selected.status],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{value || "No registrado"}</p>
              </div>
            ))}
          </div>
        )}
      </ModalVer>
      <ModalFormulario isOpen={isForm} onClose={data.close} onSubmit={data.save} title={data.mode === "create" ? "Crear empleado" : "Editar empleado"}>
        <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-normal">ID<input value={data.form.identifier} disabled className={`${inputClass} bg-slate-100`} /></label><label className="text-sm font-normal">Estado<select value={data.form.status} onChange={(event) => data.setForm({ ...data.form, status: event.target.value })} className={inputClass}>{ESTADOS_EMPLEADO.map((status) => <option key={status}>{status}</option>)}</select></label></div>
        <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-normal">Nombre<input required value={data.form.firstName} onChange={(event) => data.setForm({ ...data.form, firstName: event.target.value })} className={`${inputClass} mt-1`} /></label><label className="text-sm font-normal">Apellido<input required value={data.form.lastName} onChange={(event) => data.setForm({ ...data.form, lastName: event.target.value })} className={`${inputClass} mt-1`} /></label></div>
        <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-normal">Tipo de documento<select value={data.form.documentType} onChange={(event) => data.setForm({ ...data.form, documentType: event.target.value })} className={`${inputClass} mt-1`}><option>CC</option><option>CE</option><option>PAS</option></select></label><label className="text-sm font-normal">Número de documento<input required value={data.form.documentNumber} onChange={(event) => data.setForm({ ...data.form, documentNumber: event.target.value })} className={`${inputClass} mt-1`} /></label></div>
        <label className="block text-sm font-normal">Cargo / especialidad<select value={data.form.position} onChange={(event) => data.setForm({ ...data.form, position: event.target.value })} className={`${inputClass} mt-1`}>{CARGOS_EMPLEADO.map((position) => <option key={position}>{position}</option>)}</select></label>
        <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-normal">Celular<input value={data.form.phone} onChange={(event) => data.setForm({ ...data.form, phone: event.target.value })} className={`${inputClass} mt-1`} /></label><label className="text-sm font-normal">Correo<input type="email" value={data.form.email} onChange={(event) => data.setForm({ ...data.form, email: event.target.value })} className={`${inputClass} mt-1`} /></label></div>
      </ModalFormulario>
      <ModalEliminar isOpen={data.mode === "delete" && Boolean(data.selected)} onClose={data.close} onConfirm={data.remove} title="¿Eliminar empleado?">{data.selected && <p className="text-sm">¿Eliminar a <strong>{data.selected.firstName} {data.selected.lastName}</strong>? Esta acción no se puede deshacer.</p>}</ModalEliminar>
      <Notificacion key={data.notification?.id} message={data.notification?.message} variant={data.notification?.variant} onClose={data.clearNotification} />
    </>
  );
}