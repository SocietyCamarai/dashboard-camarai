export type NavigationType = 'simple' | 'detailed';

export interface NavigationContextType {
  navigationType: NavigationType;
  setNavigationType: (type: NavigationType) => void;
} 