import { BotonCrear, Notificacion } from "../../../shared/components";
import useRepuestos from "../hooks/useRepuestos";
import RepuestosModales from "./RepuestosModales";
import RepuestosTabla from "./RepuestosTabla";

export default function RepuestosComponent() {
  const repuestos = useRepuestos();

  return (
    <>
      <main className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-6 md:px-8 md:py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Maestro de repuestos
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Catálogo de referencia de repuestos para diagnósticos.
            </p>
          </div>
          <BotonCrear entidad="repuesto" onClick={repuestos.openCreate} />
        </header>

        <RepuestosTabla
          repuestos={repuestos.paginatedRepuestos}
          totalRepuestos={repuestos.filteredRepuestos.length}
          currentPage={repuestos.currentPage}
          pageCount={repuestos.pageCount}
          repuestosPerPage={repuestos.repuestosPerPage}
          onPageChange={repuestos.setCurrentPage}
          searchTerm={repuestos.searchTerm}
          onSearchChange={repuestos.setSearchTerm}
          filterCategory={repuestos.filterCategory}
          onCategoryChange={repuestos.setFilterCategory}
          onView={repuestos.openView}
          onEdit={repuestos.openEdit}
          onDelete={repuestos.openDelete}
        />
      </main>

      <RepuestosModales
        modalMode={repuestos.modalMode}
        selectedRepuesto={repuestos.selectedRepuesto}
        formData={repuestos.formData}
        setFormData={repuestos.setFormData}
        onClose={repuestos.closeModal}
        onSave={repuestos.savePart}
        onDelete={repuestos.deletePart}
      />

      <Notificacion
        key={repuestos.notification?.id}
        message={repuestos.notification?.message}
        variant={repuestos.notification?.variant}
        onClose={repuestos.clearNotification}
      />
    </>
  );
}