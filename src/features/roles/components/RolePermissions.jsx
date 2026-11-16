import { FiSave } from 'react-icons/fi';
import { Boton } from '../../../shared/components';
import { rolePermissionGroups } from '../permissions';

export default function RolePermissions({
  role,
  onStatusToggle,
  onPermissionChange,
  onSave,
}) {
  return (
    <section aria-label={`Permisos de ${role.name}`} className="p-5 sm:p-6">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700">Estado</span>
            <button
              type="button"
              onClick={onStatusToggle}
              aria-label={`Cambiar estado del rol ${role.name}`}
              aria-pressed={role.status === 'ACTIVO'}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-verde-oscuro focus:ring-offset-2 ${
                role.status === 'ACTIVO' ? 'bg-verde-oscuro' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                  role.status === 'ACTIVO' ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
        <Boton onClick={onSave}>
          <FiSave className="mr-2 h-4 w-4" aria-hidden="true" />
          Guardar cambios
        </Boton>
      </header>

      <div className="grid gap-4 xl:grid-cols-2">
        {rolePermissionGroups.map((group) => (
          <section
            key={group.name}
            className="overflow-hidden rounded-xl border border-slate-200"
            aria-label={`Permisos de ${group.name}`}
          >
            <h3 className="flex items-center gap-2 border-b border-slate-200 bg-verde-claro px-4 py-3 text-xs font-bold text-verde-oscuro">
              <group.icon className="h-4 w-4" aria-hidden="true" />
              {group.name}
            </h3>
            <div className="space-y-3 p-4">
              {group.permissions.map((permission) => (
                <label
                  key={permission.key}
                  className="flex cursor-pointer items-center justify-between gap-3 text-sm text-slate-700"
                >
                  <span>{permission.label}</span>
                  <input
                    type="checkbox"
                    checked={Boolean(role.permissions[permission.key])}
                    onChange={() => onPermissionChange(permission.key)}
                    className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-verde-oscuro focus:ring-verde-oscuro"
                  />
                </label>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
