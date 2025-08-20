// Re-exportar tipos dashboard desde la ubicación centralizada
export * from '../../../types/dashboard';

// Tipos específicos para componentes dashboard locales
export interface AforoData {
    environments: Array<{
        id: number;
        name: string;
        capacity: number;
        currentOccupancy: number;
        tables: number;
        activeTables: number;
        status: 'open' | 'closed' | 'maintenance';
        color: string;
    }>;
    totalCapacity: number;
    currentOccupancy: number;
    occupancyRate: number;
}

export interface TimeRange {
    start: string;
    end: string;
    label: string;
    value: string;
}

export interface SalesChartData {
    period: string;
    sales: number;
    orders: number;
    averageTicket: number;
    date: string;
    value: number;
    label: string;
    data?: Array<{ label: string; value: number }>;
    totalSales?: number;
    averageSales?: number;
    maxValue?: number;
}
