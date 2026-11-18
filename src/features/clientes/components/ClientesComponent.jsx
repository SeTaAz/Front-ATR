import { FiBriefcase, FiEdit2, FiEye, FiSearch, FiTrash2, FiUsers } from "react-icons/fi";
import { BotonCrear, ModalEliminar, ModalFormulario, ModalVer, Notificacion, Tarjeta } from "../../../shared/components";
import useClientes from "../hooks/useClientes";
import { ESTADOS_CLIENTE, TIPOS_CLIENTE } from "../services/clientesService";

const inputClass = "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-verde-oscuro";

export default function ClientesComponent() {
  const data = useClientes();
  const isForm = data.mode === "create" || data.mode === "edit";
  return (
    <>
      <main className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-6 md:px-8 md:py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div><h1 className="text-3xl font-bold text-slate-900">Clientes</h1><p className="mt-1 text-sm text-slate-500">Empresas y personas a las que se realizan servicios industriales.</p></div>
          <BotonCrear entidad="cliente" onClick={data.openCreate} />
        </header>
        <Tarjeta>
          <div className="flex flex-col gap-3 border-b border-slate-200 bg-verde-claro/40 p-4 sm:flex-row">
            <div className="relative w-full sm:max-w-md"><FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-verde-oscuro" /><input value={data.search} onChange={(event) => data.setSearch(event.target.value)} placeholder="Buscar por nombre, contacto o documento..." className="w-full rounded-xl border border-slate-200 py-2 pl-10 pr-3 text-sm" /></div>
            <select value={data.status} onChange={(event) => data.setStatus(event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm sm:ml-auto"><option value="Todos">Todos los estados</option>{ESTADOS_CLIENTE.map((status) => <option key={status}>{status}</option>)}</select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead><tr className="border-b border-slate-200 bg-verde-claro/70 text-xs font-medium text-verde-oscuro"><th className="px-4 py-3">Cliente</th><th className="px-4 py-3">Documento</th><th className="px-4 py-3">Contacto</th><th className="px-4 py-3">Teléfono</th><th className="px-4 py-3">Estado</th><th className="px-4 py-3 text-center">Acciones</th></tr></thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {data.paginated.length ? data.paginated.map((client) => (
                  <tr key={client.id} className="hover:bg-verde-claro/40">
                    <td className="px-4 py-3.5"><p className="font-medium text-slate-900">{client.name}</p><p className="text-xs text-slate-500">{client.identifier}</p></td>
                    <td className="px-4 py-3.5">{client.nit}</td>
                    <td className="px-4 py-3.5"><p>{client.contact}</p><p className="text-xs text-slate-500">{client.email}</p></td>
                    <td className="px-4 py-3.5">{client.phone}</td>
                    <td className="px-4 py-3.5"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${client.status === "Activo" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{client.status}</span></td>
                    <td className="px-4 py-3.5"><div className="flex justify-center gap-2"><button onClick={() => data.openView(client)} className="cursor-pointer rounded-lg bg-verde-claro p-2 text-verde-oscuro" aria-label={`Ver ${client.name}`}><FiEye /></button><button onClick={() => data.openEdit(client)} className="cursor-pointer rounded-lg bg-verde-claro p-2 text-verde-oscuro" aria-label={`Editar ${client.name}`}><FiEdit2 /></button><button onClick={() => data.openDelete(client)} className="cursor-pointer rounded-lg bg-rose-50 p-2 text-rose-600" aria-label={`Eliminar ${client.name}`}><FiTrash2 /></button></div></td>
                  </tr>
                )) : <tr><td colSpan={6} className="py-10 text-center text-slate-500">No se encontraron clientes.</td></tr>}
              </tbody>
            </table>
          </div>
        </Tarjeta>
      </main>
      <ModalVer isOpen={data.mode === "view" && Boolean(data.selected)} onClose={data.close} title="Detalles del cliente">
        {data.selected && (
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Cliente", data.selected.name],
              ["Código", data.selected.identifier],
              ["Tipo", data.selected.type],
              ["Documento", data.selected.nit],
              ["Contacto", data.selected.contact],
              ["Celular", data.selected.phone],
              ["Correo", data.selected.email],
              ["Estado", data.selected.status],
              ["Dirección", data.selected.address],
            ].map(([label, value]) => (
              <div key={label} className={label === "Dirección" ? "rounded-xl border border-slate-200 bg-slate-50 p-3 sm:col-span-2" : "rounded-xl border border-slate-200 bg-slate-50 p-3"}>
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{value || "No registrado"}</p>
              </div>
            ))}
          </div>
        )}
      </ModalVer>
      <ModalFormulario isOpen={isForm} onClose={data.close} onSubmit={data.save} title={data.mode === "create" ? "Crear cliente" : "Editar cliente"}>
        <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-normal">ID<input value={data.form.identifier} disabled className={`${inputClass} bg-slate-100`} /></label><label className="text-sm font-normal">Tipo<select value={data.form.type} onChange={(event) => data.setForm({ ...data.form, type: event.target.value })} className={inputClass}>{TIPOS_CLIENTE.map((type) => <option key={type}>{type}</option>)}</select></label></div>
        <label className="block text-sm font-normal">Nombre / razón social<input required value={data.form.name} onChange={(event) => data.setForm({ ...data.form, name: event.target.value })} className={`${inputClass} mt-1`} /></label>
        <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-normal">NIT / Documento<input required value={data.form.nit} onChange={(event) => data.setForm({ ...data.form, nit: event.target.value })} className={`${inputClass} mt-1`} /></label><label className="text-sm font-normal">Estado<select value={data.form.status} onChange={(event) => data.setForm({ ...data.form, status: event.target.value })} className={`${inputClass} mt-1`}>{ESTADOS_CLIENTE.map((status) => <option key={status}>{status}</option>)}</select></label></div>
        <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-normal">Persona de contacto<input value={data.form.contact} onChange={(event) => data.setForm({ ...data.form, contact: event.target.value })} className={`${inputClass} mt-1`} /></label><label className="text-sm font-normal">Celular<input value={data.form.phone} onChange={(event) => data.setForm({ ...data.form, phone: event.target.value })} className={`${inputClass} mt-1`} /></label></div>
        <label className="block text-sm font-normal">Correo<input type="email" value={data.form.email} onChange={(event) => data.setForm({ ...data.form, email: event.target.value })} className={`${inputClass} mt-1`} /></label>
        <label className="block text-sm font-normal">Dirección<textarea rows={2} value={data.form.address} onChange={(event) => data.setForm({ ...data.form, address: event.target.value })} className={`${inputClass} mt-1`} /></label>
      </ModalFormulario>
      <ModalEliminar isOpen={data.mode === "delete" && Boolean(data.selected)} onClose={data.close} onConfirm={data.remove} title="¿Eliminar cliente?">{data.selected && <p className="text-sm">¿Eliminar a <strong>{data.selected.name}</strong>? Esta acción no se puede deshacer.</p>}</ModalEliminar>
      <Notificacion key={data.notification?.id} message={data.notification?.message} variant={data.notification?.variant} onClose={data.clearNotification} />
    </>
  );
}