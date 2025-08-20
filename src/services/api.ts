import { refreshTokenRequest, isTokenExpiredError, clearAccessToken } from './auth';

// Interceptor global para manejar errores 401 y refresh automático
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
    });

    failedQueue = [];
};

// Función para crear una petición fetch con interceptor
export const createAuthenticatedRequest = async (
    url: string,
    options: RequestInit = {}
): Promise<Response> => {
    const accessToken = localStorage.getItem('accessToken');

    // Agregar token a headers si existe
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(accessToken && { Authorization: `Bearer ${accessToken}` })
    };

    const response = await fetch(url, {
        ...options,
        headers
    });

    // Si la respuesta es 401, intentar refresh
    if (response.status === 401) {
        const errorData = await response.json();

        // Verificar si es un error de token expirado
        if (isTokenExpiredError(new Error(errorData.message || errorData.error))) {

            if (isRefreshing) {
                // Si ya se está refrescando, agregar a la cola
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => {
                    // Reintentar la petición original con el nuevo token
                    const newToken = localStorage.getItem('accessToken');
                    return fetch(url, {
                        ...options,
                        headers: {
                            ...headers,
                            Authorization: `Bearer ${newToken}`
                        }
                    });
                });
            }

            isRefreshing = true;

            try {
                await refreshTokenRequest();
                processQueue(null);

                // Reintentar la petición original con el nuevo token
                const newToken = localStorage.getItem('accessToken');
                return fetch(url, {
                    ...options,
                    headers: {
                        ...headers,
                        Authorization: `Bearer ${newToken}`
                    }
                });
            } catch (refreshError) {
                processQueue(refreshError as Error);
                clearAccessToken();
                throw refreshError;
            } finally {
                isRefreshing = false;
            }
        }
    }

    return response;
};

// Función helper para peticiones GET autenticadas
export const authenticatedGet = (url: string, options: RequestInit = {}) => {
    return createAuthenticatedRequest(url, {
        method: 'GET',
        ...options
    });
};

// Función helper para peticiones POST autenticadas
export const authenticatedPost = (url: string, data: unknown, options: RequestInit = {}) => {
    return createAuthenticatedRequest(url, {
        method: 'POST',
        body: JSON.stringify(data),
        ...options
    });
};

// Función helper para peticiones PUT autenticadas
export const authenticatedPut = (url: string, data: unknown, options: RequestInit = {}) => {
    return createAuthenticatedRequest(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        ...options
    });
};

// Función helper para peticiones DELETE autenticadas
export const authenticatedDelete = (url: string, options: RequestInit = {}) => {
    return createAuthenticatedRequest(url, {
        method: 'DELETE',
        ...options
    });
};

// ============================================================================
// SERVICIOS PARA ENTIDADES IMPLEMENTADAS
// ============================================================================

// Tipos base para las entidades
interface BaseEntity {
    id?: number;
    created_at?: string;
    updated_at?: string;
}

interface Area extends BaseEntity {
    establecimiento_id: number;
    nombre: string;
    descripcion?: string;
}

interface Empresa extends BaseEntity {
    nombre: string;
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
}

interface Establecimiento extends BaseEntity {
    empresa_id: number;
    nombre: string;
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
    activo?: boolean;
    api_key?: string;
    square_location_id?: string;
}

interface Categoria extends BaseEntity {
    establecimiento_id: number;
    nombre: string;
    descripcion?: string;
    imagen?: string;
    color?: string;
    orden?: number;
    identificador?: string;
    status?: boolean;
}

interface Producto extends BaseEntity {
    establecimiento_id: number;
    categoria_id: string | number;
    nombre: string;
    descripcion?: string;
    precio: number;
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
    status?: boolean;
}

interface Mesa extends BaseEntity {
    establecimiento_id: number;
    area_id: number;
    numero: number;
    capacidad: number;
    estado: string;
    posicion_x?: number;
    posicion_y?: number;
    forma?: string;
    ancho?: number;
    alto?: number;
    codigo_qr?: string;
    url_qr?: string;
    configuracion_whatsapp?: any;
}

