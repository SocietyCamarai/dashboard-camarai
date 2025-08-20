/**
 * Mockups TypeScript generados automáticamente desde bbdd-data_inmutable(NOEDITAR)/
 * 
 * IMPORTANTE: Estos mockups están diseñados para ser fácilmente reemplazables
 * por fetchs hacia /api/* en el futuro. La estructura de datos es idéntica
 * a la que devolverían las APIs reales.
 * 
 * MIGRACIÓN FUTURA:
 * ================
 * Para migrar de mockups a APIs reales, simplemente reemplazar:
 * 
 * - fetchAreas() → fetch('/api/areas')
 * - fetchEmpresas() → fetch('/api/empresas')
 * - fetchEstablecimientos() → fetch('/api/establecimientos')
 * - fetchCategorias() → fetch('/api/categorias')
 * - fetchClientes() → fetch('/api/clientes')
 * - fetchConfiguraciones() → fetch('/api/configuraciones')
 * - fetchArqueosCaja() → fetch('/api/arqueos-caja')
 * - fetchAuditoriasCambiosPago() → fetch('/api/auditorias-cambios-pago')
 * - fetchCartas() → fetch('/api/cartas')
 * - fetchCategoriasConProductos() → fetch('/api/categorias-con-productos')
 * - fetchCategoriasIdioma() → fetch('/api/categorias-idioma')
 * - fetchCompras() → fetch('/api/compras')
 * - fetchDetallesCompra() → fetch('/api/detalles-compra')
 * - fetchDetallesFactura() → fetch('/api/detalles-factura')
 * - fetchDetallesPedido() → fetch('/api/detalles-pedido')
 * - fetchEstadisticas() → fetch('/api/estadisticas')
 * - fetchFacturas() → fetch('/api/facturas')
 * - fetchIdiomas() → fetch('/api/idiomas')
 * - fetchImpuestos() → fetch('/api/impuestos')
 * - fetchIntegraciones() → fetch('/api/integraciones')
 * - fetchLogs() → fetch('/api/logs')
 * - fetchMesas() → fetch('/api/mesas')
 * - fetchNotificaciones() → fetch('/api/notificaciones')
 * - fetchPagos() → fetch('/api/pagos')
 * - fetchPedidos() → fetch('/api/pedidos')
 * - fetchPedidosIntegracion() → fetch('/api/pedidos-integracion')
 * - fetchPermisos() → fetch('/api/permisos')
 * - fetchPlanes() → fetch('/api/planes')
 * - fetchProductos() → fetch('/api/productos')
 * - fetchProductosConCategoria() → fetch('/api/productos-con-categoria')
 * - fetchProductosIdioma() → fetch('/api/productos-idioma')
 * - fetchProveedores() → fetch('/api/proveedores')
 * - fetchRoles() → fetch('/api/roles')
 * - fetchRolesPermiso() → fetch('/api/roles-permiso')
 * - fetchRolesUsuario() → fetch('/api/roles-usuario')
 * - fetchSesionesMesa() → fetch('/api/sesiones-mesa')
 * - fetchTurnos() → fetch('/api/turnos')
 * - fetchVariantesProducto() → fetch('/api/variantes-producto')
 * - fetchVerificationCodes() → fetch('/api/verification-codes')
 * - fetchWhatsappInstances() → fetch('/api/whatsapp-instances')
 * 
 * Ejemplo de migración:
 * - ANTES: const areas = await fetchAreas();
 * - DESPUÉS: const response = await fetch('/api/areas'); const areas = await response.json();
 */

import type {
    IArea,
    IArqueoCaja,
    IAuditoriaCambiosPago,
    ICarta,
    ICategoria,
    ICategoriaConProductos,
    ICategoriaIdioma,
    ICliente,
    ICompra,
    IConfiguracion,
    IDetalleCompra,
    IDetalleFactura,
    IDetallePedido,
    IEmpresa,
    IEstablecimiento,
    IEstadistica,
    IFactura,
    IIdioma,
    IImpuesto,
    IIntegracion,
    ILog,
    IMesa,
    INotificacion,
    IPago,
    IPedido,
    IPedidoIntegracion,
    IPermiso,
    IPlan,
    IProducto,
    IProductoConCategoria,
    IProductoIdioma,
    IProveedor,
    IRol,
    IRolPermiso,
    IRolUsuario,
    ISesionMesa,
    ITurno,
    IUsuario,
    IVarianteProducto,
    IVerificationCode,
    IWhatsappInstance
} from './database.types';

// ============================================================================
// MOCKUPS DE BASE DE DATOS
// ============================================================================

// Mockup de Áreas
export const mockAreas: IArea[] = [
    {
        id: 13,
        establecimiento_id: 7,
        nombre: "Lobby",
        descripcion: "Lobby",
        activo: true,
        created_at: "2025-06-18T14:13:36.598Z",
        updated_at: "2025-06-18T14:13:36.598Z"
    },
    {
        id: 14,
        establecimiento_id: 10,
        nombre: "Terraza",
        descripcion: "Terraza",
        activo: true,
        created_at: "2025-07-15T12:53:57.304Z",
        updated_at: "2025-07-15T12:53:57.304Z"
    },
    {
        id: 16,
        establecimiento_id: 12,
        nombre: "sdadsa",
        descripcion: null,
        activo: true,
        created_at: "2025-07-23T16:14:04.284Z",
        updated_at: "2025-07-23T16:14:04.284Z"
    },
    {
        id: 18,
        establecimiento_id: 14,
        nombre: "teraza",
        descripcion: null,
        activo: true,
        created_at: "2025-07-24T07:04:20.901Z",
        updated_at: "2025-07-24T07:04:20.901Z"
    },
    {
        id: 19,
        establecimiento_id: 15,
        nombre: "VSDVFD",
        descripcion: null,
        activo: true,
        created_at: "2025-07-25T05:17:25.486Z",
        updated_at: "2025-07-25T05:17:25.486Z"
    }
];

// Mockup de Empresas
export const mockEmpresas: IEmpresa[] = [
    {
        id: 3,
        nombre: "He creadoo una empresa ",
        razon_social: "usuario.",
        nif: "B987654321",
        direccion: "Calle Inventada por ahora",
        codigo_postal: "28001",
        ciudad: "Madrid",
        provincia: "Madrid",
        pais: "España",
        telefono: "911234567",
        email: "info@gastrochez.com",
        sitio_web: "www.gastrochez.com",
        logo: undefined,
        plan_id: 8,
        fecha_inicio_plan: undefined,
        fecha_fin_plan: undefined,
        estado: "prueba",
        configuracion: {
            moneda: "EUR",
            zona_horaria: "Europe/Madrid",
            color_primario: "#2C3E50",
            color_secundario: "#E74C3C"
        },
        created_at: "2025-06-15T11:54:53.179Z",
        updated_at: "2025-06-15T11:54:53.179Z",
        foto: undefined
    },
    {
        id: 4,
        nombre: "Empresa Auto-Generada",
        razon_social: undefined,
        nif: undefined,
        direccion: undefined,
        codigo_postal: undefined,
        ciudad: undefined,
        provincia: undefined,
        pais: "España",
        telefono: undefined,
        email: "empresa_000005@autogenerada.com",
        sitio_web: undefined,
        logo: undefined,
        plan_id: undefined,
        fecha_inicio_plan: undefined,
        fecha_fin_plan: undefined,
        estado: "prueba",
        configuracion: {
            auto_generada: true,
            fecha_creacion: "2025-06-15T14:22:52.836873+00:00"
        },
        created_at: "2025-06-15T12:22:52.836Z",
        updated_at: "2025-06-15T12:22:52.836Z",
        foto: undefined
    },
    {
        id: 19,
        nombre: "Las Rosas",
        razon_social: "Las Rosas S.L.",
        nif: "A12345678",
        direccion: "Calle de las Flores 45",
        codigo_postal: "28002",
        ciudad: "Madrid",
        provincia: "Madrid",
        pais: "España",
        telefono: "912345678",
        email: "info@lasrosas.com",
        sitio_web: "www.lasrosas.com",
        logo: undefined,
        plan_id: 10,
        fecha_inicio_plan: undefined,
        fecha_fin_plan: undefined,
        estado: "activo",
        configuracion: {
            moneda: "EUR",
            zona_horaria: "Europe/Madrid",
            color_primario: "#E91E63",
            color_secundario: "#FF9800"
        },
        created_at: "2025-07-24T07:04:20.734Z",
        updated_at: "2025-07-24T07:04:20.734Z",
        foto: undefined
    },
    {
        id: 20,
        nombre: "CAMARAIBOT",
        razon_social: "CamarAI Bot Technologies S.A.",
        nif: "B87654321",
        direccion: "Avenida de la Innovación 123",
        codigo_postal: "28003",
        ciudad: "Madrid",
        provincia: "Madrid",
        pais: "España",
        telefono: "913456789",
        email: "info@camaraibot.com",
        sitio_web: "www.camaraibot.com",
        logo: undefined,
        plan_id: 12,
        fecha_inicio_plan: undefined,
        fecha_fin_plan: undefined,
        estado: "prueba",
        configuracion: {
            moneda: "EUR",
            zona_horaria: "Europe/Madrid",
            color_primario: "#2196F3",
            color_secundario: "#4CAF50"
        },
        created_at: "2025-07-25T05:05:09.129Z",
        updated_at: "2025-07-25T05:05:09.129Z",
        foto: undefined
    },
    {
        id: 21,
        nombre: "CAMARAIBOT2",
        razon_social: "CamarAI Bot Technologies 2 S.L.",
        nif: "C76543210",
        direccion: "Calle Tecnológica 456",
        codigo_postal: "28004",
        ciudad: "Madrid",
        provincia: "Madrid",
        pais: "España",
        telefono: "914567890",
        email: "info@camaraibot2.com",
        sitio_web: "www.camaraibot2.com",
        logo: undefined,
        plan_id: 15,
        fecha_inicio_plan: undefined,
        fecha_fin_plan: undefined,
        estado: "prueba",
        configuracion: {
            moneda: "EUR",
            zona_horaria: "Europe/Madrid",
            color_primario: "#9C27B0",
            color_secundario: "#FF5722"
        },
        created_at: "2025-07-25T05:15:57.320Z",
        updated_at: "2025-07-25T05:15:57.320Z",
        foto: undefined
    }
];

