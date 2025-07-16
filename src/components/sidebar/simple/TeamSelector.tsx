import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { useSidebar } from '../../../hooks/useSidebar';
import { RestaurantIcon } from '../../icons';

export const TeamSelector: React.FC = () => {
  const { currentTheme } = useTheme();
  const { selectedTeam, handleTeamMenuToggle } = useSidebar();

  return (
    <div className="w-full flex justify-center py-4 pr-0.5">
      <button
        onClick={handleTeamMenuToggle}
        className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-opacity-10"
        style={{ 
          backgroundColor: `${currentTheme.colors.primary}20`,
          color: currentTheme.colors.text 
        }}
      >
        <div
          className="w-6 h-6 rounded flex items-center justify-center"
          style={{ backgroundColor: currentTheme.colors.primary }}
        >
          {selectedTeam === 'Camarai' ? (
            <img
              src="/icons/claro.svg"
              alt="Logo Claro"
              className="w-full h-full"
              width="24"
              height="24"
            />
          ) : (
            <RestaurantIcon size={24} />
          )}
        </div>
      </button>
    </div>
  );
}; 