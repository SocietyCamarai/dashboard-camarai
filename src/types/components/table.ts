export interface OrderData {
  order: string;
  time: string;
  table: string;
  name: string;
  total: string;
  status: 'Completado' | 'En Progreso' | 'Cancelado';
}

export interface TableProps {
  data?: OrderData[];
  title?: string;
} 