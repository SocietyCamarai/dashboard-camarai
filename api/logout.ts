import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL;

interface LogoutResponse {
    message: string;
}

function isAxiosError(error: unknown): error is { response?: { status: number; data: unknown }; message: string } {
    return typeof error === 'object' && error !== null && 'message' in error;
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { token } = req.body || {};
    if (!token) {
        return res.status(400).json({ error: 'Token requerido para logout' });
    }

    try {
        const response = await axios.post<LogoutResponse>(`${BACKEND_URL}/logout`, { token }, {
            withCredentials: true // Importante: para enviar cookies al backend
        });

        // Copiar las cookies del backend al frontend (incluyendo la eliminación)
        const setCookieHeader = response.headers['set-cookie'];
        if (setCookieHeader) {
            res.setHeader('Set-Cookie', setCookieHeader);
        }

        return res.status(200).json(response.data);
    } catch (error: unknown) {
        if (isAxiosError(error) && error.response) {
            return res.status(error.response.status).json(error.response.data);
        }

        console.error('Error en logout:', error);
        return res.status(500).json({
            error: 'Error interno del servidor',
            details: isAxiosError(error) ? error.message : 'Unknown error'
        });
    }
} 
