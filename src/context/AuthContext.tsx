import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  refreshTokenRequest,
  validateTokenRequest,
  type User,
  type RegisterRequest
} from '../services/auth';
// import { useRedirect } from '../context/useRedirect'; // ELIMINADO

interface AuthContextType {
  user: null | User;
  isLoading: boolean;
  isAuthenticated: boolean;
  needsOnboarding: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  updateUserState: (newUserData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<null | User>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Getter: autenticado si hay user y token
  const isAuthenticated = !!user && !!localStorage.getItem('accessToken');
  const needsOnboarding = !!user && !user.onboardingCompleto;

  // Validar autenticación al montar el componente
  useEffect(() => {
    const validateAuth = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          clearUserData();
          setIsLoading(false);
          return;
        }
        // Intentar validar el token con el backend
        const userData = await validateTokenRequest();
        setUser(userData.user);
      } catch {
        // Token inválido, intentar refresh
        try {
          await refreshTokenRequest();
          // Si el refresh fue exitoso, obtener datos del usuario del token actualizado
          const userData = await validateTokenRequest();
          setUser(userData.user);
        } catch {
          // Si el refresh falla, limpiar todo
          clearUserData();
        }
      } finally {
        setIsLoading(false);
      }
    };
    validateAuth();
  }, []);

  const clearUserData = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await loginRequest(email, password);
      setUser(data.user);
      // No limpiar el usuario si solo necesita onboarding
    } catch (error) {
      // Solo limpiar si el error no es usuario-inactivo
      if (!(error instanceof Error && error.message === 'usuario-inactivo')) {
        clearUserData();
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserState = (newUserData: User) => {
    setUser(newUserData);
  };

  const register = async (userData: RegisterRequest) => {
    setIsLoading(true);
    try {
      await registerRequest(userData);
      // Después del registro exitoso, hacer login automático
      await login(userData.email, userData.password);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutRequest();
      // clearUserData() ya se ejecuta dentro de logoutRequest si es exitoso
    } catch (error) {
      clearUserData();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAuth = async () => {
    try {
      if (!isAuthenticated) {
        clearUserData();
        return;
      }
      await refreshTokenRequest();
    } catch {
      clearUserData();
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated,
      needsOnboarding,
      login,
      register,
      logout,
      refreshAuth,
      updateUserState
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext }; 
