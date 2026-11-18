import Boton from './Boton';
import Modal from './Modal';

export default function ModalVer({ isOpen, onClose, title, children, footer }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        footer ?? (
          <Boton variant="secundario" onClick={onClose}>
            Cerrar
          </Boton>
        )
      }
    >
      {children}
    </Modal>
  );
}
