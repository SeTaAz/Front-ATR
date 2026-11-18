import { ModalEliminar, ModalFormulario, ModalVer } from "../../../shared/components";
import { ESTADOS_ENTRADA } from "../services/entradasService";

const inputClassName = "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-verde-oscuro";

function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-normal text-slate-700">{label}</label>
      {children}
    </div>
  );
}

export default function EntradasModales({
  modalMode,
  selectedEntrada,
  formData,
  setFormData,
  onClose,
  onSave,
  onDelete,
}) {
  const isFormOpen = modalMode === "create" || modalMode === "edit";

  const addRequest = () => {
    setFormData({
      ...formData,
      requests: [...formData.requests, ["Nuevo repuesto o insumo", "1", "Por definir"]],
    });
  };

  return (
    <>
      <ModalFormulario
        isOpen={isFormOpen}
        onClose={onClose}
        onSubmit={onSave}
        title={modalMode === "create" ? "Nueva evaluación" : "Editar evaluación"}
      >
        <p className="text-sm text-slate-500">
          Registra el problema detectado y la solución técnica requerida.
        </p>
        <Field id="entrada-id" label="ID de entrada">
          <input id="entrada-id" value={formData.identifier} disabled className={`${inputClassName} bg-slate-100 text-slate-500`} />
        </Field>
        <Field id="entrada-equipo" label="Equipo">
          <input id="entrada-equipo" required value={formData.equipment} onChange={(event) => setFormData({ ...formData, equipment: event.target.value })} placeholder="Ej. Compresor Rack B" className={inputClassName} />
        </Field>
        <Field id="entrada-problema" label="Novedad o problema">
          <textarea id="entrada-problema" required rows={3} value={formData.problem} onChange={(event) => setFormData({ ...formData, problem: event.target.value })} className={`${inputClassName} resize-y`} />
        </Field>
        <Field id="entrada-solucion" label="Solución requerida">
          <textarea id="entrada-solucion" rows={3} value={formData.solution} onChange={(event) => setFormData({ ...formData, solution: event.target.value })} className={`${inputClassName} resize-y`} />
        </Field>
        <Field id="entrada-estado" label="Estado">
          <select id="entrada-estado" value={formData.status} onChange={(event) => setFormData({ ...formData, status: event.target.value })} className={inputClassName}>
            {ESTADOS_ENTRADA.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
        </Field>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-normal text-slate-700">Repuestos e insumos</span>
            <button type="button" onClick={addRequest} className="rounded-lg bg-verde-claro px-3 py-1.5 text-xs font-bold text-verde-oscuro hover:bg-verde-oscuro hover:text-white">
              + Agregar
            </button>
          </div>
          {formData.requests.length > 0 && (
            <div className="divide-y rounded-xl border border-slate-200">
              {formData.requests.map((request, index) => (
                <div key={`${request[0]}-${index}`} className="grid gap-2 p-3 sm:grid-cols-[1fr_70px_140px]">
                  <input value={request[0]} onChange={(event) => setFormData({ ...formData, requests: formData.requests.map((item, itemIndex) => itemIndex === index ? [event.target.value, item[1], item[2]] : item) })} aria-label="Insumo" className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm" />
                  <input value={request[1]} onChange={(event) => setFormData({ ...formData, requests: formData.requests.map((item, itemIndex) => itemIndex === index ? [item[0], event.target.value, item[2]] : item) })} aria-label="Cantidad" className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm" />
                  <input value={request[2]} onChange={(event) => setFormData({ ...formData, requests: formData.requests.map((item, itemIndex) => itemIndex === index ? [item[0], item[1], event.target.value] : item) })} aria-label="Proveedor" className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm" />
                </div>
              ))}
            </div>
          )}
        </div>
      </ModalFormulario>

      <ModalVer
        isOpen={modalMode === "view" && Boolean(selectedEntrada)}
        onClose={onClose}
        title="Detalle de evaluación"
      >
        {selectedEntrada && (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Entrada", selectedEntrada.identifier],
                ["Equipo", selectedEntrada.equipment],
                ["Estado", selectedEntrada.status],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Novedad</p>
              <p className="mt-1 text-sm text-slate-900">{selectedEntrada.problem}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Solución requerida</p>
              <p className="mt-1 text-sm text-slate-900">{selectedEntrada.solution || "Sin solución definida."}</p>
            </div>
            {selectedEntrada.requests.length > 0 && (
              <div className="rounded-xl border border-slate-200 p-3">
                <p className="mb-2 text-xs font-medium text-slate-500">Repuestos e insumos</p>
                <div className="space-y-2">
                  {selectedEntrada.requests.map((request, index) => (
                    <div key={`${request[0]}-${index}`} className="rounded-lg bg-verde-claro/50 px-3 py-2 text-sm">
                      {request[0]} — Cant. {request[1]} — {request[2]}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </ModalVer>

      <ModalEliminar
        isOpen={modalMode === "delete" && Boolean(selectedEntrada)}
        onClose={onClose}
        onConfirm={onDelete}
        title="¿Eliminar evaluación?"
      >
        {selectedEntrada && (
          <p className="text-sm leading-6 text-slate-600">
            Estás a punto de eliminar la evaluación <strong className="text-slate-800">{selectedEntrada.identifier}</strong>. Esta acción no se puede deshacer.
          </p>
        )}
      </ModalEliminar>
    </>
  );
}
