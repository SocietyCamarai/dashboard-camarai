export interface Mesa {
  id: string;
  nombre: string;
  x: number;
  y: number;
  width: number;
  height: number;
  personas: number;
  ambienteId: string;
}

export interface AmbientePlano {
  id: string;
  nombre: string;
  mesas: Mesa[];
}

export interface PlanoMesasState {
  ambientes: AmbientePlano[];
  ambienteActivo: string;
  mesaSeleccionada: string | null;
  mesaArrastrando: string | null;
  mesaRedimensionando: string | null;
}

export interface PosicionMesa {
  x: number;
  y: number;
}

export interface DimensionesMesa {
  width: number;
  height: number;
}

export interface CalculoPersonas {
  area: number;
  personas: number;
}

export interface TabProps {
  id: string;
  nombre: string;
  activo: boolean;
  onSelect: (id: string) => void;
  onEliminar?: (id: string) => void;
}

export interface MesaProps {
  mesa: Mesa;
  onMover: (id: string, x: number, y: number) => void;
  onRedimensionar: (id: string, width: number, height: number) => void;
  onEliminar: (id: string) => void;
  onGenerarQR: (id: string) => void;
  seleccionada: boolean;
  onSeleccionar: (id: string) => void;
}

export interface CanvasPlanoProps {
  ambiente: AmbientePlano;
  onMesaMover: (id: string, x: number, y: number) => void;
  onMesaRedimensionar: (id: string, width: number, height: number) => void;
  onMesaEliminar: (id: string) => void;
  onMesaGenerarQR: (id: string) => void;
  onMesaSeleccionar: (id: string) => void;
  mesaSeleccionada: string | null;
  onAñadirMesa: () => void;
} 