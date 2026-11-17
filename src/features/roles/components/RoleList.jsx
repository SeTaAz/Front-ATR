import { FiChevronDown, FiUserCheck } from 'react-icons/fi';
import { BiHardHat } from 'react-icons/bi';
import RolePermissions from './RolePermissions';

export default function RoleList({
  roles,
  selectedRoleId,
  selectedRole,
  onSelectRole,
  onStatusToggle,
  onPermissionChange,
  onSave,
}) {
  return (
    <section aria-label="Roles disponibles" className="grid items-start gap-5 lg:grid-cols-2">
      {roles.map((role) => {
        const isSelected = selectedRoleId === role.id;
        const currentRole = isSelected ? selectedRole : role;
        const RoleIcon = role.name === 'Técnico' ? BiHardHat : FiUserCheck;
        return (
          <article
            key={role.id}
            className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-colors ${
              isSelected
                ? 'border-verde-oscuro ring-1 ring-verde-oscuro/10'
                : 'border-slate-200 hover:border-verde-oscuro/40'
            }`}
          >
            <button
              type="button"
              onClick={() => onSelectRole(role.id)}
              aria-expanded={isSelected}
              aria-controls={isSelected ? `role-permissions-${role.id}` : undefined}
              className="flex w-full items-center justify-between gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-verde-oscuro sm:p-6"
            >
              <span className="flex min-w-0 items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-verde-claro text-verde-oscuro">
                  <RoleIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-slate-900">{role.name}</span>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-extrabold tracking-wider ${
                        currentRole.status === 'ACTIVO'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {currentRole.status}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm leading-5 text-slate-500">
                    {role.description}
                  </span>
                </span>
              </span>
              <FiChevronDown
                aria-hidden="true"
                className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                  isSelected ? 'rotate-180 text-verde-oscuro' : ''
                }`}
              />
            </button>

            {isSelected && (
              <div
                id={`role-permissions-${role.id}`}
                className="border-t border-slate-200"
              >
                <RolePermissions
                  role={currentRole}
                  onStatusToggle={onStatusToggle}
                  onPermissionChange={onPermissionChange}
                  onSave={onSave}
                />
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}
