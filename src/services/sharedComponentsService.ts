/**
 * Servicio de Componentes Compartidos - Funciones de utilidad para componentes
 * 
 * Este servicio proporciona funciones de utilidad y helpers que pueden ser
 * utilizados por todos los componentes compartidos, usando las interfaces
 * de base de datos y proporcionando funcionalidades comunes.
 */

import type {
    IUsuario,
    IEmpresa,
    IEstablecimiento,
    IImpuesto,
    IPedido,
    IMesa,
    IArea
} from '../types/database.types';

// ============================================================================
// FUNCIONES DE UTILIDAD PARA FORMATOS
// ============================================================================

/**
 * Formatear moneda
 */
export const formatCurrency = (amount: number, currency: string = 'EUR'): string => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: currency
    }).format(amount);
};

/**
 * Formatear fecha
 */
export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return new Intl.DateTimeFormat('es-ES', { ...defaultOptions, ...options }).format(dateObj);
};

/**
 * Formatear fecha y hora
 */
export const formatDateTime = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(dateObj);
};

/**
 * Formatear hora
 */
export const formatTime = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(dateObj);
};

/**
 * Formatear número con separadores
 */
export const formatNumber = (number: number): string => {
    return new Intl.NumberFormat('es-ES').format(number);
};

/**
 * Formatear porcentaje
 */
export const formatPercentage = (value: number, decimals: number = 2): string => {
    return `${value.toFixed(decimals)}%`;
};

// ============================================================================
// FUNCIONES DE UTILIDAD PARA ESTADOS
// ============================================================================

/**
 * Obtener color de estado para componentes
 */
export const getStatusColor = (status: string): {
    color: string;
    bgColor: string;
    label: string;
} => {
    const statusMap: { [key: string]: { color: string; bgColor: string; label: string } } = {
        // Estados de pedidos
        'pendiente': { color: '#f59e0b', bgColor: '#fef3c7', label: 'Pendiente' },
        'en_proceso': { color: '#3b82f6', bgColor: '#dbeafe', label: 'En Proceso' },
        'completado': { color: '#10b981', bgColor: '#d1fae5', label: 'Completado' },
        'cancelado': { color: '#ef4444', bgColor: '#fee2e2', label: 'Cancelado' },
        'preparando': { color: '#8b5cf6', bgColor: '#ede9fe', label: 'Preparando' },

        // Estados de mesas
        'libre': { color: '#10b981', bgColor: '#d1fae5', label: 'Libre' },
        'ocupada': { color: '#ef4444', bgColor: '#fee2e2', label: 'Ocupada' },
        'reservada': { color: '#f59e0b', bgColor: '#fef3c7', label: 'Reservada' },
        'mantenimiento': { color: '#6b7280', bgColor: '#f3f4f6', label: 'Mantenimiento' },

        // Estados de usuarios
        'activo': { color: '#10b981', bgColor: '#d1fae5', label: 'Activo' },
        'inactivo': { color: '#6b7280', bgColor: '#f3f4f6', label: 'Inactivo' },

        // Estados de empresas
        'prueba': { color: '#f59e0b', bgColor: '#fef3c7', label: 'Prueba' },
        'activa': { color: '#10b981', bgColor: '#d1fae5', label: 'Activa' },
        'suspendida': { color: '#ef4444', bgColor: '#fee2e2', label: 'Suspendida' },

        // Estados de impuestos
        // 'activo': { color: '#10b981', bgColor: '#d1fae5', label: 'Activo' },
        // 'inactivo': { color: '#6b7280', bgColor: '#f3f4f6', label: 'Inactivo' }
    };

    return statusMap[status] || { color: '#6b7280', bgColor: '#f3f4f6', label: 'Desconocido' };
};

/**
 * Obtener icono de estado
 */