interface Proveedor extends BaseEntity {
    empresa_id: number;
    nombre: string;
    contacto?: string;
    direccion?: string;
    codigo_postal?: string;
    ciudad?: string;
    nif?: string;
    telefono?: string;
    email?: string;
    notas?: string;
}

// ============================================================================
// SERVICIOS DE ÁREAS
// ============================================================================

export const areasService = {
    // Obtener todas las áreas de un establecimiento
    getAreas: async (establecimientoId: number): Promise<Area[]> => {
        const response = await authenticatedPost('/api/areas', {
            action: 'get-areas',
            data: { establecimiento_id: establecimientoId }
        });
        return response.json();
    },

    // Crear una nueva área
    createArea: async (areaData: Omit<Area, 'id' | 'created_at' | 'updated_at'>): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/areas', {
            action: 'insert-area',
            data: areaData
        });
        return response.json();
    },

    // Actualizar una área existente
    updateArea: async (id: number, areaData: Partial<Area>): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/areas', {
            action: 'update-area',
            data: { id, ...areaData }
        });
        return response.json();
    },

    // Eliminar una área
    deleteArea: async (id: number): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/areas', {
            action: 'delete-area',
            data: { id }
        });
        return response.json();
    }
};

// ============================================================================
// SERVICIOS DE EMPRESAS
// ============================================================================

export const empresasService = {
    // Obtener todas las empresas
    getEmpresas: async (): Promise<Empresa[]> => {
        const response = await authenticatedPost('/api/empresas', {
            action: 'get-empresas'
        });
        return response.json();
    },

    // Crear una nueva empresa
    createEmpresa: async (empresaData: Omit<Empresa, 'id' | 'created_at' | 'updated_at'>): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/empresas', {
            action: 'insert-empresa',
            data: empresaData
        });
        return response.json();
    },

    // Actualizar una empresa existente
    updateEmpresa: async (id: number, empresaData: Partial<Empresa>): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/empresas', {
            action: 'update-empresa',
            data: { id, ...empresaData }
        });
        return response.json();
    },

    // Eliminar una empresa
    deleteEmpresa: async (id: number): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/empresas', {
            action: 'delete-empresa',
            data: { id }
        });
        return response.json();
    }
};

// ============================================================================
// SERVICIOS DE ESTABLECIMIENTOS
// ============================================================================

export const establecimientosService = {
    // Obtener establecimientos de una empresa
    getEstablecimientos: async (empresaId: number): Promise<Establecimiento[]> => {
        const response = await authenticatedPost('/api/establecimientos', {
            action: 'get-establecimiento',
            data: { empresa_id: empresaId }
        });
        return response.json();
    },

    // Crear un nuevo establecimiento
    createEstablecimiento: async (establecimientoData: Omit<Establecimiento, 'id' | 'created_at' | 'updated_at'>): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/establecimientos', {
            action: 'insert-establecimiento',
            data: establecimientoData
        });
        return response.json();
    },

    // Actualizar un establecimiento existente
    updateEstablecimiento: async (id: number, establecimientoData: Partial<Establecimiento>): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/establecimientos', {
            action: 'modify-establecimiento',
            data: { id, ...establecimientoData }
        });
        return response.json();
    },

    // Eliminar un establecimiento
    deleteEstablecimiento: async (id: number): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/establecimientos', {
            action: 'delete-establecimiento',
            data: { id }
        });
        return response.json();
    }
};

// ============================================================================
// SERVICIOS DE CATEGORÍAS
// ============================================================================

