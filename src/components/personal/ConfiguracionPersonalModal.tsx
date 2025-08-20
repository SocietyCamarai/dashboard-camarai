import React, { useState, useEffect } from 'react';
import { XIcon } from '../icons';
import { useTheme } from '../../hooks/useTheme';
import TabNavigation from './TabNavigation';
import type { TabItem } from './TabNavigation';
import InformacionPersonal from './componentesDelModal/InformacionPersonal';
import Horarios from './componentesDelModal/Horarios';
import Fichajes from './componentesDelModal/Fichajes';
import Disponibilidad from './componentesDelModal/Disponibilidad';
import ContratosDocumentos from './componentesDelModal/ContratosDocumentos';
import type { IEmpleado } from '../../types/personal.types';

interface ConfiguracionPersonalModalProps {
    empleado?: IEmpleado;
    isOpen: boolean;
    onClose: () => void;
    onSave: (empleado: IEmpleado) => void;
    onDelete?: (empleado: IEmpleado) => void;
}

const ConfiguracionPersonalModal: React.FC<ConfiguracionPersonalModalProps> = ({
    empleado,
    isOpen,
    onClose,
    onSave
}) => {
    const { currentTheme } = useTheme();

    // Estado inicial del empleado
    const getInitialEmpleadoData = (): IEmpleado => ({
        id: undefined,
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        password: '',
        empresa_id: 3,
        establecimiento_id: 7,
        ultimo_login: undefined,
        pin: undefined,
        token_reset: undefined,
        token_expira: undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        refresh_token: undefined,
        // Campos adicionales
        puesto: '',
        puestos: [],
        nif: '',
        numeroSeguridadSocial: '',
        estado: 'activo',
        nombreCompleto: '',
        imagen: null
    });

    const [empleadoData, setEmpleadoData] = useState<IEmpleado>(getInitialEmpleadoData());

    // Sincronizar el estado cuando cambia el prop empleado
    useEffect(() => {
        if (empleado) {
            setEmpleadoData(empleado);
        } else {
            setEmpleadoData(getInitialEmpleadoData());
        }
    }, [empleado]);

    const [activeTab, setActiveTab] = useState('informacion');

    const tabs: TabItem[] = [
        { label: 'Información Personal', value: 'informacion' },
        { label: 'Horarios', value: 'horarios' },
        { label: 'Fichajes', value: 'fichajes' },
        { label: 'Disponibilidad', value: 'disponibilidad' },
        { label: 'Contratos y Documentos', value: 'documentos' }
    ];

    const handleSave = () => {
        onSave(empleadoData);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    const handleEmpleadoChange = (newData: IEmpleado) => {
        setEmpleadoData(newData);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'informacion':
                return (
                    <InformacionPersonal
                        empleado={empleadoData}
                        onChange={handleEmpleadoChange}
                    />
                );
            case 'horarios':
                return (
                    <Horarios
                        onChange={() => { }}
                    />
                );
            case 'fichajes':
                return (
                    <Fichajes
                        onChange={() => { }}
                    />
                );
            case 'disponibilidad':
                return (
                    <Disponibilidad
                        onChange={() => { }}
                    />
                );
            case 'documentos':
                return (
                    <ContratosDocumentos
                        onChange={() => { }}
                    />
                );
            default:
                return null;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
            <div
                className="w-full max-w-7xl h-[95vh] sm:h-[90vh] rounded-lg sm:rounded-xl shadow-2xl overflow-hidden flex flex-col"
                style={{ backgroundColor: currentTheme.colors.sidebar }}
            >
                {/* Header */}
                <div
                    className="flex items-start sm:items-center justify-between p-4 sm:p-6 border-b"
                    style={{ borderColor: currentTheme.colors.border }}
                >
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg sm:text-xl font-semibold truncate" style={{ color: currentTheme.colors.text }}>
                            Detalles de {empleadoData.nombreCompleto || empleadoData.nombre}
                        </h2>
                        <p className="text-xs sm:text-sm mt-1 line-clamp-2" style={{ color: currentTheme.colors.textSecondary }}>
                            Gestiona la información, documentos, horarios y fichajes del empleado.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg transition-colors hover:opacity-70 flex-shrink-0 ml-2"
                        style={{ backgroundColor: currentTheme.colors.border + '20' }}
                    >
                        <XIcon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: currentTheme.colors.textSecondary }} />
                    </button>
                </div>

                {/* Navigation */}
                <div className="px-4 sm:px-6 pt-4">
                    <TabNavigation
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {renderTabContent()}
                </div>

                {/* Footer */}
                <div
                    className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 p-4 sm:p-6 border-t"
                    style={{ borderColor: currentTheme.colors.border }}
                >
                    <button
                        onClick={handleCancel}
                        className="w-full sm:w-auto px-4 py-2.5 sm:py-2 text-sm font-medium rounded-lg border transition-all duration-200 hover:opacity-80 hover:scale-105 active:scale-95"
                        style={{
                            color: currentTheme.colors.textSecondary,
                            borderColor: currentTheme.colors.border,
                            backgroundColor: 'transparent'
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="w-full sm:w-auto px-4 py-2.5 sm:py-2 text-sm font-medium text-white rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                        style={{
                            backgroundColor: currentTheme.colors.primary,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '0.9';
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '1';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfiguracionPersonalModal;
