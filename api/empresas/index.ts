import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL;

interface EmpresaRequest {
    action: string;
    data: {
        nombre?: string;
        razon_social?: string;
        nif?: string;
        direccion?: string;
        codigo_postal?: string;
        ciudad?: string;
        provincia?: string;
        pais?: string;
        telefono?: string;
        email?: string;
        sitio_web?: string;
        logo?: string;
        plan_id?: number;
        fecha_inicio_plan?: string;
        fecha_fin_plan?: string;
        estado?: string;
        configuracion?: any;
        foto?: any;
        id?: number;
    };
}

interface EmpresaResponse {
    message?: string;
    id?: number;
    nombre?: string;
    razon_social?: string;
    nif?: string;
    direccion?: string;
    codigo_postal?: string;
    ciudad?: string;
    provincia?: string;
    pais?: string;
    telefono?: string;
    email?: string;
    sitio_web?: string;
    logo?: string;
    plan_id?: number;
    fecha_inicio_plan?: string;
    fecha_fin_plan?: string;
    estado?: string;
    configuracion?: any;
    created_at?: string;
    updated_at?: string;
    foto?: any;
}

function isAxiosError(error: unknown): error is { response?: { status: number; data: unknown }; message: string } {
    return typeof error === 'object' && error !== null && 'message' in error;
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { action, data } = req.body as EmpresaRequest;

    if (!action) {
        return res.status(400).json({ error: 'Action es requerida' });
    }

    // Validar acciones permitidas
    const allowedActions = ['insert-empresa', 'get-empresas', 'update-empresa', 'delete-empresa'];
    if (!allowedActions.includes(action)) {
        return res.status(400).json({ error: 'Action no válida' });
    }

    try {
        const response = await axios.post<EmpresaResponse>(`${BACKEND_URL}/empresas`, { action, data }, {
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

        console.error('Error en empresas:', error);
        return res.status(500).json({
            error: 'Error interno del servidor',
            details: isAxiosError(error) ? error.message : 'Unknown error'
        });
    }
}
