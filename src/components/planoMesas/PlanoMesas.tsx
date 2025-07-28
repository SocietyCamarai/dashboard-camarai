import React from 'react';
import { Tabs, TabContent, Canvas, IndicadoresVisuales, TablaMesas } from './index';
import { usePlanoMesas } from '../../hooks/usePlanoMesas';

export const PlanoMesas: React.FC = () => {
  const {
    state,
    ambienteActivo,
    cambiarAmbiente,
    añadirAmbiente,
    añadirMesa,
    moverMesa,
    redimensionarMesa,
    eliminarMesa,
    seleccionarMesa,
    generarQR,
    actualizarMesa
  } = usePlanoMesas();

  if (!ambienteActivo) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>No hay ambientes disponibles</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:gap-8 md:p-8 md:pt-0">
        <div dir="ltr" data-orientation="horizontal">
          {/* Tabs de ambientes */}
          <Tabs
            ambientes={state.ambientes}
            ambienteActivo={state.ambienteActivo}
            onAmbienteChange={cambiarAmbiente}
            onAñadirAmbiente={añadirAmbiente}
          />

          {/* Contenido de cada ambiente */}
          {state.ambientes.map((ambiente) => (
            <TabContent
              key={ambiente.id}
              ambiente={ambiente}
              isActive={state.ambienteActivo === ambiente.id}
            >
              <Canvas
                ambiente={ambiente}
                mesaSeleccionada={state.mesaSeleccionada}
                onMesaMover={moverMesa}
                onMesaRedimensionar={redimensionarMesa}
                onMesaEliminar={eliminarMesa}
                onMesaGenerarQR={generarQR}
                onMesaSeleccionar={seleccionarMesa}
                onAñadirMesa={() => añadirMesa(ambiente.id)}
              />
              
              {/* Tabla de mesas */}
              <TablaMesas
                mesas={ambiente.mesas}
                onActualizarMesa={actualizarMesa}
                onEliminarMesa={eliminarMesa}
                onSeleccionarMesa={seleccionarMesa}
                mesaSeleccionada={state.mesaSeleccionada}
              />
            </TabContent>
          ))}
        </div>
      </div>

      {/* Indicadores visuales */}
      <IndicadoresVisuales
        isDragging={state.mesaArrastrando !== null}
        isResizing={state.mesaRedimensionando !== null}
        mesaSeleccionada={state.mesaSeleccionada}
        totalMesas={ambienteActivo.mesas.length}
      />
    </>
  );
}; 