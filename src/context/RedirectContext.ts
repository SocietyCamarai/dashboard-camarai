import { createContext } from 'react';
import type { RedirectStatus } from './redirectTypes';

interface RedirectContextType {
  handleRedirect: (status: RedirectStatus) => void;
}

export const RedirectContext = createContext<RedirectContextType | undefined>(undefined); 