// Mockup de Establecimientos
export const mockEstablecimientos: IEstablecimiento[] = [
    {
        id: 7,
        empresa_id: 3,
        nombre: "Restaurante Principal",
        tipo: "restaurante",
        direccion: "Calle Mayor 123",
        codigo_postal: "28001",
        ciudad: "Madrid",
        provincia: "Madrid",
        pais: "España",
        telefono: "911234567",
        email: "info@restaurante.com",
        horario: {
            lunes: { apertura: "08:00", cierre: "23:00" },
            martes: { apertura: "08:00", cierre: "23:00" },
            miercoles: { apertura: "08:00", cierre: "23:00" },
            jueves: { apertura: "08:00", cierre: "23:00" },
            viernes: { apertura: "08:00", cierre: "00:00" },
            sabado: { apertura: "09:00", cierre: "00:00" },
            domingo: { apertura: "09:00", cierre: "22:00" }
        },
        imagen: undefined,
        coordenadas: undefined,
        activo: true,
        created_at: "2025-06-15T11:54:53.179Z",
        updated_at: "2025-06-15T11:54:53.179Z",
        api_key: "api_key_123",
        square_location_id: undefined
    },
    {
        id: 14,
        empresa_id: 19,
        nombre: "Las Rosas - Sede Principal",
        tipo: "restaurante",
        direccion: "Calle de las Flores 45",
        codigo_postal: "28002",
        ciudad: "Madrid",
        provincia: "Madrid",
        pais: "España",
        telefono: "912345678",
        email: "info@lasrosas.com",
        horario: {
            lunes: { apertura: "09:00", cierre: "22:00" },
            martes: { apertura: "09:00", cierre: "22:00" },
            miercoles: { apertura: "09:00", cierre: "22:00" },
            jueves: { apertura: "09:00", cierre: "22:00" },
            viernes: { apertura: "09:00", cierre: "23:00" },
            sabado: { apertura: "10:00", cierre: "23:00" },
            domingo: { apertura: "10:00", cierre: "21:00" }
        },
        imagen: undefined,
        coordenadas: undefined,
        activo: true,
        created_at: "2025-07-24T07:04:20.734Z",
        updated_at: "2025-07-24T07:04:20.734Z",
        api_key: "api_key_lasrosas",
        square_location_id: undefined
    },
    {
        id: 15,
        empresa_id: 20,
        nombre: "CamarAI Bot - Oficina Central",
        tipo: "otro",
        direccion: "Avenida de la Innovación 123",
        codigo_postal: "28003",
        ciudad: "Madrid",
        provincia: "Madrid",
        pais: "España",
        telefono: "913456789",
        email: "info@camaraibot.com",
        horario: {
            lunes: { apertura: "08:00", cierre: "18:00" },
            martes: { apertura: "08:00", cierre: "18:00" },
            miercoles: { apertura: "08:00", cierre: "18:00" },
            jueves: { apertura: "08:00", cierre: "18:00" },
            viernes: { apertura: "08:00", cierre: "17:00" },
            sabado: { apertura: "09:00", cierre: "14:00" },
            domingo: { apertura: "cerrado", cierre: "cerrado" }
        },
        imagen: undefined,
        coordenadas: undefined,
        activo: true,
        created_at: "2025-07-25T05:05:09.129Z",
        updated_at: "2025-07-25T05:05:09.129Z",
        api_key: "api_key_camaraibot",
        square_location_id: undefined
    },
    {
        id: 16,
        empresa_id: 21,
        nombre: "CamarAI Bot 2 - Centro de Desarrollo",
        tipo: "otro",
        direccion: "Calle Tecnológica 456",
        codigo_postal: "28004",
        ciudad: "Madrid",
        provincia: "Madrid",
        pais: "España",
        telefono: "914567890",
        email: "info@camaraibot2.com",
        horario: {
            lunes: { apertura: "09:00", cierre: "19:00" },
            martes: { apertura: "09:00", cierre: "19:00" },
            miercoles: { apertura: "09:00", cierre: "19:00" },
            jueves: { apertura: "09:00", cierre: "19:00" },
            viernes: { apertura: "09:00", cierre: "18:00" },
            sabado: { apertura: "10:00", cierre: "16:00" },
            domingo: { apertura: "cerrado", cierre: "cerrado" }
        },
        imagen: undefined,
        coordenadas: undefined,
        activo: true,
        created_at: "2025-07-25T05:15:57.320Z",
        updated_at: "2025-07-25T05:15:57.320Z",
        api_key: "api_key_camaraibot2",
        square_location_id: undefined
    }
];

// Mockup de Usuarios
export const mockUsuarios: IUsuario[] = [
    {
        id: 96,
        email: "cuentademo@demo.com",
        password: "$2b$10$5/DCaKZOUiFa92HW9Nz9ku6B8gDfsraEBtCPxAAM.cS888tEUZ2H.",
        nombre: "cuenta",
        apellidos: "demo",
        telefono: "12345689",
        foto: undefined,
        empresa_id: undefined,
        establecimiento_id: undefined,
        ultimo_login: undefined,
        pin: undefined,
        token_reset: undefined,
        token_expira: undefined,
        estado: "inactivo",
        created_at: "2025-07-24T10:39:54.270Z",
        updated_at: "2025-07-24T10:39:54.270Z",
        refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTYsImVtYWlsIjoiY3VlbnRhZGVtb0BkZW1vLmNvbSIsImlhdCI6MTc1MzQxNjY0MiwiZXhwIjoxNzU0MDIxNDQyfQ.HVI27tFM-Jrk1rPLhO2Uu3PvtxlH-021V7h6pzAEBL8"
    },
    {
        id: 70,
        email: "testuser1@example.com",
        password: "$2b$10$v5Xx6BfJSLNmeiSbLcFhJOt1.odVDQpHxCRGXOknewVEyAx7JrHoq",
        nombre: "Test",
        apellidos: "User",
        telefono: "123456789",
        foto: undefined,
        empresa_id: 19,
        establecimiento_id: 14,
        ultimo_login: undefined,
        pin: undefined,
        token_reset: undefined,
        token_expira: undefined,
        estado: "activo",
        created_at: "2025-07-20T00:57:15.494Z",
        updated_at: "2025-07-20T00:57:15.494Z",
        refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAsImVtYWlsIjoidGVzdHVzZXIxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzU0MzE3MzAyLCJleHAiOjE3NTQ5MjIxMDJ9.fwARbTpXOzLQVkbiZ9Wo5ChXyDTgsut9OaZ5-YmrRD8"
    },
    {
        id: 52,
        email: "maria.garcia@restaurante.com",
        password: "$2b$10$v5Xx6BfJSLNmeiSbLcFhJOt1.odVDQpHxCRGXOknewVEyAx7JrHoq",
        nombre: "María",
        apellidos: "García",
        telefono: "34612345678",
        foto: undefined,
        empresa_id: 19,
        establecimiento_id: 7,
        ultimo_login: undefined,
        pin: undefined,
        token_reset: undefined,
        token_expira: undefined,
        estado: "activo",
        created_at: "2025-07-15T10:30:00.000Z",
        updated_at: "2025-07-15T10:30:00.000Z",
        refresh_token: undefined
    },
    {
        id: 53,
        email: "carlos.rodriguez@restaurante.com",
        password: "$2b$10$v5Xx6BfJSLNmeiSbLcFhJOt1.odVDQpHxCRGXOknewVEyAx7JrHoq",
        nombre: "Carlos",
        apellidos: "Rodríguez",
        telefono: "34687654321",
        foto: undefined,
        empresa_id: 19,
        establecimiento_id: 7,
        ultimo_login: undefined,
        pin: undefined,
        token_reset: undefined,
        token_expira: undefined,
        estado: "activo",
        created_at: "2025-07-16T14:20:00.000Z",
        updated_at: "2025-07-16T14:20:00.000Z",
        refresh_token: undefined
    },
    {
        id: 54,
        email: "ana.martinez@restaurante.com",
        password: "$2b$10$v5Xx6BfJSLNmeiSbLcFhJOt1.odVDQpHxCRGXOknewVEyAx7JrHoq",
        nombre: "Ana",
        apellidos: "Martínez",
        telefono: "34611223344",
        foto: undefined,
        empresa_id: 19,
        establecimiento_id: 7,
        ultimo_login: undefined,
        pin: undefined,
        token_reset: undefined,
        token_expira: undefined,
        estado: "activo",
        created_at: "2025-07-17T09:15:00.000Z",
        updated_at: "2025-07-17T09:15:00.000Z",
        refresh_token: undefined
    },
    {
        id: 55,
        email: "juan.lopez@camaraibot.com",
        password: "$2b$10$v5Xx6BfJSLNmeiSbLcFhJOt1.odVDQpHxCRGXOknewVEyAx7JrHoq",
        nombre: "Juan",
        apellidos: "López",
        telefono: "34699887766",
        foto: undefined,
        empresa_id: 20,
        establecimiento_id: 15,
        ultimo_login: undefined,
        pin: undefined,
        token_reset: undefined,
        token_expira: undefined,
        estado: "activo",
        created_at: "2025-07-18T11:30:00.000Z",
        updated_at: "2025-07-18T11:30:00.000Z",
        refresh_token: undefined
    },
    {
        id: 56,
        email: "lucia.fernandez@camaraibot.com",
        password: "$2b$10$v5Xx6BfJSLNmeiSbLcFhJOt1.odVDQpHxCRGXOknewVEyAx7JrHoq",
        nombre: "Lucía",
        apellidos: "Fernández",
        telefono: "34688776655",
        foto: undefined,
        empresa_id: 20,
        establecimiento_id: 15,
        ultimo_login: undefined,
        pin: undefined,
        token_reset: undefined,
        token_expira: undefined,
        estado: "activo",
        created_at: "2025-07-19T16:45:00.000Z",
        updated_at: "2025-07-19T16:45:00.000Z",
        refresh_token: undefined
    },
    {
        id: 57,
        email: "pedro.gomez@camaraibot2.com",
        password: "$2b$10$v5Xx6BfJSLNmeiSbLcFhJOt1.odVDQpHxCRGXOknewVEyAx7JrHoq",
        nombre: "Pedro",
        apellidos: "Gómez",
        telefono: "34677665544",
        foto: undefined,
        empresa_id: 21,
        establecimiento_id: 16,
        ultimo_login: undefined,
        pin: undefined,
        token_reset: undefined,
        token_expira: undefined,
        estado: "activo",
        created_at: "2025-07-20T09:20:00.000Z",
        updated_at: "2025-07-20T09:20:00.000Z",
        refresh_token: undefined
    },
    {
        id: 58,
        email: "sara.morales@camaraibot2.com",
        password: "$2b$10$v5Xx6BfJSLNmeiSbLcFhJOt1.odVDQpHxCRGXOknewVEyAx7JrHoq",
        nombre: "Sara",
        apellidos: "Morales",
        telefono: "34666554433",
        foto: undefined,
        empresa_id: 21,
        establecimiento_id: 16,
        ultimo_login: undefined,
        pin: undefined,
        token_reset: undefined,
        token_expira: undefined,
        estado: "inactivo",
        created_at: "2025-07-21T14:10:00.000Z",
        updated_at: "2025-07-21T14:10:00.000Z",
        refresh_token: undefined
    },
    {
        id: 59,
        email: "miguel.torres@gastrochez.com",
        password: "$2b$10$v5Xx6BfJSLNmeiSbLcFhJOt1.odVDQpHxCRGXOknewVEyAx7JrHoq",
        nombre: "Miguel",
        apellidos: "Torres",
        telefono: "34655443322",
        foto: undefined,
        empresa_id: 3,
        establecimiento_id: 7,
        ultimo_login: undefined,
        pin: undefined,
        token_reset: undefined,
        token_expira: undefined,
        estado: "activo",
        created_at: "2025-07-22T10:15:00.000Z",
        updated_at: "2025-07-22T10:15:00.000Z",
        refresh_token: undefined
    }
];

// Mockup de Categorías
export const mockCategorias: ICategoria[] = [
    {
        id: 14,
        establecimiento_id: 7,
        nombre: "Platos de la Casa",
        descripcion: "Platos principales y especialidades del restaurante",
        imagen: undefined,
        color: "#FF6B6B",
        orden: 1,
        activo: true,
        created_at: "2025-07-10T00:30:20.575Z",
        updated_at: "2025-07-10T00:30:20.575Z",
        identificador: "EGOLDXIRH34YTTXDNAU4YTIL"
    },
    {
        id: 15,
        establecimiento_id: 7,
        nombre: "Tapas & Entrantes",
        descripcion: "Pequeños platos para compartir y entrantes",
        imagen: undefined,
        color: "#4ECDC4",
        orden: 2,
        activo: true,
        created_at: "2025-07-10T00:30:20.575Z",
        updated_at: "2025-07-10T00:30:20.575Z",
        identificador: "IPKN3O7DVDN5OBD2KSQS5555"
    },
    {
        id: 16,
        establecimiento_id: 7,
        nombre: "Bebidas",
        descripcion: "Refrescos, cervezas, vinos y otras bebidas",
        imagen: undefined,
        color: "#45B7D1",
        orden: 3,
        activo: true,
        created_at: "2025-07-10T00:30:20.575Z",
        updated_at: "2025-07-10T00:30:20.575Z",
        identificador: "KQQRH2Q7TSJQH4AXO6B5BHCD"
    },
    {
        id: 17,
        establecimiento_id: 7,
        nombre: "Ensaladas",
        descripcion: "Ensaladas frescas y saludables",
        imagen: undefined,
        color: "#96CEB4",
        orden: 4,
        activo: true,
        created_at: "2025-07-10T00:30:20.575Z",
        updated_at: "2025-07-10T00:30:20.575Z",
        identificador: "4F4A4W7IPZDJPFAL7S4HTBT3"
    },
    {
        id: 18,
        establecimiento_id: 7,
        nombre: "Paellas",
        descripcion: "Paellas tradicionales y especialidades de arroz",
        imagen: undefined,
        color: "#FFEAA7",
        orden: 5,
        activo: true,
        created_at: "2025-07-10T00:30:20.575Z",
        updated_at: "2025-07-10T00:30:20.575Z",
        identificador: "HHENOKL4G7XTSZNDZC42LFXF"
    }
];

