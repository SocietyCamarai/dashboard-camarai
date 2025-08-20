/**
 * Interfaces TypeScript generadas automáticamente desde bbdd-inmutable(NOEDITAR).sql
 * Mapeo de tipos SQL → TypeScript:
 * - INTEGER, BIGINT, SMALLINT → number
 * - VARCHAR, TEXT, CHAR → string
 * - DATE, TIMESTAMP → string
 * - BOOLEAN → boolean
 * - NUMERIC, DECIMAL → number
 * - JSONB, JSON → any
 * - UUID → string
 * - ENUM → string
 */

// ============================================================================
// TIPOS ESPECÍFICOS PARA CAMPOS JSONB/JSON
// ============================================================================

// Preferencias de WhatsApp para clientes
export interface PreferenciasWhatsApp {
    notificaciones?: boolean;
    horario_preferido?: string;
    idioma?: string;
    recordatorios?: boolean;
    [key: string]: unknown;
}

// Opciones de productos/pedidos
export interface OpcionesProducto {
    personalizaciones?: string[];
    extras?: Array<{
        id: number;
        nombre: string;
        precio: number;
    }>;
    instrucciones_especiales?: string;
    [key: string]: unknown;
}

// Configuración de empresas/establecimientos
export interface ConfiguracionEmpresa {
    tema?: string;
    moneda?: string;
    idioma?: string;
    zona_horaria?: string;
    configuracion_impresora?: {
        tipo?: string;
        puerto?: string;
        configuracion?: Record<string, unknown>;
    };
    [key: string]: unknown;
}

// Datos de foto/imagen
export interface DatosFoto {
    url?: string;
    nombre_archivo?: string;
    tipo_mime?: string;
    tamaño?: number;
    dimensiones?: {
        ancho: number;
        alto: number;
    };
    [key: string]: unknown;
}

// Horario de establecimiento
export interface HorarioEstablecimiento {
    lunes?: { apertura: string; cierre: string; cerrado?: boolean };
    martes?: { apertura: string; cierre: string; cerrado?: boolean };
    miercoles?: { apertura: string; cierre: string; cerrado?: boolean };
    jueves?: { apertura: string; cierre: string; cerrado?: boolean };
    viernes?: { apertura: string; cierre: string; cerrado?: boolean };
    sabado?: { apertura: string; cierre: string; cerrado?: boolean };
    domingo?: { apertura: string; cierre: string; cerrado?: boolean };
    [key: string]: unknown;
}

// Coordenadas geográficas
export interface Coordenadas {
    latitud: number;
    longitud: number;
    precision?: number;
    [key: string]: unknown;
}

// Datos de estadísticas
export interface DatosEstadisticas {
    metricas?: Record<string, number>;
    periodos?: Array<{
        fecha: string;
        valor: number;
    }>;
    [key: string]: unknown;
}

// Datos de cliente para pedidos
export interface DatosCliente {
    nombre?: string;
    telefono?: string;
    email?: string;
    direccion?: string;
    [key: string]: unknown;
}

// Configuración de WhatsApp
export interface ConfiguracionWhatsApp {
    numero_telefono?: string;
    token?: string;
    webhook_url?: string;
    configuracion_mensajes?: Record<string, string>;
    [key: string]: unknown;
}

// Datos de auditoría
export interface DatosAuditoria {
    campo?: string;
    valor_anterior?: unknown;
    valor_nuevo?: unknown;
    [key: string]: unknown;
}

// Datos de pedido para integraciones
export interface DatosPedido {
    items?: Array<{
        producto_id: string;
        cantidad: number;
        precio: number;
    }>;
    total?: number;
    [key: string]: unknown;
}

// Características de productos
export interface CaracteristicasProducto {
    peso?: number;
    dimensiones?: {
        largo: number;
        ancho: number;
        alto: number;
    };
    ingredientes?: string[];
    [key: string]: unknown;
}

// Alergenos de productos
export interface AlergenosProducto {
    gluten?: boolean;
    lactosa?: boolean;
    frutos_secos?: boolean;
    mariscos?: boolean;
    huevos?: boolean;
    soja?: boolean;
    [key: string]: boolean | undefined;
}

// Permisos de roles
export interface PermisosRol {
    modulos?: string[];
    acciones?: Record<string, boolean>;
    [key: string]: unknown;
}

// Lista de clientes
export interface ListaClientes {
    clientes?: number[];
    grupos?: string[];
    [key: string]: unknown;
}

