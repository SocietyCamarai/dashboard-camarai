import { useState, useCallback } from 'react';
import type { AmbientePlano, Mesa, PlanoMesasState } from '../types/compatibility.types';
import { generarPosicionAleatoria, calcularPersonas } from '../utils/planoMesas';

// Constantes para el canvas
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

export function usePlanoMesas() {
  const [state, setState] = useState<PlanoMesasState>({
    ambientes: [
      {
        id: 1,
        nombre: 'Salón Principal',
        establecimiento_id: 1,
        activo: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        mesas: [
          {
            id: 1,
            nombre: 'Mesa 1',
            establecimiento_id: 1,
            numero: '1',
            estado: 'libre',
            forma: 'cuadrada',
            capacidad: 1,
            activo: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            x: 50,
            y: 50,
            width: 128,
            height: 100,
            personas: 1,
            ambienteId: 1
          },
          {
            id: 2,
            nombre: 'Mesa 2',
            establecimiento_id: 1,
            numero: '2',
            estado: 'ocupada',
            forma: 'cuadrada',
            capacidad: 4,
            activo: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            x: 458,
            y: 344,
            width: 256,
            height: 200,
            personas: 4,
            ambienteId: 1
          },
          {
            id: 3,
            nombre: 'Mesa 3',
            establecimiento_id: 1,
            numero: '3',
            estado: 'libre',
            forma: 'rectangular',
            capacidad: 2,
            activo: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            x: 100,
            y: 200,
            width: 160,
            height: 125,
            personas: 2,
            ambienteId: 1
          },
          {
            id: 4,
            nombre: 'Mesa 4',
            establecimiento_id: 1,
            numero: '4',
            estado: 'libre',
            forma: 'cuadrada',
            capacidad: 1,
            activo: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            x: 347,
            y: 184,
            width: 128,
            height: 100,
            personas: 1,
            ambienteId: 1
          }
        ]
      },
      {
        id: 2,
        nombre: 'Terraza',
        establecimiento_id: 1,
        activo: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        mesas: []
      },
      {
        id: 3,
        nombre: 'Ambiente 3',
        establecimiento_id: 1,
        activo: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        mesas: []
      }
    ],
    ambienteActivo: 1,
    mesaSeleccionada: null,
    mesaArrastrando: null,
    mesaRedimensionando: null
  });

  const cambiarAmbiente = useCallback((ambienteId: number) => {
    setState(prev => ({
      ...prev,
      ambienteActivo: ambienteId,
      mesaSeleccionada: null
    }));
  }, []);

  const añadirAmbiente = useCallback(() => {
    const nuevoAmbiente: AmbientePlano = {
      id: Date.now(),
      nombre: `Ambiente ${state.ambientes.length + 1}`,
      establecimiento_id: 1,
      activo: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      mesas: []
    };

    setState(prev => ({
      ...prev,
      ambientes: [...prev.ambientes, nuevoAmbiente],
      ambienteActivo: nuevoAmbiente.id
    }));
  }, [state.ambientes.length]);

  const añadirMesa = useCallback((ambienteId: number) => {
    const posicion = generarPosicionAleatoria(CANVAS_WIDTH, CANVAS_HEIGHT);
    const dimensiones = { width: 128, height: 100 };
    const { personas } = calcularPersonas(dimensiones.width, dimensiones.height);

    const nuevaMesa: Mesa = {
      id: Date.now() + Math.random(),
      nombre: `Mesa ${(state.ambientes.find(a => a.id === ambienteId)?.mesas.length || 0) + 1}`,
      establecimiento_id: 1,
      numero: `${(state.ambientes.find(a => a.id === ambienteId)?.mesas.length || 0) + 1}`,
      estado: 'libre',
      forma: 'cuadrada',
      capacidad: personas,
      activo: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
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

  const moverMesa = useCallback((mesaId: number, x: number, y: number) => {
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

  const redimensionarMesa = useCallback((mesaId: number, width: number, height: number) => {
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

  const eliminarMesa = useCallback((mesaId: number) => {
    setState(prev => ({
      ...prev,
      ambientes: prev.ambientes.map(ambiente => ({
        ...ambiente,
        mesas: ambiente.mesas.filter(mesa => mesa.id !== mesaId)
      })),
      mesaSeleccionada: prev.mesaSeleccionada === mesaId ? null : prev.mesaSeleccionada
    }));
  }, []);

  const seleccionarMesa = useCallback((mesaId: number | null) => {
    setState(prev => ({
      ...prev,
      mesaSeleccionada: mesaId
    }));
  }, []);

  const generarQR = useCallback((mesaId: number) => {
    // Por ahora solo un console.log, en el futuro se implementará la funcionalidad real
    console.log('Generando QR para mesa:', mesaId);
  }, []);

  const actualizarMesa = useCallback((mesaId: number, cambios: Partial<Mesa>) => {
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