// Mockup de Clientes
export const mockClientes: ICliente[] = [
    {
        id: 1,
        establecimiento_id: 7,
        nombre: "Gabriel",
        apellidos: "López",
        email: "gabriel.lopez@email.com",
        telefono: "34671503751",
        direccion: "Calle Mayor 123",
        codigo_postal: "28001",
        ciudad: "Madrid",
        notas: "Cliente frecuente",
        fecha_nacimiento: undefined,
        nif: undefined,
        created_at: "2025-06-20T19:54:29.391Z",
        updated_at: "2025-06-20T19:54:29.391Z",
        ultima_actividad_whatsapp: undefined,
        preferencias_whatsapp: undefined
    },
    {
        id: 2,
        establecimiento_id: 7,
        nombre: "María",
        apellidos: "García",
        email: "maria.garcia@email.com",
        telefono: "34612345678",
        direccion: "Avenida Principal 45",
        codigo_postal: "28002",
        ciudad: "Madrid",
        notas: "Prefiere mesa cerca de la ventana",
        fecha_nacimiento: undefined,
        nif: undefined,
        created_at: "2025-07-15T10:30:00.000Z",
        updated_at: "2025-07-15T10:30:00.000Z",
        ultima_actividad_whatsapp: undefined,
        preferencias_whatsapp: undefined
    },
    {
        id: 3,
        establecimiento_id: 7,
        nombre: "Carlos",
        apellidos: "Rodríguez",
        email: "carlos.rodriguez@email.com",
        telefono: "34687654321",
        direccion: "Plaza España 7",
        codigo_postal: "28003",
        ciudad: "Madrid",
        notas: "Alergia a mariscos",
        fecha_nacimiento: undefined,
        nif: undefined,
        created_at: "2025-07-16T14:20:00.000Z",
        updated_at: "2025-07-16T14:20:00.000Z",
        ultima_actividad_whatsapp: undefined,
        preferencias_whatsapp: undefined
    },
    {
        id: 4,
        establecimiento_id: 7,
        nombre: "Ana",
        apellidos: "Martínez",
        email: "ana.martinez@email.com",
        telefono: "34611223344",
        direccion: "Calle Gran Vía 89",
        codigo_postal: "28004",
        ciudad: "Madrid",
        notas: "Vegetariana",
        fecha_nacimiento: undefined,
        nif: undefined,
        created_at: "2025-07-17T09:15:00.000Z",
        updated_at: "2025-07-17T09:15:00.000Z",
        ultima_actividad_whatsapp: undefined,
        preferencias_whatsapp: undefined
    },
    {
        id: 5,
        establecimiento_id: 7,
        nombre: "Luis",
        apellidos: "Fernández",
        email: "luis.fernandez@email.com",
        telefono: "34655667788",
        direccion: "Calle Alcalá 156",
        codigo_postal: "28005",
        ciudad: "Madrid",
        notas: "Cliente VIP",
        fecha_nacimiento: undefined,
        nif: undefined,
        created_at: "2025-07-18T16:45:00.000Z",
        updated_at: "2025-07-18T16:45:00.000Z",
        ultima_actividad_whatsapp: undefined,
        preferencias_whatsapp: undefined
    },
    {
        id: 6,
        establecimiento_id: 7,
        nombre: "Sofia",
        apellidos: "Pérez",
        email: "sofia.perez@email.com",
        telefono: "34699887766",
        direccion: "Calle Princesa 23",
        codigo_postal: "28006",
        ciudad: "Madrid",
        notas: "Celebración de cumpleaños",
        fecha_nacimiento: undefined,
        nif: undefined,
        created_at: "2025-07-19T12:30:00.000Z",
        updated_at: "2025-07-19T12:30:00.000Z",
        ultima_actividad_whatsapp: undefined,
        preferencias_whatsapp: undefined
    },
    {
        id: 0,
        establecimiento_id: 7,
        nombre: "Cognita Plus",
        apellidos: undefined,
        email: "info@cognitaplus.com",
        telefono: "34641161726",
        direccion: "Calle Empresarial 1",
        codigo_postal: "28007",
        ciudad: "Madrid",
        notas: "Empresa - reservas grupales",
        fecha_nacimiento: undefined,
        nif: undefined,
        created_at: "2025-06-20T20:09:54.074Z",
        updated_at: "2025-06-20T20:09:54.074Z",
        ultima_actividad_whatsapp: undefined,
        preferencias_whatsapp: undefined
    }
];

// Mockup de Configuraciones
export const mockConfiguraciones: IConfiguracion[] = [
    {
        id: 1,
        clave: "app_name",
        valor: "Qamarero",
        descripcion: "Nombre de la aplicación",
        tipo: "global",
        referencia_id: undefined,
        created_at: "2025-05-13T12:48:47.771Z",
        updated_at: "2025-05-13T12:48:47.771Z"
    },
    {
        id: 2,
        clave: "company_email",
        valor: "info@qamarero.com",
        descripcion: "Email de contacto de la empresa",
        tipo: "global",
        referencia_id: undefined,
        created_at: "2025-05-13T12:48:47.771Z",
        updated_at: "2025-05-13T12:48:47.771Z"
    },
    {
        id: 3,
        clave: "default_language",
        valor: "es",
        descripcion: "Idioma por defecto",
        tipo: "global",
        referencia_id: undefined,
        created_at: "2025-05-13T12:48:47.771Z",
        updated_at: "2025-05-13T12:48:47.771Z"
    }
];

// ============================================================================
// MOCKUPS VACÍOS PARA ENTIDADES SIN DATOS
// ============================================================================

