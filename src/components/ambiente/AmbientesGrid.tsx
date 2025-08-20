import React from 'react';
import AmbienteCard from './AmbienteCard';
import CrearAmbienteCard from './CrearAmbienteCard';
import type { Ambiente } from '../../types/compatibility.types';

interface AmbientesGridProps {
  ambientes: Ambiente[];
  onToggleActivo: (id: number) => void;
  onImprimirQR: (id: number) => void;
  onEditarNombre: (id: number, nuevoNombre: string) => void;
  onConfigurar: (ambiente: Ambiente) => void;
  onCrearAmbiente: () => void;
}

const AmbientesGrid: React.FC<AmbientesGridProps> = ({
  ambientes,
  onToggleActivo,
  onImprimirQR,
  onEditarNombre,
  onConfigurar,
  onCrearAmbiente
}) => {
  return (
    <div className="grid gap-4 sm:gap-5 max-w-7xl mx-auto px-4 sm:px-0" style={{
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
    }}>
      {ambientes.map((ambiente) => (
        <div key={ambiente.id} className="p-2">
          <AmbienteCard
            ambiente={ambiente}
            onToggleActivo={onToggleActivo}
            onImprimirQR={onImprimirQR}
            onEditarNombre={onEditarNombre}
            onConfigurar={onConfigurar}
          />
        </div>
      ))}
      <div className="p-2">
        <CrearAmbienteCard onCrearAmbiente={onCrearAmbiente} />
      </div>
    </div>
  );
};

export default AmbientesGrid; 