// ============================================================================
// INTERFACES PRINCIPALES (ACTUALIZADAS)
// ============================================================================

export interface IArea {
    id: number;
    establecimiento_id: number; /** @foreignKey references establecimientos.id */
    nombre: string;
    descripcion?: string | null;
    activo: boolean;
    created_at: string;
    updated_at: string;
}

export interface IArqueoCaja {
    id: number;
    establecimiento_id: number; /** @foreignKey references establecimientos.id */
    usuario_id: number; /** @foreignKey references usuarios.id */
    fecha_apertura: string;
    fecha_cierre?: string;
    saldo_inicial: number;
    ventas_efectivo?: number;
    ventas_tarjeta?: number;
    ventas_otros?: number;
    gastos?: number;
    retiradas?: number;
    ingresos?: number;
    saldo_final_calculado?: number;
    saldo_final_real?: number;
    diferencia?: number;
    estado: 'abierta' | 'cerrada';
    notas?: string;
    created_at: string;
    updated_at: string;
}

export interface IAuditoriaCambiosPago {
    id: number;
    pedido_id: number; /** @foreignKey references pedidos.id */
    tipo_anterior?: 'individual' | 'compartido' | 'dividido';
    tipo_nuevo?: 'individual' | 'compartido' | 'dividido';
    usuario_id?: number; /** @foreignKey references usuarios.id */
    fecha_cambio: string;
    motivo?: string;
}

export interface ICategoria {
    id: number;
    establecimiento_id: number; /** @foreignKey references establecimientos.id */
    nombre: string;
    descripcion?: string;
    imagen?: string;
    color?: string;
    orden?: number;
    activo: boolean;
    created_at: string;
    updated_at: string;
    identificador?: string;
}

export interface ICategoriaIdioma {
    id: string;
    idioma_id: string; /** @foreignKey references idiomas.id */
    categoria_id: string;
    categoria_nombre: string;
}

export interface ICliente {
    id: number;
    establecimiento_id: number; /** @foreignKey references establecimientos.id */
    nombre: string;
    apellidos?: string;
    email?: string;
    telefono?: string;
    direccion?: string;
    codigo_postal?: string;
    ciudad?: string;
    notas?: string;
    fecha_nacimiento?: string;
    nif?: string;
    created_at: string;
    updated_at: string;
    ultima_actividad_whatsapp?: string;
    preferencias_whatsapp?: PreferenciasWhatsApp;
}

export interface ICompra {
    id: number;
    establecimiento_id: number; /** @foreignKey references establecimientos.id */
    proveedor_id: number; /** @foreignKey references proveedores.id */
    usuario_id?: number; /** @foreignKey references usuarios.id */
    fecha_compra: string;
    numero_factura?: string;
    subtotal: number;
    impuestos?: number;
    total: number;
    estado: 'pendiente' | 'en_proceso' | 'completado' | 'cancelado';
    notas?: string;
    created_at: string;
    updated_at: string;
}

export interface IConfiguracion {
    id: number;
    clave: string;
    valor?: string;
    descripcion?: string;
    tipo: 'global' | 'empresa' | 'establecimiento';
    referencia_id?: number;
    created_at: string;
    updated_at: string;
}

export interface IDetalleCompra {
    id: number;
    compra_id: number; /** @foreignKey references compras.id */
    producto_id: number; /** @foreignKey references productos.id */
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
    impuesto?: number;
    total: number;
    created_at: string;
    updated_at: string;
}

export interface IDetalleFactura {
    id: number;
    factura_id: number; /** @foreignKey references facturas.id */
    producto_id?: number; /** @foreignKey references productos.id */
    descripcion: string;
    cantidad: number;
    precio_unitario: number;
    descuento?: number;
    impuesto?: number;
    porcentaje_impuesto?: number;
    subtotal: number;
    total: number;
    created_at: string;
}

export interface IDetallePedido {
    id: number;
    pedido_id: number; /** @foreignKey references pedidos.id */
    producto_id: string;
    variante_id?: number; /** @foreignKey references variantes_producto.id */
    cantidad: number;
    precio_unitario: number;
    descuento?: number;
    impuesto?: number;
    subtotal?: number;
    total: number;
    estado: 'pendiente' | 'en_preparacion' | 'listo' | 'entregado' | 'cancelado';
    notas?: string;
    opciones?: OpcionesProducto;
    created_at: string;
    updated_at: string;
    cliente_id?: number; /** @foreignKey references clientes.id */
    estado_pago: 'pendiente' | 'en_proceso' | 'completado' | 'cancelado';
    metodo_pago?: 'efectivo' | 'tarjeta' | 'transferencia' | 'online' | 'otro';
    fecha_pago?: string;
}

