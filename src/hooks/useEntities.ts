import { useState, useEffect, useCallback } from 'react';
import {
    areasService,
    empresasService,
    establecimientosService,
    categoriasService,
    productosService,
    mesasService,
    proveedoresService
} from '../services/api';

// ============================================================================
// HOOK PARA ÁREAS
// ============================================================================

export const useAreas = (establecimientoId: number) => {
    const [areas, setAreas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAreas = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await areasService.getAreas(establecimientoId);
            setAreas(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar áreas');
        } finally {
            setLoading(false);
        }
    }, [establecimientoId]);

    const createArea = useCallback(async (areaData: any) => {
        try {
            await areasService.createArea(areaData);
            await fetchAreas(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear área');
            return { success: false, error: err instanceof Error ? err.message : 'Error al crear área' };
        }
    }, [fetchAreas]);

    const updateArea = useCallback(async (id: number, areaData: any) => {
        try {
            await areasService.updateArea(id, areaData);
            await fetchAreas(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar área');
            return { success: false, error: err instanceof Error ? err.message : 'Error al actualizar área' };
        }
    }, [fetchAreas]);

    const deleteArea = useCallback(async (id: number) => {
        try {
            await areasService.deleteArea(id);
            await fetchAreas(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar área');
            return { success: false, error: err instanceof Error ? err.message : 'Error al eliminar área' };
        }
    }, [fetchAreas]);

    useEffect(() => {
        fetchAreas();
    }, [fetchAreas]);

    return {
        areas,
        loading,
        error,
        refetch: fetchAreas,
        createArea,
        updateArea,
        deleteArea
    };
};

// ============================================================================
// HOOK PARA EMPRESAS
// ============================================================================

export const useEmpresas = () => {
    const [empresas, setEmpresas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEmpresas = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await empresasService.getEmpresas();
            setEmpresas(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar empresas');
        } finally {
            setLoading(false);
        }
    }, []);

    const createEmpresa = useCallback(async (empresaData: any) => {
        try {
            await empresasService.createEmpresa(empresaData);
            await fetchEmpresas(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear empresa');
            return { success: false, error: err instanceof Error ? err.message : 'Error al crear empresa' };
        }
    }, [fetchEmpresas]);

    const updateEmpresa = useCallback(async (id: number, empresaData: any) => {
        try {
            await empresasService.updateEmpresa(id, empresaData);
            await fetchEmpresas(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar empresa');
            return { success: false, error: err instanceof Error ? err.message : 'Error al actualizar empresa' };
        }
    }, [fetchEmpresas]);

    const deleteEmpresa = useCallback(async (id: number) => {
        try {
            await empresasService.deleteEmpresa(id);
            await fetchEmpresas(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar empresa');
            return { success: false, error: err instanceof Error ? err.message : 'Error al eliminar empresa' };
        }
    }, [fetchEmpresas]);

    useEffect(() => {
        fetchEmpresas();
    }, [fetchEmpresas]);

    return {
        empresas,
        loading,
        error,
        refetch: fetchEmpresas,
        createEmpresa,
        updateEmpresa,
        deleteEmpresa
    };
};

// ============================================================================
// HOOK PARA ESTABLECIMIENTOS
// ============================================================================

export const useEstablecimientos = (empresaId: number) => {
    const [establecimientos, setEstablecimientos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEstablecimientos = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await establecimientosService.getEstablecimientos(empresaId);
            setEstablecimientos(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar establecimientos');
        } finally {
            setLoading(false);
        }
    }, [empresaId]);

    const createEstablecimiento = useCallback(async (establecimientoData: any) => {
        try {
            await establecimientosService.createEstablecimiento(establecimientoData);
            await fetchEstablecimientos(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear establecimiento');
            return { success: false, error: err instanceof Error ? err.message : 'Error al crear establecimiento' };
        }
    }, [fetchEstablecimientos]);

    const updateEstablecimiento = useCallback(async (id: number, establecimientoData: any) => {
        try {
            await establecimientosService.updateEstablecimiento(id, establecimientoData);
            await fetchEstablecimientos(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar establecimiento');
            return { success: false, error: err instanceof Error ? err.message : 'Error al actualizar establecimiento' };
        }
    }, [fetchEstablecimientos]);

    const deleteEstablecimiento = useCallback(async (id: number) => {
        try {
            await establecimientosService.deleteEstablecimiento(id);
            await fetchEstablecimientos(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar establecimiento');
            return { success: false, error: err instanceof Error ? err.message : 'Error al eliminar establecimiento' };
        }
    }, [fetchEstablecimientos]);

    useEffect(() => {
        fetchEstablecimientos();
    }, [fetchEstablecimientos]);

    return {
        establecimientos,
        loading,
        error,
        refetch: fetchEstablecimientos,
        createEstablecimiento,
        updateEstablecimiento,
        deleteEstablecimiento
    };
};

// ============================================================================
// HOOK PARA CATEGORÍAS
// ============================================================================

export const useCategorias = (establecimientoId: number) => {
    const [categorias, setCategorias] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategorias = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await categoriasService.getCategorias(establecimientoId);
            setCategorias(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar categorías');
        } finally {
            setLoading(false);
        }
    }, [establecimientoId]);

    const createCategoria = useCallback(async (categoriaData: any) => {
        try {
            await categoriasService.createCategoria(categoriaData);
            await fetchCategorias(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear categoría');
            return { success: false, error: err instanceof Error ? err.message : 'Error al crear categoría' };
        }
    }, [fetchCategorias]);

    const updateCategoria = useCallback(async (id: number, categoriaData: any) => {
        try {
            await categoriasService.updateCategoria(id, categoriaData);
            await fetchCategorias(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar categoría');
            return { success: false, error: err instanceof Error ? err.message : 'Error al actualizar categoría' };
        }
    }, [fetchCategorias]);

    const deleteCategoria = useCallback(async (id: number) => {
        try {
            await categoriasService.deleteCategoria(id);
            await fetchCategorias(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar categoría');
            return { success: false, error: err instanceof Error ? err.message : 'Error al eliminar categoría' };
        }
    }, [fetchCategorias]);

    useEffect(() => {
        fetchCategorias();
    }, [fetchCategorias]);

    return {
        categorias,
        loading,
        error,
        refetch: fetchCategorias,
        createCategoria,
        updateCategoria,
        deleteCategoria
    };
};

// ============================================================================
// HOOK PARA PRODUCTOS
// ============================================================================

export const useProductos = (establecimientoId: number, categoriaId?: string | number) => {
    const [productos, setProductos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProductos = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await productosService.getProductos(establecimientoId, categoriaId);
            setProductos(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar productos');
        } finally {
            setLoading(false);
        }
    }, [establecimientoId, categoriaId]);

    const createProducto = useCallback(async (productoData: any) => {
        try {
            await productosService.createProducto(productoData);
            await fetchProductos(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear producto');
            return { success: false, error: err instanceof Error ? err.message : 'Error al crear producto' };
        }
    }, [fetchProductos]);

    const updateProducto = useCallback(async (id: number, productoData: any) => {
        try {
            await productosService.updateProducto(id, productoData);
            await fetchProductos(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar producto');
            return { success: false, error: err instanceof Error ? err.message : 'Error al actualizar producto' };
        }
    }, [fetchProductos]);

    const deleteProducto = useCallback(async (id: number) => {
        try {
            await productosService.deleteProducto(id);
            await fetchProductos(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar producto');
            return { success: false, error: err instanceof Error ? err.message : 'Error al eliminar producto' };
        }
    }, [fetchProductos]);

    useEffect(() => {
        fetchProductos();
    }, [fetchProductos]);

    return {
        productos,
        loading,
        error,
        refetch: fetchProductos,
        createProducto,
        updateProducto,
        deleteProducto
    };
};

// ============================================================================
// HOOK PARA MESAS
// ============================================================================

export const useMesas = (establecimientoId: number) => {
    const [mesas, setMesas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMesas = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await mesasService.getMesas(establecimientoId);
            setMesas(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar mesas');
        } finally {
            setLoading(false);
        }
    }, [establecimientoId]);

    const createMesa = useCallback(async (mesaData: any) => {
        try {
            await mesasService.createMesa(mesaData);
            await fetchMesas(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear mesa');
            return { success: false, error: err instanceof Error ? err.message : 'Error al crear mesa' };
        }
    }, [fetchMesas]);

    const updateMesa = useCallback(async (id: number, mesaData: any) => {
        try {
            await mesasService.updateMesa(id, mesaData);
            await fetchMesas(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar mesa');
            return { success: false, error: err instanceof Error ? err.message : 'Error al actualizar mesa' };
        }
    }, [fetchMesas]);

    const deleteMesa = useCallback(async (id: number) => {
        try {
            await mesasService.deleteMesa(id);
            await fetchMesas(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar mesa');
            return { success: false, error: err instanceof Error ? err.message : 'Error al eliminar mesa' };
        }
    }, [fetchMesas]);

    useEffect(() => {
        fetchMesas();
    }, [fetchMesas]);

    return {
        mesas,
        loading,
        error,
        refetch: fetchMesas,
        createMesa,
        updateMesa,
        deleteMesa
    };
};

// ============================================================================
// HOOK PARA PROVEEDORES
// ============================================================================

export const useProveedores = (empresaId: number) => {
    const [proveedores, setProveedores] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProveedores = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await proveedoresService.getProveedores(empresaId);
            setProveedores(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar proveedores');
        } finally {
            setLoading(false);
        }
    }, [empresaId]);

    const createProveedor = useCallback(async (proveedorData: any) => {
        try {
            await proveedoresService.createProveedor(proveedorData);
            await fetchProveedores(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear proveedor');
            return { success: false, error: err instanceof Error ? err.message : 'Error al crear proveedor' };
        }
    }, [fetchProveedores]);

    const updateProveedor = useCallback(async (id: number, proveedorData: any) => {
        try {
            await proveedoresService.updateProveedor(id, proveedorData);
            await fetchProveedores(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar proveedor');
            return { success: false, error: err instanceof Error ? err.message : 'Error al actualizar proveedor' };
        }
    }, [fetchProveedores]);

    const deleteProveedor = useCallback(async (id: number) => {
        try {
            await proveedoresService.deleteProveedor(id);
            await fetchProveedores(); // Recargar datos
            return { success: true };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar proveedor');
            return { success: false, error: err instanceof Error ? err.message : 'Error al eliminar proveedor' };
        }
    }, [fetchProveedores]);

    useEffect(() => {
        fetchProveedores();
    }, [fetchProveedores]);

    return {
        proveedores,
        loading,
        error,
        refetch: fetchProveedores,
        createProveedor,
        updateProveedor,
        deleteProveedor
    };
};
