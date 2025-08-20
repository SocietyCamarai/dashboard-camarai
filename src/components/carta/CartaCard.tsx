import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoriasIcon, UtensilsIcon, EditarCartaIcon, SunIcon, MicIcon, CoffeeIcon, SmartphoneIcon, TrashIcon, MoreVertical } from '../icons';
import { SwitchToggle } from '../SwitchToggle';
import type { ICarta } from '../../types/database.types';
import { useTheme } from '../../hooks/useTheme';

const CartaCard: React.FC<{ carta: ICarta; onToggleActivo: (id: string) => void; onEditarNombre: (id: string, nuevoNombre: string) => void; onConfigurar: (carta: ICarta, buttonRef: React.RefObject<HTMLButtonElement>) => void; onAcciones: (carta: ICarta, buttonRef: React.RefObject<HTMLButtonElement>) => void }> = ({ carta, onToggleActivo, onEditarNombre, onConfigurar, onAcciones }) => {
  const { currentTheme, getButtonTextColor } = useTheme();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [nombreTemp, setNombreTemp] = useState(carta.nombre);

  const configButtonRef = useRef<HTMLButtonElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  // Sincronizar el estado nombreTemp cuando cambie la prop carta.nombre
  useEffect(() => {
    setNombreTemp(carta.nombre);
  }, [carta.nombre]);


  // Función auxiliar para obtener colores de iconos
  const getIconColors = () => {
    return {
      transition: 'color 0.2s ease-in-out'
    };
  };

  const handleConfigurar = () => {
    onConfigurar(carta, configButtonRef as React.RefObject<HTMLButtonElement>);
  };

  const handleAcciones = () => {
    onAcciones(carta, moreButtonRef as React.RefObject<HTMLButtonElement>);
  };

  const handleNavigateToCarta = () => {
    const cartaName = carta.nombre.toLowerCase().replace(/\s+/g, '-');
    navigate(`/dashboard/carta/${cartaName}/edit`);
  };

  const handleSaveEdit = () => {
    if (nombreTemp.trim()) {
      onEditarNombre(carta.id, nombreTemp.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setNombreTemp(carta.nombre);
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
    const baseWidth = Math.max(nombreTemp.length, carta.nombre.length);
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

  const IconComponent = getIconComponent(carta.icono);
  const iconColors = getIconColors();

  return (
    <div
      className=" rounded-lg border-l-4 border-r border-t border-b p-4 sm:p-6 hover:shadow-xl transition-all duration-300 group relative min-h-[260px] flex flex-col"
      style={{
        backgroundColor: currentTheme.colors.sidebar,
        borderRightColor: currentTheme.colors.border,
        borderBottomColor: currentTheme.colors.border,
        borderTopColor: currentTheme.colors.border,
        borderLeftColor: carta.colorBorde,
        transform: 'translateY(0px)',
        transition: 'all 0.3s ease-in-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <button
            ref={configButtonRef}
            onClick={handleConfigurar}
            className="p-1 rounded border transition-all duration-200 hover:bg-opacity-10 hover:scale-105"
            style={{
              color: carta.colorBorde,
              transition: 'all 0.2s ease-in-out',
              borderColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}10`;
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.borderColor = currentTheme.colors.primary;
              const icon = e.currentTarget.querySelector('svg');
              if (icon) {
                icon.style.color = carta.colorBorde;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'transparent';
              const icon = e.currentTarget.querySelector('svg');
              if (icon) {
                icon.style.color = carta.colorBorde;
              }
            }}
          >
            <IconComponent
              size={20}
              className="h-5 w-5 transition-colors duration-200"
              style={{
                color: carta.colorBorde,
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
                onClick={handleNavigateToCarta}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                {carta.nombre}
              </h3>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SwitchToggle
            isActive={carta.activo}
            onToggle={() => onToggleActivo(carta.id)}
            size="sm"
          />
          <button
            ref={moreButtonRef}
            onClick={handleAcciones}
            className="p-1 rounded transition-all duration-200 hover:bg-opacity-10 hover:scale-105"
            style={{
              backgroundColor: 'transparent',
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}10`;
              e.currentTarget.style.transform = 'scale(1.05)';
              const icon = e.currentTarget.querySelector('svg');
              if (icon) {
                icon.style.color = currentTheme.colors.primary;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
              const icon = e.currentTarget.querySelector('svg');
              if (icon) {
                icon.style.color = currentTheme.colors.textSecondary;
              }
            }}
          >
            <MoreVertical
              size={16}
              className="transition-colors duration-200"
              style={{
                color: currentTheme.colors.text,
                transition: iconColors.transition
              }}
            />
          </button>
        </div>
      </div>

      {/* Descripción de la carta */}
      <div className="mb-4">
        <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
          {carta.nombre === 'Carta Principal' ? 'Nuestra selección completa de platos para disfrutar.' :
            carta.nombre === 'Carta de Bebidas' ? 'Todos nuestros refrescos, vinos y licores.' :
              carta.nombre === 'Menús Especiales' ? 'Nuestras ofertas y menús completos.' :
                'Descripción de la carta.'}
        </p>
      </div>

      {/* Métrica de Elementos */}
      <div className="flex items-center justify-between text-muted-foreground mt-auto pb-6">
        <div className=" flex items-center gap-2 ">
          <CategoriasIcon
            className="h-5 w-5 transition-colors duration-200"
            style={{
              color: currentTheme.colors.textSecondary,
              transition: iconColors.transition
            }}
          />
          <span style={{ color: currentTheme.colors.textSecondary }}>Elementos:</span>
        </div>
        <div
          className="inline-flex items-center rounded-md  px-2.5 py-0.5 text-[1.1rem] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          style={{

            color: currentTheme.colors.text
          }}
        >
          {carta.aforoTotal}
        </div>
      </div>



      {/* Action Button */}
      <div className="relative">
        <button
          onClick={handleNavigateToCarta}
          className="w-full hover:shadow-md font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
          style={{
            backgroundColor: currentTheme.colors.primary,
            color: getButtonTextColor(currentTheme),
            transition: 'all 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}E6`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = currentTheme.colors.primary;

          }}
        >
          <EditarCartaIcon
            size={16}
            className="sm:w-5 sm:h-5 transition-colors duration-200"
            style={{
              color: getButtonTextColor(currentTheme),
              transition: iconColors.transition
            }}

          />
          <span>Gestionar Carta</span>
        </button>
      </div>


    </div>
  );
};

export default CartaCard;