export const mockArqueosCaja: IArqueoCaja[] = [];
export const mockAuditoriaCambiosPago: IAuditoriaCambiosPago[] = [];
export const mockCategoriasIdiomas: ICategoriaIdioma[] = [];
export const mockCompras: ICompra[] = [];
export const mockDetallesCompra: IDetalleCompra[] = [];
export const mockDetallesFactura: IDetalleFactura[] = [];
export const mockDetallesPedido: IDetallePedido[] = [];
export const mockEstadisticas: IEstadistica[] = [];
export const mockFacturas: IFactura[] = [];
export const mockIdiomas: IIdioma[] = [];
export const mockImpuestos: IImpuesto[] = [
    {
        id: 1,
        empresa_id: 3,
        nombre: "IVA General",
        porcentaje: 21.00,
        activo: true,
        created_at: "2025-06-15T11:54:53.179Z",
        updated_at: "2025-06-15T11:54:53.179Z"
    },
    {
        id: 2,
        empresa_id: 3,
        nombre: "IVA Reducido",
        porcentaje: 10.00,
        activo: true,
        created_at: "2025-06-15T11:54:53.179Z",
        updated_at: "2025-06-15T11:54:53.179Z"
    },
    {
        id: 3,
        empresa_id: 3,
        nombre: "IVA Superreducido",
        porcentaje: 4.00,
        activo: true,
        created_at: "2025-06-15T11:54:53.179Z",
        updated_at: "2025-06-15T11:54:53.179Z"
    },
    {
        id: 4,
        empresa_id: 3,
        nombre: "Exento",
        porcentaje: 0.00,
        activo: true,
        created_at: "2025-06-15T11:54:53.179Z",
        updated_at: "2025-06-15T11:54:53.179Z"
    }
];
export const mockIntegraciones: IIntegracion[] = [];
export const mockLogs: ILog[] = [];
export const mockMesas: IMesa[] = [
    // Mesas del Lobby (area_id: 13) - 8 mesas con diferentes estados
    {
        id: 24,
        establecimiento_id: 7,
        area_id: 13,
        numero: "1",
        capacidad: 4,
        estado: "ocupada",
        posicion_x: 100,
        posicion_y: 100,
        forma: "cuadrada",
        ancho: 100,
        alto: 100,
        codigo_qr: "QR_LOBBY_1",
        activo: true,
        created_at: "2025-06-20T15:41:29.888Z",
        updated_at: "2025-06-20T15:41:29.888Z",
        url_qr: "https://qr.camarai.com/lobby/1",
        configuracion_whatsapp: { numero_telefono: "+34612345678" }
    },
    {
        id: 25,
        establecimiento_id: 7,
        area_id: 13,
        numero: "2",
        capacidad: 4,
        estado: "ocupada",
        posicion_x: 220,
        posicion_y: 100,
        forma: "cuadrada",
        ancho: 100,
        alto: 100,
        codigo_qr: "QR_LOBBY_2",
        activo: true,
        created_at: "2025-06-30T15:07:25.720Z",
        updated_at: "2025-06-30T15:07:25.720Z",
        url_qr: "https://qr.camarai.com/lobby/2",
        configuracion_whatsapp: { numero_telefono: "+34612345678" }
    },
    {
        id: 26,
        establecimiento_id: 7,
        area_id: 13,
        numero: "3",
        capacidad: 6,
        estado: "ocupada",
        posicion_x: 340,
        posicion_y: 100,
        forma: "rectangular",
        ancho: 120,
        alto: 80,
        codigo_qr: "QR_LOBBY_3",
        activo: true,
        created_at: "2025-06-30T15:07:54.062Z",
        updated_at: "2025-06-30T15:07:54.062Z",
        url_qr: "https://qr.camarai.com/lobby/3",
        configuracion_whatsapp: { numero_telefono: "+34612345678" }
    },
    {
        id: 27,
        establecimiento_id: 7,
        area_id: 13,
        numero: "4",
        capacidad: 4,
        estado: "libre",
        posicion_x: 100,
        posicion_y: 220,
        forma: "cuadrada",
        ancho: 100,
        alto: 100,
        codigo_qr: "QR_LOBBY_4",
        activo: true,
        created_at: "2025-06-30T15:08:32.277Z",
        updated_at: "2025-06-30T15:08:32.277Z",
        url_qr: "https://qr.camarai.com/lobby/4",
        configuracion_whatsapp: { numero_telefono: "+34612345678" }
    },
    {
        id: 28,
        establecimiento_id: 7,
        area_id: 13,
        numero: "5",
        capacidad: 4,
        estado: "libre",
        posicion_x: 220,
        posicion_y: 220,
        forma: "cuadrada",
        ancho: 100,
        alto: 100,
        codigo_qr: "QR_LOBBY_5",
        activo: true,
        created_at: "2025-06-30T15:08:51.867Z",
        updated_at: "2025-06-30T15:08:51.867Z",
        url_qr: "https://qr.camarai.com/lobby/5",
        configuracion_whatsapp: { numero_telefono: "+34612345678" }
    },
    {
        id: 29,
        establecimiento_id: 7,
        area_id: 13,
        numero: "6",
        capacidad: 8,
        estado: "reservada",
        posicion_x: 340,
        posicion_y: 220,
        forma: "rectangular",
        ancho: 150,
        alto: 100,
        codigo_qr: "QR_LOBBY_6",
        activo: true,
        created_at: "2025-07-01T10:00:00.000Z",
        updated_at: "2025-07-01T10:00:00.000Z",
        url_qr: "https://qr.camarai.com/lobby/6",
        configuracion_whatsapp: { numero_telefono: "+34612345678" }
    },
    {
        id: 30,
        establecimiento_id: 7,
        area_id: 13,
        numero: "7",
        capacidad: 4,
        estado: "libre",
        posicion_x: 100,
        posicion_y: 340,
        forma: "redonda",
        ancho: 100,
        alto: 100,
        codigo_qr: "QR_LOBBY_7",
        activo: true,
        created_at: "2025-07-02T11:30:00.000Z",
        updated_at: "2025-07-02T11:30:00.000Z",
        url_qr: "https://qr.camarai.com/lobby/7",
        configuracion_whatsapp: { numero_telefono: "+34612345678" }
    },
    {
        id: 31,
        establecimiento_id: 7,
        area_id: 13,
        numero: "8",
        capacidad: 4,
        estado: "libre",
        posicion_x: 220,
        posicion_y: 340,
        forma: "cuadrada",
        ancho: 100,
        alto: 100,
        codigo_qr: "QR_LOBBY_8",
        activo: true,
        created_at: "2025-07-03T09:15:00.000Z",
        updated_at: "2025-07-03T09:15:00.000Z",
        url_qr: "https://qr.camarai.com/lobby/8",
        configuracion_whatsapp: { numero_telefono: "+34612345678" }
    },

    // Mesas de la Terraza (area_id: 14) - 6 mesas con diferentes estados
    {
        id: 32,
        establecimiento_id: 10,
        area_id: 14,
        numero: "1",
        capacidad: 4,
        estado: "ocupada",
        posicion_x: 50,
        posicion_y: 50,
        forma: "cuadrada",
        ancho: 100,
        alto: 100,
        codigo_qr: "QR_TERRAZA_1",
        activo: true,
        created_at: "2025-07-15T13:29:41.250Z",
        updated_at: "2025-07-15T13:29:41.250Z",
        url_qr: "https://qr.camarai.com/terraza/1",
        configuracion_whatsapp: { numero_telefono: "+34687654321" }
    },
    {
        id: 33,
        establecimiento_id: 10,
        area_id: 14,
        numero: "2",
        capacidad: 6,
        estado: "ocupada",
        posicion_x: 170,
        posicion_y: 50,
        forma: "rectangular",
        ancho: 120,
        alto: 80,
        codigo_qr: "QR_TERRAZA_2",
        activo: true,
        created_at: "2025-07-15T13:29:41.250Z",
        updated_at: "2025-07-15T13:29:41.250Z",
        url_qr: "https://qr.camarai.com/terraza/2",
        configuracion_whatsapp: { numero_telefono: "+34687654321" }
    },
    {
        id: 34,
        establecimiento_id: 10,
        area_id: 14,
        numero: "3",
        capacidad: 4,
        estado: "libre",
        posicion_x: 50,
        posicion_y: 170,
        forma: "cuadrada",
        ancho: 100,
        alto: 100,
        codigo_qr: "QR_TERRAZA_3",
        activo: true,
        created_at: "2025-07-15T13:29:41.250Z",
        updated_at: "2025-07-15T13:29:41.250Z",
        url_qr: "https://qr.camarai.com/terraza/3",
        configuracion_whatsapp: { numero_telefono: "+34687654321" }
    },
    {
        id: 35,
        establecimiento_id: 10,
        area_id: 14,
        numero: "4",
        capacidad: 4,
        estado: "libre",
        posicion_x: 170,
        posicion_y: 170,
        forma: "cuadrada",
        ancho: 100,
        alto: 100,
        codigo_qr: "QR_TERRAZA_4",
        activo: true,
        created_at: "2025-07-15T13:29:41.250Z",
        updated_at: "2025-07-15T13:29:41.250Z",
        url_qr: "https://qr.camarai.com/terraza/4",
        configuracion_whatsapp: { numero_telefono: "+34687654321" }
    },
    {
        id: 36,
        establecimiento_id: 10,
        area_id: 14,
        numero: "5",
        capacidad: 8,
        estado: "reservada",
        posicion_x: 50,
        posicion_y: 290,
        forma: "rectangular",
        ancho: 150,
        alto: 100,
        codigo_qr: "QR_TERRAZA_5",
        activo: true,
        created_at: "2025-07-15T13:29:41.250Z",
        updated_at: "2025-07-15T13:29:41.250Z",
        url_qr: "https://qr.camarai.com/terraza/5",
        configuracion_whatsapp: { numero_telefono: "+34687654321" }
    },
    {
        id: 37,
        establecimiento_id: 10,
        area_id: 14,
        numero: "6",
        capacidad: 4,
        estado: "libre",
        posicion_x: 220,
        posicion_y: 290,
        forma: "redonda",
        ancho: 100,
        alto: 100,
        codigo_qr: "QR_TERRAZA_6",
        activo: true,
        created_at: "2025-07-15T13:29:41.250Z",
        updated_at: "2025-07-15T13:29:41.250Z",
        url_qr: "https://qr.camarai.com/terraza/6",
        configuracion_whatsapp: { numero_telefono: "+34687654321" }
    },

    // Mesas del área sdadsa (area_id: 16) - 4 mesas
    {
        id: 38,
        establecimiento_id: 12,
        area_id: 16,
        numero: "1",
        capacidad: 4,
        estado: "ocupada",
        posicion_x: 100,
        posicion_y: 100,
        forma: "cuadrada",
        ancho: 100,
        alto: 100,
        codigo_qr: "QR_SDADSA_1",
        activo: true,
        created_at: "2025-07-23T16:15:45.465Z",
        updated_at: "2025-07-23T16:15:45.465Z",
        url_qr: "https://qr.camarai.com/sdadsa/1",
        configuracion_whatsapp: { numero_telefono: "+34611223344" }
    },
    {
        id: 39,
        establecimiento_id: 12,
        area_id: 16,
        numero: "2",
        capacidad: 4,
        estado: "libre",
        posicion_x: 220,
        posicion_y: 100,
        forma: "cuadrada",
        ancho: 100,
        alto: 100,
        codigo_qr: "QR_SDADSA_2",
        activo: true,
        created_at: "2025-07-23T16:15:45.465Z",
        updated_at: "2025-07-23T16:15:45.465Z",
        url_qr: "https://qr.camarai.com/sdadsa/2",
        configuracion_whatsapp: { numero_telefono: "+34611223344" }
    },
    {
        id: 40,
        establecimiento_id: 12,
        area_id: 16,
        numero: "3",
        capacidad: 6,
        estado: "libre",
        posicion_x: 100,
        posicion_y: 220,
        forma: "rectangular",
        ancho: 120,
        alto: 80,
        codigo_qr: "QR_SDADSA_3",
        activo: true,
        created_at: "2025-07-23T16:15:45.465Z",
        updated_at: "2025-07-23T16:15:45.465Z",
        url_qr: "https://qr.camarai.com/sdadsa/3",
        configuracion_whatsapp: { numero_telefono: "+34611223344" }
    },
    {
        id: 41,
        establecimiento_id: 12,
        area_id: 16,
        numero: "4",
        capacidad: 4,
        estado: "reservada",
        posicion_x: 240,
        posicion_y: 220,
        forma: "cuadrada",
        ancho: 100,
        alto: 100,
        codigo_qr: "QR_SDADSA_4",
        activo: true,
        created_at: "2025-07-23T16:15:45.465Z",
        updated_at: "2025-07-23T16:15:45.465Z",
        url_qr: "https://qr.camarai.com/sdadsa/4",
        configuracion_whatsapp: { numero_telefono: "+34611223344" }
    },

    // Mesas del área teraza (area_id: 18) - 3 mesas
    {
        id: 42,
        establecimiento_id: 14,
        area_id: 18,
        numero: "1",
        capacidad: 4,
        estado: "ocupada",
        posicion_x: 100,
        posicion_y: 100,
        forma: "cuadrada",
        ancho: 100,
        alto: 100,
        codigo_qr: "QR_TERAZA_1",
        activo: true,
        created_at: "2025-07-24T07:04:20.978Z",
        updated_at: "2025-07-24T07:04:20.978Z",
        url_qr: "https://qr.camarai.com/teraza/1",
        configuracion_whatsapp: { numero_telefono: "+34655667788" }
    },
    {
        id: 43,
        establecimiento_id: 14,
        area_id: 18,
        numero: "2",
        capacidad: 4,
        estado: "libre",
        posicion_x: 220,
        posicion_y: 100,
        forma: "cuadrada",
        ancho: 100,
        alto: 100,
        codigo_qr: "QR_TERAZA_2",
        activo: true,
        created_at: "2025-07-24T07:04:20.978Z",
        updated_at: "2025-07-24T07:04:20.978Z",
        url_qr: "https://qr.camarai.com/teraza/2",
        configuracion_whatsapp: { numero_telefono: "+34655667788" }
    },
    {
        id: 44,
        establecimiento_id: 14,
        area_id: 18,
        numero: "3",
        capacidad: 6,
        estado: "libre",
        posicion_x: 100,
        posicion_y: 220,
        forma: "rectangular",
        ancho: 120,
        alto: 80,
        codigo_qr: "QR_TERAZA_3",
        activo: true,
        created_at: "2025-07-24T07:04:20.978Z",
        updated_at: "2025-07-24T07:04:20.978Z",
        url_qr: "https://qr.camarai.com/teraza/3",
        configuracion_whatsapp: { numero_telefono: "+34655667788" }
    },

    // Mesas del área VSDVFD (area_id: 19) - 2 mesas
    {
        id: 45,
        establecimiento_id: 15,
        area_id: 19,
        numero: "1",
        capacidad: 4,
        estado: "ocupada",
        posicion_x: 100,
        posicion_y: 100,
        forma: "cuadrada",
        ancho: 100,
        alto: 100,
        codigo_qr: "QR_VSDVFD_1",
        activo: true,
        created_at: "2025-07-25T05:17:25.563Z",
        updated_at: "2025-07-25T05:17:25.563Z",
        url_qr: "https://qr.camarai.com/vsdvfd/1",
        configuracion_whatsapp: { numero_telefono: "+34699887766" }
    },
    {
        id: 46,
        establecimiento_id: 15,
        area_id: 19,
        numero: "2",
        capacidad: 8,
        estado: "libre",
        posicion_x: 220,
        posicion_y: 100,
        forma: "rectangular",
        ancho: 150,
        alto: 100,
        codigo_qr: "QR_VSDVFD_2",
        activo: true,
        created_at: "2025-07-25T05:17:25.563Z",
        updated_at: "2025-07-25T05:17:25.563Z",
        url_qr: "https://qr.camarai.com/vsdvfd/2",
        configuracion_whatsapp: { numero_telefono: "+34699887766" }
    }
];
export const mockNotificaciones: INotificacion[] = [];
export const mockPagos: IPago[] = [];
export const mockPedidos: IPedido[] = [
    {
        id: 12,
        establecimiento_id: 7,
        mesa_id: 23,
        cliente_id: 1,
        usuario_id: 70,
        tipo: "mesa",
        estado: "en_proceso",
        fecha_pedido: "2025-06-20T20:05:17.724Z",
        fecha_entrega: undefined,
        direccion_entrega: undefined,
        codigo_postal_entrega: undefined,
        ciudad_entrega: undefined,
        telefono_entrega: undefined,
        notas: undefined,
        subtotal: 0.00,
        descuento: 0.00,
        impuestos: 0.00,
        total: 0.00,
        metodo_pago: "efectivo",
        pagado: false,
        codigo_seguimiento: undefined,
        created_at: "2025-06-20T20:05:17.724Z",
        updated_at: "2025-06-20T20:05:17.724Z",
        origen_whatsapp: false,
        sesion_mesa_id: 24,
        tipo_pago_final: "individual",
        fecha_cierre: undefined
    },
    {
        id: 13,
        establecimiento_id: 7,
        mesa_id: 23,
        cliente_id: 2,
        usuario_id: 52,
        tipo: "mesa",
        estado: "en_proceso",
        fecha_pedido: "2025-07-25T19:45:00.000Z",
        fecha_entrega: undefined,
        direccion_entrega: undefined,
        codigo_postal_entrega: undefined,
        ciudad_entrega: undefined,
        telefono_entrega: undefined,
        notas: "Copa de vino tinto",
        subtotal: 68.90,
        descuento: 0.00,
        impuestos: 14.47,
        total: 83.37,
        metodo_pago: "tarjeta",
        pagado: false,
        codigo_seguimiento: undefined,
        created_at: "2025-07-25T19:45:00.000Z",
        updated_at: "2025-07-25T19:45:00.000Z",
        origen_whatsapp: false,
        sesion_mesa_id: 23,
        tipo_pago_final: "individual",
        fecha_cierre: undefined
    },
    {
        id: 14,
        establecimiento_id: 7,
        mesa_id: 24,
        cliente_id: 3,
        usuario_id: 53,
        tipo: "mesa",
        estado: "en_proceso",
        fecha_pedido: "2025-07-25T19:30:00.000Z",
        fecha_entrega: undefined,
        direccion_entrega: undefined,
        codigo_postal_entrega: undefined,
        ciudad_entrega: undefined,
        telefono_entrega: undefined,
        notas: "Sin gluten",
        subtotal: 32.50,
        descuento: 5.00,
        impuestos: 6.83,
        total: 34.33,
        metodo_pago: "tarjeta",
        pagado: false,
        codigo_seguimiento: undefined,
        created_at: "2025-07-25T19:30:00.000Z",
        updated_at: "2025-07-25T19:30:00.000Z",
        origen_whatsapp: false,
        sesion_mesa_id: 25,
        tipo_pago_final: "individual",
        fecha_cierre: undefined
    },
    {
        id: 15,
        establecimiento_id: 7,
        mesa_id: 25,
        cliente_id: 4,
        usuario_id: 54,
        tipo: "mesa",
        estado: "completado",
        fecha_pedido: "2025-07-25T18:15:00.000Z",
        fecha_entrega: "2025-07-25T19:45:00.000Z",
        direccion_entrega: undefined,
        codigo_postal_entrega: undefined,
        ciudad_entrega: undefined,
        telefono_entrega: undefined,
        notas: "Extra picante",
        subtotal: 78.90,
        descuento: 0.00,
        impuestos: 16.57,
        total: 95.47,
        metodo_pago: "efectivo",
        pagado: true,
        codigo_seguimiento: undefined,
        created_at: "2025-07-25T18:15:00.000Z",
        updated_at: "2025-07-25T19:45:00.000Z",
        origen_whatsapp: false,
        sesion_mesa_id: 26,
        tipo_pago_final: "compartido",
        fecha_cierre: "2025-07-25T19:45:00.000Z"
    },
    {
        id: 16,
        establecimiento_id: 7,
        mesa_id: 26,
        cliente_id: 5,
        usuario_id: 70,
        tipo: "mesa",
        estado: "cancelado",
        fecha_pedido: "2025-07-25T20:00:00.000Z",
        fecha_entrega: undefined,
        direccion_entrega: undefined,
        codigo_postal_entrega: undefined,
        ciudad_entrega: undefined,
        telefono_entrega: undefined,
        notas: "Cliente canceló",
        subtotal: 45.00,
        descuento: 0.00,
        impuestos: 9.45,
        total: 54.45,
        metodo_pago: "efectivo",
        pagado: false,
        codigo_seguimiento: undefined,
        created_at: "2025-07-25T20:00:00.000Z",
        updated_at: "2025-07-25T20:15:00.000Z",
        origen_whatsapp: false,
        sesion_mesa_id: 27,
        tipo_pago_final: "individual",
        fecha_cierre: undefined
    },
    {
        id: 17,
        establecimiento_id: 7,
        mesa_id: 27,
        cliente_id: 6,
        usuario_id: 52,
        tipo: "mesa",
        estado: "en_proceso",
        fecha_pedido: "2025-07-25T20:30:00.000Z",
        fecha_entrega: undefined,
        direccion_entrega: undefined,
        codigo_postal_entrega: undefined,
        ciudad_entrega: undefined,
        telefono_entrega: undefined,
        notas: undefined,
        subtotal: 120.75,
        descuento: 15.00,
        impuestos: 25.36,
        total: 131.11,
        metodo_pago: "tarjeta",
        pagado: false,
        codigo_seguimiento: undefined,
        created_at: "2025-07-25T20:30:00.000Z",
        updated_at: "2025-07-25T20:30:00.000Z",
        origen_whatsapp: false,
        sesion_mesa_id: 28,
        tipo_pago_final: "dividido",
        fecha_cierre: undefined
    },
    {
        id: 18,
        establecimiento_id: 7,
        mesa_id: 29,
        cliente_id: 0,
        usuario_id: 53,
        tipo: "mesa",
        estado: "pendiente",
        fecha_pedido: "2025-07-25T21:00:00.000Z",
        fecha_entrega: undefined,
        direccion_entrega: undefined,
        codigo_postal_entrega: undefined,
        ciudad_entrega: undefined,
        telefono_entrega: undefined,
        notas: "Mesa redonda",
        subtotal: 28.50,
        descuento: 0.00,
        impuestos: 5.99,
        total: 34.49,
        metodo_pago: "efectivo",
        pagado: false,
        codigo_seguimiento: undefined,
        created_at: "2025-07-25T21:00:00.000Z",
        updated_at: "2025-07-25T21:00:00.000Z",
        origen_whatsapp: false,
        sesion_mesa_id: 29,
        tipo_pago_final: "individual",
        fecha_cierre: undefined
    }
];
export const mockPedidosIntegracion: IPedidoIntegracion[] = [];
// Mantener permisos inventados ya que no existen en la BD
export const mockPermisos: IPermiso[] = [
    {
        id: 1,
        nombre: "Gestionar personal",
        slug: "gestionar_personal",
        descripcion: "Permite gestionar empleados, horarios y fichajes",
        modulo: "personal",
        created_at: "2025-06-15T11:54:53.179Z",
        updated_at: "2025-06-15T11:54:53.179Z"
    },
    {
        id: 2,
        nombre: "Ver reportes",
        slug: "ver_reportes",
        descripcion: "Permite ver reportes y estadísticas",
        modulo: "reportes",
        created_at: "2025-06-15T11:54:53.179Z",
        updated_at: "2025-06-15T11:54:53.179Z"
    },
    {
        id: 3,
        nombre: "Gestionar mesas",
        slug: "gestionar_mesas",
        descripcion: "Permite gestionar mesas y pedidos",
        modulo: "mesas",
        created_at: "2025-06-15T11:54:53.179Z",
        updated_at: "2025-06-15T11:54:53.179Z"
    },
    {
        id: 4,
        nombre: "Gestionar productos",
        slug: "gestionar_productos",
        descripcion: "Permite gestionar productos y categorías",
        modulo: "productos",
        created_at: "2025-06-15T11:54:53.179Z",
        updated_at: "2025-06-15T11:54:53.179Z"
    },
    {
        id: 5,
        nombre: "Administrar sistema",
        slug: "administrar_sistema",
        descripcion: "Permite administrar configuraciones del sistema",
        modulo: "admin",
        created_at: "2025-06-15T11:54:53.179Z",
        updated_at: "2025-06-15T11:54:53.179Z"
    }
];

