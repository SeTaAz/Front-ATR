import { BotonCrear, Notificacion } from "../../../shared/components";
import useUsuarios from "../hooks/useUsuarios";
import UsuariosModales from "./UsuariosModales";
import UsuariosTabla from "./UsuariosTabla";

export default function UsuariosComponent() {
  const {
    filteredUsers,
    paginatedUsers,
    currentPage,
    pageCount,
    usersPerPage,
    setCurrentPage,
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
  } = useUsuarios();

  return (
    <>
      <main className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-6 md:px-8 md:py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Gestión de usuarios
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Administra los usuarios, sus roles y su estado.
            </p>
          </div>
          <BotonCrear entidad="usuario" onClick={openCreate} />
        </header>

        <UsuariosTabla
          users={paginatedUsers}
          totalUsers={filteredUsers.length}
          currentPage={currentPage}
          pageCount={pageCount}
          usersPerPage={usersPerPage}
          onPageChange={setCurrentPage}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onStatusChange={setFilterStatus}
          filterRole={filterRole}
          onRoleChange={setFilterRole}
          onView={openView}
          onEdit={openEdit}
          onDelete={openDelete}
        />
      </main>

      <UsuariosModales
        modalMode={modalMode}
        selectedUser={selectedUser}
        formData={formData}
        setFormData={setFormData}
        onClose={closeModal}
        onSave={saveUser}
        onDelete={deleteUser}
      />

      <Notificacion
        message={notification}
        onClose={() => setNotification("")}
      />
    </>
  );
}
