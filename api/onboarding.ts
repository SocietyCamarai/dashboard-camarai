import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL;

interface OnboardingResponse {
  message: string;
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
    estado: string;
  };
  accessToken: string;
  refreshToken: string;
}

function isAxiosError(error: unknown): error is { response?: { status: number; data: unknown }; message: string } {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token de autorización requerido' });
  }
  const token = authHeader.substring(7);

  try {
    const response = await axios.post<OnboardingResponse>(
      `${BACKEND_URL}/api/onboarding`,
      req.body,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return res.status(200).json(response.data);
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    console.error('Error en onboarding:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor', 
      details: isAxiosError(error) ? error.message : 'Unknown error' 
    });
  }
} 