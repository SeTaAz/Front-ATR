import { useId } from 'react';
import Boton from './Boton';
import Modal from './Modal';

export default function ModalFormulario({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  isSaving = false,
}) {
  const formId = useId();

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(event);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Boton type="submit" form={formId} disabled={isSaving}>
            {isSaving ? 'Guardando...' : 'Guardar'}
          </Boton>
          <Boton
            variant="secundario"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancelar
          </Boton>
        </>
      }
    >
      <form id={formId} onSubmit={handleSubmit} className="space-y-4">
        {children}
      </form>
    </Modal>
  );
}
