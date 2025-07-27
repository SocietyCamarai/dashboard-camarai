import React, { useState } from 'react';
import { PrinterIcon, EditIcon, UsersIcon, UtensilsIcon, ActivityIcon, PowerIcon, PercentIcon, SunIcon, MicIcon, CoffeeIcon, SmartphoneIcon, TrashIcon } from '../icons';
import { SwitchToggle } from '../SwitchToggle';
import type { AmbienteCardProps } from '../../types/components';
import { useTheme } from '../../hooks/useTheme';

const AmbienteCard: React.FC<AmbienteCardProps> = ({ ambiente, onToggleActivo, onImprimirQR, onEditarNombre, onConfigurar }) => {
  const { currentTheme, getButtonTextColor } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [nombreTemp, setNombreTemp] = useState(ambiente.nombre);
  const [showTooltip, setShowTooltip] = useState(false);

  // Función auxiliar para obtener colores de iconos
  const getIconColors = (isActive: boolean = false) => {
    return {
      color: isActive ? currentTheme.colors.primary : currentTheme.colors.text,
      hoverColor: currentTheme.colors.primary,
      secondaryColor: currentTheme.colors.textSecondary, // Iconos secundarios (métricas)
      activeColor: currentTheme.colors.primary,
      inactiveColor: currentTheme.colors.text,
      transition: 'color 0.2s ease-in-out'
    };
  };

  const handleConfigurar = React.useCallback(() => {
    if (typeof onConfigurar === 'function') {
      onConfigurar(ambiente);
    }
  }, [onConfigurar, ambiente]);

  const handleSaveEdit = () => {
    if (nombreTemp.trim()) {
      onEditarNombre(ambiente.id, nombreTemp.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setNombreTemp(ambiente.nombre);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const getInputWidth = () => {
    const baseWidth = Math.max(nombreTemp.length, ambiente.nombre.length);
    return Math.max(Math.min(baseWidth + 0.5, 12), 3);
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }> } = {
      utensils: UtensilsIcon,
      sun: SunIcon,
      mic: MicIcon,
      coffee: CoffeeIcon,
      trash: TrashIcon,
      smartphone: SmartphoneIcon
    };
    return iconMap[iconName] || UtensilsIcon;
  };

  const IconComponent = getIconComponent(ambiente.icono);
  const iconColors = getIconColors(false);

  return (
    <div 
      className="rounded-lg shadow-md border-t-4 p-4 sm:p-6 hover:shadow-lg transition-all duration-200 sm:hover:scale-[1.02] group relative"
      style={{ 
        backgroundColor: `${currentTheme.colors.sidebar}80`,
        borderTopColor: ambiente.colorBorde 
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <button
            onClick={handleConfigurar}
            className="p-1 rounded transition-all duration-200 hover:bg-opacity-10 hover:scale-105"
            style={{ 
              backgroundColor: 'transparent',
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}10`;
              e.currentTarget.style.transform = 'scale(1.05)';
              // Cambiar el color del icono al hacer hover
              const icon = e.currentTarget.querySelector('svg');
              if (icon) {
                icon.style.color = currentTheme.colors.primary;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
              // Restaurar el color del icono al salir del hover
              const icon = e.currentTarget.querySelector('svg');
              if (icon) {
                icon.style.color = currentTheme.colors.textSecondary;
              }
            }}
          >
            <IconComponent 
              size={20} 
              className="h-5 w-5 transition-colors duration-200" 
              style={{ 
                color: currentTheme.colors.textSecondary,
                transition: iconColors.transition
              }}
            />
          </button>
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            {isEditing ? (
              <input
                type="text"
                value={nombreTemp}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 15) {
                    setNombreTemp(value);
                  }
                }}
                onKeyDown={handleKeyPress}
                onBlur={handleSaveEdit}
                className="text-base sm:text-lg font-semibold bg-transparent border-b focus:outline-none min-w-0 max-w-full"
                style={{ 
                  color: currentTheme.colors.text,
                  borderBottomColor: currentTheme.colors.primary,
                  width: `${getInputWidth()}ch`,
                  maxWidth: '12ch'
                }}
                maxLength={15}
                autoFocus
              />
            ) : (
              <h3 
                className="text-base sm:text-lg font-semibold truncate cursor-pointer hover:bg-opacity-10 rounded px-1 py-1 transition-all duration-200" 
                style={{ color: currentTheme.colors.text }}
                onClick={() => setIsEditing(true)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {ambiente.nombre}
              </h3>
            )}
          </div>
        </div>
        <SwitchToggle
          isActive={ambiente.activo}
          onToggle={() => onToggleActivo(ambiente.id)}
          size="sm"
          className="ml-2"
        />
      </div>

      {/* New Metrics Layout */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-2">
            <UsersIcon 
              className="h-5 w-5 transition-colors duration-200" 
              style={{ 
                color: currentTheme.colors.textSecondary,
                transition: iconColors.transition
              }}
            />
            <span style={{ color: currentTheme.colors.textSecondary }}>Aforo total:</span>
          </div>
          <div 
            className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            style={{ 
              borderColor: currentTheme.colors.border,
              backgroundColor: currentTheme.colors.sidebar,
              color: currentTheme.colors.text
            }}
          >
            {ambiente.aforoTotal} personas
          </div>
        </div>
        
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-2">
            <UtensilsIcon 
              className="h-5 w-5 transition-colors duration-200" 
              style={{ 
                color: currentTheme.colors.textSecondary,
                transition: iconColors.transition
              }}
            />
            <span style={{ color: currentTheme.colors.textSecondary }}>Mesas:</span>
          </div>
          <div 
            className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            style={{ 
              borderColor: currentTheme.colors.border,
              backgroundColor: currentTheme.colors.sidebar,
              color: currentTheme.colors.text
            }}
          >
            {ambiente.mesas} mesas
          </div>
        </div>
        
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-2">
            <ActivityIcon 
              className="h-5 w-5 transition-colors duration-200" 
              style={{ 
                color: currentTheme.colors.textSecondary,
                transition: iconColors.transition
              }}
            />
            <span style={{ color: currentTheme.colors.textSecondary }}>Mesas activas:</span>
          </div>
          <div 
            className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            style={{ 
              borderColor: currentTheme.colors.border,
              backgroundColor: currentTheme.colors.sidebar,
              color: currentTheme.colors.text
            }}
          >
            {ambiente.mesasActivas} mesas
          </div>
        </div>
        
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-2">
            <PowerIcon 
              className="h-5 w-5 transition-colors duration-200" 
              style={{ 
                color: currentTheme.colors.textSecondary,
                transition: iconColors.transition
              }}
            />
            <span style={{ color: currentTheme.colors.textSecondary }}>Estado:</span>
          </div>
          <div 
            className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            style={{ 
              borderColor: ambiente.estado === 'Abierto' ? '#10b981' : '#ef4444',
              backgroundColor: ambiente.estado === 'Abierto' ? '#10b98120' : '#ef444420',
              color: ambiente.estado === 'Abierto' ? '#10b981' : '#ef4444'
            }}
          >
            {ambiente.estado === 'Abierto' ? 'Abierto' : 'Cerrado'}
          </div>
        </div>
        
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2">
              <PercentIcon 
                className="h-5 w-5 transition-colors duration-200" 
                style={{ 
                  color: currentTheme.colors.textSecondary,
                  transition: iconColors.transition
                }}
              />
              <span style={{ color: currentTheme.colors.textSecondary }}>Aforo Ocupado:</span>
            </div>
            <div 
              className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              style={{ 
                borderColor: currentTheme.colors.border,
                backgroundColor: currentTheme.colors.sidebar,
                color: currentTheme.colors.text
              }}
            >
              {ambiente.porcentajeOcupacion}%
            </div>
          </div>
          
          <div 
            aria-valuemax={100} 
            aria-valuemin={0} 
            role="progressbar" 
            data-state="indeterminate" 
            data-max="100" 
            className="relative w-full overflow-hidden rounded-full h-2"
            style={{ backgroundColor: currentTheme.colors.border }}
          >
            <div 
              data-state="indeterminate" 
              data-max="100" 
              className="h-full w-full flex-1 transition-all" 
              style={{ 
                backgroundColor: currentTheme.colors.primary,
                transform: `translateX(-${100 - ambiente.porcentajeOcupacion}%)`
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tooltip integrado */}
      <div 
        className={`text-xs p-2 -mb-3 text-center transition-opacity duration-200 ${showTooltip ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          color: currentTheme.colors.textSecondary
        }}
      >
        Doble clic en el nombre para editar. Clic en el icono para personalizar.
      </div>

      {/* Action Button */}
      <div className="relative mt-4">
        <button
          onClick={() => onImprimirQR(ambiente.id)}
          className="w-full hover:shadow-md font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base transform hover:scale-[1.02]"
          style={{ 
            backgroundColor: currentTheme.colors.primary,
            color: getButtonTextColor(currentTheme),
            transition: 'all 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
        <PrinterIcon 
          size={16} 
          className="sm:w-5 sm:h-5 transition-colors duration-200" 
          style={{ 
            color: getButtonTextColor(currentTheme),
            transition: iconColors.transition
          }}
        />
        <span className="hidden sm:inline">Imprimir QR de Mesas</span>
        <span className="sm:hidden">Imprimir QR</span>
        </button>
      </div>
    </div>
  );
};

export default AmbienteCard; 