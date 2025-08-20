import React, { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { DataTable } from '../shared';

interface Fichaje {
    id: string;
    fecha: string;
    entrada: string;
    salida?: string;
    horasTrabajadas?: string;
    estado: 'entrada' | 'salida';
}

interface FichajesProps {
    fichajes?: Fichaje[];
    onChange?: (fichajes: Fichaje[]) => void;
}

const Fichajes: React.FC<FichajesProps> = () => {
    const { currentTheme } = useTheme();

    // Datos de ejemplo
    const [fichajesData] = useState<Fichaje[]>([
        {
            id: '1',
            fecha: '2024-01-15',
            entrada: '09:00',
            salida: '18:00',
            horasTrabajadas: '9h',
            estado: 'salida'
        },
        {
            id: '2',
            fecha: '2024-01-16',
            entrada: '08:30',
            salida: '17:30',
            horasTrabajadas: '9h',
            estado: 'salida'
        },
        {
            id: '3',
            fecha: '2024-01-17',
            entrada: '09:15',
            estado: 'entrada'
        }
    ]);

    const headers = ['Fecha', 'Entrada', 'Salida', 'Horas Trabajadas', 'Estado'];

    const renderRow = (fichaje: Fichaje) => [
        new Date(fichaje.fecha).toLocaleDateString('es-ES'),
        fichaje.entrada,
        fichaje.salida || '-',
        fichaje.horasTrabajadas || '-',
        <span
            key={fichaje.id}
            className={`px-2 py-1 rounded-full text-xs font-medium ${fichaje.estado === 'entrada'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
        >
            {fichaje.estado === 'entrada' ? 'En trabajo' : 'Completado'}
        </span>
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold" style={{ color: currentTheme.colors.text }}>
                    Historial de Fichajes
                </h3>
                <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                    Registro de entradas y salidas del empleado
                </p>
            </div>

            <DataTable
                headers={headers}
                data={fichajesData}
                keyExtractor={(item) => item.id}
                renderRow={renderRow}
                emptyMessage="No hay fichajes registrados"
            />
        </div>
    );
};

export default Fichajes;
