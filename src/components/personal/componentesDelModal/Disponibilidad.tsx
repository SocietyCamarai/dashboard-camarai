import React, { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { SwitchToggle } from '../../SwitchToggle';

interface DisponibilidadDia {
    dia: string;
    disponible: boolean;
    horarioInicio?: string;
    horarioFin?: string;
}

interface DisponibilidadProps {
    disponibilidad?: DisponibilidadDia[];
    onChange: (disponibilidad: DisponibilidadDia[]) => void;
}

const Disponibilidad: React.FC<DisponibilidadProps> = ({ disponibilidad = [], onChange }) => {
    const { currentTheme } = useTheme();

    const diasSemana = [
        'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
    ];

    const [disponibilidadData, setDisponibilidadData] = useState<DisponibilidadDia[]>(
        disponibilidad.length > 0 ? disponibilidad : diasSemana.map(dia => ({
            dia,
            disponible: true,
            horarioInicio: '09:00',
            horarioFin: '18:00'
        }))
    );

    const handleDisponibilidadChange = (index: number, field: keyof DisponibilidadDia, value: any) => {
        const newDisponibilidad = [...disponibilidadData];
        newDisponibilidad[index] = { ...newDisponibilidad[index], [field]: value };
        setDisponibilidadData(newDisponibilidad);
        onChange(newDisponibilidad);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold" style={{ color: currentTheme.colors.text }}>
                    Disponibilidad del Empleado
                </h3>
                <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                    Configura los días y horarios en los que el empleado está disponible
                </p>
            </div>

            <div className="space-y-4">
                {disponibilidadData.map((dia, index) => (
                    <div
                        key={dia.dia}
                        className="p-4 border rounded-lg"
                        style={{
                            borderColor: currentTheme.colors.border,
                            backgroundColor: currentTheme.colors.background
                        }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium" style={{ color: currentTheme.colors.text }}>
                                {dia.dia}
                            </h4>
                            <div className="flex items-center gap-3">
                                <SwitchToggle
                                    isActive={dia.disponible}
                                    onToggle={() => handleDisponibilidadChange(index, 'disponible', !dia.disponible)}
                                    size="sm"
                                />
                                <span className="text-sm font-medium" style={{ color: currentTheme.colors.text }}>
                                    Disponible
                                </span>
                            </div>
                        </div>

                        {dia.disponible && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                                        Horario de inicio
                                    </label>
                                    <input
                                        type="time"
                                        value={dia.horarioInicio || '09:00'}
                                        onChange={(e) => handleDisponibilidadChange(index, 'horarioInicio', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        style={{
                                            backgroundColor: currentTheme.colors.background,
                                            borderColor: currentTheme.colors.border,
                                            color: currentTheme.colors.text
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                                        Horario de fin
                                    </label>
                                    <input
                                        type="time"
                                        value={dia.horarioFin || '18:00'}
                                        onChange={(e) => handleDisponibilidadChange(index, 'horarioFin', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        style={{
                                            backgroundColor: currentTheme.colors.background,
                                            borderColor: currentTheme.colors.border,
                                            color: currentTheme.colors.text
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Disponibilidad;
