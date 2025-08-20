/**
 * Tipos de Compatibilidad - Extensión de interfaces SQL para UI
 * 
 * Este archivo contiene tipos que extienden las interfaces de base de datos
 * para mantener compatibilidad con los componentes existentes durante la migración.
 * Estos tipos serán eliminados gradualmente conforme se complete la migración.
 */

import type { IArea, IMesa } from './database.types';

// ============================================================================
// TIPOS DE COMPATIBILIDAD PARA AMBIENTES
// ============================================================================

/**
 * Tipo de compatibilidad para Ambiente (extiende IArea)
 * Mantiene propiedades adicionales para UI
 */
export interface Ambiente extends IArea {
    // Propiedades adicionales para UI
    icono?: string;
    aforoTotal?: number;
    mesas?: number;
    mesasActivas?: number;
    estado?: 'Abierto' | 'Cerrado';
    porcentajeOcupacion?: number;
    colorBorde?: string;
}

/**
 * Props para AmbienteCard
 */
export interface AmbienteCardProps {
    ambiente: Ambiente;
    onToggleActivo: (id: number) => void;
    onImprimirQR: (id: number) => void;
    onEditarNombre: (id: number, nuevoNombre: string) => void;
    onConfigurar: (ambiente: Ambiente) => void;
}

/**
 * Props para CrearAmbienteCard
 */
export interface CrearAmbienteCardProps {
    onCrearAmbiente: () => void;
}

// ============================================================================
// TIPOS DE COMPATIBILIDAD PARA PLANO DE MESAS
// ============================================================================

/**
 * Tipo de compatibilidad para Mesa (extiende IMesa)
 * Mantiene propiedades adicionales para UI
 */
export interface Mesa extends IMesa {
    // Propiedades adicionales para UI
    nombre?: string; // Alias para numero
    x?: number; // Alias para posicion_x
    y?: number; // Alias para posicion_y
    width?: number; // Alias para ancho
    height?: number; // Alias para alto
    personas?: number; // Alias para capacidad
    ambienteId?: number; // Alias para area_id
}

/**
 * Tipo de compatibilidad para AmbientePlano (extiende IArea)
 */
export interface AmbientePlano extends IArea {
    mesas: Mesa[];
}

/**
 * Estado del plano de mesas
 */
export interface PlanoMesasState {
    ambientes: AmbientePlano[];
    ambienteActivo: number;
    mesaSeleccionada: number | null;
    mesaArrastrando: number | null;
    mesaRedimensionando: number | null;
}

/**
 * Posición de mesa
 */
export interface PosicionMesa {
    x: number;
    y: number;
}

/**
 * Dimensiones de mesa
 */
export interface DimensionesMesa {
    width: number;
    height: number;
}

/**
 * Cálculo de personas
 */
export interface CalculoPersonas {
    area: number;
    personas: number;
}

/**
 * Props para Tab
 */
export interface TabProps {
    id: number;
    nombre: string;
    activo: boolean;
    onSelect: (id: number) => void;
    onEliminar?: (id: number) => void;
}

/**
 * Props para Mesa
 */
export interface MesaProps {
    mesa: Mesa;
    onMover: (id: number, x: number, y: number) => void;
    onRedimensionar: (id: number, width: number, height: number) => void;
    onEliminar: (id: number) => void;
    onGenerarQR: (id: number) => void;
    seleccionada: boolean;
    onSeleccionar: (id: number | null) => void;
}

/**
 * Props para Canvas del plano
 */
export interface CanvasPlanoProps {
    ambiente: AmbientePlano;
    onMesaMover: (id: number, x: number, y: number) => void;
    onMesaRedimensionar: (id: number, width: number, height: number) => void;
    onMesaEliminar: (id: number) => void;
    onMesaGenerarQR: (id: number) => void;
    onMesaSeleccionar: (id: number) => void;
    mesaSeleccionada: number | null;
    onAñadirMesa: () => void;
}

// ============================================================================
// TIPOS DE COMPATIBILIDAD PARA OTROS COMPONENTES
// ============================================================================

/**
 * Props para Header
 */
export interface HeaderProps {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
    className?: string;
    rounded?: boolean;
}

/**
 * Props para ThemeSelector
 */
export interface ThemeSelectorProps {
    className?: string;
}

/**
 * Props para filtros
 */
export interface FiltersProps {
    onDateRangeChange: (range: string) => void;
    onExport?: (format: 'csv' | 'excel' | 'pdf') => void;
}

/**
 * Props para gráficos
 */
export interface ChartProps {
    data: unknown[];
    title: string;
    type: 'line' | 'bar' | 'pie';
}
