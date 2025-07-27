import React, { useState, useEffect } from 'react';
import { 
  TrashIcon, 
  XIcon,
  UtensilsIcon,
  SunIcon,
  MicIcon,
  CoffeeIcon,
  SmartphoneIcon
} from '../icons';
import type { Ambiente } from '../../types/components';
import Header from '../home/Header';
import ConfirmarEliminacionModal from './ConfirmarEliminacionModal';
import { useTheme } from '../../hooks/useTheme';

interface ConfiguracionAmbienteModalProps {
  ambiente: Ambiente | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (ambienteActualizado: Ambiente) => void;
  onDelete: (ambiente: Ambiente) => void;
}

const iconosDisponibles = [
  { id: 'utensils', nombre: 'Cubiertos', icon: UtensilsIcon },
  { id: 'mic', nombre: 'Micrófono', icon: MicIcon },
  { id: 'coffee', nombre: 'Café', icon: CoffeeIcon },
  { id: 'trash', nombre: 'Basura', icon: TrashIcon },
  { id: 'sun', nombre: 'Terraza', icon: SunIcon },
  { id: 'smartphone', nombre: 'Empresa', icon: SmartphoneIcon }
];

const coloresDisponibles = [
  { id: 'blue', color: 'rgb(120, 163, 237)', nombre: 'Azul' },
  { id: 'purple', color: 'rgb(155, 110, 253)', nombre: 'Morado' },
  { id: 'pink', color: 'rgb(240, 118, 140)', nombre: 'Rosa' },
  { id: 'orange', color: 'rgb(247, 183, 49)', nombre: 'Naranja' },
  { id: 'green', color: 'rgb(76, 175, 80)', nombre: 'Verde' },
  { id: 'indigo', color: 'rgb(33, 150, 243)', nombre: 'Índigo' }
];

