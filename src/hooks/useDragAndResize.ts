import { useState, useCallback, useRef, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Dimensions {
  width: number;
  height: number;
}

interface DragState {
  isDragging: boolean;
  isResizing: boolean;
  dragOffset: Position;
  resizeStart: Dimensions & Position;
}

interface UseDragAndResizeProps {
  initialPosition: Position;
  initialDimensions: Dimensions;
  onMove: (x: number, y: number) => void;
  onResize: (width: number, height: number) => void;
  constraints?: {
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    canvasWidth?: number;
    canvasHeight?: number;
  };
}

// Constantes para el tamaño máximo de mesa
const MAX_MESA_WIDTH = 640; // 5 veces el ancho mínimo (128 * 5)
const MAX_MESA_HEIGHT = 500; // 5 veces el alto mínimo (100 * 5)
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

export function useDragAndResize({
  initialPosition,
  initialDimensions,
  onMove,
  onResize,
  constraints = {}
}: UseDragAndResizeProps) {
  const [state, setState] = useState<DragState>({
    isDragging: false,
    isResizing: false,
    dragOffset: { x: 0, y: 0 },
    resizeStart: { ...initialDimensions, ...initialPosition }
  });

  const elementRef = useRef<HTMLDivElement>(null);

  const {
    minWidth = 128,
    minHeight = 100,
    maxWidth = MAX_MESA_WIDTH,
    maxHeight = MAX_MESA_HEIGHT,
    canvasWidth = CANVAS_WIDTH,
    canvasHeight = CANVAS_HEIGHT
  } = constraints;

  const validatePosition = useCallback((x: number, y: number, width: number, height: number): Position => {
    const maxX = canvasWidth - width;
    const maxY = canvasHeight - height;
    
    return {
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY))
    };
  }, [canvasWidth, canvasHeight]);

  const validateDimensions = useCallback((width: number, height: number): Dimensions => {
    return {
      width: Math.max(minWidth, Math.min(width, maxWidth)),
      height: Math.max(minHeight, Math.min(height, maxHeight))
    };
  }, [minWidth, minHeight, maxWidth, maxHeight]);

  const handleMouseDown = useCallback((e: React.MouseEvent, action: 'drag' | 'resize') => {
    e.preventDefault();
    e.stopPropagation();

    if (!elementRef.current) return;

    const canvasRect = elementRef.current.parentElement?.getBoundingClientRect();
    
    if (!canvasRect) return;

    // Calcular la escala del canvas
    const scale = canvasRect.width / 800; // 800 es CANVAS_WIDTH

    if (action === 'drag') {
      // Calcular el offset relativo al canvas escalado
      const mouseX = (e.clientX - canvasRect.left) / scale;
      const mouseY = (e.clientY - canvasRect.top) / scale;
      
      setState(prev => ({
        ...prev,
        isDragging: true,
        dragOffset: {
          x: mouseX - initialPosition.x,
          y: mouseY - initialPosition.y
        }
      }));
    } else if (action === 'resize') {
      setState(prev => ({
        ...prev,
        isResizing: true,
        resizeStart: {
          width: initialDimensions.width,
          height: initialDimensions.height,
          x: e.clientX,
          y: e.clientY
        }
      }));
    }
  }, [initialDimensions, initialPosition]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!elementRef.current) return;

    const canvasRect = elementRef.current.parentElement?.getBoundingClientRect();
    if (!canvasRect) return;

    // Calcular la escala del canvas
    const scale = canvasRect.width / 800; // 800 es CANVAS_WIDTH

    if (state.isDragging) {
      // Calcular la nueva posición considerando la escala
      const mouseX = (e.clientX - canvasRect.left) / scale;
      const mouseY = (e.clientY - canvasRect.top) / scale;
      
      const newX = mouseX - state.dragOffset.x;
      const newY = mouseY - state.dragOffset.y;
      
      const validatedPosition = validatePosition(newX, newY, initialDimensions.width, initialDimensions.height);
      onMove(validatedPosition.x, validatedPosition.y);
    }

    if (state.isResizing) {
      // Para el redimensionamiento, usar las coordenadas sin escalar
      const deltaX = (e.clientX - state.resizeStart.x) / scale;
      const deltaY = (e.clientY - state.resizeStart.y) / scale;

      const newWidth = state.resizeStart.width + deltaX;
      const newHeight = state.resizeStart.height + deltaY;

      const validatedDimensions = validateDimensions(newWidth, newHeight);
      
      // Asegurar que no exceda el canvas
      const maxWidth = canvasWidth - initialPosition.x;
      const maxHeight = canvasHeight - initialPosition.y;
      
      const finalDimensions = {
        width: Math.min(validatedDimensions.width, maxWidth),
        height: Math.min(validatedDimensions.height, maxHeight)
      };

      onResize(finalDimensions.width, finalDimensions.height);
    }
  }, [state, initialDimensions, initialPosition, onMove, onResize, validatePosition, validateDimensions, canvasWidth, canvasHeight]);

  const handleMouseUp = useCallback(() => {
    setState(prev => ({
      ...prev,
      isDragging: false,
      isResizing: false
    }));
  }, []);

  // Event listeners globales
  useEffect(() => {
    if (state.isDragging || state.isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [state.isDragging, state.isResizing, handleMouseMove, handleMouseUp]);

  return {
    elementRef,
    isDragging: state.isDragging,
    isResizing: state.isResizing,
    handleMouseDown
  };
} 