import type { CalculoPersonas, PosicionMesa, DimensionesMesa } from '../types/components';

// Constantes para el tamaño máximo de mesa
const MAX_MESA_WIDTH = 640; // 5 veces el ancho mínimo (128 * 5)
const MAX_MESA_HEIGHT = 500; // 5 veces el alto mínimo (100 * 5)
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

/**
 * Calcula el número de personas basado en el área de la mesa
 * @param width Ancho de la mesa en píxeles
 * @param height Alto de la mesa en píxeles
 * @returns Objeto con área y número de personas
 */
export function calcularPersonas(width: number, height: number): CalculoPersonas {
  const area = width * height;
  
  // Nueva fórmula: 128x100 = 12800 píxeles cuadrados = 1 persona
  // Cada 12800 píxeles cuadrados adicionales = 1 persona extra
  const areaPorPersona = 128 * 100; // 12800 píxeles cuadrados
  const personas = Math.max(1, Math.round(area / areaPorPersona));
  
  return {
    area,
    personas
  };
}

/**
 * Genera una posición aleatoria dentro del canvas
 * @param canvasWidth Ancho del canvas
 * @param canvasHeight Alto del canvas
 * @param mesaWidth Ancho de la mesa
 * @param mesaHeight Alto de la mesa
 * @returns Posición aleatoria
 */
export function generarPosicionAleatoria(
  canvasWidth: number = CANVAS_WIDTH,
  canvasHeight: number = CANVAS_HEIGHT,
  mesaWidth: number = 128,
  mesaHeight: number = 100
): PosicionMesa {
  const padding = 20;
  const maxX = canvasWidth - mesaWidth - padding;
  const maxY = canvasHeight - mesaHeight - padding;
  
  return {
    x: Math.max(padding, Math.random() * maxX),
    y: Math.max(padding, Math.random() * maxY)
  };
}

/**
 * Genera un ID único para mesas y ambientes
 * @param prefix Prefijo para el ID
 * @returns ID único
 */
export function generarId(prefix: string = 'item'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Valida si una posición está dentro del canvas
 * @param x Posición X
 * @param y Posición Y
 * @param width Ancho del elemento
 * @param height Alto del elemento
 * @param canvasWidth Ancho del canvas
 * @param canvasHeight Alto del canvas
 * @returns true si está dentro del canvas
 */
export function validarPosicion(
  x: number,
  y: number,
  width: number,
  height: number,
  canvasWidth: number,
  canvasHeight: number
): boolean {
  return x >= 0 && y >= 0 && x + width <= canvasWidth && y + height <= canvasHeight;
}

/**
 * Calcula las dimensiones mínimas de una mesa
 * @returns Dimensiones mínimas
 */
export function obtenerDimensionesMinimas(): DimensionesMesa {
  return {
    width: 128,
    height: 100
  };
}

/**
 * Calcula las dimensiones máximas de una mesa
 * @param canvasWidth Ancho del canvas
 * @param canvasHeight Alto del canvas
 * @returns Dimensiones máximas
 */
export function obtenerDimensionesMaximas(
  canvasWidth: number,
  canvasHeight: number
): DimensionesMesa {
  return {
    width: Math.min(MAX_MESA_WIDTH, canvasWidth * 0.8),
    height: Math.min(MAX_MESA_HEIGHT, canvasHeight * 0.8)
  };
} 