import React from 'react';
import { Mesa } from './Mesa';
import type { AmbientePlano } from '../../types/compatibility.types';

interface ListaMesasProps {
  ambiente: AmbientePlano;
  mesaSeleccionada: number | null;
  onMesaMover: (id: number, x: number, y: number) => void;
  onMesaRedimensionar: (id: number, width: number, height: number) => void;
  onMesaEliminar: (id: number) => void;
  onMesaGenerarQR: (id: number) => void;
  onMesaSeleccionar: (id: number | null) => void;
}

export const ListaMesas: React.FC<ListaMesasProps> = ({
  ambiente,
  mesaSeleccionada,
  onMesaMover,
  onMesaRedimensionar,
  onMesaEliminar,
  onMesaGenerarQR,
  onMesaSeleccionar
}) => {
  return (
    <>
      {ambiente.mesas.map((mesa) => (
        <Mesa
          key={mesa.id}
          mesa={mesa}
          onMover={onMesaMover}
          onRedimensionar={onMesaRedimensionar}
          onEliminar={onMesaEliminar}
          onGenerarQR={onMesaGenerarQR}
          seleccionada={mesaSeleccionada === mesa.id}
          onSeleccionar={onMesaSeleccionar}
        />
      ))}
    </>
  );
}; 
