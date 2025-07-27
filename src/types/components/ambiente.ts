export interface Ambiente {
  id: string;
  nombre: string;
  icono: string;
  activo: boolean;
  aforoTotal: number;
  mesas: number;
  mesasActivas: number;
  estado: 'Abierto' | 'Cerrado';
  porcentajeOcupacion: number;
  colorBorde: string;
}

export interface AmbienteCardProps {
  ambiente: Ambiente;
  onToggleActivo: (id: string) => void;
  onImprimirQR: (id: string) => void;
  onEditarNombre: (id: string, nuevoNombre: string) => void;
  onConfigurar: (ambiente: Ambiente) => void;
}

export interface CrearAmbienteCardProps {
  onCrearAmbiente: () => void;
} 