// Usar datos reales de roles desde la base de datos con permisos asignados
export const mockRoles: IRol[] = [
    {
        id: 1,
        nombre: "Superadministrador",
        descripcion: "Control total sobre el sistema",
        permisos: {
            modulos: ["personal", "reportes", "mesas", "productos", "admin"],
            acciones: {
                gestionar_personal: true,
                ver_reportes: true,
                gestionar_mesas: true,
                gestionar_productos: true,
                administrar_sistema: true
            }
        },
        created_at: "2025-05-15T06:53:06.188Z",
        updated_at: "2025-05-15T06:53:06.188Z"
    },
    {
        id: 2,
        nombre: "Administrador",
        descripcion: "Gestión completa de la empresa",
        permisos: {
            modulos: ["personal", "reportes", "mesas", "productos", "admin"],
            acciones: {
                gestionar_personal: true,
                ver_reportes: true,
                gestionar_mesas: true,
                gestionar_productos: true,
                administrar_sistema: true
            }
        },
        created_at: "2025-05-15T06:53:06.188Z",
        updated_at: "2025-05-15T06:53:06.188Z"
    },
    {
        id: 3,
        nombre: "Gerente",
        descripcion: "Gestión del establecimiento",
        permisos: {
            modulos: ["personal", "reportes", "mesas"],
            acciones: {
                gestionar_personal: true,
                ver_reportes: true,
                gestionar_mesas: true,
                gestionar_productos: false,
                administrar_sistema: false
            }
        },
        created_at: "2025-05-15T06:53:06.188Z",
        updated_at: "2025-05-15T06:53:06.188Z"
    },
    {
        id: 4,
        nombre: "Camarero",
        descripcion: "Gestión de pedidos y mesas",
        permisos: {
            modulos: ["mesas"],
            acciones: {
                gestionar_personal: false,
                ver_reportes: false,
                gestionar_mesas: true,
                gestionar_productos: false,
                administrar_sistema: false
            }
        },
        created_at: "2025-05-15T06:53:06.188Z",
        updated_at: "2025-05-15T06:53:06.188Z"
    },
    {
        id: 5,
        nombre: "Cocinero",
        descripcion: "Gestión de cocina",
        permisos: {
            modulos: ["productos"],
            acciones: {
                gestionar_personal: false,
                ver_reportes: false,
                gestionar_mesas: false,
                gestionar_productos: true,
                administrar_sistema: false
            }
        },
        created_at: "2025-05-15T06:53:06.188Z",
        updated_at: "2025-05-15T06:53:06.188Z"
    },
    {
        id: 6,
        nombre: "Cajero",
        descripcion: "Gestión de pagos",
        permisos: {
            modulos: ["mesas", "reportes"],
            acciones: {
                gestionar_personal: false,
                ver_reportes: true,
                gestionar_mesas: true,
                gestionar_productos: false,
                administrar_sistema: false
            }
        },
        created_at: "2025-05-15T06:53:06.188Z",
        updated_at: "2025-05-15T06:53:06.188Z"
    }
];

// Actualizar roles_permisos para que coincida con los roles reales
export const mockRolesPermisos: IRolPermiso[] = [
    // Superadministrador (id: 1) - todos los permisos
    { rol_id: 1, permiso_id: 1, created_at: "2025-06-15T11:54:53.179Z" },
    { rol_id: 1, permiso_id: 2, created_at: "2025-06-15T11:54:53.179Z" },
    { rol_id: 1, permiso_id: 3, created_at: "2025-06-15T11:54:53.179Z" },
    { rol_id: 1, permiso_id: 4, created_at: "2025-06-15T11:54:53.179Z" },
    { rol_id: 1, permiso_id: 5, created_at: "2025-06-15T11:54:53.179Z" },
    // Administrador (id: 2) - todos los permisos
    { rol_id: 2, permiso_id: 1, created_at: "2025-06-15T11:54:53.179Z" },
    { rol_id: 2, permiso_id: 2, created_at: "2025-06-15T11:54:53.179Z" },
    { rol_id: 2, permiso_id: 3, created_at: "2025-06-15T11:54:53.179Z" },
    { rol_id: 2, permiso_id: 4, created_at: "2025-06-15T11:54:53.179Z" },
    { rol_id: 2, permiso_id: 5, created_at: "2025-06-15T11:54:53.179Z" },
    // Gerente (id: 3) - permisos limitados
    { rol_id: 3, permiso_id: 1, created_at: "2025-06-15T11:54:53.179Z" },
    { rol_id: 3, permiso_id: 2, created_at: "2025-06-15T11:54:53.179Z" },
    { rol_id: 3, permiso_id: 3, created_at: "2025-06-15T11:54:53.179Z" },
    // Camarero (id: 4) - solo mesas
    { rol_id: 4, permiso_id: 3, created_at: "2025-06-15T11:54:53.179Z" },
    // Cocinero (id: 5) - solo productos
    { rol_id: 5, permiso_id: 4, created_at: "2025-06-15T11:54:53.179Z" },
    // Cajero (id: 6) - mesas y reportes
    { rol_id: 6, permiso_id: 2, created_at: "2025-06-15T11:54:53.179Z" },
    { rol_id: 6, permiso_id: 3, created_at: "2025-06-15T11:54:53.179Z" }
];

