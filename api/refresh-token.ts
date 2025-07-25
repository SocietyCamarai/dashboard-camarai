import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { parseCookies } from './_middleware';

const BACKEND_URL = process.env.BACKEND_URL;

interface RefreshTokenResponse {
  accessToken: string;
}

function isAxiosError(error: unknown): error is { response?: { status: number; data: unknown }; message: string } {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Obtener refresh token de cookies
  const cookies = parseCookies(req.headers.cookie);
  const refreshToken = cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: 'Token de refresco requerido' });
  }

  try {
    const response = await axios.post<RefreshTokenResponse>(`${BACKEND_URL}/refresh-token`, { token: refreshToken });
    const { accessToken } = response.data;

    return res.status(200).json({ accessToken });
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    console.error('Error en refresh token:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor', 
      details: isAxiosError(error) ? error.message : 'Unknown error' 
    });
  }
} 