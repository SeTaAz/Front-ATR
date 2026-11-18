import { FiEdit2, FiEye, FiPackage, FiSearch, FiTrash2 } from "react-icons/fi";
import { REPUESTO_CATEGORIES } from "../services/repuestosService";

export default function RepuestosTabla({
  repuestos,
  totalRepuestos,
  currentPage,
  pageCount,
  repuestosPerPage,
  onPageChange,
  searchTerm,
  onSearchChange,
  filterCategory,
  onCategoryChange,
  onView,
  onEdit,
  onDelete,
}) {
  const firstPageInWindow = Math.max(
    1,
    Math.min(currentPage - 2, pageCount - 4),
  );
  const lastPageInWindow = Math.min(pageCount, firstPageInWindow + 4);
  const visiblePages = Array.from(
    { length: lastPageInWindow - firstPageInWindow + 1 },
    (_, index) => firstPageInWindow + index,
  );
  const firstResult =
    totalRepuestos === 0 ? 0 : (currentPage - 1) * repuestosPerPage + 1;
  const lastResult = Math.min(currentPage * repuestosPerPage, totalRepuestos);

  return (
    <section
      aria-label="Catálogo de repuestos"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-200 bg-verde-claro/40 p-4 sm:flex-row">
        <div className="relative w-full sm:w-96">
          <FiSearch
            aria-hidden="true"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-verde-oscuro"
          />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar por nombre, referencia o descripción..."
            aria-label="Buscar repuestos"
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-verde-oscuro"
          />
        </div>

        <div className="flex w-full items-center justify-end gap-2 text-sm text-slate-600 sm:w-auto">
          <label htmlFor="repuestos-filtro-categoria">Categoría:</label>
          <select
            id="repuestos-filtro-categoria"
            value={filterCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-verde-oscuro"
          >
            <option value="Todas">Todas</option>
            {REPUESTO_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-verde-claro/70 text-xs font-bold text-verde-oscuro">
              <th scope="col" className="px-4 py-3">Repuesto</th>
              <th scope="col" className="px-4 py-3">Referencia</th>
              <th scope="col" className="px-4 py-3">Categoría</th>
              <th scope="col" className="px-4 py-3">Descripción</th>
              <th scope="col" className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {repuestos.length > 0 ? repuestos.map((part) => (
              <tr key={part.id} className="transition-colors hover:bg-verde-claro/40">
                <td className="px-4 py-3">
                  <div className="flex min-w-52 items-center gap-3">
                    {part.image ? (
                      <img
                        src={part.image}
                        alt=""
                        className="h-11 w-11 rounded-lg border border-slate-100 bg-slate-50 object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-verde-oscuro/10 bg-verde-claro text-verde-oscuro"
                      >
                        <FiPackage className="h-5 w-5" />
                      </span>
                    )}
                    <span className="font-semibold text-slate-900">{part.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-slate-600">
                  {part.ref}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className="inline-flex rounded-full border border-verde-oscuro/10 bg-verde-claro px-2.5 py-1 text-xs font-semibold text-verde-oscuro">
                    {part.category}
                  </span>
                </td>
                <td className="max-w-xs px-4 py-3 text-slate-500">
                  <span className="block truncate" title={part.description}>
                    {part.description || "Sin descripción"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onView(part)}
                      aria-label={`Ver ${part.name}`}
                      className="rounded-lg bg-verde-claro p-2 text-verde-oscuro transition-colors hover:bg-verde-oscuro hover:text-white focus:outline-none focus:ring-2 focus:ring-verde-oscuro"
                    >
                      <FiEye aria-hidden="true" className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(part)}
                      aria-label={`Editar ${part.name}`}
                      className="rounded-lg bg-verde-claro p-2 text-verde-oscuro transition-colors hover:bg-verde-oscuro hover:text-white focus:outline-none focus:ring-2 focus:ring-verde-oscuro"
                    >
                      <FiEdit2 aria-hidden="true" className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(part)}
                      aria-label={`Eliminar ${part.name}`}
                      className="rounded-lg bg-rose-50 p-2 text-rose-600 transition-colors hover:bg-rose-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      <FiTrash2 aria-hidden="true" className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm text-slate-500">
                  No se encontraron repuestos que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-xs text-slate-500 sm:flex-row">
        <p>Mostrando {firstResult}-{lastResult} de {totalRepuestos} repuestos</p>
        {pageCount > 1 && (
          <nav
            aria-label="Paginación de repuestos"
            className="flex items-center gap-1"
          >
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-lg px-2.5 py-1.5 font-semibold text-verde-oscuro transition-colors hover:bg-verde-claro disabled:cursor-not-allowed disabled:opacity-40"
            >
              Anterior
            </button>
            {firstPageInWindow > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Ir a la página 1"
                  onClick={() => onPageChange(1)}
                  className="rounded-lg px-2.5 py-1.5 font-semibold text-verde-oscuro hover:bg-verde-claro"
                >
                  1
                </button>
                {firstPageInWindow > 2 && <span aria-hidden="true">…</span>}
              </>
            )}
            {visiblePages.map((page) => (
              <button
                key={page}
                type="button"
                aria-label={`Ir a la página ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                onClick={() => onPageChange(page)}
                className={`rounded-lg px-2.5 py-1.5 font-semibold transition-colors ${
                  page === currentPage
                    ? "bg-verde-oscuro text-white"
                    : "text-verde-oscuro hover:bg-verde-claro"
                }`}
              >
                {page}
              </button>
            ))}
            {lastPageInWindow < pageCount && (
              <>
                {lastPageInWindow < pageCount - 1 && (
                  <span aria-hidden="true">…</span>
                )}
                <button
                  type="button"
                  aria-label={`Ir a la página ${pageCount}`}
                  onClick={() => onPageChange(pageCount)}
                  className="rounded-lg px-2.5 py-1.5 font-semibold text-verde-oscuro hover:bg-verde-claro"
                >
                  {pageCount}
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === pageCount}
              className="rounded-lg px-2.5 py-1.5 font-semibold text-verde-oscuro transition-colors hover:bg-verde-claro disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
