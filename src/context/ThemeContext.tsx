import React, { useState } from 'react';
import { ThemeContext } from './ThemeContextDef';
import type { Theme, ThemeProviderProps, ThemeCategories } from '../types';
import { isDarkTheme } from '../types/theme/theme';

// Tema oficial modo claro
const officialLightTheme: Theme = {
  name: 'camarai',
  colors: {
    primary: '#554696',
    secondary: '#443775',
    primaryRgb: '85, 70, 150',
    primaryDark: '#443775',
    primaryLight: '#6657b8',
    background: '#f9fafb',
    sidebar: '#f3f4f6',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    white: '#ffffff',
    error: '#ef4444',
    success: '#10b981',
    inputBackgroundDark: '#374151',
    inputBorderDark: '#4b5563',
    cardBackgroundDark: '#1f2937',
  },
};

// Tema oficial modo oscuro
const officialDarkTheme: Theme = {
  name: 'camarai-dark',
  colors: {
    primary: '#6657b8',
    secondary: '#554696',
    primaryRgb: '102, 87, 184',
    primaryDark: '#554696',
    primaryLight: '#7c6bc8',
    background: '#111827',
    sidebar: '#1f2937',
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    border: '#374151',
    white: '#ffffff',
    error: '#ef4444',
    success: '#10b981',
    inputBackgroundDark: '#374151',
    inputBorderDark: '#4b5563',
    cardBackgroundDark: '#1f2937',
  },
};

// Temas personalizados modo claro
const lightThemes: Theme[] = [
  {
    name: 'blue',
    colors: {
      primary: '#3b82f6',
      secondary: '#1e40af',
      background: '#ffffff',
      sidebar: '#f8fafc',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      white: '#ffffff',
      error: '#ef4444',
      success: '#10b981',
    },
  },
  {
    name: 'purple',
    colors: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      background: '#ffffff',
      sidebar: '#faf5ff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      white: '#ffffff',
      error: '#ef4444',
      success: '#10b981',
    },
  },
];

// Temas personalizados modo oscuro
const darkThemes: Theme[] = [
  {
    name: 'dark',
    colors: {
      primary: '#60a5fa',
      secondary: '#3b82f6',
      background: '#111827',
      sidebar: '#1f2937',
      text: '#f9fafb',
      textSecondary: '#d1d5db',
      border: '#374151',
      white: '#ffffff',
      error: '#ef4444',
      success: '#10b981',
    },
  },
];

// Estructura categorizada de temas
const themeCategories: ThemeCategories = {
  official: [officialLightTheme, officialDarkTheme], // Ambos temas oficiales
  custom: {
    light: lightThemes,
    dark: darkThemes,
  },
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(officialLightTheme);

  // Función helper para obtener el color del texto en botones
  const getButtonTextColor = (theme: Theme): string => {
    return theme.colors.white || '#ffffff';
  };

  const setTheme = (themeName: string) => {
    // Buscar en tema oficial (claro y oscuro)
    if (themeName === officialLightTheme.name) {
      setCurrentTheme(officialLightTheme);
      return;
    }
    if (themeName === officialDarkTheme.name) {
      setCurrentTheme(officialDarkTheme);
      return;
    }

    // Buscar en temas personalizados modo claro
    const lightTheme = lightThemes.find(t => t.name === themeName);
    if (lightTheme) {
      setCurrentTheme(lightTheme);
      return;
    }

    // Buscar en temas personalizados modo oscuro
    const darkTheme = darkThemes.find(t => t.name === themeName);
    if (darkTheme) {
      setCurrentTheme(darkTheme);
      return;
    }
  };

  const getAllThemes = (): Theme[] => {
    return [officialLightTheme, officialDarkTheme, ...lightThemes, ...darkThemes];
  };

    return (
    <ThemeContext.Provider value={{
      currentTheme,
      setTheme,
      themeCategories,
      getAllThemes,
      isDarkTheme,
      getButtonTextColor
    }}>
      {children}
    </ThemeContext.Provider>
  );
}; 