import {
  ModalEliminar,
  ModalFormulario,
  ModalVer,
} from "../../../shared/components";
import { REPUESTO_CATEGORIES } from "../services/repuestosService";

function FormField({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClassName =
  "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-verde-oscuro";

export default function RepuestosModales({
  modalMode,
  selectedRepuesto,
  formData,
  setFormData,
  onClose,
  onSave,
  onDelete,
}) {
  const isFormOpen = modalMode === "create" || modalMode === "edit";

  return (
    <>
      <ModalFormulario
        isOpen={isFormOpen}
        onClose={onClose}
        onSubmit={onSave}
        title={modalMode === "create" ? "Agregar repuesto" : "Editar repuesto"}
      >
        <p className="text-sm text-slate-500">
          Completa la información del repuesto.
        </p>
        <FormField id="repuesto-nombre" label="Nombre del repuesto">
          <input
            id="repuesto-nombre"
            type="text"
            required
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            placeholder="Ej. Filtro deshidratador"
            className={inputClassName}
          />
        </FormField>
        <FormField id="repuesto-referencia" label="Código de referencia">
          <input
            id="repuesto-referencia"
            type="text"
            required
            value={formData.ref}
            onChange={(event) => setFormData({ ...formData, ref: event.target.value })}
            placeholder="Ej. R-204"
            className={inputClassName}
          />
        </FormField>
        <FormField id="repuesto-categoria" label="Categoría">
          <select
            id="repuesto-categoria"
            value={formData.category}
            onChange={(event) => setFormData({ ...formData, category: event.target.value })}
            className={inputClassName}
          >
            {REPUESTO_CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </FormField>
        <FormField id="repuesto-descripcion" label="Descripción">
          <textarea
            id="repuesto-descripcion"
            rows={3}
            value={formData.description}
            onChange={(event) => setFormData({ ...formData, description: event.target.value })}
            placeholder="Detalles técnicos del repuesto..."
            className={`${inputClassName} resize-y`}
          />
        </FormField>
        <FormField id="repuesto-imagen" label="URL de la imagen (opcional)">
          <input
            id="repuesto-imagen"
            type="url"
            value={formData.image}
            onChange={(event) => setFormData({ ...formData, image: event.target.value })}
            placeholder="https://..."
            className={inputClassName}
          />
        </FormField>
      </ModalFormulario>

      <ModalVer
        isOpen={modalMode === "view" && Boolean(selectedRepuesto)}
        onClose={onClose}
        title="Detalles del repuesto"
      >
        {selectedRepuesto && (
          <div className="space-y-4 text-sm text-slate-700">
            {selectedRepuesto.image && (
              <img
                src={selectedRepuesto.image}
                alt={selectedRepuesto.name}
                className="h-36 w-full rounded-xl border border-slate-100 bg-slate-50 object-contain p-2"
              />
            )}
            <dl className="space-y-3">
              <div>
                <dt className="inline font-semibold">Nombre: </dt>
                <dd className="inline">{selectedRepuesto.name}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Referencia: </dt>
                <dd className="inline font-mono">{selectedRepuesto.ref}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Categoría: </dt>
                <dd className="inline">{selectedRepuesto.category}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Descripción: </dt>
                <dd className="inline">
                  {selectedRepuesto.description || "Sin descripción adicional."}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </ModalVer>

      <ModalEliminar
        isOpen={modalMode === "delete" && Boolean(selectedRepuesto)}
        onClose={onClose}
        onConfirm={onDelete}
        title="¿Eliminar repuesto?"
      >
        {selectedRepuesto && (
          <p className="text-sm leading-6 text-slate-600">
            Estás a punto de eliminar{" "}
            <strong className="text-slate-800">{selectedRepuesto.name}</strong>{" "}
            del catálogo. Esta acción no se puede deshacer.
          </p>
        )}
      </ModalEliminar>
    </>
  );
}
