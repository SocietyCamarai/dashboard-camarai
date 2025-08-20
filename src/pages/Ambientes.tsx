import React, { useState, useEffect } from 'react';
import { AmbientesGrid, Header, ConfiguracionAmbienteModal } from '../components';
import type { Ambiente } from '../types/compatibility.types';
import type { IArea, IMesa } from '../types/database.types';
import { useTheme } from '../hooks/useTheme';
import { useAreas, useMesas } from '../hooks/useEntities';
import { useAuth } from '../hooks/useAuth';

const Ambientes: React.FC = () => {
  const { currentTheme } = useTheme();
  const { user } = useAuth();

  // Obtener datos de áreas y mesas usando hooks de API
  const { areas, loading: areasLoading, error: areasError } = useAreas(user?.establecimiento_id || 1);
  const { mesas, loading: mesasLoading, error: mesasError } = useMesas(user?.establecimiento_id || 1);

  // Estado para almacenar los ambientes procesados
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);

  // Función para procesar los datos de áreas y mesas para crear ambientes
  const procesarAmbientes = (areas: IArea[], mesas: IMesa[]): Ambiente[] => {
    return areas.map(area => {
      // Filtrar mesas que pertenecen a esta área
      const mesasArea = mesas.filter(mesa => mesa.area_id === area.id);

      // Calcular estadísticas
      const mesasActivas = mesasArea.filter(mesa => mesa.estado === 'ocupada').length;
      const aforoTotal = mesasArea.reduce((total, mesa) => total + (mesa.capacidad || 0), 0);

      // Determinar estado basado en el campo activo de la base de datos
      const estado = area.activo ? 'Abierto' : 'Cerrado';
      const porcentajeOcupacion = mesasArea.length > 0 ? Math.round((mesasActivas / mesasArea.length) * 100) : 0;

      // Asignar icono y color basado en el nombre del área
      const icono = area.nombre.toLowerCase().includes('terraza') ? 'sun' : 'utensils';
      const colorBorde = area.nombre.toLowerCase().includes('terraza')
        ? 'rgb(247, 183, 49)'
        : 'rgb(155, 110, 253)';

      return {
        ...area,
        icono,
        aforoTotal,
        mesas: mesasArea.length,
        mesasActivas,
        estado,
        porcentajeOcupacion,
        colorBorde
      };
    });
  };

  // Cargar datos cuando cambien las áreas o mesas
  useEffect(() => {
    if (areas && mesas) {
      const ambientesProcesados = procesarAmbientes(areas, mesas);
      setAmbientes(ambientesProcesados);
    }
  }, [areas, mesas]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [ambienteSeleccionado, setAmbienteSeleccionado] = useState<Ambiente | null>(null);

  const handleToggleActivo = (id: number) => {
    setAmbientes(prev =>
      prev.map(ambiente =>
        ambiente.id === id
          ? {
            ...ambiente,
            estado: ambiente.estado === 'Abierto' ? 'Cerrado' : 'Abierto'
          }
          : ambiente
      )
    );

    // Obtener el ambiente actualizado para el console.log
    const ambienteActualizado = ambientes.find(ambiente => ambiente.id === id);
    if (ambienteActualizado) {
      const nuevoEstado = ambienteActualizado.estado === 'Abierto' ? 'Cerrado' : 'Abierto';
      console.log(`Ambiente ID ${id} - ${ambienteActualizado.nombre}: ${nuevoEstado.toUpperCase()}`);
    }
  };

  const handleImprimirQR = (id: number) => {
    console.log(`Imprimir QR for ambiente: ${id}`);
    // Aquí iría la lógica para imprimir QR
  };

  const handleCrearAmbiente = () => {
    const nuevoAmbiente: Ambiente = {
      id: Date.now(),
      nombre: `Ambiente ${ambientes.length + 1}`,
      establecimiento_id: 7, // Usar el establecimiento_id de los datos mockup
      descripcion: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      activo: true,
      icono: 'utensils',
      aforoTotal: 0,
      mesas: 0,
      mesasActivas: 0,
      estado: 'Abierto',
      porcentajeOcupacion: 0,
      colorBorde: 'rgb(155, 110, 253)'
    };
    setAmbientes(prev => [...prev, nuevoAmbiente]);
  };

  const handleEditarNombre = (id: number, nuevoNombre: string) => {
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

  // Mostrar loading mientras se cargan los datos
  if (areasLoading || mesasLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: currentTheme.colors.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando ambientes...</p>
        </div>
      </div>
    );
  }

  // Mostrar error si hay algún problema
  if (areasError || mesasError) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: currentTheme.colors.background }}>
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 mb-2">Error al cargar los datos</p>
          <p className="text-gray-600 text-sm">{areasError || mesasError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: currentTheme.colors.background }}>
      <div className="container mx-auto">
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
