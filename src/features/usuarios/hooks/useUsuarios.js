import { useEffect, useMemo, useState } from "react";
import { getInitialUsers, getUserInitials } from "../services/usuariosService";

const USERS_PER_PAGE = 10;

const createEmptyForm = () => ({
  name: "",
  email: "",
  identifier: "",
  role: "Técnico",
  status: "Activo",
});

export default function useUsuarios() {
  const [users, setUsers] = useState(getInitialUsers);
  const [searchTerm, setSearchTermState] = useState("");
  const [filterStatus, setFilterStatusState] = useState("Todos");
  const [filterRole, setFilterRoleState] = useState("Todos");
  const [requestedPage, setRequestedPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [formData, setFormData] = useState(createEmptyForm);
  const [notification, setNotification] = useState("");

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase();

    return users.filter((user) => {
      const matchesSearch = [user.name, user.email, user.identifier].some(
        (value) => value.toLocaleLowerCase().includes(normalizedSearch),
      );
      const matchesStatus =
        filterStatus === "Todos" || user.status === filterStatus;
      const matchesRole = filterRole === "Todos" || user.role === filterRole;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, searchTerm, filterStatus, filterRole]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredUsers.length / USERS_PER_PAGE),
  );
  const currentPage = Math.min(requestedPage, pageCount);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  useEffect(() => {
    if (requestedPage !== currentPage) setRequestedPage(currentPage);
  }, [requestedPage, currentPage]);

  const setSearchTerm = (value) => {
    setSearchTermState(value);
    setRequestedPage(1);
  };

  const setFilterStatus = (value) => {
    setFilterStatusState(value);
    setRequestedPage(1);
  };

  const setFilterRole = (value) => {
    setFilterRoleState(value);
    setRequestedPage(1);
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedUser(null);
  };

  const openCreate = () => {
    setFormData(createEmptyForm());
    setSelectedUser(null);
    setModalMode("create");
  };

  const openView = (user) => {
    setSelectedUser(user);
    setModalMode("view");
  };

  const openEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      identifier: user.identifier,
      role: user.role,
      status: user.status,
    });
    setModalMode("edit");
  };

  const openDelete = (user) => {
    setSelectedUser(user);
    setModalMode("delete");
  };

  const saveUser = (event) => {
    event.preventDefault();
    const normalizedUser = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      identifier: formData.identifier.trim(),
    };

    if (
      !normalizedUser.name ||
      !normalizedUser.email ||
      !normalizedUser.identifier
    ) {
      return;
    }

    if (modalMode === "create") {
      const newUser = {
        id: Date.now(),
        ...normalizedUser,
      };
      setUsers((currentUsers) => [newUser, ...currentUsers]);
      setRequestedPage(1);
      setNotification(`Usuario ${newUser.name} registrado correctamente.`);
    } else if (modalMode === "edit" && selectedUser) {
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, ...normalizedUser } : user,
        ),
      );
      setNotification(`Cambios guardados para ${normalizedUser.name}.`);
    }

    closeModal();
  };

  const deleteUser = () => {
    if (!selectedUser) return;

    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== selectedUser.id),
    );
    setNotification(`Usuario ${selectedUser.name} eliminado.`);
    closeModal();
  };

  return {
    users,
    filteredUsers,
    paginatedUsers,
    currentPage,
    pageCount,
    usersPerPage: USERS_PER_PAGE,
    setCurrentPage: setRequestedPage,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterRole,
    setFilterRole,
    selectedUser,
    modalMode,
    formData,
    setFormData,
    notification,
    setNotification,
    openCreate,
    openView,
    openEdit,
    openDelete,
    closeModal,
    saveUser,
    deleteUser,
  };
}