export interface IEmpresa {
    id: number;
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
    plan_id?: number; /** @foreignKey references planes.id */
    fecha_inicio_plan?: string;
    fecha_fin_plan?: string;
    estado: 'activo' | 'inactivo' | 'suspendido' | 'prueba';
    configuracion?: ConfiguracionEmpresa;
    created_at: string;
    updated_at: string;
    foto?: DatosFoto;
}

export interface IEstablecimiento {
    id: number;
    empresa_id: number; /** @foreignKey references empresas.id */
    nombre: string;
    tipo: 'restaurante' | 'bar' | 'cafeteria' | 'pizzeria' | 'hamburgueseria' | 'pub' | 'discoteca' | 'heladeria' | 'hotel' | 'chiringuito' | 'otro';
    direccion?: string;
    codigo_postal?: string;
    ciudad?: string;
    provincia?: string;
    pais?: string;
    telefono?: string;
    email?: string;
    horario?: HorarioEstablecimiento;
    imagen?: string;
    coordenadas?: Coordenadas;
    activo: boolean;
    created_at: string;
    updated_at: string;
    api_key?: string;
    square_location_id?: string;
}

export interface IEstadistica {
    id: number;
    establecimiento_id: number; /** @foreignKey references establecimientos.id */
    fecha: string;
    tipo: 'ventas' | 'productos' | 'mesas' | 'clientes' | 'horas';
    datos: DatosEstadisticas;
    created_at: string;
    updated_at: string;
}

export interface IFactura {
    id: number;
    establecimiento_id: number; /** @foreignKey references establecimientos.id */
    pedido_id?: number; /** @foreignKey references pedidos.id */
    cliente_id?: number; /** @foreignKey references clientes.id */
    usuario_id?: number; /** @foreignKey references usuarios.id */
    numero: string;
    serie?: string;
    fecha: string;
    subtotal: number;
    descuento?: number;
    impuestos?: number;
    total: number;
    estado: 'emitida' | 'pagada' | 'anulada';
    notas?: string;
    metodo_pago: 'efectivo' | 'tarjeta' | 'transferencia' | 'online' | 'otro';
    datos_cliente?: DatosCliente;
    pdf_url?: string;
    tipo: 'simplificada' | 'completa' | 'rectificativa';
    created_at: string;
    updated_at: string;
}

export interface IIdioma {
    id: string;
    idioma_siglas?: string;
    idioma_nombre?: string;
}

export interface IImpuesto {
    id: number;
    empresa_id: number; /** @foreignKey references empresas.id */
    nombre: string;
    porcentaje: number;
    activo: boolean;
    created_at: string;
    updated_at: string;
}

export interface IIntegracion {
    id: number;
    empresa_id: number; /** @foreignKey references empresas.id */
    tipo: 'uber_eats' | 'glovo' | 'just_eat' | 'deliveroo' | 'tpv' | 'contabilidad' | 'otro';
    nombre: string;
    configuracion?: ConfiguracionEmpresa;
    activo: boolean;
    created_at: string;
    updated_at: string;
}

export interface ILog {
    id: number;
    usuario_id?: number; /** @foreignKey references usuarios.id */
    accion: string;
    tabla?: string;
    registro_id?: number;
    datos_anteriores?: DatosAuditoria;
    datos_nuevos?: DatosAuditoria;
    ip?: string;
    fecha: string;
}

export interface IMesa {
    id: number;
    establecimiento_id: number; /** @foreignKey references establecimientos.id */
    area_id?: number; /** @foreignKey references areas.id */
    numero: string;
    capacidad?: number;
    estado: 'libre' | 'ocupada' | 'reservada' | 'mantenimiento';
    posicion_x?: number;
    posicion_y?: number;
    forma: 'redonda' | 'cuadrada' | 'rectangular';
    ancho?: number;
    alto?: number;
    codigo_qr?: string;
    activo: boolean;
    created_at: string;
    updated_at: string;
    url_qr?: string;
    configuracion_whatsapp?: ConfiguracionWhatsApp;
}

export interface INotificacion {
    id: number;
    usuario_id: number; /** @foreignKey references usuarios.id */
    titulo: string;
    mensaje: string;
    tipo: 'info' | 'warning' | 'error' | 'success';
    leida: boolean;
    fecha: string;
    datos?: DatosEstadisticas;
    created_at: string;
}

