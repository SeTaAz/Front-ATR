import { FiEdit2, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { FiClipboard } from "react-icons/fi";
import { Tarjeta } from "../../../shared/components";
import { ESTADOS_ENTRADA } from "../services/entradasService";

export default function EntradasTabla({ entradas, totalEntradas, currentPage, pageCount, entradasPerPage, onPageChange, searchTerm, onSearchChange, filterStatus, onStatusChange, onView, onEdit, onDelete }) {
  const firstResult = totalEntradas === 0 ? 0 : (currentPage - 1) * entradasPerPage + 1;
  const lastResult = Math.min(currentPage * entradasPerPage, totalEntradas);
  return (
    <Tarjeta>
      <div className="flex flex-col gap-4 border-b border-slate-200 bg-verde-claro/40 p-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-md">
          <FiSearch aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-verde-oscuro" />
          <input type="search" value={searchTerm} onChange={(event) => onSearchChange(event.target.value)} placeholder="Buscar por ID, equipo o problema..." aria-label="Buscar requerimientos" className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-verde-oscuro" />
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 sm:ml-auto">
          <label htmlFor="entradas-filtro-estado">Estado:</label>
          <select id="entradas-filtro-estado" value={filterStatus} onChange={(event) => onStatusChange(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde-oscuro">
            <option value="Todos">Todos</option>
            {ESTADOS_ENTRADA.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead><tr className="border-b border-slate-200 bg-verde-claro/70 text-xs font-medium text-verde-oscuro">
            <th className="px-4 py-3">ID Entrada</th><th className="px-4 py-3">Equipo</th><th className="px-4 py-3">Problema Reportado</th><th className="px-4 py-3">Estado</th><th className="px-4 py-3 text-center">Acciones</th>
          </tr></thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {entradas.length ? entradas.map((entrada) => (
              <tr key={entrada.id} className="transition-colors hover:bg-verde-claro/40">
                <td className="whitespace-nowrap px-4 py-3.5 text-verde-oscuro">{entrada.identifier}</td>
                <td className="px-4 py-3.5 text-slate-900">{entrada.equipment}</td>
                <td className="max-w-xs px-4 py-3.5 text-slate-600"><span className="block truncate" title={entrada.problem}>{entrada.problem}</span></td>
                <td className="px-4 py-3.5"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${entrada.status === "Autorizado" ? "bg-emerald-100 text-emerald-700" : entrada.status === "Anulado" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{entrada.status}</span></td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-center gap-2">
                    <button type="button" onClick={() => onView(entrada)} aria-label={`Ver ${entrada.identifier}`} className="cursor-pointer rounded-lg bg-verde-claro p-2 text-verde-oscuro hover:bg-verde-oscuro hover:text-white"><FiEye /></button>
                    <button type="button" onClick={() => onEdit(entrada)} aria-label={`Editar ${entrada.identifier}`} className="cursor-pointer rounded-lg bg-verde-claro p-2 text-verde-oscuro hover:bg-verde-oscuro hover:text-white"><FiEdit2 /></button>
                    <button type="button" onClick={() => onDelete(entrada)} aria-label={`Eliminar ${entrada.identifier}`} className="cursor-pointer rounded-lg bg-rose-50 p-2 text-rose-600 hover:bg-rose-600 hover:text-white"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            )) : <tr><td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-500">No se encontraron requerimientos.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-xs text-slate-500 sm:flex-row">
        <p>Mostrando {firstResult}-{lastResult} de {totalEntradas} entradas</p>
        {pageCount > 1 && <nav aria-label="Paginación de entradas" className="flex items-center gap-1">
          <button type="button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="rounded-lg px-2.5 py-1.5 font-semibold text-verde-oscuro disabled:opacity-40">Anterior</button>
          <span className="rounded-lg bg-verde-oscuro px-2.5 py-1.5 font-semibold text-white">{currentPage}</span>
          <button type="button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === pageCount} className="rounded-lg px-2.5 py-1.5 font-semibold text-verde-oscuro disabled:opacity-40">Siguiente</button>
        </nav>}
      </div>
    </Tarjeta>
  );
}
