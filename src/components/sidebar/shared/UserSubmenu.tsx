import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { useIconColors } from '../../../hooks/useIconColors';
import { useSidebar } from '../../../hooks/useSidebar';
import { useAuth } from '../../../hooks/useAuth';
import {
  UserIcon, InfoIcon, MessageIcon, PaletteIcon, LogoutIcon
} from '../../icons';

interface UserSubmenuProps {
  isOpen: boolean;
  onClose: () => void;
  position: 'simple' | 'detailed';
}

export const UserSubmenu: React.FC<UserSubmenuProps> = ({ isOpen, onClose, position }) => {
  const { currentTheme } = useTheme();
  const { handleOpenThemeSelector, handleLogout } = useSidebar();
  const { user } = useAuth();
  const iconColors = useIconColors(false);

  if (!isOpen) return null;

  const getPositionClasses = () => {
    if (position === 'simple') {
      return 'fixed bottom-4 left-26 rounded-lg shadow-lg py-3 px-2 z-50 w-56';
    } else {
      return 'absolute bottom-full left-0 right-0 mb-2 rounded-lg shadow-lg py-2 z-30';
    }
  };

  const handleThemeClick = () => {
    handleOpenThemeSelector();
    onClose();
  };

  const createMenuItem = (icon: React.ComponentType<any>, label: string, onClick?: () => void) => {
    const Icon = icon;
    return (
      <button 
        className="w-full flex items-center gap-3 px-4 py-2 text-sm transition-all duration-200 hover:bg-opacity-10 rounded-md"
        style={{ 
          color: iconColors.color,
          transition: 'all 0.2s ease-in-out'
        }}
        onClick={onClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = iconColors.hoverColor;
          e.currentTarget.style.backgroundColor = currentTheme.colors.border;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = iconColors.color;
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Icon 
          className="w-4 h-4 transition-colors duration-200" 
          style={{ 
            color: iconColors.color,
            transition: iconColors.transition
          }}
        />
        {label}
      </button>
    );
  };

  return (
    <>
      {/* Overlay to close submenu */}
      <div 
        className="fixed inset-0 z-20"
        onClick={e => {
          // Solo cerrar si el click es fuera del menú
          if (e.target === e.currentTarget) onClose();
        }}
      />
      <div 
        className={`${getPositionClasses()} backdrop-blur-md border`}
        style={{
          backgroundColor: `${currentTheme.colors.background}95`,
          borderColor: `${currentTheme.colors.border}40`,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
      >
        {position === 'simple' && (
          <div className="px-4 py-3 border-b border-gray-200">
            <div 
              className="font-medium text-sm"
              style={{ color: currentTheme.colors.text }}
            >
              {user?.nombre || 'Usuario'}
            </div>
            <div 
              className="text-xs"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              {user?.email || 'usuario@ejemplo.com'}
            </div>
          </div>
        )}
        
        {createMenuItem(UserIcon, 'Mi cuenta')}
        {createMenuItem(InfoIcon, 'Política de privacidad')}
        {createMenuItem(MessageIcon, 'Enviar comentarios')}
        {createMenuItem(PaletteIcon, 'Temas', handleThemeClick)}
        {createMenuItem(LogoutIcon, 'Cerrar sesión', () => { handleLogout(); onClose(); })}
      </div>
    </>
  );
}; 