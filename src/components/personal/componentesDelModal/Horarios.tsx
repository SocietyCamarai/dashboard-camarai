import React, { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { SwitchToggle } from '../../SwitchToggle';

interface Horario {
    dia: string;
    entrada: string;
    salida: string;
    activo: boolean;
}

interface HorariosProps {
    horarios?: Horario[];
    onChange: (horarios: Horario[]) => void;
}

const Horarios: React.FC<HorariosProps> = ({ horarios = [], onChange }) => {
    const { currentTheme } = useTheme();

    const diasSemana = [
        'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
    ];

    const [horariosData, setHorariosData] = useState<Horario[]>(
        horarios.length > 0 ? horarios : diasSemana.map(dia => ({
            dia,
            entrada: '09:00',
            salida: '18:00',
            activo: true
        }))
    );

    const handleHorarioChange = (index: number, field: keyof Horario, value: any) => {
        const newHorarios = [...horariosData];
        newHorarios[index] = { ...newHorarios[index], [field]: value };
        setHorariosData(newHorarios);
        onChange(newHorarios);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold" style={{ color: currentTheme.colors.text }}>
                    Configuración de Horarios
                </h3>
                <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                    Define los horarios de trabajo para cada día de la semana
                </p>
            </div>

            <div className="space-y-4">
                {horariosData.map((horario, index) => (
                    <div
                        key={horario.dia}
                        className="p-4 border rounded-lg"
                        style={{
                            borderColor: currentTheme.colors.border,
                            backgroundColor: currentTheme.colors.background
                        }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium" style={{ color: currentTheme.colors.text }}>
                                {horario.dia}
                            </h4>
                            <div className="flex items-center gap-3">
                                <SwitchToggle
                                    isActive={horario.activo}
                                    onToggle={() => handleHorarioChange(index, 'activo', !horario.activo)}
                                    size="sm"
                                />
                                <span className="text-sm font-medium" style={{ color: currentTheme.colors.text }}>
                                    Activo
                                </span>
                            </div>
                        </div>

                        {horario.activo && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                                        Hora de entrada
                                    </label>
                                    <input
                                        type="time"
                                        value={horario.entrada}
                                        onChange={(e) => handleHorarioChange(index, 'entrada', e.target.value)}
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
                                        Hora de salida
                                    </label>
                                    <input
                                        type="time"
                                        value={horario.salida}
                                        onChange={(e) => handleHorarioChange(index, 'salida', e.target.value)}
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

export default Horarios;
