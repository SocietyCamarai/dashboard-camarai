import React from 'react';
import { useTheme } from '../../../hooks/useTheme';

interface DataTableProps<T> {
    headers: string[];
    data: T[];
    keyExtractor: (item: T) => string | number;
    renderRow: (item: T) => React.ReactNode[];
    renderActions?: (item: T) => React.ReactNode;
    emptyMessage?: string;
    emptyIcon?: React.ReactNode;
    className?: string;
}

function DataTable<T>({
    headers,
    data,
    keyExtractor,
    renderRow,
    renderActions,
    emptyMessage = 'No hay datos disponibles',
    emptyIcon,
    className = ''
}: DataTableProps<T>) {
    const { currentTheme } = useTheme();

    if (data.length === 0) {
        return (
            <div
                className={`rounded-lg border p-8 text-center ${className}`}
                style={{
                    backgroundColor: currentTheme.colors.background,
                    borderColor: currentTheme.colors.border
                }}
            >
                {emptyIcon}
                <p
                    className="text-sm font-medium"
                    style={{ color: currentTheme.colors.textSecondary }}
                >
                    {emptyMessage}
                </p>
            </div>
        );
    }

    return (
        <div
            className={`rounded-lg border overflow-hidden ${className}`}
            style={{
                backgroundColor: currentTheme.colors.background,
                borderColor: currentTheme.colors.border
            }}
        >
            {/* Header */}
            <div
                className="grid gap-4 p-4 border-b font-medium text-sm"
                style={{
                    gridTemplateColumns: renderActions
                        ? `repeat(${headers.length}, 1fr) auto`
                        : `repeat(${headers.length}, 1fr)`,
                    borderColor: currentTheme.colors.border,
                    backgroundColor: currentTheme.colors.sidebar,
                    color: currentTheme.colors.textSecondary
                }}
            >
                {headers.map((header, index) => (
                    <div key={index} className="truncate">
                        {header}
                    </div>
                ))}
                {renderActions && (
                    <div className="text-center w-16">
                        Acciones
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="divide-y" style={{ borderColor: currentTheme.colors.border }}>
                {data.map((item) => {
                    const rowData = renderRow(item);
                    return (
                        <div
                            key={keyExtractor(item)}
                            className="grid gap-4 p-4 hover:bg-opacity-50 transition-colors"
                            style={{
                                gridTemplateColumns: renderActions
                                    ? `repeat(${headers.length}, 1fr) auto`
                                    : `repeat(${headers.length}, 1fr)`,
                                backgroundColor: 'transparent'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = currentTheme.colors.border + '20';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            {rowData.map((cell, cellIndex) => (
                                <div
                                    key={cellIndex}
                                    className="text-sm truncate flex items-center"
                                    style={{ color: currentTheme.colors.text }}
                                >
                                    {cell}
                                </div>
                            ))}
                            {renderActions && (
                                <div className="flex justify-center items-center w-16">
                                    {renderActions(item)}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default DataTable;
