// import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const BACKEND_URL = process.env.BACKEND_URL;

interface ValidateTokenResponse {
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

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token de autorización requerido' });
    }

    const token = authHeader.substring(7); // Remover 'Bearer ' del token

    try {
        // Decodificar el token para obtener el ID del usuario
        const decodedToken = jwt.decode(token) as { id: number; email: string; rol_id: number } | null;

        if (!decodedToken || !decodedToken.id) {
            return res.status(401).json({ error: 'Token inválido o expirado' });
        }

        const response = await axios.post<ValidateTokenResponse>(
            `${BACKEND_URL}/validate-token`,
            { user_id: decodedToken.id },
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

        console.error('Error en validación de token:', error);
        return res.status(500).json({
            error: 'Error interno del servidor',
            details: isAxiosError(error) ? error.message : 'Unknown error'
        });
    }
} 
