import { useState } from 'react';
import { initialRoles } from '../services/rolesService';

export default function useRoles() {
  const [roles, setRoles] = useState(initialRoles);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [selectedRoleDraft, setSelectedRoleDraft] = useState(null);
  const [notification, setNotification] = useState(null);

  function notify(message, variant = 'success') {
    setNotification({ message, variant, id: Date.now() });
  }

  function selectRole(roleId) {
    if (selectedRoleId === roleId) {
      setSelectedRoleId(null);
      return;
    }

    const role = roles.find((item) => item.id === roleId);
    if (!role) return;
    setSelectedRoleId(role.id);
    setSelectedRoleDraft(
      selectedRoleDraft?.id === role.id ? selectedRoleDraft : role,
    );
  }

  function togglePermission(permissionKey) {
    setSelectedRoleDraft((role) => role && ({
      ...role,
      permissions: {
        ...role.permissions,
        [permissionKey]: !role.permissions[permissionKey],
      },
    }));
  }

  function saveRoleChanges() {
    if (!selectedRoleDraft) return;
    setRoles((currentRoles) => currentRoles.map((role) => (
      role.id === selectedRoleId ? selectedRoleDraft : role
    )));
    notify(`Cambios guardados para ${selectedRoleDraft.name}.`);
  }

  function toggleRoleStatus() {
    if (!selectedRoleDraft) return;
    const updatedRole = {
      ...selectedRoleDraft,
      status: selectedRoleDraft.status === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO',
    };
    setSelectedRoleDraft(updatedRole);
    setRoles((currentRoles) => currentRoles.map((role) => (
      role.id === selectedRoleId
        ? { ...role, status: updatedRole.status }
        : role
    )));
    notify(`${updatedRole.name} ahora está ${updatedRole.status.toLowerCase()}.`);
  }

  return {
    roles,
    selectedRoleId,
    selectedRole: selectedRoleDraft,
    notification,
    clearNotification: () => setNotification(null),
    selectRole,
    togglePermission,
    saveRoleChanges,
    toggleRoleStatus,
  };
}