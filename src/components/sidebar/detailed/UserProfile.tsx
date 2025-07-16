import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { useSidebar } from '../../../hooks/useSidebar';
import { ChevronDownIcon } from '../../icons';
import { UserSubmenu } from '../shared/UserSubmenu';

export const UserProfile: React.FC = () => {
  const { currentTheme } = useTheme();
  const { 
    isUserMenuOpenDetailed, 
    setIsUserMenuOpenDetailed
  } = useSidebar();

  const userMenuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú usuario al hacer click fuera
  useEffect(() => {
    if (!isUserMenuOpenDetailed) return;
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpenDetailed(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isUserMenuOpenDetailed, setIsUserMenuOpenDetailed]);

  return (
    <div className="px-5 py-3 flex-shrink-0">
      <div className="relative" ref={userMenuRef}>
        <button
          onClick={() => setIsUserMenuOpenDetailed(!isUserMenuOpenDetailed)}
          className="w-full flex items-center gap-2 p-2 text-sm rounded-lg transition-colors duration-300 hover:bg-opacity-10 group"
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
          <div className="flex-1 text-left">
            <div 
              className="font-medium"
              style={{ color: currentTheme.colors.text }}
            >
              Fénix
            </div>
            <div 
              className="text-xs"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              fenix@camarai.es
            </div>
          </div>
          <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpenDetailed ? 'rotate-180' : ''}`} />
        </button>
        {/* User Submenu for detailed mode */}
        {isUserMenuOpenDetailed && (
          <UserSubmenu
            isOpen={isUserMenuOpenDetailed}
            onClose={() => setIsUserMenuOpenDetailed(false)}
            position="detailed"
          />
        )}
      </div>
    </div>
  );
}; 