import {
  ModalEliminar,
  ModalFormulario,
  ModalVer,
} from "../../../shared/components";
import { ESTADOS_USUARIO, ROLES_USUARIO } from "../services/usuariosService";

function FormField({ id, label, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClassName =
  "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-verde-oscuro";

export default function UsuariosModales({
  modalMode,
  selectedUser,
  formData,
  setFormData,
  onRoleChange,
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
        title={modalMode === "create" ? "Crear usuario" : "Editar usuario"}
      >
        <FormField id="usuario-nombre" label="Nombre completo">
          <input
            id="usuario-nombre"
            type="text"
            required
            autoComplete="name"
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
            placeholder="Ej. Ana Pérez"
            className={inputClassName}
          />
        </FormField>
        <FormField id="usuario-correo" label="Correo empresarial">
          <input
            id="usuario-correo"
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={(event) =>
              setFormData({ ...formData, email: event.target.value })
            }
            placeholder="ana.p@artefrio.com"
            className={inputClassName}
          />
        </FormField>
        <FormField id="usuario-id" label="ID">
          <input
            id="usuario-id"
            type="text"
            disabled
            value={formData.identifier}
            aria-describedby="usuario-id-ayuda"
            className={`${inputClassName} cursor-not-allowed bg-slate-100 text-slate-500 disabled:opacity-100`}
          />
          <p id="usuario-id-ayuda" className="mt-1 text-xs text-slate-500">
            Se genera automáticamente según el rol y el consecutivo disponible.
          </p>
        </FormField>
        <FormField id="usuario-rol" label="Rol asignado">
          <select
            id="usuario-rol"
            value={formData.role}
            onChange={(event) => onRoleChange(event.target.value)}
            className={inputClassName}
          >
            {ROLES_USUARIO.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </FormField>
        <FormField id="usuario-estado" label="Estado">
          <select
            id="usuario-estado"
            value={formData.status}
            onChange={(event) =>
              setFormData({ ...formData, status: event.target.value })
            }
            className={inputClassName}
          >
            {ESTADOS_USUARIO.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </FormField>
      </ModalFormulario>

      <ModalVer
        isOpen={modalMode === "view" && Boolean(selectedUser)}
        onClose={onClose}
        title="Detalles del usuario"
      >
        {selectedUser && (
          <dl className="space-y-3 text-sm text-slate-700">
            <div>
              <dt className="inline font-semibold">Nombre: </dt>
              <dd className="inline">{selectedUser.name}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Correo: </dt>
              <dd className="inline">{selectedUser.email}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">ID: </dt>
              <dd className="inline">{selectedUser.identifier}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Rol: </dt>
              <dd className="inline">{selectedUser.role}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Estado: </dt>
              <dd className="inline">{selectedUser.status}</dd>
            </div>
          </dl>
        )}
      </ModalVer>

      <ModalEliminar
        isOpen={modalMode === "delete" && Boolean(selectedUser)}
        onClose={onClose}
        onConfirm={onDelete}
        title="¿Eliminar usuario?"
      >
        {selectedUser && (
          <p className="text-sm leading-6 text-slate-600">
            Estás a punto de eliminar a{" "}
            <strong className="text-slate-800">{selectedUser.name}</strong> del
            sistema. Esta acción no se puede deshacer.
          </p>
        )}
      </ModalEliminar>
    </>
  );
}
