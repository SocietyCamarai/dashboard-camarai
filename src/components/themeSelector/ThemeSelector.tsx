// import React from 'react';
import { useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '../../context';
import { XIcon } from '../icons';
import type { Theme } from '../../types/theme';
import type { ThemeSelectorModalProps } from '../../types/components';

const ThemeSelector: React.FC<ThemeSelectorModalProps> = ({ isOpen, onClose, closeOnBackdropClick }) => {
  const { currentTheme, setTheme, themeCategories, isDarkTheme } = useTheme();
  const { navigationType, setNavigationType } = useNavigation();

  const contentRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    if (!isOpen || !closeOnBackdropClick) return;
    function handleClick(e: MouseEvent) {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, closeOnBackdropClick, onClose]);

  if (!isOpen) return null;

  const handleThemeSelect = (themeName: string) => {
    setTheme(themeName);
    onClose();
  };

  // Gradiente circular fijo: fondo (0-180°), primario (180-270°), secundario (270-360°)
  const getThemeCircleGradient = (theme: Theme) => {
    return `conic-gradient(
      from 0deg,
      ${theme.colors.background} 0deg,
      ${theme.colors.background} 180deg,
      ${theme.colors.primary} 180deg,
      ${theme.colors.primary} 270deg,
      ${theme.colors.secondary} 270deg,
      ${theme.colors.secondary} 360deg
    )`;
  };

  const ThemeCircle = ({ theme, isOfficial = false }: { theme: Theme; isOfficial?: boolean }) => (
    <button
      key={theme.name}
      onClick={() => handleThemeSelect(theme.name)}
      className={`relative w-16 h-16 aspect-square flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none box-border ${currentTheme.name === theme.name ? 'border-[2.6px] shadow-lg' : ''
        }`}
      style={{
        background: getThemeCircleGradient(theme),
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderColor: currentTheme.name === theme.name ? currentTheme.colors.primary : 'transparent',
        padding: 0,
        margin: 0,
      }}
      aria-label={`Seleccionar tema ${theme.name}`}
    >
      {/* Indicador de selección */}
      {currentTheme.name === theme.name && (
        <span
          className="absolute -top-2 -right-2 w-4 h-4 rounded-full border-2"
          style={{
            backgroundColor: currentTheme.colors.primary,
            borderColor: currentTheme.colors.background
          }}
        />
      )}
      {/* Badge para tema oficial */}
      {isOfficial && (
        <span
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
          style={{
            backgroundColor: currentTheme.colors.primary,
            color: '#ffffff'
          }}
        >
          ★
        </span>
      )}
    </button>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-[5px] z-70"
        style={{
          backgroundColor: isDarkTheme(currentTheme)
            ? 'rgba(0, 0, 0, 0.3)'
            : 'rgba(255, 255, 255, 0.4)'
        }}
        onClick={onClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-80 flex items-center justify-center p-4">
        <div
          ref={contentRef}
          className="rounded-xl shadow-2xl max-w-md w-full p-6 font-dm-sans backdrop-blur-md border"
          style={{
            color: currentTheme.colors.text,
            backgroundColor: isDarkTheme(currentTheme)
              ? 'rgba(60, 60, 60, 0.5)'
              : 'rgba(230, 230, 230, 0.5)',
            borderColor: isDarkTheme(currentTheme)
              ? 'rgba(55, 65, 81, 0.4)'
              : 'rgba(229, 231, 235, 0.4)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3
              className="text-lg font-semibold font-dm-sans"
              style={{ color: currentTheme.colors.text }}
            >
              Seleccionar Tema
            </h3>
            <button
              onClick={onClose}
              className="transition-colors duration-200"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Tema Oficial */}
          <div className="mb-6">
            <h4
              className="text-sm font-semibold mb-3 font-dm-sans flex items-center gap-2"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              <span>★</span>
              Tema Oficial
            </h4>
            <div className="flex flex-wrap gap-4 justify-start px-2">
              {themeCategories.official.map((theme) => (
                <ThemeCircle key={theme.name} theme={theme} isOfficial={true} />
              ))}
            </div>
          </div>

          {/* Temas Personalizados */}
          {(themeCategories.custom.light.length > 0 || themeCategories.custom.dark.length > 0) && (
            <div className="mb-6">
              <h4
                className="text-sm font-semibold mb-3 font-dm-sans"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Temas Personalizados
              </h4>

              {/* Modo Claro */}
              {themeCategories.custom.light.length > 0 && (
                <div className="mb-4">
                  <h5
                    className="text-xs font-medium mb-2 font-dm-sans opacity-75"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    Modo Claro
                  </h5>
                  <div className="flex flex-wrap gap-4 justify-start px-2">
                    {themeCategories.custom.light.map((theme) => (
                      <ThemeCircle key={theme.name} theme={theme} />
                    ))}
                  </div>
                </div>
              )}

              {/* Modo Oscuro */}
              {themeCategories.custom.dark.length > 0 && (
                <div className="mb-4">
                  <h5
                    className="text-xs font-medium mb-2 font-dm-sans opacity-75"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    Modo Oscuro
                  </h5>
                  <div className="flex flex-wrap gap-4 justify-start px-2">
                    {themeCategories.custom.dark.map((theme) => (
                      <ThemeCircle key={theme.name} theme={theme} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Selector de tipo de navegación */}
          <div className="mb-6">
            <h4
              className="text-sm font-semibold mb-2 font-dm-sans"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              Navegación
            </h4>
            <div className="flex gap-2 flex-wrap">
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none font-dm-sans"
                style={{
                  backgroundColor: navigationType === 'detailed' ? currentTheme.colors.primary : currentTheme.colors.border,
                  color: navigationType === 'detailed' ? '#ffffff' : currentTheme.colors.text,
                }}
                onClick={() => setNavigationType('detailed')}
              >
                Detallada
              </button>
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none font-dm-sans"
                style={{
                  backgroundColor: navigationType === 'simple' ? currentTheme.colors.primary : currentTheme.colors.border,
                  color: navigationType === 'simple' ? '#ffffff' : currentTheme.colors.text,
                }}
                onClick={() => setNavigationType('simple')}
              >
                Simple
              </button>
            </div>
          </div>

          {/* Footer */}
          <div
            className="pt-4 border-t"
            style={{ borderColor: currentTheme.colors.border }}
          >
            <p
              className="text-sm text-center font-dm-sans"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              El tema y la navegación se aplicarán inmediatamente a toda la aplicación
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeSelector; 
