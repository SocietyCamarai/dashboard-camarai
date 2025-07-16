import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { useSidebar } from '../../../hooks/useSidebar';

export const UserProfile: React.FC = () => {
  const { currentTheme } = useTheme();
  const { handleUserMenuToggle } = useSidebar();

  return (
    <div className="w-full flex justify-center py-4 flex-shrink-0">
      <button
        onClick={handleUserMenuToggle}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-opacity-10 group"
        style={{ 
          color: currentTheme.colors.text,
          backgroundColor: `${currentTheme.colors.primary}20`
        }}
      >
        <img
          src="https://fenixbinario.com/assets/img/manusa-2019.jpg"
          alt="Foto de perfil del usuario"
          className="w-10 h-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </button>
    </div>
  );
}; 