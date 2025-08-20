import type { IUsuario, IRol, IPermiso, ITurno, IEmpresa, IEstablecimiento } from './database.types';

/**
 * Interfaz extendida para empleados que combina IUsuario con campos adicionales
 * necesarios para el módulo de gestión de personal
 */
export interface IEmpleado extends Omit<IUsuario, 'estado' | 'id'> {
    // ID opcional para permitir empleados nuevos
    id?: number;
    // Campos adicionales para el módulo de personal
    puesto?: string;
    puestos?: string[];
    nif?: string;
    numeroSeguridadSocial?: string;
    cifEmpresa?: string; // CIF de la empresa a la que pertenece el empleado
    // Estado específico para personal (puede ser diferente al estado de usuario)
    estado?: 'activo' | 'inactivo';
    // Campos que pueden no estar en IUsuario pero son necesarios
    nombreCompleto?: string;
    // Campo de imagen específico para personal
    imagen?: string | null;
    // Relaciones con datos de la base de datos
    rol?: IRol;
    permisos?: IPermiso[];
    turnos?: ITurno[];
    empresa?: IEmpresa;
    establecimiento?: IEstablecimiento;
}

/**
 * Tipo para el estado de un empleado
 */
export type EstadoEmpleado = 'activo' | 'inactivo';

/**
 * Tipo para los puestos de trabajo
 */
export type PuestoEmpleado =
    | 'Manager'
    | 'Camarero'
    | 'Cocinero'
    | 'Barista'
    | 'Recepcionista'
    | 'Chef ejecutivo'
    | 'Ayudante de cocina'
    | 'Supervisor'
    | 'Anfitrión'
    | 'Propietario'
    | 'Director'
    | 'Encargado de restaurante'
    | 'Segundo de cocina'
    | 'Sommelier'
    | 'Personal de limpieza'
    | 'Administración'
    | 'Seguridad'
    | 'Mantenimiento'
    | 'Delivery'
    | 'Preparador de alimentos';

/**
 * Categorías de puestos de trabajo
 */
export interface CategoriaPuestos {
    "Dirección y gestión": PuestoEmpleado[];
    "Cocina": PuestoEmpleado[];
    "Servicio": PuestoEmpleado[];
    "Otros": PuestoEmpleado[];
}

/**
 * Datos de horario de trabajo
 */
export interface HorarioTrabajo {
    dia: string;
    entrada: string;
    salida: string;
    activo: boolean;
}

/**
 * Datos de disponibilidad
 */
export interface DisponibilidadEmpleado {
    dia: string;
    disponible: boolean;
    horarioInicio?: string;
    horarioFin?: string;
}

/**
 * Datos de fichaje
 */
export interface FichajeEmpleado {
    id: string;
    fecha: string;
    entrada: string;
    salida?: string;
    horasTrabajadas?: string;
    estado: 'entrada' | 'salida';
}

/**
 * Datos de documento
 */
export interface DocumentoEmpleado {
    id: string;
    nombre: string;
    tipo: string;
    fechaSubida: string;
    estado: 'pendiente' | 'aprobado' | 'rechazado';
    archivo?: File;
}

/**
 * Datos completos de empleado con todas las relaciones
 */
export interface IEmpleadoCompleto extends IEmpleado {
    // Relaciones cargadas desde la base de datos
    rol: IRol;
    permisos: IPermiso[];
    turnos: ITurno[];
    empresa: IEmpresa;
    establecimiento: IEstablecimiento;
    // Datos adicionales calculados
    permisosNombres: string[];
    turnosNombres: string[];
    diasDisponibles: string[];
}

/**
 * Datos para mostrar en la lista de empleados
 */
export interface IEmpleadoResumen {
    id: number;
    nombreCompleto: string;
    email: string;
    telefono: string;
    puesto: string;
    estado: EstadoEmpleado;
    imagen?: string | null;
    empresa: string;
    establecimiento: string;
    rol: string;
    ultimoLogin?: string;
}