export interface IPago {
    id: number;
    pedido_id: number; /** @foreignKey references pedidos.id */
    usuario_id?: number; /** @foreignKey references usuarios.id */
    monto: number;
    metodo: 'efectivo' | 'tarjeta' | 'transferencia' | 'online' | 'otro';
    referencia?: string;
    estado: 'pendiente' | 'en_proceso' | 'completado' | 'cancelado';
    fecha_pago: string;
    notas?: string;
    created_at: string;
    updated_at: string;
}

export interface IPedido {
    id: number;
    establecimiento_id: number; /** @foreignKey references establecimientos.id */
    mesa_id?: number; /** @foreignKey references mesas.id */
    cliente_id?: number; /** @foreignKey references clientes.id */
    usuario_id?: number; /** @foreignKey references usuarios.id */
    tipo: 'mesa' | 'barra' | 'delivery' | 'takeaway' | 'web' | 'whatsapp' | 'telegram';
    estado: 'pendiente' | 'en_proceso' | 'completado' | 'cancelado';
    fecha_pedido: string;
    fecha_entrega?: string;
    direccion_entrega?: string;
    codigo_postal_entrega?: string;
    ciudad_entrega?: string;
    telefono_entrega?: string;
    notas?: string;
    subtotal: number;
    descuento?: number;
    impuestos?: number;
    total: number;
    metodo_pago: 'efectivo' | 'tarjeta' | 'transferencia' | 'online' | 'otro';
    pagado: boolean;
    codigo_seguimiento?: string;
    created_at: string;
    updated_at: string;
    origen_whatsapp: boolean;
    sesion_mesa_id?: number; /** @foreignKey references sesiones_mesa.id */
    tipo_pago_final: 'individual' | 'compartido' | 'dividido';
    fecha_cierre?: string;
}

export interface IPedidoIntegracion {
    id: number;
    establecimiento_id: number; /** @foreignKey references establecimientos.id */
    integracion_id: number; /** @foreignKey references integraciones.id */
    pedido_id?: number; /** @foreignKey references pedidos.id */
    id_externo?: string;
    datos_pedido?: DatosPedido;
    estado: 'recibido' | 'aceptado' | 'rechazado' | 'preparando' | 'listo' | 'entregado' | 'cancelado';
    created_at: string;
    updated_at: string;
}

export interface IPermiso {
    id: number;
    nombre: string;
    slug: string;
    descripcion?: string;
    modulo: string;
    created_at: string;
    updated_at: string;
}

export interface IPlan {
    id: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    periodo: 'mensual' | 'trimestral' | 'anual';
    max_usuarios: number;
    max_establecimientos: number;
    activo: boolean;
    caracteristicas?: CaracteristicasProducto;
    created_at: string;
    updated_at: string;
}

export interface IProducto {
    id: number;
    establecimiento_id: number; /** @foreignKey references establecimientos.id */
    categoria_id?: string;
    nombre: string;
    descripcion?: string;
    precio: number;
    imagen?: string;
    codigo_barras?: string;
    referencia?: string;
    tiempo_preparacion?: number;
    unidad_medida?: string;
    es_elaborado: boolean;
    impuesto?: number;
    stock?: number;
    stock_minimo?: number;
    control_stock: boolean;
    disponible_carta: boolean;
    disponible_delivery: boolean;
    alergenos?: AlergenosProducto;
    opciones?: OpcionesProducto;
    activo: boolean;
    created_at: string;
    updated_at: string;
    identificador: string;
}

export interface IProductoIdioma {
    id: string;
    producto_id: string;
    idioma_id: string; /** @foreignKey references idiomas.id */
    producto_nombre?: string;
    producto_descripcion?: string;
    variacion_nombre?: string;
    categoria_id?: string;
}

export interface IProveedor {
    id: number;
    empresa_id: number; /** @foreignKey references empresas.id */
    nombre: string;
    contacto?: string;
    telefono?: string;
    email?: string;
    direccion?: string;
    ciudad?: string;
    codigo_postal?: string;
    nif?: string;
    notas?: string;
    created_at: string;
    updated_at: string;
}

export interface IRol {
    id: number;
    nombre: string;
    descripcion?: string;
    permisos?: PermisosRol;
    created_at: string;
    updated_at: string;
}

export interface IRolPermiso {
    rol_id: number; /** @foreignKey references roles.id */
    permiso_id: number; /** @foreignKey references permisos.id */
    created_at: string;
}

