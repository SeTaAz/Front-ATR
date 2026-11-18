import { BotonCrear, Notificacion } from "../../../shared/components";
import useEntradas from "../hooks/useEntradas";
import EntradasModales from "./EntradasModales";
import EntradasTabla from "./EntradasTabla";

export default function EntradasComponent() {
  const entradas = useEntradas();

  return (
    <>
      <main className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-6 md:px-8 md:py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Evaluación de Requerimientos
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Gestión de novedades, evaluación de problemas y solicitud oficial de repuestos.
            </p>
          </div>
          <BotonCrear entidad="evaluación" onClick={entradas.openCreate} />
        </header>

        <EntradasTabla
          entradas={entradas.paginatedEntradas}
          totalEntradas={entradas.filteredEntradas.length}
          currentPage={entradas.currentPage}
          pageCount={entradas.pageCount}
          entradasPerPage={entradas.entradasPerPage}
          onPageChange={entradas.setCurrentPage}
          searchTerm={entradas.searchTerm}
          onSearchChange={entradas.setSearchTerm}
          filterStatus={entradas.filterStatus}
          onStatusChange={entradas.setFilterStatus}
          onView={entradas.openView}
          onEdit={entradas.openEdit}
          onDelete={entradas.openDelete}
        />
      </main>

      <EntradasModales
        modalMode={entradas.modalMode}
        selectedEntrada={entradas.selectedEntrada}
        formData={entradas.formData}
        setFormData={entradas.setFormData}
        onClose={entradas.closeModal}
        onSave={entradas.saveEntrada}
        onDelete={entradas.deleteEntrada}
      />

      <Notificacion
        key={entradas.notification?.id}
        message={entradas.notification?.message}
        variant={entradas.notification?.variant}
        onClose={entradas.clearNotification}
      />
    </>
  );
}