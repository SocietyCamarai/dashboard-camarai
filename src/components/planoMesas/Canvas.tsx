import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { CirclePlusIcon } from '../icons';
import { ListaMesas } from './ListaMesas';
import type { AmbientePlano } from '../../types/components';

interface CanvasProps {
  ambiente: AmbientePlano;
  mesaSeleccionada: string | null;
  onMesaMover: (id: string, x: number, y: number) => void;
  onMesaRedimensionar: (id: string, width: number, height: number) => void;
  onMesaEliminar: (id: string) => void;
  onMesaGenerarQR: (id: string) => void;
  onMesaSeleccionar: (id: string) => void;
  onAñadirMesa: () => void;
}

// Constantes para el tamaño del canvas
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

export const Canvas: React.FC<CanvasProps> = ({
  ambiente,
  mesaSeleccionada,
  onMesaMover,
  onMesaRedimensionar,
  onMesaEliminar,
  onMesaGenerarQR,
  onMesaSeleccionar,
  onAñadirMesa
}) => {
  const { currentTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Función para calcular el scale basado en el tamaño del contenedor
  const calculateScale = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const availableWidth = containerRect.width - 48; // 24px padding en cada lado
    const availableHeight = containerRect.height - 200; // 200px para header y padding

    const scaleX = availableWidth / CANVAS_WIDTH;
    const scaleY = availableHeight / CANVAS_HEIGHT;
    const newScale = Math.min(scaleX, scaleY, 1); // No escalar más allá del 100%

    setScale(Math.max(0.3, newScale)); // Mínimo 30% del tamaño original para mejor usabilidad
  }, []);

  // Calcular scale cuando cambie el tamaño de la ventana
  useEffect(() => {
    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [calculateScale]);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    // Si se hace click en el canvas (no en una mesa), deseleccionar
    if (e.target === e.currentTarget) {
      onMesaSeleccionar('');
    }
  }, [onMesaSeleccionar]);

  return (
    <div 
      ref={containerRef}
      className="rounded-lg border text-card-foreground shadow-sm bg-card flex-1 relative overflow-hidden"
      style={{ 
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header del canvas */}
      <div className="space-y-1.5 p-6 flex flex-row items-center justify-between flex-shrink-0">
        <div 
          className="tracking-tight text-lg font-bold text-muted-foreground"
          style={{ color: currentTheme.colors.textSecondary }}
        >
          Distribución de Mesas ({ambiente.nombre})
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          style={{
            backgroundColor: currentTheme.colors.primary,
            color: '#ffffff',
          }}
          onClick={onAñadirMesa}
        >
          <CirclePlusIcon className="mr-2" />
          Añadir Mesa
        </button>
      </div>

      {/* Área de trabajo */}
      <div className="flex-1 p-6 pt-0 overflow-hidden">
        {/* Indicador de escala (solo en desarrollo) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs z-10">
            Escala: {(scale * 100).toFixed(0)}%
          </div>
        )}
        
        <div 
          ref={canvasRef}
          className="bg-background dark:bg-zinc-800/20 rounded-lg border border-dashed relative select-none"
          style={{
            backgroundColor: currentTheme.colors.background,
            borderColor: currentTheme.colors.border + '40',
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            margin: '0 auto',
            position: 'relative'
          }}
          onClick={handleCanvasClick}
        >
          {/* Lista de mesas */}
          <ListaMesas
            ambiente={ambiente}
            mesaSeleccionada={mesaSeleccionada}
            onMesaMover={onMesaMover}
            onMesaRedimensionar={onMesaRedimensionar}
            onMesaEliminar={onMesaEliminar}
            onMesaGenerarQR={onMesaGenerarQR}
            onMesaSeleccionar={onMesaSeleccionar}
          />
        </div>
      </div>
    </div>
  );
}; 