export const categoriasService = {
    // Obtener categorías de un establecimiento
    getCategorias: async (establecimientoId: number): Promise<Categoria[]> => {
        const response = await authenticatedPost('/api/categorias', {
            action: 'get-categorias',
            data: { establecimiento_id: establecimientoId }
        });
        return response.json();
    },

    // Crear una nueva categoría
    createCategoria: async (categoriaData: Omit<Categoria, 'id' | 'created_at' | 'updated_at'>): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/categorias', {
            action: 'insert-categoria',
            data: categoriaData
        });
        return response.json();
    },

    // Actualizar una categoría existente
    updateCategoria: async (id: number, categoriaData: Partial<Categoria>): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/categorias', {
            action: 'update-categoria',
            data: { id, ...categoriaData }
        });
        return response.json();
    },

    // Eliminar una categoría
    deleteCategoria: async (id: number): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/categorias', {
            action: 'delete-categoria',
            data: { id }
        });
        return response.json();
    }
};

// ============================================================================
// SERVICIOS DE PRODUCTOS
// ============================================================================

export const productosService = {
    // Obtener productos de un establecimiento
    getProductos: async (establecimientoId: number, categoriaId?: string | number): Promise<Producto[]> => {
        const response = await authenticatedPost('/api/productos', {
            action: 'get-productos',
            data: {
                establecimiento_id: establecimientoId,
                ...(categoriaId && { categoria_id: categoriaId })
            }
        });
        return response.json();
    },

    // Crear un nuevo producto
    createProducto: async (productoData: Omit<Producto, 'id' | 'created_at' | 'updated_at'>): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/productos', {
            action: 'insert-producto',
            data: productoData
        });
        return response.json();
    },

    // Actualizar un producto existente
    updateProducto: async (id: number, productoData: Partial<Producto>): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/productos', {
            action: 'update-producto',
            data: { id, ...productoData }
        });
        return response.json();
    },

    // Eliminar un producto
    deleteProducto: async (id: number): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/productos', {
            action: 'delete-producto',
            data: { id }
        });
        return response.json();
    }
};

// ============================================================================
// SERVICIOS DE MESAS
// ============================================================================

export const mesasService = {
    // Obtener mesas de un establecimiento
    getMesas: async (establecimientoId: number): Promise<Mesa[]> => {
        console.log('getMesas', establecimientoId);
        const response = await authenticatedPost('/api/mesas', {
            action: 'get-mesas',
            data: { establecimiento_id: establecimientoId }
        });
        return response.json();
    },

    // Crear una nueva mesa
    createMesa: async (mesaData: Omit<Mesa, 'id' | 'created_at' | 'updated_at'>): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/mesas', {
            action: 'insert-mesa',
            data: mesaData
        });
        return response.json();
    },

    // Actualizar una mesa existente
    updateMesa: async (id: number, mesaData: Partial<Mesa>): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/mesas', {
            action: 'update-mesa',
            data: { id, ...mesaData }
        });
        return response.json();
    },

    // Eliminar una mesa
    deleteMesa: async (id: number): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/mesas', {
            action: 'delete-mesa',
            data: { id }
        });
        return response.json();
    }
};

// ============================================================================
// SERVICIOS DE PROVEEDORES
// ============================================================================

export const proveedoresService = {
    // Obtener proveedores de una empresa
    getProveedores: async (empresaId: number): Promise<Proveedor[]> => {
        const response = await authenticatedPost('/api/proveedores', {
            action: 'get-proveedores',
            data: { empresa_id: empresaId }
        });
        return response.json();
    },

    // Crear un nuevo proveedor
    createProveedor: async (proveedorData: Omit<Proveedor, 'id' | 'created_at' | 'updated_at'>): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/proveedores', {
            action: 'insert-proveedores',
            data: proveedorData
        });
        return response.json();
    },

    // Actualizar un proveedor existente
    updateProveedor: async (id: number, proveedorData: Partial<Proveedor>): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/proveedores', {
            action: 'update-proveedores',
            data: { id, ...proveedorData }
        });
        return response.json();
    },

    // Eliminar un proveedor
    deleteProveedor: async (id: number): Promise<{ message: string }> => {
        const response = await authenticatedPost('/api/proveedores', {
            action: 'delete-proveedores',
            data: { id }
        });
        return response.json();
    }
};
