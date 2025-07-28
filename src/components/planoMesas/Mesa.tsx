import React, { useCallback } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useDragAndResize } from '../../hooks/useDragAndResize';
import { QrCodeIcon, Trash2Icon } from '../icons';
import type { MesaProps } from '../../types/components';

export const Mesa: React.FC<MesaProps> = ({
  mesa,
  onMover,
  onRedimensionar,
  onEliminar,
  onGenerarQR,
  seleccionada,
  onSeleccionar
}) => {
  const { currentTheme } = useTheme();

  const {
    elementRef,
    isDragging,
    handleMouseDown
  } = useDragAndResize({
    initialPosition: { x: mesa.x, y: mesa.y },
    initialDimensions: { width: mesa.width, height: mesa.height },
    onMove: (x, y) => onMover(mesa.id, x, y),
    onResize: (width, height) => onRedimensionar(mesa.id, width, height),
    constraints: {
      minWidth: 128,
      minHeight: 100,
      maxWidth: 640,
      maxHeight: 500,
      canvasWidth: 800,
      canvasHeight: 600
    }
  });

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSeleccionar(mesa.id);
  }, [mesa.id, onSeleccionar]);

  const handleEliminar = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEliminar(mesa.id);
  }, [mesa.id, onEliminar]);

  const handleGenerarQR = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onGenerarQR(mesa.id);
  }, [mesa.id, onGenerarQR]);

  const handleDragMouseDown = useCallback((e: React.MouseEvent) => {
    handleMouseDown(e, 'drag');
  }, [handleMouseDown]);

  const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
    handleMouseDown(e, 'resize');
  }, [handleMouseDown]);

  return (
    <div
      ref={elementRef}
      className={`absolute p-4 bg-card border rounded-lg shadow-md cursor-grab active:cursor-grabbing flex flex-col items-center justify-center transition-opacity ${
        seleccionada ? 'ring-2 ring-primary' : ''
      } ${isDragging ? 'z-50' : ''}`}
      style={{
        left: mesa.x,
        top: mesa.y,
        width: mesa.width,
        height: mesa.height,
        backgroundColor: currentTheme.colors.background,
        borderColor: currentTheme.colors.border,
        color: currentTheme.colors.text,
        zIndex: seleccionada ? 10 : 1,
      }}
      onMouseDown={handleDragMouseDown}
      onClick={handleClick}
    >
      {/* Contenido de la mesa */}
      <div className="font-bold text-lg">{mesa.nombre}</div>
      <div className="flex items-center text-muted-foreground text-sm mt-1">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-4 h-4 mr-1"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <span>{mesa.personas} personas</span>
      </div>

      {/* Botones de acción */}
      <div className="absolute top-1 right-1 flex gap-1">
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-6 w-6"
          style={{
            color: currentTheme.colors.textSecondary,
          }}
          onClick={handleGenerarQR}
          title="Generar QR"
        >
          <QrCodeIcon className="w-4 h-4" />
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-6 w-6 text-red-500 hover:text-red-600"
          onClick={handleEliminar}
          title="Eliminar mesa"
        >
          <Trash2Icon className="w-4 h-4" />
        </button>
      </div>

      {/* Handle de redimensionamiento */}
      <div 
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-primary/50 rounded-full border-2 border-background"
        style={{
          backgroundColor: currentTheme.colors.primary + '80',
          borderColor: currentTheme.colors.background,
        }}
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  );
}; 