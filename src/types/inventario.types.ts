import type { IProducto, ICategoria } from './database.types';

export interface IInventarioItem {
    id: number;
    nombre: string;
    categoria: string;
    stockActual: number;
    stockMinimo: number;
    unidadMedida: string;
    controlStock: boolean;
    activo: boolean;
    imagen?: string;
    precio: number;
    categoriaId?: string;
    establecimientoId: number;
}

export interface IInventarioData {
    productos: IProducto[];
    categorias: ICategoria[];
    inventarioItems: IInventarioItem[];
}
