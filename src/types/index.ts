// Database types
export * from './database.types';

// Mockups types
export * from './mockups.types';

// Compatibility types
export * from './compatibility.types';

// Theme types
export type { Theme, ThemeContextType, ThemeCategories } from './theme';
export type { ThemeProviderProps } from './theme/provider';

// Layout types
export type { LayoutProps, SidebarProps } from './layout';

// Navigation types
export type { NavigationType, NavigationContextType } from './navigation';

// Component types
export * from './components';

// Tipos adicionales para componentes
export interface StockAlertProps {
    items?: StockItem[];
    title?: string;
    className?: string;
}

export interface StockItem {
    id: string;
    name: string;
    quantity: number;
    alert: boolean;
    currentStock?: number;
    maxStock?: number;
    unit?: string;
}

// UI types
export type { IconProps } from './ui'; 
