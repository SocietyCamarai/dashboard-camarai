import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL;

interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    nombre: string;
    apellidos?: string;
    telefono?: string;
    foto?: string;
    empresa_id?: number;
    establecimiento_id?: number;
    rol_id?: number;
  };
}

function isAxiosError(error: unknown): error is { response?: { status: number; data: unknown }; message: string } {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y password son requeridos' });
  }
  
  try {
    const response = await axios.post<LoginResponse>(`${BACKEND_URL}/login`, { email, password });
    const { user, accessToken, refreshToken } = response.data;
    
    if (!user || !accessToken) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Configurar cookie httpOnly y secure para refresh token
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction, // Solo HTTPS en producción
      sameSite: 'strict' as const,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
      path: '/'
    };
    
    // Establecer cookie con refresh token
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; ${Object.entries(cookieOptions)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ')}`);
    
    return res.status(200).json({ 
      user, 
      accessToken 
      // No enviar refreshToken en el body, ya está en cookies
    });
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    
    console.error('Error en login:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor', 
      details: isAxiosError(error) ? error.message : 'Unknown error' 
    });
  }
}