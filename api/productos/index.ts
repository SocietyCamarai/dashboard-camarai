import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL;

interface ProductoRequest {
    action: string;
    data: {
        establecimiento_id?: number;
        categoria_id?: string | number;
        nombre?: string;
        descripcion?: string;
        precio?: number;
        imagen?: string;
        codigo_barras?: string;
        referencia?: string;
        tiempo_preparacion?: number;
        unidad_medida?: string;
        es_elaborado?: boolean;
        impuesto?: number;
        stock?: number;
        stock_minimo?: number;
        control_stock?: boolean;
        disponible_carta?: boolean;
        disponible_delivery?: boolean;
        alergenos?: any;
        opciones?: any;
        identificador?: string;
        id?: number;
        status?: boolean;
    };
}

interface ProductoResponse {
    message?: string;
    id?: number;
    establecimiento_id?: number;
    categoria_id?: string;
    nombre?: string;
    descripcion?: string;
    precio?: number;
    imagen?: string;
    codigo_barras?: string;
    referencia?: string;
    tiempo_preparacion?: number;
    unidad_medida?: string;
    es_elaborado?: boolean;
    impuesto?: number;
    stock?: number;
    stock_minimo?: number;
    control_stock?: boolean;
    disponible_carta?: boolean;
    disponible_delivery?: boolean;
    alergenos?: any;
    opciones?: any;
    status?: boolean;
    identificador?: string;
}

// Para respuestas que pueden ser arrays o objetos individuales
type ProductoApiResponse = ProductoResponse | ProductoResponse[];

function isAxiosError(error: unknown): error is { response?: { status: number; data: unknown }; message: string } {
    return typeof error === 'object' && error !== null && 'message' in error;
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { action, data } = req.body as ProductoRequest;

    console.log('action', action);
    console.log('data', data);

    if (!action) {
        return res.status(400).json({ error: 'Action es requerida' });
    }

    // Validar acciones permitidas
    const allowedActions = ['insert-producto', 'get-productos', 'update-producto', 'delete-producto'];
    if (!allowedActions.includes(action)) {
        return res.status(400).json({ error: 'Action no válida' });
    }

    try {
        const response = await axios.post<ProductoApiResponse>(`${BACKEND_URL}/productos`, { action, data }, {
            headers: {
                'Authorization': req.headers.authorization,
                'Content-Type': 'application/json'
            }
        });

        console.log('Backend response:', response.data);

        // Asegurar que get-productos siempre devuelva un array
        if (action === 'get-productos') {
            const responseData = response.data;
            // Si es un array, devolverlo tal como está
            if (Array.isArray(responseData)) {
                return res.status(response.status).json(responseData);
            }
            // Si es un objeto individual, convertirlo en array
            if (responseData && typeof responseData === 'object' && 'id' in responseData) {
                return res.status(response.status).json([responseData]);
            }
            // console.log('responseData', responseData);
            // Si no hay datos, devolver array vacío
            return res.status(response.status).json([]);
        }

        return res.status(response.status).json(response.data);
    } catch (error: unknown) {
        if (isAxiosError(error) && error.response) {
            return res.status(error.response.status).json(error.response.data);
        }

        console.error('Error en productos:', error);
        return res.status(500).json({
            error: 'Error interno del servidor',
            details: isAxiosError(error) ? error.message : 'Unknown error'
        });
    }
}
