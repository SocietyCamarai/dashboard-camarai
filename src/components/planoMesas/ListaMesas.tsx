import React from 'react';
import { Mesa } from './Mesa';
import type { AmbientePlano } from '../../types/components';

interface ListaMesasProps {
  ambiente: AmbientePlano;
  mesaSeleccionada: string | null;
  onMesaMover: (id: string, x: number, y: number) => void;
  onMesaRedimensionar: (id: string, width: number, height: number) => void;
  onMesaEliminar: (id: string) => void;
  onMesaGenerarQR: (id: string) => void;
  onMesaSeleccionar: (id: string) => void;
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