import React, { createContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { loginRequest } from '../services/auth';
import type { LoginResponse, User } from '../services/auth';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  user: User;
  exp: number;
  iat: number;
}

/**
 * Contexto de autenticación global para la app.
 * Provee el usuario actual, login y logout.
 * El login solo acepta test@demo.com / 123456 como demo.
 */
interface AuthContextType {
  user: null | User;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch('/api/refresh', {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.accessToken;
  } catch {
    return null;
  }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<null | User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const refreshTimer = useRef<NodeJS.Timeout | null>(null);

  // Limpia el timer al desmontar
  useEffect(() => {
    return () => {
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
    };
  }, []);

  // Programa el refresco automático
  const scheduleRefresh = (exp: number) => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    const now = Date.now();
    const expiresAt = exp * 1000;
    // Refrescar 1 minuto antes de expirar
    const msUntilRefresh = Math.max(expiresAt - now - 60_000, 0);
    refreshTimer.current = setTimeout(async () => {
      const newToken = await refreshAccessToken();
      if (newToken) {
        localStorage.setItem('accessToken', newToken);
        const decoded = jwtDecode<JwtPayload>(newToken);
        setUser(decoded.user);
        scheduleRefresh(decoded.exp);
      } else {
        setUser(null);
        localStorage.removeItem('accessToken');
      }
    }, msUntilRefresh);
  };

  // Restaurar sesión al montar
  useEffect(() => {
    const restoreSession = async () => {
      let accessToken = localStorage.getItem('accessToken');
      let decoded: JwtPayload | null = null;
      if (accessToken) {
        try {
          decoded = jwtDecode<JwtPayload>(accessToken);
          // Verificar expiración
          if (decoded.exp * 1000 < Date.now()) {
            accessToken = null;
          }
        } catch {
          accessToken = null;
        }
      }
      // Solo intentar refresh si hasRefreshToken está presente
      if (!accessToken && localStorage.getItem('hasRefreshToken')) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          localStorage.setItem('accessToken', newToken);
          decoded = jwtDecode<JwtPayload>(newToken);
        }
      }
      if (decoded) {
        setUser(decoded.user);
        scheduleRefresh(decoded.exp);
      } else {
        setUser(null);
        localStorage.removeItem('accessToken');
      }
      setIsLoading(false);
    };
    restoreSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Login demo: solo acepta test@demo.com / 123456
   */
  const login = async (email: string, password: string) => {
    const data: LoginResponse = await loginRequest(email, password);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('hasRefreshToken', '1');
    // Decodificar el accessToken para extraer los datos del usuario
    const decoded = jwtDecode<JwtPayload>(data.accessToken);
    setUser(decoded.user);
    scheduleRefresh(decoded.exp);
    // Puedes guardar el token si lo necesitas:
    // localStorage.setItem('accessToken', data.accessToken);
  };

  /**
   * Cierra la sesión del usuario
   */
  const logout = () => {
    // console.log('[AuthContext] logout called');
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('hasRefreshToken');
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext }; 