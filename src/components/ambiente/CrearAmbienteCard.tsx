import React from 'react';
import { PlusIcon } from '../icons';
import type { CrearAmbienteCardProps } from '../../types/components';
import { useTheme } from '../../hooks/useTheme';

const CrearAmbienteCard: React.FC<CrearAmbienteCardProps> = ({ onCrearAmbiente }) => {
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
      onClick={onCrearAmbiente}
      className="rounded-lg shadow-md border-2 border-dashed p-4 sm:p-6 w-full h-[375px] flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group"
      style={{ 
        backgroundColor: `${currentTheme.colors.primary}20`,
        borderColor: currentTheme.colors.border,
        transition: 'all 0.2s ease-in-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}30`;
        e.currentTarget.style.borderColor = currentTheme.colors.primary;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}20`;
        e.currentTarget.style.borderColor = currentTheme.colors.border;
      }}
    >
      <div className="flex flex-col items-center space-y-3">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110" 
          style={{ 
            backgroundColor: currentTheme.colors.border,
            transition: 'all 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = currentTheme.colors.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = currentTheme.colors.border;
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
          Crear Nuevo Ambiente
        </span>
      </div>
    </div>
  );
};

export default CrearAmbienteCard; 