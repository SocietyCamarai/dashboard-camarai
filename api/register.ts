// import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL;

interface RegisterResponse {
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

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { email, password, nombre, apellido, telefono } = req.body || {};

    if (!email || !password || !nombre) {
        return res.status(400).json({ error: 'Email, contraseña y nombre son requeridos' });
    }

    try {
        const response = await axios.post<RegisterResponse>(`${BACKEND_URL}/register`, {
            email,
            password,
            nombre,
            apellido,
            telefono
        }, {
            withCredentials: true // Importante: para recibir cookies del backend
        });

        const { user, accessToken } = response.data;

        if (!user || !accessToken) {
            return res.status(401).json({ error: 'Error en el registro' });
        }

        // Copiar las cookies del backend al frontend
        const setCookieHeader = response.headers['set-cookie'];
        if (setCookieHeader) {
            res.setHeader('Set-Cookie', setCookieHeader);
        }

        return res.status(200).json({
            message: response.data.message,
            user,
            accessToken
        });
    } catch (error: unknown) {
        if (isAxiosError(error) && error.response) {
            return res.status(error.response.status).json(error.response.data);
        }

        console.error('Error en registro:', error);
        return res.status(500).json({
            error: 'Error interno del servidor',
            details: isAxiosError(error) ? error.message : 'Unknown error'
        });
    }
} 
