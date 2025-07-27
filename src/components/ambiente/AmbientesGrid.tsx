import React from 'react';
import AmbienteCard from './AmbienteCard';
import CrearAmbienteCard from './CrearAmbienteCard';
import type { Ambiente } from '../../types/components';

interface AmbientesGridProps {
  ambientes: Ambiente[];
  onToggleActivo: (id: string) => void;
  onImprimirQR: (id: string) => void;
  onEditarNombre: (id: string, nuevoNombre: string) => void;
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
      {ambientes.map((ambiente) => (
        <div key={ambiente.id}>
          <AmbienteCard
            ambiente={ambiente}
            onToggleActivo={onToggleActivo}
            onImprimirQR={onImprimirQR}
            onEditarNombre={onEditarNombre}
            onConfigurar={onConfigurar}
          />
        </div>
      ))}
      <div className=""> 
        <CrearAmbienteCard onCrearAmbiente={onCrearAmbiente} /> 
      </div>
    </div>
  );
};

export default AmbientesGrid; 