import React from 'react';
import CartaCard from './CartaCard';
import CrearCartaCard from './CrearCartaCard';
import type { ICarta } from '../../types/database.types';

interface CartasGridProps {
  cartas: ICarta[];
  onToggleActivo: (id: string) => void;
  onEditarNombre: (id: string, nuevoNombre: string) => void;
  onConfigurar: (carta: ICarta, buttonRef: React.RefObject<HTMLButtonElement>) => void;
  onCrearCarta: () => void;
  onAcciones: (carta: ICarta, buttonRef: React.RefObject<HTMLButtonElement>) => void;
}

const CartasGrid: React.FC<CartasGridProps> = ({
  cartas,
  onToggleActivo,

  onEditarNombre,
  onConfigurar,
  onCrearCarta,
  onAcciones
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
      {cartas.map((carta) => (
        <div key={carta.id}>
          <CartaCard
            carta={carta}
            onToggleActivo={onToggleActivo}
            onEditarNombre={onEditarNombre}
            onConfigurar={onConfigurar}
            onAcciones={onAcciones}
          />
        </div>
      ))}
      <div className="">
        <CrearCartaCard onCrearCarta={onCrearCarta} />
      </div>
    </div>
  );
};

export default CartasGrid;
