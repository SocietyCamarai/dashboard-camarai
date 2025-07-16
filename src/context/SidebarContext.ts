import { createContext } from 'react';
import type { SidebarContextType } from './SidebarContextDef';

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined); 