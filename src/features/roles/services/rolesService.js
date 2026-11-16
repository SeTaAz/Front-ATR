import { createDefaultPermissions } from '../permissions';

export const initialRoles = [
  {
    id: 'role-admin',
    name: 'Administrador',
    description: 'Control total del sistema y usuarios.',
    status: 'ACTIVO',
    permissions: createDefaultPermissions('Administrador'),
  },
  {
    id: 'role-technician',
    name: 'Técnico',
    description: 'Acceso a los módulos y tareas operativas.',
    status: 'ACTIVO',
    permissions: createDefaultPermissions('Técnico'),
  },
];