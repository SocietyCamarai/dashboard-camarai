import { useState, useCallback } from 'react';
import type { AmbientePlano, Mesa, PlanoMesasState } from '../types/components';
import { generarId, generarPosicionAleatoria, calcularPersonas } from '../utils/planoMesas';

// Constantes para el canvas
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

export function usePlanoMesas() {
  const [state, setState] = useState<PlanoMesasState>({
    ambientes: [
      {
        id: 'main-hall',
        nombre: 'Salón Principal',
        mesas: [
          {
            id: 'mesa-1',
            nombre: 'Mesa 1',
            x: 50,
            y: 50,
            width: 128,
            height: 100,
            personas: 1,
            ambienteId: 'main-hall'
          },
          {
            id: 'mesa-2',
            nombre: 'Mesa 2',
            x: 458,
            y: 344,
            width: 256,
            height: 200,
            personas: 4,
            ambienteId: 'main-hall'
          },
          {
            id: 'mesa-3',
            nombre: 'Mesa 3',
            x: 100,
            y: 200,
            width: 160,
            height: 125,
            personas: 2,
            ambienteId: 'main-hall'
          },
          {
            id: 'mesa-4',
            nombre: 'Mesa 4',
            x: 347,
            y: 184,
            width: 128,
            height: 100,
            personas: 1,
            ambienteId: 'main-hall'
          }
        ]
      },
      {
        id: 'terrace',
        nombre: 'Terraza',
        mesas: []
      },
      {
        id: 'ambiente-3',
        nombre: 'Ambiente 3',
        mesas: []
      }
    ],
    ambienteActivo: 'main-hall',
    mesaSeleccionada: null,
    mesaArrastrando: null,
    mesaRedimensionando: null
  });

  const cambiarAmbiente = useCallback((ambienteId: string) => {
    setState(prev => ({
      ...prev,
      ambienteActivo: ambienteId,
      mesaSeleccionada: null
    }));
  }, []);

  const añadirAmbiente = useCallback(() => {
    const nuevoAmbiente: AmbientePlano = {
      id: generarId('ambiente'),
      nombre: `Ambiente ${state.ambientes.length + 1}`,
      mesas: []
    };

    setState(prev => ({
      ...prev,
      ambientes: [...prev.ambientes, nuevoAmbiente],
      ambienteActivo: nuevoAmbiente.id
    }));
  }, [state.ambientes.length]);

  const añadirMesa = useCallback((ambienteId: string) => {
    const posicion = generarPosicionAleatoria(CANVAS_WIDTH, CANVAS_HEIGHT);
    const dimensiones = { width: 128, height: 100 };
    const { personas } = calcularPersonas(dimensiones.width, dimensiones.height);

    const nuevaMesa: Mesa = {
      id: generarId('mesa'),
      nombre: `Mesa ${(state.ambientes.find(a => a.id === ambienteId)?.mesas.length || 0) + 1}`,
      x: posicion.x,
      y: posicion.y,
      width: dimensiones.width,
      height: dimensiones.height,
      personas,
      ambienteId
    };

    setState(prev => ({
      ...prev,
      ambientes: prev.ambientes.map(ambiente =>
        ambiente.id === ambienteId
          ? { ...ambiente, mesas: [...ambiente.mesas, nuevaMesa] }
          : ambiente
      )
    }));
  }, [state.ambientes]);

  const moverMesa = useCallback((mesaId: string, x: number, y: number) => {
    setState(prev => ({
      ...prev,
      ambientes: prev.ambientes.map(ambiente => ({
        ...ambiente,
        mesas: ambiente.mesas.map(mesa =>
          mesa.id === mesaId ? { ...mesa, x, y } : mesa
        )
      }))
    }));
  }, []);

  const redimensionarMesa = useCallback((mesaId: string, width: number, height: number) => {
    const { personas } = calcularPersonas(width, height);
    
    setState(prev => ({
      ...prev,
      ambientes: prev.ambientes.map(ambiente => ({
        ...ambiente,
        mesas: ambiente.mesas.map(mesa =>
          mesa.id === mesaId ? { ...mesa, width, height, personas } : mesa
        )
      }))
    }));
  }, []);

  const eliminarMesa = useCallback((mesaId: string) => {
    setState(prev => ({
      ...prev,
      ambientes: prev.ambientes.map(ambiente => ({
        ...ambiente,
        mesas: ambiente.mesas.filter(mesa => mesa.id !== mesaId)
      })),
      mesaSeleccionada: prev.mesaSeleccionada === mesaId ? null : prev.mesaSeleccionada
    }));
  }, []);

  const seleccionarMesa = useCallback((mesaId: string | null) => {
    setState(prev => ({
      ...prev,
      mesaSeleccionada: mesaId
    }));
  }, []);

  const generarQR = useCallback((mesaId: string) => {
    // Por ahora solo un console.log, en el futuro se implementará la funcionalidad real
    console.log('Generando QR para mesa:', mesaId);
  }, []);

  const actualizarMesa = useCallback((mesaId: string, cambios: Partial<Mesa>) => {
    setState(prev => ({
      ...prev,
      ambientes: prev.ambientes.map(ambiente => ({
        ...ambiente,
        mesas: ambiente.mesas.map(mesa =>
          mesa.id === mesaId ? { ...mesa, ...cambios } : mesa
        )
      }))
    }));
  }, []);

  const ambienteActivo = state.ambientes.find(a => a.id === state.ambienteActivo);

  return {
    state,
    ambienteActivo: ambienteActivo || undefined,
    cambiarAmbiente,
    añadirAmbiente,
    añadirMesa,
    moverMesa,
    redimensionarMesa,
    eliminarMesa,
    seleccionarMesa,
    generarQR,
    actualizarMesa
  };
} 