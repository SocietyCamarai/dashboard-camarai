import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL;

interface ProveedorRequest {
    action: string;
    data: {
        empresa_id?: string | number;
        nombre?: string;
        contacto?: string;
        direccion?: string;
        codigo_postal?: string;
        ciudad?: string;
        nif?: string;
        telefono?: string;
        email?: string;
        notas?: string;
        id?: string | number;
    };
}

interface ProveedorResponse {
    message?: string;
    id?: number;
    empresa_id?: number;
    nombre?: string;
    contacto?: string;
    telefono?: string;
    email?: string;
    direccion?: string;
    ciudad?: string;
    codigo_postal?: string;
    nif?: string;
    notas?: string;
    created_at?: string;
    updated_at?: string;
}

function isAxiosError(error: unknown): error is { response?: { status: number; data: unknown }; message: string } {
    return typeof error === 'object' && error !== null && 'message' in error;
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { action, data } = req.body as ProveedorRequest;

    if (!action) {
        return res.status(400).json({ error: 'Action es requerida' });
    }

    // Validar acciones permitidas
    const allowedActions = ['insert-proveedores', 'get-proveedores', 'update-proveedores', 'delete-proveedores'];
    if (!allowedActions.includes(action)) {
        return res.status(400).json({ error: 'Action no válida' });
    }

    try {
        const response = await axios.post<ProveedorResponse>(`${BACKEND_URL}/proveedores`, { action, data }, {
            headers: {
                'Authorization': req.headers.authorization,
                'Content-Type': 'application/json'
            }
        });

        return res.status(response.status).json(response.data);
    } catch (error: unknown) {
        if (isAxiosError(error) && error.response) {
            return res.status(error.response.status).json(error.response.data);
        }

        console.error('Error en proveedores:', error);
        return res.status(500).json({
            error: 'Error interno del servidor',
            details: isAxiosError(error) ? error.message : 'Unknown error'
        });
    }
}
