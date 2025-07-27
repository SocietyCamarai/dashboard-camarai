import { useTheme } from './useTheme';

export const useIconColors = (isActive: boolean = false) => {
  const { currentTheme } = useTheme();
  
  return {
    color: isActive ? currentTheme.colors.primary : currentTheme.colors.text,
    hoverColor: currentTheme.colors.primary,
    secondaryColor: currentTheme.colors.textSecondary,
    activeColor: currentTheme.colors.primary,
    inactiveColor: currentTheme.colors.text,
    transition: 'color 0.2s ease-in-out'
  };
}; 