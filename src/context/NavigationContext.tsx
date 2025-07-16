import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { NavigationContext } from './NavigationContextDef';
import type { NavigationContextType } from '../types/navigation';

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [navigationType, setNavigationType] = useState<NavigationContextType['navigationType']>('detailed');

  return (
    <NavigationContext.Provider value={{ navigationType, setNavigationType }}>
      {children}
    </NavigationContext.Provider>
  );
}; 