export interface IRolUsuario {
    id: number;
    usuario_id: number; /** @foreignKey references usuarios.id */
    empresa_id?: number; /** @foreignKey references empresas.id */
    establecimiento_id?: number; /** @foreignKey references establecimientos.id */
    rol_id: number; /** @foreignKey references roles.id */
    status: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
}

export interface ISesionMesa {
    id: number;
    mesa_id: number; /** @foreignKey references mesas.id */
    codigo_sesion: string;
    estado: 'activa' | 'cerrada';
    fecha_inicio: string;
    fecha_cierre?: string;
    clientes?: ListaClientes;
    created_at: string;
    updated_at: string;
    api_key: string;
    mesa_numero?: number;
}

export interface ITurno {
    id: number;
    establecimiento_id: number; /** @foreignKey references establecimientos.id */
    nombre: string;
    hora_inicio: string;
    hora_fin: string;
    dias_semana: string[];
    activo: boolean;
    created_at: string;
    updated_at: string;
}

export interface IUsuario {
    id: number;
    email?: string;
    password?: string;
    nombre: string;
    apellidos?: string;
    telefono: string;
    foto?: string;
    empresa_id?: number; /** @foreignKey references empresas.id */
    establecimiento_id?: number; /** @foreignKey references establecimientos.id */
    ultimo_login?: string;
    pin?: string;
    token_reset?: string;
    token_expira?: string;
    estado: 'activo' | 'inactivo' | 'suspendido';
    created_at: string;
    updated_at: string;
    refresh_token?: string;
}

export interface IVarianteProducto {
    id: number;
    producto_id: number; /** @foreignKey references productos.id */
    nombre: string;
    precio_adicional: number;
    activo: boolean;
    created_at: string;
    updated_at: string;
}

export interface IVerificationCode {
    id: number;
    code: string;
    status: 'pendiente' | 'verificado' | 'finalizado';
    phone_number?: string;
}

export interface IWhatsappInstance {
    id: number;
    establecimiento_id: number; /** @foreignKey references establecimientos.id */
    nombre_instancia: string;
    api_url: string;
    api_key: string;
    telefono: string;
    estado: 'conectado' | 'desconectado' | 'error_conexion' | 'pendiente_qr';
    qr_code?: string;
    last_sync?: string;
    activo: boolean;
    created_at: string;
    updated_at: string;
}

// ============================================================================
// INTERFACES PARA SISTEMA DE CARTAS
// ============================================================================

/**
 * Interfaz para representar una carta (vista de categorías con productos)
 * Esta es una interfaz de presentación que combina categorías y productos
 */
export interface ICarta {
    id: string;
    nombre: string;
    icono: string;
    activo: boolean;
    aforoTotal: number; // Número total de productos en la carta
    mesas: number;
    mesasActivas: number;
    estado: string;
    porcentajeOcupacion: number;
    colorBorde: string;
    categorias?: ICategoriaConProductos[];
}

/**
 * Interfaz para categoría con sus productos asociados
 */
export interface ICategoriaConProductos extends ICategoria {
    productos: IProducto[];
    totalProductos: number;
    productosActivos: number;
}

/**
 * Interfaz para producto con información adicional de carta
 */
export interface IProductoConCategoria extends IProducto {
    categoria?: ICategoria;
    disponibleEnCarta: boolean;
    ordenEnCarta?: number;
}

// ============================================================================
// EXPORTACIONES
// ============================================================================

export type DatabaseEntity =
    | IArea
    | IArqueoCaja
    | IAuditoriaCambiosPago
    | ICategoria
    | ICategoriaIdioma
    | ICliente
    | ICompra
    | IConfiguracion
    | IDetalleCompra
    | IDetalleFactura
    | IDetallePedido
    | IEmpresa
    | IEstablecimiento
    | IEstadistica
    | IFactura
    | IIdioma
    | IImpuesto
    | IIntegracion
    | ILog
    | IMesa
    | INotificacion
    | IPago
    | IPedido
    | IPedidoIntegracion
    | IPermiso
    | IPlan
    | IProducto
    | IProductoIdioma
    | IProveedor
    | IRol
    | IRolPermiso
    | IRolUsuario
    | ISesionMesa
    | ITurno
    | IUsuario
    | IVarianteProducto
    | IVerificationCode
    | IWhatsappInstance
    | ICarta
    | ICategoriaConProductos
    | IProductoConCategoria;