const ConfiguracionAmbienteModal: React.FC<ConfiguracionAmbienteModalProps> = ({
  ambiente,
  isOpen,
  onClose,
  onSave,
  onDelete
}) => {
  const { currentTheme, getButtonTextColor } = useTheme();
  const [iconoSeleccionado, setIconoSeleccionado] = useState('');
  const [colorSeleccionado, setColorSeleccionado] = useState('');
  const [nombre, setNombre] = useState('');
  const [aforoTotal, setAforoTotal] = useState(0);
  const [mesas, setMesas] = useState(0);
  const [mesasActivas, setMesasActivas] = useState(0);
  const [estado, setEstado] = useState<'Abierto' | 'Cerrado'>('Abierto');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Función auxiliar para obtener colores de iconos
  const getIconColors = (isActive: boolean = false) => {
    return {
      color: isActive ? getButtonTextColor(currentTheme) : currentTheme.colors.text,
      hoverColor: currentTheme.colors.primary,
      secondaryColor: currentTheme.colors.textSecondary, // Iconos secundarios
      activeColor: getButtonTextColor(currentTheme),
      inactiveColor: currentTheme.colors.text,
      transition: 'color 0.2s ease-in-out'
    };
  };

  // Actualizar estado cuando cambie el ambiente o se abra el modal
  useEffect(() => {
    if (ambiente && isOpen) {
      setIconoSeleccionado(ambiente.icono);
      setColorSeleccionado(ambiente.colorBorde);
      setNombre(ambiente.nombre);
      setAforoTotal(ambiente.aforoTotal);
      setMesas(ambiente.mesas);
      setMesasActivas(ambiente.mesasActivas);
      setEstado(ambiente.estado);
    }
  }, [ambiente, isOpen]);

  // Resetear estado cuando se cierre el modal
  useEffect(() => {
    if (!isOpen) {
      setIconoSeleccionado('');
      setColorSeleccionado('');
      setNombre('');
      setAforoTotal(0);
      setMesas(0);
      setMesasActivas(0);
      setEstado('Abierto');
      setShowConfirmDelete(false);
    }
  }, [isOpen]);

  // Manejar tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !ambiente || !iconoSeleccionado) return null;

  const handleSave = () => {
    const mesasActivasFinal = Math.min(mesasActivas, mesas); // No puede haber más mesas activas que totales
    
    const ambienteActualizado: Ambiente = {
      ...ambiente,
      nombre: nombre.trim() || ambiente.nombre,
      icono: iconoSeleccionado,
      colorBorde: colorSeleccionado,
      aforoTotal,
      mesas,
      mesasActivas: mesasActivasFinal,
      estado,
      porcentajeOcupacion: mesas > 0 ? Math.round((mesasActivasFinal / mesas) * 100) : 0
    };
    onSave(ambienteActualizado);
    onClose();
  };

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    if (ambiente) {
      onDelete(ambiente);
      onClose(); // Cerrar el modal de configuración después de eliminar
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      onClick={handleBackdropClick}
    >
      <div className="rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        style={{ backgroundColor: `${currentTheme.colors.sidebar}` }}>
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <Header title="Configurar Ambiente" className=" text-[1.6rem] font-bold" rounded={false} />
          <button
            onClick={onClose}
            className="transition-all duration-200 hover:bg-opacity-10 rounded p-1"
            style={{ 
              color: currentTheme.colors.textSecondary,
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = currentTheme.colors.primary;
              e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}10`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = currentTheme.colors.textSecondary;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <XIcon size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 -mt-10">
          {/* Nombre */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium h-8" style={{ color: currentTheme.colors.text }}>
              Nombre del Salón o Zona
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ 
                borderColor: currentTheme.colors.border,
                backgroundColor: currentTheme.colors.background,
                color: currentTheme.colors.text
              }}
              placeholder="Ej: Comedor principal, Terraza, Bar..."
              maxLength={20}
            />
          </div>

          {/* Aforo y Mesas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium h-8" style={{ color: currentTheme.colors.text }}>
                Capacidad Máxima (Personas)
              </label>
              <input
                type="number"
                value={aforoTotal}
                onChange={(e) => setAforoTotal(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ 
                  borderColor: currentTheme.colors.border,
                  backgroundColor: currentTheme.colors.background,
                  color: currentTheme.colors.text
                }}
                min="0"
                placeholder="Ej: 50"
              />
              <p className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>
                Número total de personas que caben
              </p>
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium h-8" style={{ color: currentTheme.colors.text }}>
                Total de Mesas Disponibles
              </label>
              <input
                type="number"
                value={mesas}
                onChange={(e) => {
                  const newMesas = Math.max(0, parseInt(e.target.value) || 0);
                  setMesas(newMesas);
                  // Ajustar mesas activas si excede el nuevo total
                  if (mesasActivas > newMesas) {
                    setMesasActivas(newMesas);
                  }
                }}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ 
                  borderColor: currentTheme.colors.border,
                  backgroundColor: currentTheme.colors.background,
                  color: currentTheme.colors.text
                }}
                min="0"
                placeholder="Ej: 12"
              />
              <p className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>
                Todas las mesas del salón
              </p>
            </div>
          </div>

          {/* Mesas Activas y Estado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-2">
              <label className="block text-sm font-medium h-8 flex items-center" style={{ color: currentTheme.colors.text }}>
                Mesas en Uso Actualmente
              </label>
              <input
                type="number"
                value={mesasActivas}
                onChange={(e) => {
                  const newMesasActivas = Math.max(0, parseInt(e.target.value) || 0);
                  setMesasActivas(Math.min(newMesasActivas, mesas)); // No puede exceder el total de mesas
                }}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ 
                  borderColor: currentTheme.colors.border,
                  backgroundColor: currentTheme.colors.background,
                  color: currentTheme.colors.text
                }}
                min="0"
                max={mesas}
                placeholder="Ej: 8"
              />
              <p className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>
                Máximo: {mesas} mesas disponibles
              </p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium h-8 flex items-center" style={{ color: currentTheme.colors.text }}>
                Estado del Salón
              </label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value as 'Abierto' | 'Cerrado')}
                className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ 
                  borderColor: currentTheme.colors.border,
                  backgroundColor: currentTheme.colors.background,
                  color: currentTheme.colors.text
                }}
              >
                <option value="Abierto">Abierto al público</option>
                <option value="Cerrado">Cerrado temporalmente</option>
              </select>
              <p className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>
                Si está disponible para clientes
              </p>
            </div>
          </div>

          {/* Información del Aforo */}
          <div className="p-4 rounded-md" style={{ backgroundColor: currentTheme.colors.border }}>
            <h4 className="text-sm font-medium mb-3" style={{ color: currentTheme.colors.text }}>Resumen de Ocupación</h4>
            <div className="space-y-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              <p>👥 Personas que caben actualmente: {Math.round((mesasActivas / Math.max(mesas, 1)) * aforoTotal)}</p>
              <p>📊 Porcentaje de mesas ocupadas: {mesas > 0 ? Math.round((mesasActivas / mesas) * 100) : 0}%</p>
              <p>🪑 Mesas libres: {Math.max(0, mesas - mesasActivas)} de {mesas}</p>
            </div>
          </div>

          {/* Icono */}
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold" style={{ color: currentTheme.colors.text }}>Icono del Salón</h3>
              <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Elige un icono que represente este salón</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {iconosDisponibles.map((icono) => {
                const isSelected = iconoSeleccionado === icono.id;
                const IconComponent = icono.icon;
                const iconColors = getIconColors(isSelected);
                
                return (
                  <button
                    key={icono.id}
                    onClick={() => setIconoSeleccionado(icono.id)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 w-[50px] h-[50px] hover:scale-105 ${
                      isSelected
                        ? 'border-purple-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{
                      backgroundColor: isSelected ? currentTheme.colors.primary : currentTheme.colors.background,
                      transition: 'all 0.2s ease-in-out'
                    }}
                    title={icono.nombre}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}10`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = currentTheme.colors.background;
                      }
                    }}
                  >
                    <IconComponent 
                      size={20} 
                      style={{ 
                        color: iconColors.color,
                        transition: iconColors.transition
                      }} 
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color */}
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold" style={{ color: currentTheme.colors.text }}>Color del Salón</h3>
              <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Elige un color para identificar este salón</p>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {coloresDisponibles.map((color) => {
                const isSelected = colorSeleccionado === color.color;
                return (
                  <button
                    key={color.id}
                    onClick={() => setColorSeleccionado(color.color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                      isSelected
                        ? 'border-purple-600 ring-2 ring-purple-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ 
                      backgroundColor: color.color,
                      transition: 'all 0.2s ease-in-out'
                    }}
                    title={color.nombre}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t space-y-3" style={{ borderTopColor: currentTheme.colors.border }}>
          <button
            onClick={handleSave}
            className="w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02]"
            style={{ 
              backgroundColor: currentTheme.colors.primary,
              color: getButtonTextColor(currentTheme),
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Guardar Cambios
          </button>
          <button
            onClick={handleDelete}
            className="w-full border font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-[1.02]"
            style={{ 
              borderColor: currentTheme.colors.error,
              color: currentTheme.colors.error,
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.backgroundColor = `${currentTheme.colors.error}10`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <TrashIcon size={18} />
            <span>Eliminar ambiente</span>
          </button>
        </div>
      </div>
      
      {/* Modal de confirmación de eliminación */}
      <ConfirmarEliminacionModal
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleConfirmDelete}
        nombreAmbiente={ambiente?.nombre || ''}
      />
    </div>
  );
};

export default ConfiguracionAmbienteModal; 