// Usar datos reales de roles_usuarios desde la base de datos
export const mockRolesUsuarios: IRolUsuario[] = [
    {
        id: 1,
        usuario_id: 66,
        empresa_id: 14,
        establecimiento_id: 10,
        rol_id: 2, // Administrador
        status: "activo",
        fecha_creacion: "2025-07-15T15:53:40.467Z",
        fecha_actualizacion: "2025-07-15T15:53:40.467Z"
    },
    {
        id: 2,
        usuario_id: 70, // Test User
        empresa_id: 18,
        establecimiento_id: 13,
        rol_id: 2, // Administrador
        status: "activo",
        fecha_creacion: "2025-07-23T18:40:24.076Z",
        fecha_actualizacion: "2025-07-23T18:40:24.076Z"
    },
    {
        id: 3,
        usuario_id: 70, // Test User - duplicado
        empresa_id: 18,
        establecimiento_id: 13,
        rol_id: 2, // Administrador
        status: "activo",
        fecha_creacion: "2025-07-23T18:40:24.076Z",
        fecha_actualizacion: "2025-07-23T18:40:24.076Z"
    },
    {
        id: 4,
        usuario_id: 70, // Test User - más actual
        empresa_id: 19,
        establecimiento_id: 14,
        rol_id: 2, // Administrador
        status: "activo",
        fecha_creacion: "2025-07-24T09:04:21.172Z",
        fecha_actualizacion: "2025-07-24T09:04:21.172Z"
    },
    {
        id: 5,
        usuario_id: 70, // Test User - duplicado
        empresa_id: 19,
        establecimiento_id: 14,
        rol_id: 2, // Administrador
        status: "activo",
        fecha_creacion: "2025-07-24T09:04:21.172Z",
        fecha_actualizacion: "2025-07-24T09:04:21.172Z"
    },
    {
        id: 6,
        usuario_id: 97,
        empresa_id: 22,
        establecimiento_id: 15,
        rol_id: 2, // Administrador
        status: "activo",
        fecha_creacion: "2025-07-25T07:17:25.718Z",
        fecha_actualizacion: "2025-07-25T07:17:25.718Z"
    },
    // Agregar roles inventados para los otros usuarios que no están en la BD
    {
        id: 7,
        usuario_id: 52, // María García
        empresa_id: 19,
        establecimiento_id: 7,
        rol_id: 3, // Gerente
        status: "activo",
        fecha_creacion: "2025-07-15T10:30:00.000Z",
        fecha_actualizacion: "2025-07-15T10:30:00.000Z"
    },
    {
        id: 8,
        usuario_id: 53, // Carlos Rodríguez
        empresa_id: 19,
        establecimiento_id: 7,
        rol_id: 4, // Camarero
        status: "activo",
        fecha_creacion: "2025-07-16T14:20:00.000Z",
        fecha_actualizacion: "2025-07-16T14:20:00.000Z"
    },
    {
        id: 9,
        usuario_id: 54, // Ana Martínez
        empresa_id: 19,
        establecimiento_id: 7,
        rol_id: 5, // Cocinero
        status: "activo",
        fecha_creacion: "2025-07-17T09:15:00.000Z",
        fecha_actualizacion: "2025-07-17T09:15:00.000Z"
    },
    {
        id: 10,
        usuario_id: 55, // Juan López
        empresa_id: 20,
        establecimiento_id: 15,
        rol_id: 2, // Administrador
        status: "activo",
        fecha_creacion: "2025-07-18T11:30:00.000Z",
        fecha_actualizacion: "2025-07-18T11:30:00.000Z"
    },
    {
        id: 11,
        usuario_id: 56, // Lucía Fernández
        empresa_id: 20,
        establecimiento_id: 15,
        rol_id: 3, // Gerente
        status: "activo",
        fecha_creacion: "2025-07-19T16:45:00.000Z",
        fecha_actualizacion: "2025-07-19T16:45:00.000Z"
    },
    {
        id: 12,
        usuario_id: 57, // Pedro Gómez
        empresa_id: 21,
        establecimiento_id: 16,
        rol_id: 2, // Administrador
        status: "activo",
        fecha_creacion: "2025-07-20T09:20:00.000Z",
        fecha_actualizacion: "2025-07-20T09:20:00.000Z"
    },
    {
        id: 13,
        usuario_id: 58, // Sara Morales
        empresa_id: 21,
        establecimiento_id: 16,
        rol_id: 4, // Camarero
        status: "inactivo",
        fecha_creacion: "2025-07-21T14:10:00.000Z",
        fecha_actualizacion: "2025-07-21T14:10:00.000Z"
    },
    {
        id: 14,
        usuario_id: 59, // Miguel Torres
        empresa_id: 3,
        establecimiento_id: 7,
        rol_id: 3, // Gerente
        status: "activo",
        fecha_creacion: "2025-07-22T10:15:00.000Z",
        fecha_actualizacion: "2025-07-22T10:15:00.000Z"
    }
];

export const mockTurnos: ITurno[] = [
    {
        id: 1,
        establecimiento_id: 7,
        nombre: "Mañana",
        hora_inicio: "08:00",
        hora_fin: "16:00",
        dias_semana: ["lunes", "martes", "miercoles", "jueves", "viernes"],
        activo: true,
        created_at: "2025-06-15T11:54:53.179Z",
        updated_at: "2025-06-15T11:54:53.179Z"
    },
    {
        id: 2,
        establecimiento_id: 7,
        nombre: "Tarde",
        hora_inicio: "16:00",
        hora_fin: "00:00",
        dias_semana: ["lunes", "martes", "miercoles", "jueves", "viernes"],
        activo: true,
        created_at: "2025-06-15T11:54:53.179Z",
        updated_at: "2025-06-15T11:54:53.179Z"
    },
    {
        id: 3,
        establecimiento_id: 7,
        nombre: "Fin de semana",
        hora_inicio: "09:00",
        hora_fin: "22:00",
        dias_semana: ["sabado", "domingo"],
        activo: true,
        created_at: "2025-06-15T11:54:53.179Z",
        updated_at: "2025-06-15T11:54:53.179Z"
    },
    {
        id: 4,
        establecimiento_id: 14,
        nombre: "Mañana",
        hora_inicio: "08:00",
        hora_fin: "16:00",
        dias_semana: ["lunes", "martes", "miercoles", "jueves", "viernes"],
        activo: true,
        created_at: "2025-06-15T11:54:53.179Z",
        updated_at: "2025-06-15T11:54:53.179Z"
    }
];