export const getStatusIcon = (status: string): string => {
    const iconMap: { [key: string]: string } = {
        'pendiente': '⏳',
        'en_proceso': '🔄',
        'completado': '✅',
        'cancelado': '❌',
        'preparando': '👨‍🍳',
        'libre': '🟢',
        'ocupada': '🔴',
        'reservada': '🟡',
        'mantenimiento': '🔧',
        'activo': '✅',
        'inactivo': '⏸️',
        'prueba': '🧪',
        'activa': '✅',
        'suspendida': '⏸️'
    };

    return iconMap[status] || '❓';
};

// ============================================================================
// FUNCIONES DE UTILIDAD PARA VALIDACIÓN
// ============================================================================

/**
 * Validar email
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validar teléfono
 */
export const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[0-9\s\-()]{9,}$/;
    return phoneRegex.test(phone);
};

/**
 * Validar NIF/CIF
 */
export const isValidNIF = (nif: string): boolean => {
    const nifRegex = /^[0-9A-Z][0-9]{7}[0-9A-Z]$/;
    return nifRegex.test(nif);
};

/**
 * Validar porcentaje
 */
export const isValidPercentage = (percentage: number): boolean => {
    return percentage >= 0 && percentage <= 100;
};

/**
 * Validar código postal
 */
export const isValidPostalCode = (postalCode: string): boolean => {
    const postalCodeRegex = /^[0-9]{5}$/;
    return postalCodeRegex.test(postalCode);
};

// ============================================================================
// FUNCIONES DE UTILIDAD PARA CÁLCULOS
// ============================================================================

/**
 * Calcular total de pedido
 */
export const calculateOrderTotal = (subtotal: number, discount: number = 0, taxes: number = 0): number => {
    return subtotal - discount + taxes;
};

/**
 * Calcular impuestos
 */
export const calculateTaxes = (subtotal: number, taxRate: number): number => {
    return (subtotal * taxRate) / 100;
};

/**
 * Calcular descuento
 */
export const calculateDiscount = (subtotal: number, discountRate: number): number => {
    return (subtotal * discountRate) / 100;
};

/**
 * Calcular promedio
 */
export const calculateAverage = (values: number[]): number => {
    if (values.length === 0) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
};

/**
 * Calcular suma
 */
export const calculateSum = (values: number[]): number => {
    return values.reduce((sum, value) => sum + value, 0);
};

// ============================================================================
// FUNCIONES DE UTILIDAD PARA FILTRADO Y ORDENAMIENTO
// ============================================================================

/**
 * Filtrar por texto
 */
export const filterByText = <T extends Record<string, unknown>>(
    items: T[],
    searchText: string,
    fields: (keyof T)[]
): T[] => {
    if (!searchText.trim()) return items;

    const lowerSearchText = searchText.toLowerCase();

    return items.filter(item =>
        fields.some(field => {
            const value = item[field];
            if (value === null || value === undefined) return false;
            return String(value).toLowerCase().includes(lowerSearchText);
        })
    );
};

/**
 * Ordenar por campo
 */
export const sortByField = <T extends Record<string, unknown>>(
    items: T[],
    field: keyof T,
    direction: 'asc' | 'desc' = 'asc'
): T[] => {
    return [...items].sort((a, b) => {
        const valueA = a[field];
        const valueB = b[field];

        if (valueA === null || valueA === undefined) return direction === 'asc' ? -1 : 1;
        if (valueB === null || valueB === undefined) return direction === 'asc' ? 1 : -1;

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            const comparison = valueA.localeCompare(valueB);
            return direction === 'asc' ? comparison : -comparison;
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return direction === 'asc' ? valueA - valueB : valueB - valueA;
        }

        if (valueA && valueB && typeof valueA === 'object' && typeof valueB === 'object' && 'getTime' in valueA && 'getTime' in valueB) {
            return direction === 'asc' ? (valueA as unknown as Date).getTime() - (valueB as unknown as Date).getTime() : (valueB as unknown as Date).getTime() - (valueA as unknown as Date).getTime();
        }

        return 0;
    });
};

/**
 * Agrupar por campo
 */
