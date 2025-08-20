export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    primaryRgb?: string;
    primaryDark?: string;
    primaryLight?: string;
    background: string;
    sidebar: string;
    text: string;
    textSecondary: string;
    border: string;
    white?: string;
    error?: string;
    success?: string;
    inputBackgroundDark?: string;
    inputBorderDark?: string;
    cardBackgroundDark?: string;
    cardForeground?: string;
  };
}

export interface ThemeCategories {
  official: Theme[];
  custom: {
    light: Theme[];
    dark: Theme[];
  };
}

// Helper function to detect if a theme is dark
export const isDarkTheme = (theme: Theme): boolean => {
  // Convert hex to RGB and calculate luminance
  const hex = theme.colors.background.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Theme is dark if luminance is less than 0.5
  return luminance < 0.5;
};

export interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeName: string) => void;
  themeCategories: ThemeCategories;
  getAllThemes: () => Theme[];
  isDarkTheme: (theme: Theme) => boolean;
  getButtonTextColor: (theme: Theme) => string;
} 
