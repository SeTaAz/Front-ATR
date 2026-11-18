import { FiEdit2, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import {
  ESTADOS_USUARIO,
  getUserInitials,
  ROLES_USUARIO,
} from "../services/usuariosService";

export default function UsuariosTabla({
  users,
  totalUsers,
  currentPage,
  pageCount,
  usersPerPage,
  onPageChange,
  searchTerm,
  onSearchChange,
  filterStatus,
  onStatusChange,
  filterRole,
  onRoleChange,
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
    totalUsers === 0 ? 0 : (currentPage - 1) * usersPerPage + 1;
  const lastResult = Math.min(currentPage * usersPerPage, totalUsers);

  return (
    <section
      aria-label="Listado de usuarios"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-200 bg-verde-claro/40 p-4 md:flex-row">
        <div className="relative w-full md:w-80">
          <FiSearch
            aria-hidden="true"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-verde-oscuro"
          />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar por nombre, correo o ID..."
            aria-label="Buscar usuarios"
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-800 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-verde-oscuro"
          />
        </div>

        <div className="flex w-full flex-wrap items-center gap-3 text-sm text-slate-600 md:w-auto md:justify-end">
          <label htmlFor="usuarios-filtro-estado">Filtrar por:</label>
          <select
            id="usuarios-filtro-estado"
            value={filterStatus}
            onChange={(event) => onStatusChange(event.target.value)}
            className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-verde-oscuro"
          >
            <option value="Todos">Estado: Todos</option>
            {ESTADOS_USUARIO.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select
            id="usuarios-filtro-rol"
            value={filterRole}
            onChange={(event) => onRoleChange(event.target.value)}
            className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-verde-oscuro"
          >
            <option value="Todos">Rol: Todos</option>
            {ROLES_USUARIO.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-verde-claro/70 text-xs font-bold text-verde-oscuro">
              <th scope="col" className="px-4 py-3">
                Usuario
              </th>
              <th scope="col" className="px-4 py-3">
                ID
              </th>
              <th scope="col" className="px-4 py-3">
                Rol
              </th>
              <th scope="col" className="px-4 py-3">
                Estado
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-verde-claro/40"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-verde-claro text-xs font-bold text-verde-oscuro"
                      >
                        {getUserInitials(user.name)}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-bold text-slate-900">
                          {user.name}
                        </span>
                        <span className="block truncate text-xs text-slate-500">
                          {user.email}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 font-mono text-slate-500">
                    {user.identifier}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <span className="inline-flex rounded-lg border border-verde-oscuro/10 bg-verde-claro px-3 py-1 text-xs font-medium text-verde-oscuro">
                      {user.role}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                        user.status === "Activo"
                          ? "bg-green-100 text-green-800"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          user.status === "Activo"
                            ? "bg-green-700"
                            : "bg-slate-400"
                        }`}
                      />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        aria-label={`Ver detalles de ${user.name}`}
                        onClick={() => onView(user)}
                        className="cursor-pointer rounded-lg bg-verde-claro p-2 text-verde-oscuro transition-colors hover:bg-verde-oscuro hover:text-white focus:outline-none focus:ring-2 focus:ring-verde-oscuro"
                      >
                        <FiEye aria-hidden="true" className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Editar ${user.name}`}
                        onClick={() => onEdit(user)}
                        className="cursor-pointer rounded-lg bg-verde-claro p-2 text-verde-oscuro transition-colors hover:bg-verde-oscuro hover:text-white focus:outline-none focus:ring-2 focus:ring-verde-oscuro"
                      >
                        <FiEdit2 aria-hidden="true" className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Eliminar ${user.name}`}
                        onClick={() => onDelete(user)}
                        className="cursor-pointer rounded-lg bg-rose-50 p-2 text-rose-600 transition-colors hover:bg-rose-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                      >
                        <FiTrash2 aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No se encontraron usuarios que coincidan con los filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
        <p>
          Mostrando {firstResult}-{lastResult} de {totalUsers} usuarios
        </p>
        {pageCount > 1 && (
          <nav
            aria-label="Paginación de usuarios"
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