export const groupByField = <T extends Record<string, unknown>, K extends keyof T>(
    items: T[],
    field: K
): Map<T[K], T[]> => {
    const groups = new Map<T[K], T[]>();

    items.forEach(item => {
        const key = item[field];
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key)!.push(item);
    });

    return groups;
};

// ============================================================================
// FUNCIONES DE UTILIDAD PARA PAGINACIÓN
// ============================================================================

/**
 * Paginar array
 */
export const paginateArray = <T>(
    items: T[],
    page: number,
    pageSize: number
): { items: T[]; totalPages: number; currentPage: number; totalItems: number } => {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return {
        items: items.slice(startIndex, endIndex),
        totalPages,
        currentPage: page,
        totalItems
    };
};

// ============================================================================
// FUNCIONES DE UTILIDAD PARA EXPORTACIÓN
// ============================================================================

/**
 * Exportar a CSV
 */
export const exportToCSV = <T extends Record<string, unknown>>(
    data: T[],
    filename: string = 'export.csv'
): void => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row =>
            headers.map(header => {
                const value = row[header];
                if (value === null || value === undefined) return '';
                return `"${String(value).replace(/"/g, '""')}"`;
            }).join(',')
        )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

/**
 * Exportar a JSON
 */
export const exportToJSON = <T>(
    data: T,
    filename: string = 'export.json'
): void => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// ============================================================================
// FUNCIONES DE UTILIDAD PARA FECHAS
// ============================================================================

/**
 * Obtener rango de fechas
 */
export const getDateRange = (range: 'today' | 'week' | 'month' | 'quarter' | 'year'): {
    startDate: Date;
    endDate: Date;
} => {
    const now = new Date();
    const startDate = new Date(now);
    const endDate = new Date(now);

    switch (range) {
        case 'today':
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
            break;
        case 'week': {
            const dayOfWeek = startDate.getDay();
            const diff = startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
            startDate.setDate(diff);
            startDate.setHours(0, 0, 0, 0);
            endDate.setDate(startDate.getDate() + 6);
            endDate.setHours(23, 59, 59, 999);
            break;
        }
        case 'month': {
            startDate.setDate(1);
            startDate.setHours(0, 0, 0, 0);
            endDate.setMonth(endDate.getMonth() + 1, 0);
            endDate.setHours(23, 59, 59, 999);
            break;
        }
        case 'quarter': {
            const quarter = Math.floor(now.getMonth() / 3);
            startDate.setMonth(quarter * 3, 1);
            startDate.setHours(0, 0, 0, 0);
            endDate.setMonth((quarter + 1) * 3, 0);
            endDate.setHours(23, 59, 59, 999);
            break;
        }
        case 'year': {
            startDate.setMonth(0, 1);
            startDate.setHours(0, 0, 0, 0);
            endDate.setMonth(11, 31);
            endDate.setHours(23, 59, 59, 999);
            break;
        }
    }

    return { startDate, endDate };
};

/**
 * Verificar si una fecha está en un rango
 */
export const isDateInRange = (date: Date, startDate: Date, endDate: Date): boolean => {
    return date >= startDate && date <= endDate;
};

// ============================================================================
// FUNCIONES DE UTILIDAD PARA COMPONENTES ESPECÍFICOS
// ============================================================================

/**
 * Generar opciones para dropdowns de usuarios
 */
export const generateUserOptions = (usuarios: IUsuario[]): Array<{ label: string; value: number }> => {
    return usuarios.map(usuario => ({
        label: `${usuario.nombre} ${usuario.apellidos}`,
        value: usuario.id
    }));
};

/**
 * Generar opciones para dropdowns de empresas
 */
export const generateCompanyOptions = (empresas: IEmpresa[]): Array<{ label: string; value: number }> => {
    return empresas.map(empresa => ({
        label: empresa.nombre,
        value: empresa.id
    }));
};

/**
 * Generar opciones para dropdowns de establecimientos
 */
export const generateEstablishmentOptions = (establecimientos: IEstablecimiento[]): Array<{ label: string; value: number }> => {
    return establecimientos.map(establecimiento => ({
        label: establecimiento.nombre,
        value: establecimiento.id
    }));
};

