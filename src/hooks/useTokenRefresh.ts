import { useEffect, useRef } from 'react';
import { useAuth } from './useAuth';

export const useTokenRefresh = () => {
  const { refreshAuth, isAuthenticated } = useAuth();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Solo configurar el refresh si el usuario está autenticado y no se ha inicializado
    if (isAuthenticated && !isInitializedRef.current) {
      isInitializedRef.current = true;
      
      // Esperar 14 minutos antes del primer refresh automático
      // Esto evita hacer una petición inmediata después de la validación inicial
      const timeoutId = setTimeout(() => {
        // Refresh token cada 14 minutos (los tokens expiran en 15 minutos)
        intervalRef.current = setInterval(() => {
          refreshAuth();
        }, 14 * 60 * 1000); // 14 minutos
      }, 14 * 60 * 1000); // 14 minutos

      return () => {
        clearTimeout(timeoutId);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }

    // Si el usuario no está autenticado, resetear el flag
    if (!isAuthenticated) {
      isInitializedRef.current = false;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAuthenticated, refreshAuth]);

  return null;
}; 