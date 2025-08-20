import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL;

interface EstablecimientoRequest {
    action: string;
    data: {
        empresa_id?: string | number;
        nombre?: string;
        tipo?: string;
        direccion?: string;
        codigo_postal?: string;
        ciudad?: string;
        provincia?: string;
        pais?: string;
        telefono?: string;
        email?: string;
        imagen?: string;
        coordenadas?: string;
        status?: boolean;
        api_key?: string;
        square_location_id?: string;
        id?: string | number;
    };
}

interface EstablecimientoResponse {
    message?: string;
    id?: number;
    empresa_id?: number;
    nombre?: string;
    tipo?: string;
    direccion?: string;
    codigo_postal?: string;
    ciudad?: string;
    provincia?: string;
    pais?: string;
    telefono?: string;
    email?: string;
    horario?: any;
    imagen?: string;
    coordenadas?: string;
    activo?: boolean;
    created_at?: string;
    updated_at?: string;
    api_key?: string;
    square_location_id?: string;
}

function isAxiosError(error: unknown): error is { response?: { status: number; data: unknown }; message: string } {
    return typeof error === 'object' && error !== null && 'message' in error;
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { action, data } = req.body as EstablecimientoRequest;

    if (!action) {
        return res.status(400).json({ error: 'Action es requerida' });
    }

    // Validar acciones permitidas
    const allowedActions = ['insert-establecimiento', 'get-establecimiento', 'modify-establecimiento', 'delete-establecimiento'];
    if (!allowedActions.includes(action)) {
        return res.status(400).json({ error: 'Action no válida' });
    }

    try {
        const response = await axios.post<EstablecimientoResponse>(`${BACKEND_URL}/establecimientos`, { action, data }, {
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

        console.error('Error en establecimientos:', error);
        return res.status(500).json({
            error: 'Error interno del servidor',
            details: isAxiosError(error) ? error.message : 'Unknown error'
        });
    }
}
