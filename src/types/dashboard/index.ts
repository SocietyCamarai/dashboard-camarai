// Tipos para componentes dashboard

export interface AforoData {
    environments: Environment[];
    totalCapacity: number;
    currentOccupancy: number;
    occupancyRate: number;
}

export interface Environment {
    id: number;
    name: string;
    capacity: number;
    currentOccupancy: number;
    tables: number;
    activeTables: number;
    status: 'open' | 'closed' | 'maintenance';
    color: string;
}

export interface TimeRange {
    start: string;
    end: string;
    label: string;
}

export interface SalesChartData {
    period: string;
    sales: number;
    orders: number;
    averageTicket: number;
    date: string;
}

// Tipos para componentes específicos
export interface HomeProps {
    className?: string;
}

export interface ChartStatsProps {
    data?: unknown[];
    title?: string;
    className?: string;
}

export interface StockAlertCardProps {
    items?: unknown[];
    title?: string;
    className?: string;
}

export interface StockAlertsContainerProps {
    alerts?: unknown[];
    onDismiss?: (id: string) => void;
    className?: string;
}

export interface TimeRangeSelectorProps {
    value?: TimeRange;
    onChange?: (range: TimeRange) => void;
    options?: TimeRange[];
    className?: string;
}

export interface ReservasNumberProps {
    count?: number;
    label?: string;
    trend?: 'up' | 'down' | 'stable';
    className?: string;
}

export interface RankingTeamProps {
    members?: unknown[];
    title?: string;
    className?: string;
}

export interface IngresosProps {
    amount?: number;
    currency?: string;
    period?: string;
    trend?: 'up' | 'down' | 'stable';
    className?: string;
}

export interface CostosChartProps {
    data?: unknown[];
    title?: string;
    categories?: string[];
    className?: string;
}
