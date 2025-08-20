import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL;

interface MesaRequest {
    action: string;
    data: {
        establecimiento_id?: number;
        area_id?: number;
        numero?: number;
        capacidad?: number;
        estado?: string;
        posicion_x?: number;
        posicion_y?: number;
        forma?: string;
        ancho?: number;
        alto?: number;
        codigo_qr?: string;
        url_qr?: string;
        configuracion_whatsapp?: any;
        id?: number;
    };
}

interface MesaResponse {
    message?: string;
    id?: number;
    establecimiento_id?: number;
    area_id?: number;
    numero?: number;
    capacidad?: number;
    estado?: string;
    posicion_x?: number;
    posicion_y?: number;
    forma?: string;
    ancho?: number;
    alto?: number;
    codigo_qr?: string;
    url_qr?: string;
    configuracion_whatsapp?: any;
}

function isAxiosError(error: unknown): error is { response?: { status: number; data: unknown }; message: string } {
    return typeof error === 'object' && error !== null && 'message' in error;
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { action, data } = req.body as MesaRequest;

    if (!action) {
        return res.status(400).json({ error: 'Action es requerida' });
    }

    // Validar acciones permitidas
    const allowedActions = ['insert-mesa', 'get-mesas', 'update-mesa', 'delete-mesa'];
    if (!allowedActions.includes(action)) {
        return res.status(400).json({ error: 'Action no válida' });
    }

    try {
        const response = await axios.post<MesaResponse>(`${BACKEND_URL}/mesas`, { action, data }, {
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

        console.error('Error en mesas:', error);
        return res.status(500).json({
            error: 'Error interno del servidor',
            details: isAxiosError(error) ? error.message : 'Unknown error'
        });
    }
}
