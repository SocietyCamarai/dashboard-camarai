import { useContext } from 'react';
import { RedirectContext } from './RedirectContext';

export const useRedirect = () => {
  const ctx = useContext(RedirectContext);
  if (!ctx) throw new Error('useRedirect debe usarse dentro de RedirectProvider');
  return ctx;
}; 