/**
 * Generar opciones para dropdowns de impuestos
 */
export const generateTaxOptions = (impuestos: IImpuesto[]): Array<{ label: string; value: number }> => {
    return impuestos.map(impuesto => ({
        label: `${impuesto.nombre} (${impuesto.porcentaje}%)`,
        value: impuesto.id
    }));
};

/**
 * Generar opciones para dropdowns de mesas
 */
export const generateTableOptions = (mesas: IMesa[]): Array<{ label: string; value: number }> => {
    return mesas.map(mesa => ({
        label: `Mesa ${mesa.numero}`,
        value: mesa.id
    }));
};

/**
 * Generar opciones para dropdowns de áreas
 */
export const generateAreaOptions = (areas: IArea[]): Array<{ label: string; value: number }> => {
    return areas.map(area => ({
        label: area.nombre,
        value: area.id
    }));
};

// ============================================================================
// FUNCIONES DE UTILIDAD PARA ESTADÍSTICAS
// ============================================================================

/**
 * Calcular estadísticas de pedidos
 */
export const calculateOrderStats = (pedidos: IPedido[]) => {
    const totalPedidos = pedidos.length;
    const pedidosCompletados = pedidos.filter(p => p.estado === 'completado').length;
    const pedidosEnProceso = pedidos.filter(p => p.estado === 'en_proceso').length;
    const pedidosCancelados = pedidos.filter(p => p.estado === 'cancelado').length;

    const ingresosTotales = pedidos
        .filter(p => p.pagado)
        .reduce((sum, p) => sum + (p.total || 0), 0);

    const valorMedioPedido = totalPedidos > 0
        ? ingresosTotales / totalPedidos
        : 0;

    const porcentajeCompletados = totalPedidos > 0
        ? (pedidosCompletados / totalPedidos) * 100
        : 0;

    return {
        totalPedidos,
        pedidosCompletados,
        pedidosEnProceso,
        pedidosCancelados,
        ingresosTotales,
        valorMedioPedido,
        porcentajeCompletados
    };
};

/**
 * Calcular estadísticas de mesas
 */
export const calculateTableStats = (mesas: IMesa[]) => {
    const totalMesas = mesas.length;
    const mesasLibres = mesas.filter(m => m.estado === 'libre').length;
    const mesasOcupadas = mesas.filter(m => m.estado === 'ocupada').length;
    const mesasReservadas = mesas.filter(m => m.estado === 'reservada').length;
    const mesasMantenimiento = mesas.filter(m => m.estado === 'mantenimiento').length;

    const porcentajeOcupacion = totalMesas > 0
        ? ((mesasOcupadas + mesasReservadas) / totalMesas) * 100
        : 0;

    return {
        totalMesas,
        mesasLibres,
        mesasOcupadas,
        mesasReservadas,
        mesasMantenimiento,
        porcentajeOcupacion
    };
};

// ============================================================================
// EXPORTACIONES
// ============================================================================

export default {
    // Formateo
    formatCurrency,
    formatDate,
    formatDateTime,
    formatTime,
    formatNumber,
    formatPercentage,

    // Estados
    getStatusColor,
    getStatusIcon,

    // Validación
    isValidEmail,
    isValidPhone,
    isValidNIF,
    isValidPercentage,
    isValidPostalCode,

    // Cálculos
    calculateOrderTotal,
    calculateTaxes,
    calculateDiscount,
    calculateAverage,
    calculateSum,

    // Filtrado y ordenamiento
    filterByText,
    sortByField,
    groupByField,

    // Paginación
    paginateArray,

    // Exportación
    exportToCSV,
    exportToJSON,

    // Fechas
    getDateRange,
    isDateInRange,

    // Opciones de dropdown
    generateUserOptions,
    generateCompanyOptions,
    generateEstablishmentOptions,
    generateTaxOptions,
    generateTableOptions,
    generateAreaOptions,

    // Estadísticas
    calculateOrderStats,
    calculateTableStats
};
