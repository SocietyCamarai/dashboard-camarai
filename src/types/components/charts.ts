export interface StatCardProps {
  value: string;
  label: string;
  percentage?: string;
  percentageType?: 'positive' | 'negative';
  className?: string;
}

export type ChartPeriod = 'horas' | 'días' | 'semanas' | 'meses' | 'años';

// Tipos para componentes de charts
export interface ChartStats2Props {
  data?: unknown[];
  title?: string;
  className?: string;
}

export interface StatCard2Props {
  value?: string;
  label?: string;
  percentage?: string;
  percentageType?: 'positive' | 'negative';
  className?: string;
}

export interface CostBreakdownProps {
  data?: unknown[];
  title?: string;
  className?: string;
}

export interface DonutChartProps {
  data?: unknown[];
  title?: string;
  className?: string;
}

export interface DonutSegment {
  name: string;
  value: number;
  color: string;
}

export interface MonthlyIncomeChartProps {
  data: unknown[];
  title?: string;
}

export interface ReservationsChartProps {
  data?: unknown[];
  title?: string;
  className?: string;
  month?: string;
  year?: string;
}

export interface ReservationData {
  date: string;
  reservations: number;
  day?: number;
}

export interface SalesChartProps {
  data?: unknown[];
  title?: string;
  className?: string;
  period?: ChartPeriod;
  onPeriodChange?: (period: ChartPeriod) => void;
}

export interface OrderData {
  id: string;
  amount?: number;
  date?: string;
  time?: string;
  total?: string;
  status?: string;
  table?: string;
  customerName?: string;
}

export interface ChartData {
  date: string;
  value: number;
  label?: string;
  total?: number;
}

export interface TeamRankingProps {
  data?: unknown[];
  title?: string;
  className?: string;
  members?: TeamMember[];
}

export interface TeamMember {
  name: string;
  score: number;
  avatar?: string;
  id?: string;
  sales?: string;
  percentage?: number;
}

export interface TooltipProps {
  active?: boolean;
  payload?: unknown[];
  label?: string;
}

export interface StockItem {
  id: string;
  name: string;
  quantity: number;
  alert: boolean;
  currentStock?: number;
  maxStock?: number;
  unit?: string;
}

export interface CostBreakdownItem {
  category: string;
  amount: number;
  percentage: number;
  name?: string;
  value?: number;
  color?: string;
}