export const mockSesionesMesa: ISesionMesa[] = [];
export const mockVariantesProducto: IVarianteProducto[] = [];
export const mockVerificationCodes: IVerificationCode[] = [];
export const mockWhatsappInstances: IWhatsappInstance[] = [];
export const mockPlanes: IPlan[] = [];
export const mockProductos: IProducto[] = [
    {
        id: 65,
        establecimiento_id: 7,
        categoria_id: "EGOLDXIRH34YTTXDNAU4YTIL",
        nombre: "Calamares a la Romana",
        descripcion: "Anillos de calamar empanizados y fritos hasta quedar crujientes por fuera y jugosos por dentro. Un clásico de la cocina española, servidos con limón.",
        precio: 6.00,
        imagen: 'https://items-images-production.s3.us-west-2.amazonaws.com/files/89b0319570e9eb7fdc4aa124431883b110833465/original.jpeg',
        codigo_barras: undefined,
        referencia: undefined,
        tiempo_preparacion: 0,
        unidad_medida: "unidad",
        es_elaborado: false,
        impuesto: 0.00,
        stock: 1.00,
        stock_minimo: 0.00,
        control_stock: false,
        disponible_carta: true,
        disponible_delivery: true,
        alergenos: undefined,
        opciones: undefined,
        activo: true,
        created_at: "2025-07-09T22:30:20.696Z",
        updated_at: "2025-07-09T22:30:20.696Z",
        identificador: "ECIEPKDCTDC6ZMOJ2RGL2GYU"
    },
    {
        id: 66,
        establecimiento_id: 7,
        categoria_id: "EGOLDXIRH34YTTXDNAU4YTIL",
        nombre: "Rabo de Toro",
        descripcion: "Plato tradicional español en el que el rabo de toro es estofado lentamente con vino tinto, verduras y especias, obteniendo una carne tierna y sabrosa.",
        precio: 13.00,
        imagen: undefined,
        codigo_barras: undefined,
        referencia: undefined,
        tiempo_preparacion: 0,
        unidad_medida: "unidad",
        es_elaborado: false,
        impuesto: 0.00,
        stock: 0.00,
        stock_minimo: 0.00,
        control_stock: false,
        disponible_carta: true,
        disponible_delivery: true,
        alergenos: undefined,
        opciones: undefined,
        activo: true,
        created_at: "2025-07-09T22:30:20.696Z",
        updated_at: "2025-07-09T22:30:20.696Z",
        identificador: "M4MDW4FZFTLOKOWMYH5DDSVN"
    },
    {
        id: 67,
        establecimiento_id: 7,
        categoria_id: "EGOLDXIRH34YTTXDNAU4YTIL",
        nombre: "Sardinas a la Plancha",
        descripcion: "Sardinas frescas asadas a la plancha con sal y aceite de oliva. Servidas con un toque de limón para realzar su sabor.",
        precio: 10.50,
        imagen: undefined,
        codigo_barras: undefined,
        referencia: undefined,
        tiempo_preparacion: 0,
        unidad_medida: "unidad",
        es_elaborado: false,
        impuesto: 0.00,
        stock: 0.00,
        stock_minimo: 0.00,
        control_stock: false,
        disponible_carta: true,
        disponible_delivery: true,
        alergenos: undefined,
        opciones: undefined,
        activo: true,
        created_at: "2025-07-09T22:30:20.696Z",
        updated_at: "2025-07-09T22:30:20.696Z",
        identificador: "BJFYFMJLNC7KTLS2HB4NTGD7"
    },
    {
        id: 68,
        establecimiento_id: 7,
        categoria_id: "EGOLDXIRH34YTTXDNAU4YTIL",
        nombre: "Solomillo al Pedro Ximénez",
        descripcion: "Jugoso solomillo de cerdo cocinado en una delicada salsa de Pedro Ximénez, un vino dulce que aporta un sabor único al plato.",
        precio: 16.00,
        imagen: undefined,
        codigo_barras: undefined,
        referencia: undefined,
        tiempo_preparacion: 0,
        unidad_medida: "unidad",
        es_elaborado: false,
        impuesto: 0.00,
        stock: 0.00,
        stock_minimo: 0.00,
        control_stock: false,
        disponible_carta: false,
        disponible_delivery: false,
        alergenos: undefined,
        opciones: undefined,
        activo: false,
        created_at: "2025-07-09T22:30:20.696Z",
        updated_at: "2025-07-09T22:30:20.696Z",
        identificador: "3TAIV5RXH24K46WJUNWFWEUJ"
    },
    {
        id: 69,
        establecimiento_id: 7,
        categoria_id: "IPKN3O7DVDN5OBD2KSQS5555",
        nombre: "Boquerones Fritos",
        descripcion: "Boquerones frescos fritos en aceite de oliva hasta que alcanzan la perfección crujiente, un plato típico de la cocina andaluza.",
        precio: 7.00,
        imagen: undefined,
        codigo_barras: undefined,
        referencia: undefined,
        tiempo_preparacion: 0,
        unidad_medida: "unidad",
        es_elaborado: false,
        impuesto: 0.00,
        stock: 0.00,
        stock_minimo: 0.00,
        control_stock: false,
        disponible_carta: true,
        disponible_delivery: true,
        alergenos: undefined,
        opciones: undefined,
        activo: true,
        created_at: "2025-07-09T22:30:20.696Z",
        updated_at: "2025-07-09T22:30:20.696Z",
        identificador: "AIPGHX337LUYDAYOUU4NZLVH"
    },
    {
        id: 70,
        establecimiento_id: 7,
        categoria_id: "IPKN3O7DVDN5OBD2KSQS5555",
        nombre: "Croquetas de Jamón",
        descripcion: "Croquetas cremosas por dentro y crujientes por fuera, rellenas de jamón ibérico y hechas con una suave bechamel. Perfectas como entrante o para compartir.",
        precio: 5.00,
        imagen: undefined,
        codigo_barras: undefined,
        referencia: undefined,
        tiempo_preparacion: 0,
        unidad_medida: "unidad",
        es_elaborado: false,
        impuesto: 0.00,
        stock: 0.00,
        stock_minimo: 0.00,
        control_stock: false,
        disponible_carta: true,
        disponible_delivery: true,
        alergenos: undefined,
        opciones: undefined,
        activo: true,
        created_at: "2025-07-09T22:30:20.696Z",
        updated_at: "2025-07-09T22:30:20.696Z",
        identificador: "JLCXTGSYCKORXJDJALHDM2X6"
    },
    {
        id: 71,
        establecimiento_id: 7,
        categoria_id: "IPKN3O7DVDN5OBD2KSQS5555",
        nombre: "Pimientos de Padrón",
        descripcion: "Pimientos verdes fritos en aceite de oliva y espolvoreados con sal gruesa. Unos son dulces, otros picantes, pero todos deliciosos.",
        precio: 4.20,
        imagen: undefined,
        codigo_barras: undefined,
        referencia: undefined,
        tiempo_preparacion: 0,
        unidad_medida: "unidad",
        es_elaborado: false,
        impuesto: 0.00,
        stock: 0.00,
        stock_minimo: 0.00,
        control_stock: false,
        disponible_carta: false,
        disponible_delivery: false,
        alergenos: undefined,
        opciones: undefined,
        activo: false,
        created_at: "2025-07-09T22:30:20.696Z",
        updated_at: "2025-07-09T22:30:20.696Z",
        identificador: "VVJCHPGEM3LV7OYGGTNBW4TI"
    },
    {
        id: 72,
        establecimiento_id: 7,
        categoria_id: "IPKN3O7DVDN5OBD2KSQS5555",
        nombre: "Pulpo a la Gallega",
        descripcion: "Sencillo y delicioso entrante español que combina la intensidad del queso manchego curado con el toque dulce del membrillo. Un clásico para los amantes del buen queso.",
        precio: 15.00,
        imagen: undefined,
        codigo_barras: undefined,
        referencia: undefined,
        tiempo_preparacion: 0,
        unidad_medida: "unidad",
        es_elaborado: false,
        impuesto: 0.00,
        stock: 0.00,
        stock_minimo: 0.00,
        control_stock: false,
        disponible_carta: false,
        disponible_delivery: false,
        alergenos: undefined,
        opciones: undefined,
        activo: false,
        created_at: "2025-07-09T22:30:20.696Z",
        updated_at: "2025-07-09T22:30:20.696Z",
        identificador: "HAF2KSM6S2W4FJKCJWQSBHMI"
    },
    {
        id: 73,
        establecimiento_id: 7,
        categoria_id: "EGOLDXIRH34YTTXDNAU4YTIL",
        nombre: "Tomate Pera",
        descripcion: "Tomates pera frescos para ensaladas y guarniciones",
        precio: 2.50,
        imagen: undefined,
        codigo_barras: undefined,
        referencia: undefined,
        tiempo_preparacion: 0,
        unidad_medida: "kg",
        es_elaborado: false,
        impuesto: 0.00,
        stock: 4.00,
        stock_minimo: 2.00,
        control_stock: true,
        disponible_carta: true,
        disponible_delivery: true,
        alergenos: undefined,
        opciones: undefined,
        activo: true,
        created_at: "2025-07-09T22:30:20.696Z",
        updated_at: "2025-07-09T22:30:20.696Z",
        identificador: "TOMATEPERA123"
    },
    {
        id: 74,
        establecimiento_id: 7,
        categoria_id: "4F4A4W7IPZDJPFAL7S4HTBT3",
        nombre: "Lechuga Romana",
        descripcion: "Lechuga romana fresca para ensaladas",
        precio: 1.20,
        imagen: undefined,
        codigo_barras: undefined,
        referencia: undefined,
        tiempo_preparacion: 0,
        unidad_medida: "unidades",
        es_elaborado: false,
        impuesto: 0.00,
        stock: 12.00,
        stock_minimo: 5.00,
        control_stock: true,
        disponible_carta: true,
        disponible_delivery: true,
        alergenos: undefined,
        opciones: undefined,
        activo: true,
        created_at: "2025-07-09T22:30:20.696Z",
        updated_at: "2025-07-09T22:30:20.696Z",
        identificador: "LECHUGAROMANA456"
    },
    {
        id: 75,
        establecimiento_id: 7,
        categoria_id: "EGOLDXIRH34YTTXDNAU4YTIL",
        nombre: "Patata Agria",
        descripcion: "Patatas agrias para freír y guarniciones",
        precio: 0.80,
        imagen: undefined,
        codigo_barras: undefined,
        referencia: undefined,
        tiempo_preparacion: 0,
        unidad_medida: "kg",
        es_elaborado: false,
        impuesto: 0.00,
        stock: 50.00,
        stock_minimo: 20.00,
        control_stock: true,
        disponible_carta: true,
        disponible_delivery: true,
        alergenos: undefined,
        opciones: undefined,
        activo: true,
        created_at: "2025-07-09T22:30:20.696Z",
        updated_at: "2025-07-09T22:30:20.696Z",
        identificador: "PATATAAGRIA789"
    },
    {
        id: 76,
        establecimiento_id: 7,
        categoria_id: "EGOLDXIRH34YTTXDNAU4YTIL",
        nombre: "Pimiento Rojo",
        descripcion: "Pimientos rojos frescos para guarniciones",
        precio: 3.20,
        imagen: undefined,
        codigo_barras: undefined,
        referencia: undefined,
        tiempo_preparacion: 0,
        unidad_medida: "kg",
        es_elaborado: false,
        impuesto: 0.00,
        stock: 10.00,
        stock_minimo: 5.00,
        control_stock: true,
        disponible_carta: true,
        disponible_delivery: true,
        alergenos: undefined,
        opciones: undefined,
        activo: true,
        created_at: "2025-07-09T22:30:20.696Z",
        updated_at: "2025-07-09T22:30:20.696Z",
        identificador: "PIMIENTOROJO101"
    },
    {
        id: 77,
        establecimiento_id: 7,
        categoria_id: "EGOLDXIRH34YTTXDNAU4YTIL",
        nombre: "Ajo",
        descripcion: "Ajos frescos para condimentar",
        precio: 4.50,
        imagen: undefined,
        codigo_barras: undefined,
        referencia: undefined,
        tiempo_preparacion: 0,
        unidad_medida: "kg",
        es_elaborado: false,
        impuesto: 0.00,
        stock: 5.00,
        stock_minimo: 3.00,
        control_stock: true,
        disponible_carta: true,
        disponible_delivery: true,
        alergenos: undefined,
        opciones: undefined,
        activo: true,
        created_at: "2025-07-09T22:30:20.696Z",
        updated_at: "2025-07-09T22:30:20.696Z",
        identificador: "AJO202"
    },
    {
        id: 78,
        establecimiento_id: 7,
        categoria_id: "EGOLDXIRH34YTTXDNAU4YTIL",
        nombre: "Solomillo de Ternera",
        descripcion: "Solomillo de ternera de alta calidad",
        precio: 25.00,
        imagen: undefined,
        codigo_barras: undefined,
        referencia: undefined,
        tiempo_preparacion: 0,
        unidad_medida: "kg",
        es_elaborado: false,
        impuesto: 0.00,
        stock: 1.00,
        stock_minimo: 2.00,
        control_stock: true,
        disponible_carta: true,
        disponible_delivery: true,
        alergenos: undefined,
        opciones: undefined,
        activo: true,
        created_at: "2025-07-09T22:30:20.696Z",
        updated_at: "2025-07-09T22:30:20.696Z",
        identificador: "SOLOMILLOTERNERA303"
    },
    {
        id: 79,
        establecimiento_id: 7,
        categoria_id: "EGOLDXIRH34YTTXDNAU4YTIL",
        nombre: "Pechuga de Pollo",
        descripcion: "Pechugas de pollo frescas",
        precio: 8.50,
        imagen: undefined,
        codigo_barras: undefined,
        referencia: undefined,
        tiempo_preparacion: 0,
        unidad_medida: "kg",
        es_elaborado: false,
        impuesto: 0.00,
        stock: 3.00,
        stock_minimo: 5.00,
        control_stock: true,
        disponible_carta: true,
        disponible_delivery: true,
        alergenos: undefined,
        opciones: undefined,
        activo: true,
        created_at: "2025-07-09T22:30:20.696Z",
        updated_at: "2025-07-09T22:30:20.696Z",
        identificador: "POLLO404"
    },
    {
        id: 80,
        establecimiento_id: 7,
        categoria_id: "KQQRH2Q7TSJQH4AXO6B5BHCD",
        nombre: "Cerveza Mahou",
        descripcion: "Cerveza Mahou clásica",
        precio: 2.50,
        imagen: undefined,
        codigo_barras: undefined,
        referencia: undefined,
        tiempo_preparacion: 0,
        unidad_medida: "unidades",
        es_elaborado: false,
        impuesto: 0.00,
        stock: 24.00,
        stock_minimo: 12.00,
        control_stock: true,
        disponible_carta: true,
        disponible_delivery: true,
        alergenos: undefined,
        opciones: undefined,
        activo: true,
        created_at: "2025-07-09T22:30:20.696Z",
        updated_at: "2025-07-09T22:30:20.696Z",
        identificador: "CERVEZAMAHOU505"
    },
    {
        id: 81,
        establecimiento_id: 7,
        categoria_id: "KQQRH2Q7TSJQH4AXO6B5BHCD",
        nombre: "Vino Tinto Rioja",
        descripcion: "Vino tinto Rioja crianza",
        precio: 15.00,
        imagen: undefined,
        codigo_barras: undefined,
        referencia: undefined,
        tiempo_preparacion: 0,
        unidad_medida: "botellas",
        es_elaborado: false,
        impuesto: 0.00,
        stock: 6.00,
        stock_minimo: 3.00,
        control_stock: true,
        disponible_carta: true,
        disponible_delivery: true,
        alergenos: undefined,
        opciones: undefined,
        activo: true,
        created_at: "2025-07-09T22:30:20.696Z",
        updated_at: "2025-07-09T22:30:20.696Z",
        identificador: "VINORIOJA606"
    }
];
// ============================================================================
// MOCKUPS PARA SISTEMA DE CARTAS
// ============================================================================

/**
 * Mockup de cartas que combinan categorías y productos
 * Estas cartas representan diferentes vistas del menú
 */
