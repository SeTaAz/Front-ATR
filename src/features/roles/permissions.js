import { FiKey, FiPackage, FiUsers } from 'react-icons/fi';
import { BiBuildings, BiHardHat } from 'react-icons/bi';
import { MdContentPaste, MdOutlineDashboard, MdOutlineSell } from 'react-icons/md';
import { AiTwotoneContainer } from 'react-icons/ai';
import { HiOutlineReceiptRefund } from 'react-icons/hi2';
import { IoCalendarNumberOutline } from 'react-icons/io5';

export const rolePermissionGroups = [
  {
    name: 'Dashboard',
    icon: MdOutlineDashboard,
    permissions: [{ key: 'dashboard.view', label: 'Ver dashboard' }],
  },
  {
    name: 'Roles',
    icon: FiKey,
    permissions: [
      { key: 'roles.view', label: 'Ver roles' },
      { key: 'roles.create', label: 'Crear roles' },
      { key: 'roles.edit', label: 'Editar roles y permisos' },
      { key: 'roles.deactivate', label: 'Desactivar roles' },
    ],
  },
  {
    name: 'Usuarios',
    icon: FiUsers,
    permissions: [
      { key: 'usuarios.view', label: 'Ver usuarios' },
      { key: 'usuarios.create', label: 'Crear usuarios' },
      { key: 'usuarios.edit', label: 'Editar usuarios' },
      { key: 'usuarios.deactivate', label: 'Desactivar usuarios' },
    ],
  },
  {
    name: 'Empleados',
    icon: BiHardHat,
    permissions: [
      { key: 'empleados.view', label: 'Ver empleados' },
      { key: 'empleados.create', label: 'Registrar empleados' },
      { key: 'empleados.edit', label: 'Editar empleados' },
      { key: 'empleados.deactivate', label: 'Desactivar empleados' },
    ],
  },
  {
    name: 'Clientes',
    icon: BiBuildings,
    permissions: [
      { key: 'clientes.view', label: 'Ver clientes' },
      { key: 'clientes.create', label: 'Registrar clientes' },
      { key: 'clientes.edit', label: 'Editar clientes' },
      { key: 'clientes.deactivate', label: 'Desactivar clientes' },
    ],
  },
  {
    name: 'Ventas',
    icon: MdOutlineSell,
    permissions: [
      { key: 'ventas.view', label: 'Ver ventas' },
      { key: 'ventas.create', label: 'Registrar ventas' },
      { key: 'ventas.edit', label: 'Editar ventas' },
      { key: 'ventas.cancel', label: 'Anular ventas' },
    ],
  },
  {
    name: 'Agenda',
    icon: IoCalendarNumberOutline,
    permissions: [
      { key: 'agenda.view', label: 'Ver agenda' },
      { key: 'agenda.manage', label: 'Gestionar citas' },
    ],
  },
  {
    name: 'Repuestos',
    icon: FiPackage,
    permissions: [
      { key: 'repuestos.view', label: 'Ver repuestos' },
      { key: 'repuestos.create', label: 'Crear repuestos' },
      { key: 'repuestos.edit', label: 'Editar repuestos' },
      { key: 'repuestos.adjustStock', label: 'Ajustar existencias' },
    ],
  },
  {
    name: 'Entradas',
    icon: MdContentPaste,
    permissions: [
      { key: 'entradas.view', label: 'Ver entradas' },
      { key: 'entradas.create', label: 'Registrar entradas' },
    ],
  },
  {
    name: 'Hoja de vida',
    icon: AiTwotoneContainer,
    permissions: [
      { key: 'hojaVida.view', label: 'Consultar hojas de vida' },
      { key: 'hojaVida.create', label: 'Registrar información' },
      { key: 'hojaVida.edit', label: 'Editar información' },
    ],
  },
  {
    name: 'Garantías',
    icon: HiOutlineReceiptRefund,
    permissions: [
      { key: 'garantias.view', label: 'Consultar garantías' },
      { key: 'garantias.manage', label: 'Gestionar garantías' },
    ],
  },
];

export function createDefaultPermissions(roleName) {
  const permissions = Object.fromEntries(
    rolePermissionGroups.flatMap((group) =>
      group.permissions.map(({ key }) => [key, false]),
    ),
  );

  if (roleName === 'Administrador') {
    return Object.fromEntries(
      Object.keys(permissions).map((key) => [key, true]),
    );
  }

  if (roleName === 'Técnico') {
    return {
      ...permissions,
      'dashboard.view': true,
      'agenda.view': true,
      'entradas.view': true,
      'entradas.create': true,
      'garantias.view': true,
      'repuestos.view': true,
    };
  }

  return permissions;
}
