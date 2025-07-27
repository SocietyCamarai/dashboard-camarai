import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { useIconColors } from '../../../hooks/useIconColors';
import { useSidebar } from '../../../hooks/useSidebar';
import { ChevronDownIcon, RestaurantIcon, XIcon } from '../../icons';

interface DetailedTeamSelectorProps {
  onClose?: () => void;
}

export const TeamSelector: React.FC<DetailedTeamSelectorProps> = ({ onClose }) => {
  const { currentTheme } = useTheme();
  const { selectedTeam, handleTeamMenuToggle, isTeamMenuOpen } = useSidebar();
  const iconColors = useIconColors(false);

  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
        <button
          onClick={handleTeamMenuToggle}
          className="flex-1 flex items-center gap-2 p-2 rounded-lg transition-all duration-200 hover:bg-opacity-10"
          style={{ 
            backgroundColor: `${currentTheme.colors.primary}20`,
            color: currentTheme.colors.text,
            transition: 'all 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}20`;
          }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200"
            style={{ 
              backgroundColor: currentTheme.colors.primary, 
              padding: '2px',
              transition: iconColors.transition
            }}
          >
            {selectedTeam === 'Camarai' ? (
              <img
                src="/icons/claro.svg"
                alt="Logo Claro"
                className="w-full h-full"
                width="16"
                height="16"
              />
            ) : (
              <RestaurantIcon 
                size={24} 
                style={{ 
                  color: currentTheme.colors.white,
                  transition: iconColors.transition
                }}
              />
            )}
          </div>
          <span className="flex-1 text-left font-medium truncate text-sm">{selectedTeam}</span>
          <ChevronDownIcon 
            className={`w-4 h-4 transition-all duration-200 flex-shrink-0 ${isTeamMenuOpen ? 'rotate-180' : ''}`}
            style={{ 
              color: iconColors.color,
              transition: iconColors.transition
            }}
          />
        </button>
        {/* Mobile Close Button - Next to team selector for detailed mode */}
        <div className="lg:hidden">
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-all duration-200 hover:bg-opacity-10 flex-shrink-0"
            style={{ 
              backgroundColor: `${currentTheme.colors.primary}20`,
              color: currentTheme.colors.text,
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}20`;
            }}
          >
            <XIcon 
              className="w-4 h-4 transition-colors duration-200"
              style={{ 
                color: iconColors.color,
                transition: iconColors.transition
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}; 