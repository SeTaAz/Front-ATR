import { Notificacion } from '../../../shared/components';
import RoleList from './RoleList';
import useRoles from '../hooks/useRoles';

export default function RolesComponent() {
  const roles = useRoles();

  return (
    <>
      <main className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-6 md:px-8 md:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Roles
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Gestiona los perfiles, accesos y permisos de los usuarios.
            </p>
          </div>
        </div>

        <RoleList
          roles={roles.roles}
          selectedRoleId={roles.selectedRoleId}
          selectedRole={roles.selectedRole}
          onSelectRole={roles.selectRole}
          onStatusToggle={roles.toggleRoleStatus}
          onPermissionChange={roles.togglePermission}
          onSave={roles.saveRoleChanges}
        />
      </main>

      <Notificacion
        key={roles.notification?.id}
        message={roles.notification?.message}
        variant={roles.notification?.variant}
        onClose={roles.clearNotification}
      />
    </>
  );
}