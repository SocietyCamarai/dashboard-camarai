import React, { useState } from 'react';
import { AmbientesGrid, Header, ConfiguracionAmbienteModal } from '../components';
import type { Ambiente } from '../types/components';
import { useTheme } from '../hooks/useTheme';

const Ambientes: React.FC = () => {
  const { currentTheme } = useTheme();
  
  // Datos de ejemplo basados en la imagen
  const [ambientes, setAmbientes] = useState<Ambiente[]>([
    {
      id: '1',
      nombre: 'Salón Principal',
      icono: 'utensils',
      activo: true,
      aforoTotal: 8,
      mesas: 4,
      mesasActivas: 3,
      estado: 'Abierto',
      porcentajeOcupacion: 75,
      colorBorde: 'rgb(120, 163, 237)'
    },
    {
      id: '2',
      nombre: 'Terraza',
      icono: 'sun',
      activo: false,
      aforoTotal: 4,
      mesas: 2,
      mesasActivas: 2,
      estado: 'Cerrado',
      porcentajeOcupacion: 100,
      colorBorde: 'rgb(247, 183, 49)'
    }
  ]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [ambienteSeleccionado, setAmbienteSeleccionado] = useState<Ambiente | null>(null);

  const handleToggleActivo = (id: string) => {
    setAmbientes(prev => 
      prev.map(ambiente => 
        ambiente.id === id 
          ? { ...ambiente, activo: !ambiente.activo }
          : ambiente
      )
    );
  };

  const handleImprimirQR = (_id: string) => {
    // Aquí iría la lógica para imprimir QR
  };

  const handleCrearAmbiente = () => {
    const nuevoAmbiente: Ambiente = {
      id: Date.now().toString(),
      nombre: `Ambiente ${ambientes.length + 1}`,
      icono: 'utensils',
      activo: true,
      aforoTotal: 0,
      mesas: 0,
      mesasActivas: 0,
      estado: 'Abierto',
      porcentajeOcupacion: 0,
      colorBorde: 'rgb(155, 110, 253)'
    };
    setAmbientes(prev => [...prev, nuevoAmbiente]);
  };

  const handleEditarNombre = (id: string, nuevoNombre: string) => {
    setAmbientes(prev => 
      prev.map(ambiente => 
        ambiente.id === id 
          ? { ...ambiente, nombre: nuevoNombre }
          : ambiente
      )
    );
  };

  const handleConfigurar = (ambiente: Ambiente) => {
    setAmbienteSeleccionado(ambiente);
    setModalAbierto(true);
  };

  const handleGuardarConfiguracion = (ambienteActualizado: Ambiente) => {
    setAmbientes(prev => 
      prev.map(ambiente => 
        ambiente.id === ambienteActualizado.id 
          ? ambienteActualizado
          : ambiente
      )
    );
  };

  const handleEliminarAmbiente = (ambiente: Ambiente) => {
    setAmbientes(prev => prev.filter(a => a.id !== ambiente.id));
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
    setAmbienteSeleccionado(null);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: currentTheme.colors.background }}>
      <div className="container mx-auto ">
        <div className="mb-8">
          <Header title="Gestión de Ambientes" />
        </div>
        <AmbientesGrid
          ambientes={ambientes}
          onToggleActivo={handleToggleActivo}
          onImprimirQR={handleImprimirQR}
          onEditarNombre={handleEditarNombre}
          onConfigurar={handleConfigurar}
          onCrearAmbiente={handleCrearAmbiente}
        />
        
        <ConfiguracionAmbienteModal
          ambiente={ambienteSeleccionado}
          isOpen={modalAbierto}
          onClose={handleCerrarModal}
          onSave={handleGuardarConfiguracion}
          onDelete={handleEliminarAmbiente}
        />
      </div>
    </div>
  );
};

export default Ambientes; 