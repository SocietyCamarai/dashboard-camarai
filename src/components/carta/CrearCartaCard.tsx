import React from 'react';
import { PlusIcon } from '../icons';
import { useTheme } from '../../hooks/useTheme';

const CrearCartaCard: React.FC<{ onCrearCarta: () => void }> = ({ onCrearCarta }) => {
  const { currentTheme } = useTheme();

  // Función auxiliar para obtener colores de iconos
  const getIconColors = (isActive: boolean = false) => {
    return {
      color: isActive ? currentTheme.colors.primary : currentTheme.colors.text,
      hoverColor: currentTheme.colors.primary,
      secondaryColor: currentTheme.colors.textSecondary, // Iconos secundarios
      activeColor: currentTheme.colors.primary,
      inactiveColor: currentTheme.colors.text,
      transition: 'color 0.2s ease-in-out'
    };
  };

  const iconColors = getIconColors(false);

  return (
    <div
      onClick={onCrearCarta}
      className="rounded-lg border-2 border-dashed p-4 sm:p-6 w-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-xl group min-h-[260px]"
      style={{
        backgroundColor: currentTheme.colors.background,
        borderColor: currentTheme.colors.border,
        transition: 'all 0.3s ease-in-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = currentTheme.colors.primary;
        e.currentTarget.style.transform = 'translateY(-8px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = currentTheme.colors.border;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div className="flex flex-col items-center space-y-3">
        <div
          className="border-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
          style={{
            borderColor: currentTheme.colors.textSecondary,
            transition: 'all 0.2s ease-in-out'
          }}

        >
          <PlusIcon
            size={24}
            style={{
              color: currentTheme.colors.textSecondary,
              transition: iconColors.transition
            }}
          />
        </div>
        <span
          className="font-medium min-w-[200px] text-center transition-colors duration-200"
          style={{
            color: currentTheme.colors.textSecondary,
            transition: iconColors.transition
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = iconColors.hoverColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = currentTheme.colors.textSecondary;
          }}
        >
          Crear Nueva Carta
        </span>
      </div>
    </div>
  );
};

export default CrearCartaCard;