export const mockCartas: ICarta[] = [
    {
        id: '1',
        nombre: 'Carta Principal',
        icono: 'utensils',
        activo: true,
        aforoTotal: 8, // Total de productos en esta carta
        mesas: 0,
        mesasActivas: 0,
        estado: 'Abierto',
        porcentajeOcupacion: 0,
        colorBorde: 'rgb(120, 163, 237)',
        categorias: [
            {
                ...mockCategorias[0], // Platos de la Casa
                productos: mockProductos.filter(p => p.categoria_id === "EGOLDXIRH34YTTXDNAU4YTIL"),
                totalProductos: 4,
                productosActivos: 4
            },
            {
                ...mockCategorias[1], // Tapas & Entrantes
                productos: mockProductos.filter(p => p.categoria_id === "IPKN3O7DVDN5OBD2KSQS5555"),
                totalProductos: 5,
                productosActivos: 5
            }
        ]
    },
    {
        id: '2',
        nombre: 'Carta de Bebidas',
        icono: 'coffee',
        activo: true,
        aforoTotal: 4, // Total de productos en esta carta
        mesas: 0,
        mesasActivas: 0,
        estado: 'Abierto',
        porcentajeOcupacion: 0,
        colorBorde: 'rgb(247, 183, 49)',
        categorias: [
            {
                ...mockCategorias[3], // Bebidas (asumiendo que es el índice 3)
                productos: mockProductos.filter(p => p.categoria_id === "KQQRH2Q7TSJQH4AXO6B5BHCD"),
                totalProductos: 8,
                productosActivos: 8
            }
        ]
    },
    {
        id: '3',
        nombre: 'Menús Especiales',
        icono: 'sun',
        activo: true,
        aforoTotal: 3, // Total de productos en esta carta
        mesas: 0,
        mesasActivas: 0,
        estado: 'Abierto',
        porcentajeOcupacion: 0,
        colorBorde: 'rgb(251, 191, 36)',
        categorias: [
            {
                ...mockCategorias[4], // Ensaladas (asumiendo que es el índice 4)
                productos: mockProductos.filter(p => p.categoria_id === "4F4A4W7IPZDJPFAL7S4HTBT3"),
                totalProductos: 2,
                productosActivos: 2
            },
            {
                ...mockCategorias[5], // Paellas (asumiendo que es el índice 5)
                productos: mockProductos.filter(p => p.categoria_id === "HHENOKL4G7XTSZNDZC42LFXF"),
                totalProductos: 2,
                productosActivos: 2
            }
        ]
    },
    {
        id: '4',
        nombre: 'Nueva Carta 4',
        icono: 'utensils',
        activo: true,
        aforoTotal: 0,
        mesas: 0,
        mesasActivas: 0,
        estado: 'Abierto',
        porcentajeOcupacion: 0,
        colorBorde: 'rgb(120, 163, 237)',
        categorias: []
    },
    {
        id: '5',
        nombre: 'Nueva Carta 5',
        icono: 'utensils',
        activo: true,
        aforoTotal: 0,
        mesas: 0,
        mesasActivas: 0,
        estado: 'Abierto',
        porcentajeOcupacion: 0,
        colorBorde: 'rgb(120, 163, 237)',
        categorias: []
    }
];

export const mockProductosIdiomas: IProductoIdioma[] = [];
export const mockProveedores: IProveedor[] = [];

// ============================================================================
// FUNCIONES DE MOCKUP PARA SIMULAR APIs
// ============================================================================

/**
 * Función mock para simular fetch de áreas
 * 
 * MIGRACIÓN FUTURA:
 * Cambiar fetchAreas() por fetch('/api/areas')
 * 
 * Ejemplo de migración:
 * - ANTES: const areas = await fetchAreas();
 * - DESPUÉS: const response = await fetch('/api/areas'); const areas = await response.json();
 */
export const fetchAreas = async (): Promise<IArea[]> => {
    // Simular delay de red
    // await new Promise(resolve => setTimeout(resolve, 100));
    const response = await fetch('/api/areas');
    const areas = await response.json();
    // console.log('areas', areas);
    return areas;
};

/**
 * Función mock para simular fetch de empresas
 * 
 * MIGRACIÓN FUTURA:
 * Cambiar fetchEmpresas() por fetch('/api/empresas')
 * 
 * Ejemplo de migración:
 * - ANTES: const empresas = await fetchEmpresas();
 * - DESPUÉS: const response = await fetch('/api/empresas'); const empresas = await response.json();
 */
export const fetchEmpresas = async (): Promise<IEmpresa[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockEmpresas;
};

/**
 * Función mock para simular fetch de establecimientos
 * 
 * MIGRACIÓN FUTURA:
 * Cambiar fetchEstablecimientos() por fetch('/api/establecimientos')
 * 
 * Ejemplo de migración:
 * - ANTES: const establecimientos = await fetchEstablecimientos();
 * - DESPUÉS: const response = await fetch('/api/establecimientos'); const establecimientos = await response.json();
 */
export const fetchEstablecimientos = async (): Promise<IEstablecimiento[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockEstablecimientos;
};

/**
 * Función mock para simular fetch de usuarios
 * 
 * MIGRACIÓN FUTURA:
 * Cambiar fetchUsuarios() por fetch('/api/usuarios')
 * 
 * Ejemplo de migración:
 * - ANTES: const usuarios = await fetchUsuarios();
 * - DESPUÉS: const response = await fetch('/api/usuarios'); const usuarios = await response.json();
 */
export const fetchUsuarios = async (): Promise<IUsuario[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockUsuarios;
};

/**
 * Función mock para simular fetch de categorías
 * 
 * MIGRACIÓN FUTURA:
 * Cambiar fetchCategorias() por fetch('/api/categorias')
 * 
 * Ejemplo de migración:
 * - ANTES: const categorias = await fetchCategorias();
 * - DESPUÉS: const response = await fetch('/api/categorias'); const categorias = await response.json();
 */
export const fetchCategorias = async (): Promise<ICategoria[]> => {
    // await new Promise(resolve => setTimeout(resolve, 100));
    const response = await fetch('/api/categorias');
    const categorias = await response.json();
    console.log('categorias', categorias);
    return categorias;
};

/**
 * Función mock para simular fetch de clientes
 * 
 * MIGRACIÓN FUTURA:
 * Cambiar fetchClientes() por fetch('/api/clientes')
 * 
 * Ejemplo de migración:
 * - ANTES: const clientes = await fetchClientes();
 * - DESPUÉS: const response = await fetch('/api/clientes'); const clientes = await response.json();
 */
export const fetchClientes = async (): Promise<ICliente[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockClientes;
};

/**
 * Función mock para simular fetch de configuraciones
 * 
 * MIGRACIÓN FUTURA:
 * Cambiar fetchConfiguraciones() por fetch('/api/configuraciones')
 * 
 * Ejemplo de migración:
 * - ANTES: const configuraciones = await fetchConfiguraciones();
 * - DESPUÉS: const response = await fetch('/api/configuraciones'); const configuraciones = await response.json();
 */
export const fetchConfiguraciones = async (): Promise<IConfiguracion[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockConfiguraciones;
};

/**
 * Función mock para simular fetch de mesas
 * 
 * MIGRACIÓN FUTURA:
 * Cambiar fetchMesas() por fetch('/api/mesas')
 * 
 * Ejemplo de migración:
 * - ANTES: const mesas = await fetchMesas();
 * - DESPUÉS: const response = await fetch('/api/mesas'); const mesas = await response.json();
 */
export const fetchMesas = async (): Promise<IMesa[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockMesas;
};

/**
 * Función mock para simular fetch de pedidos
 * 
 * MIGRACIÓN FUTURA:
 * Cambiar fetchPedidos() por fetch('/api/pedidos')
 * 
 * Ejemplo de migración:
 * - ANTES: const pedidos = await fetchPedidos();
 * - DESPUÉS: const response = await fetch('/api/pedidos'); const pedidos = await response.json();
 */
export const fetchPedidos = async (): Promise<IPedido[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockPedidos;
};

/**
 * Función mock para simular fetch de impuestos
 * 
 * MIGRACIÓN FUTURA:
 * Cambiar fetchImpuestos() por fetch('/api/impuestos')
 * 
 * Ejemplo de migración:
 * - ANTES: const impuestos = await fetchImpuestos();
 * - DESPUÉS: const response = await fetch('/api/impuestos'); const impuestos = await response.json();
 */
export const fetchImpuestos = async (): Promise<IImpuesto[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockImpuestos;
};

/**
 * Función mock para simular fetch de permisos
 * 
 * MIGRACIÓN FUTURA:
 * Cambiar fetchPermisos() por fetch('/api/permisos')
 */
export const fetchPermisos = async (): Promise<IPermiso[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockPermisos;
};

/**
 * Función mock para simular fetch de roles
 * 
 * MIGRACIÓN FUTURA:
 * Cambiar fetchRoles() por fetch('/api/roles')
 */
export const fetchRoles = async (): Promise<IRol[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockRoles;
};

/**
 * Función mock para simular fetch de roles de usuario
 * 
 * MIGRACIÓN FUTURA:
 * Cambiar fetchRolesUsuarios() por fetch('/api/roles-usuarios')
 */
export const fetchRolesUsuarios = async (): Promise<IRolUsuario[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockRolesUsuarios;
};

/**
 * Función mock para simular fetch de turnos
 * 
 * MIGRACIÓN FUTURA:
 * Cambiar fetchTurnos() por fetch('/api/turnos')
 */
export const fetchTurnos = async (): Promise<ITurno[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockTurnos;
};

// ============================================================================
// FUNCIONES MOCK PARA SISTEMA DE CARTAS
// ============================================================================

/**
 * Función mock para obtener productos
 */
export const fetchProductos = async (): Promise<IProducto[]> => {
    // await new Promise(resolve => setTimeout(resolve, 100));
    const response = await fetch('/api/productos');
    const productos = await response.json();
    console.log('productos', productos);
    return productos;
};

/**
 * Función mock para obtener cartas
 */
export const fetchCartas = async (): Promise<ICarta[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockCartas;
};

// ============================================================================
// EXPORTACIONES
// ============================================================================

export const mockData = {
    areas: mockAreas,
    empresas: mockEmpresas,
    establecimientos: mockEstablecimientos,
    usuarios: mockUsuarios,
    categorias: mockCategorias,
    clientes: mockClientes,
    configuraciones: mockConfiguraciones,
    arqueosCaja: mockArqueosCaja,
    auditoriaCambiosPago: mockAuditoriaCambiosPago,
    categoriasIdiomas: mockCategoriasIdiomas,
    compras: mockCompras,
    detallesCompra: mockDetallesCompra,
    detallesFactura: mockDetallesFactura,
    detallesPedido: mockDetallesPedido,
    estadisticas: mockEstadisticas,
    facturas: mockFacturas,
    idiomas: mockIdiomas,
    impuestos: mockImpuestos,
    integraciones: mockIntegraciones,
    logs: mockLogs,
    mesas: mockMesas,
    notificaciones: mockNotificaciones,
    pagos: mockPagos,
    pedidos: mockPedidos,
    pedidosIntegracion: mockPedidosIntegracion,
    permisos: mockPermisos,
    planes: mockPlanes,
    productos: mockProductos,
    productosIdiomas: mockProductosIdiomas,
    proveedores: mockProveedores,
    roles: mockRoles,
    rolesPermisos: mockRolesPermisos,
    rolesUsuarios: mockRolesUsuarios,
    sesionesMesa: mockSesionesMesa,
    turnos: mockTurnos,
    variantesProducto: mockVariantesProducto,
    verificationCodes: mockVerificationCodes,
    whatsappInstances: mockWhatsappInstances,
    cartas: mockCartas
};

export const mockApi = {
    fetchAreas,
    fetchEmpresas,
    fetchEstablecimientos,
    fetchUsuarios,
    fetchCategorias,
    fetchClientes,
    fetchConfiguraciones,
    fetchMesas,
    fetchPedidos,
    fetchImpuestos,
    fetchPermisos,
    fetchRoles,
    fetchRolesUsuarios,
    fetchTurnos,
    fetchProductos,
    fetchCartas
};
