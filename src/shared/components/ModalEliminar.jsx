import Boton from './Boton';
import Modal from './Modal';

export default function ModalEliminar({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar eliminación',
  children,
  isDeleting = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Boton
            variant="peligro"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </Boton>
          <Boton
            variant="secundario"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancelar
          </Boton>
        </>
      }
    >
      {children}
    </Modal>
  );
}
