import React, { useState, useCallback } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { EditIcon, CheckIcon, XIcon } from '../icons';
import type { Mesa } from '../../types/compatibility.types';

interface TablaMesasProps {
  mesas: Mesa[];
  onActualizarMesa: (id: number, cambios: Partial<Mesa>) => void;
  onEliminarMesa: (id: number) => void;
  onSeleccionarMesa: (id: number) => void;
  mesaSeleccionada: number | null;
}

interface MesaEditando {
  id: number;
  campo: 'nombre' | 'personas';
  valor: string | number;
}

export const TablaMesas: React.FC<TablaMesasProps> = ({
  mesas,
  onActualizarMesa,
  onEliminarMesa,
  onSeleccionarMesa,
  mesaSeleccionada
}) => {
  const { currentTheme } = useTheme();
  const [mesaEditando, setMesaEditando] = useState<MesaEditando | null>(null);

  const handleEditar = useCallback((id: number, campo: 'nombre' | 'personas', valor: string | number) => {
    setMesaEditando({ id, campo, valor });
  }, []);

  const handleGuardar = useCallback(() => {
    if (!mesaEditando) return;

    const mesa = mesas.find(m => m.id === mesaEditando.id);
    if (!mesa) return;

    const cambios: Partial<Mesa> = {};
    if (mesaEditando.campo === 'nombre') {
      cambios.nombre = mesaEditando.valor as string;
    } else if (mesaEditando.campo === 'personas') {
      const personas = parseInt(mesaEditando.valor as string);
      if (!isNaN(personas) && personas > 0) {
        cambios.personas = personas;
      }
    }

    onActualizarMesa(mesaEditando.id, cambios);
    setMesaEditando(null);
  }, [mesaEditando, mesas, onActualizarMesa]);

  const handleCancelar = useCallback(() => {
    setMesaEditando(null);
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGuardar();
    } else if (e.key === 'Escape') {
      handleCancelar();
    }
  }, [handleGuardar, handleCancelar]);

  const renderCeldaEditable = (mesa: Mesa, campo: 'nombre' | 'personas') => {
    const estaEditando = mesaEditando?.id === mesa.id && mesaEditando?.campo === campo;
    const valor = estaEditando ? mesaEditando.valor : mesa[campo];

    if (estaEditando) {
      return (
        <div className="flex items-center gap-1">
          <input
            type={campo === 'personas' ? 'number' : 'text'}
            value={valor}
            onChange={(e) => setMesaEditando(prev => prev ? { ...prev, valor: e.target.value } : null)}
            onKeyDown={handleKeyPress}
            className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1"
            style={{
              borderColor: currentTheme.colors.border,
              backgroundColor: currentTheme.colors.background,
              color: currentTheme.colors.text,
            }}
            autoFocus
            min={campo === 'personas' ? 1 : undefined}
          />
          <button
            onClick={handleGuardar}
            className="p-1 text-green-600 hover:text-green-700"
            title="Guardar"
          >
            <CheckIcon className="w-3 h-3" />
          </button>
          <button
            onClick={handleCancelar}
            className="p-1 text-red-600 hover:text-red-700"
            title="Cancelar"
          >
            <XIcon className="w-3 h-3" />
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1">
        <span>{mesa[campo]}</span>
        <button
          onClick={() => handleEditar(mesa.id, campo, mesa[campo] || '')}
          className="p-1 text-gray-500 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
          title={`Editar ${campo}`}
        >
          <EditIcon className="w-3 h-3" />
        </button>
      </div>
    );
  };

  return (
    <div className="mt-6">
      <h3
        className="text-lg font-semibold mb-4"
        style={{ color: currentTheme.colors.text }}
      >
        Mesas del Ambiente ({mesas.length})
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr
              className="border-b"
              style={{ borderColor: currentTheme.colors.border }}
            >
              <th
                className="text-left py-3 px-4 font-medium"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Mesa
              </th>
              <th
                className="text-left py-3 px-4 font-medium"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Nombre
              </th>
              <th
                className="text-left py-3 px-4 font-medium"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Personas
              </th>
              <th
                className="text-left py-3 px-4 font-medium"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Posición
              </th>
              <th
                className="text-left py-3 px-4 font-medium"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Tamaño
              </th>
              <th
                className="text-left py-3 px-4 font-medium"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {mesas.map((mesa) => (
              <tr
                key={mesa.id}
                className={`group border-b hover:bg-opacity-50 transition-colors ${mesaSeleccionada === mesa.id ? 'bg-primary/10' : ''
                  }`}
                style={{
                  borderColor: currentTheme.colors.border + '30',
                  backgroundColor: mesaSeleccionada === mesa.id ? currentTheme.colors.primary + '10' : 'transparent'
                }}
                onClick={() => onSeleccionarMesa(mesa.id)}
              >
                <td className="py-3 px-4">
                  <span style={{ color: currentTheme.colors.text }}>
                    {mesa.id}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {renderCeldaEditable(mesa, 'nombre')}
                </td>
                <td className="py-3 px-4">
                  {renderCeldaEditable(mesa, 'personas')}
                </td>
                <td className="py-3 px-4">
                  <span style={{ color: currentTheme.colors.textSecondary }}>
                    ({Math.round(mesa.x || 0)}, {Math.round(mesa.y || 0)})
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span style={{ color: currentTheme.colors.textSecondary }}>
                    {mesa.width} × {mesa.height}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEliminarMesa(mesa.id);
                    }}
                    className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Eliminar mesa"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mesas.length === 0 && (
        <div
          className="text-center py-8 text-muted-foreground"
          style={{ color: currentTheme.colors.textSecondary }}
        >
          No hay mesas en este ambiente
        </div>
      )}
    </div>
  );
}; 
