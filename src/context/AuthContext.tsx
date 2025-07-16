import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import { loginRequest } from '../services/auth';
import type { LoginResponse, User } from '../services/auth';

/**
 * Contexto de autenticación global para la app.
 * Provee el usuario actual, login y logout.
 * El login solo acepta test@demo.com / 123456 como demo.
 */
interface AuthContextType {
  user: null | User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<null | User>(null);

  /**
   * Login demo: solo acepta test@demo.com / 123456
   */
  const login = async (email: string, password: string) => {
    const data: LoginResponse = await loginRequest(email, password);
    setUser(data.user);
    // Aquí puedes guardar el token en localStorage si lo necesitas:
    // localStorage.setItem('token', data.token);
  };

  /**
   * Cierra la sesión del usuario
   */
  const logout = () => setUser(null);
  // localStorage.removeItem('token');

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext }; 