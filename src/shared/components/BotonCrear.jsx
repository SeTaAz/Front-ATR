import { FiPlus } from 'react-icons/fi';
import Boton from './Boton';

export default function BotonCrear({ entidad, ...props }) {
  return (
    <Boton {...props}>
      <FiPlus className="mr-2 h-4 w-4" aria-hidden="true" />
      Crear {entidad}
    </Boton>
  );
}
