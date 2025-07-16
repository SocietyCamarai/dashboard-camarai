import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { useSidebar } from '../../../hooks/useSidebar';
import { ChevronDownIcon, AccountIcon, PrivacyIcon, FeedbackIcon, ThemeIcon, LogoutIcon } from '../../icons';

export const UserProfile: React.FC = () => {
  const { currentTheme } = useTheme();
  const { 
    isUserMenuOpenDetailed, 
    setIsUserMenuOpenDetailed, 
    handleOpenThemeSelector 
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

  const handleThemeClick = () => {
    handleOpenThemeSelector();
    setIsUserMenuOpenDetailed(false);
  };

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
          <div 
            className="absolute bottom-full left-0 right-0 mb-2 rounded-lg shadow-lg py-2 z-10 backdrop-blur-xl border"
            style={{
              backgroundColor: `${currentTheme.colors.background}`,
              borderColor: `${currentTheme.colors.border}50`,
              // backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
          >
            <button 
              className="w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200"
              style={{ color: currentTheme.colors.text }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = currentTheme.colors.border;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <AccountIcon className="w-4 h-4" />
              Mi cuenta
            </button>
            <button 
              className="w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200"
              style={{ color: currentTheme.colors.text }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = currentTheme.colors.border;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <PrivacyIcon className="w-4 h-4" />
              Política de privacidad
            </button>
            <button 
              className="w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200"
              style={{ color: currentTheme.colors.text }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = currentTheme.colors.border;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <FeedbackIcon className="w-4 h-4" />
              Enviar comentarios
            </button>
            <button
              onClick={handleThemeClick}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200"
              style={{ color: currentTheme.colors.text }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = currentTheme.colors.border;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <ThemeIcon className="w-4 h-4" />
              <span>Temas</span>
            </button>
            <button 
              className="w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200"
              style={{ color: currentTheme.colors.text }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = currentTheme.colors.border;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <LogoutIcon className="w-4 h-4" />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 