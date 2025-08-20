import React from 'react';
import { useTheme } from '../../hooks/useTheme';

interface IndicadoresVisualesProps {
  isDragging: boolean;
  isResizing: boolean;
  mesaSeleccionada: number | null;
  totalMesas: number;
}

export const IndicadoresVisuales: React.FC<IndicadoresVisualesProps> = ({
  isDragging,
  isResizing,
  mesaSeleccionada,
  totalMesas
}) => {
  const { currentTheme } = useTheme();

  if (!isDragging && !isResizing && !mesaSeleccionada) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className="px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
        style={{
          backgroundColor: currentTheme.colors.background,
          border: `1px solid ${currentTheme.colors.border}`,
          color: currentTheme.colors.text,
        }}
      >
        {isDragging && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Arrastrando mesa...</span>
          </div>
        )}

        {isResizing && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Redimensionando mesa...</span>
          </div>
        )}

        {mesaSeleccionada && !isDragging && !isResizing && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Mesa seleccionada</span>
          </div>
        )}

        <div className="text-xs mt-1 opacity-70">
          Total: {totalMesas} mesas
        </div>
      </div>
    </div>
  );
}; 
