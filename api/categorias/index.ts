import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL;

interface CategoriaRequest {
    action: string;
    data: {
        establecimiento_id?: number;
        nombre?: string;
        descripcion?: string;
        imagen?: string;
        color?: string;
        orden?: number;
        identificador?: string;
        id?: number;
        status?: boolean;
    };
}

interface CategoriaResponse {
    message?: string;
    id?: number;
    establecimiento_id?: number;
    nombre?: string;
    descripcion?: string;
    imagen?: string;
    color?: string;
    orden?: number;
    status?: boolean;
    identificador?: string;
    created_at?: string;
    updated_at?: string;
}

// Para respuestas que pueden ser arrays o objetos individuales
type CategoriaApiResponse = CategoriaResponse | CategoriaResponse[];

function isAxiosError(error: unknown): error is { response?: { status: number; data: unknown }; message: string } {
    return typeof error === 'object' && error !== null && 'message' in error;
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { action, data } = req.body as CategoriaRequest;

    console.log('action', action);
    console.log('data', data);

    if (!action) {
        return res.status(400).json({ error: 'Action es requerida' });
    }

    // Validar acciones permitidas
    const allowedActions = ['insert-categoria', 'get-categorias', 'update-categoria', 'delete-categoria'];
    if (!allowedActions.includes(action)) {
        return res.status(400).json({ error: 'Action no válida' });
    }

    try {
        const response = await axios.post<CategoriaApiResponse>(`${BACKEND_URL}/categorias`, { action, data }, {
            headers: {
                'Authorization': req.headers.authorization,
                'Content-Type': 'application/json'
            }
        });

        // Asegurar que get-categorias siempre devuelva un array
        if (action === 'get-categorias') {
            const responseData = response.data;
            // Si es un array, devolverlo tal como está
            if (Array.isArray(responseData)) {
                return res.status(response.status).json(responseData);
            }
            // Si es un objeto individual, convertirlo en array
            if (responseData && typeof responseData === 'object' && 'id' in responseData) {
                return res.status(response.status).json([responseData]);
            }
            // Si no hay datos, devolver array vacío
            return res.status(response.status).json([]);
        }

        return res.status(response.status).json(response.data);
    } catch (error: unknown) {
        if (isAxiosError(error) && error.response) {
            return res.status(error.response.status).json(error.response.data);
        }

        console.error('Error en categorias:', error);
        return res.status(500).json({
            error: 'Error interno del servidor',
            details: isAxiosError(error) ? error.message : 'Unknown error'
        });
    }
}
