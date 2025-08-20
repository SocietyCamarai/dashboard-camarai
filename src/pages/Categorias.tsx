
import React, { useState, useEffect } from 'react';
import { Header } from '../components';
import { useTheme } from '../hooks';
import ContenedorInventario from '../components/inventario/ContenedorInventario';
import CategoriasModal from '../components/inventario/inventarioModal/CategoriasModal';
import { useCategorias, useProductos } from '../hooks/useEntities';
import { useAuth } from '../hooks/useAuth';
import type { ICategoria, IProducto } from '../types/database.types';

interface CategoriaConProductos {
  categoria: string;
  productos: string;
  categoriaData: ICategoria;
  totalProductos: number;
}

const Categorias: React.FC = () => {
  const { currentTheme } = useTheme();
  const { user } = useAuth();
  const establecimientoId = user?.establecimiento_id || 7;

  // console.log('=== DEBUG HOOKS ===');
  // console.log('establecimientoId:', establecimientoId);
  // console.log('user:', user);

  const { categorias: categoriasData, loading: categoriasLoading } = useCategorias(establecimientoId);
  const { productos: productosData, loading: productosLoading } = useProductos(establecimientoId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [productos, setProductos] = useState<IProducto[]>([]);
  const [productosModificados, setProductosModificados] = useState<Map<number, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [inventarioData, setInventarioData] = useState<CategoriaConProductos[]>([]);

  // Cargar datos cuando cambien las categorías o productos
  useEffect(() => {
    // console.log('=== DEBUG CATEGORIAS ===');
    // console.log('categoriasData:', categoriasData);
    // console.log('categoriasData type:', typeof categoriasData);
    // console.log('categoriasData isArray:', Array.isArray(categoriasData));
    // console.log('productosData:', productosData);
    // console.log('productosData type:', typeof productosData);
    // console.log('productosData isArray:', Array.isArray(productosData));
    // console.log('productosData length:', productosData?.length);

    if (categoriasData && productosData) {
      // Asegurar que categoriasData sea un array
      const categoriasArray = Array.isArray(categoriasData) ? categoriasData : [categoriasData];
      // console.log('categoriasArray:', categoriasArray);
      setCategorias(categoriasArray);
      setProductos(productosData);

      // Crear datos de inventario combinando categorías y productos
      const inventarioDataProcessed = categoriasArray.map((categoria: any) => {
        // console.log(`Procesando categoría: ${categoria.nombre} (identificador: ${categoria.identificador})`);

        const productosEnCategoria = productosData.filter((producto: any) => {
          // console.log(`Comparando producto ${producto.nombre}: categoria_id=${producto.categoria_id} vs identificador=${categoria.identificador}`);
          return producto.categoria_id === categoria.identificador;
        });

        // console.log(`Productos encontrados para ${categoria.nombre}:`, productosEnCategoria.length);

        return {
          categoria: categoria.nombre,
          productos: `${productosEnCategoria.length} producto${productosEnCategoria.length !== 1 ? 's' : ''}`,
          categoriaData: categoria,
          totalProductos: productosEnCategoria.length
        };
      });

      // console.log('Inventario procesado:', inventarioDataProcessed);
      setInventarioData(inventarioDataProcessed);
      setLoading(false);
    }
  }, [categoriasData, productosData]);

  // Función para actualizar los datos de inventario
  const updateInventarioData = (categoriasData: ICategoria[], productosData: IProducto[]) => {
    console.log('Actualizando inventario con:', {
      categorias: categoriasData.length,
      productos: productosData.length
    });

    const inventarioDataProcessed = categoriasData.map(categoria => {
      console.log(`Actualizando categoría: ${categoria.nombre} (identificador: ${categoria.identificador})`);

      const productosEnCategoria = productosData.filter(producto => {
        console.log(`Comparando producto ${producto.nombre}: categoria_id=${producto.categoria_id} vs identificador=${categoria.identificador}`);
        return producto.categoria_id === categoria.identificador;
      });

      console.log(`Productos encontrados para ${categoria.nombre}:`, productosEnCategoria.length);

      return {
        categoria: categoria.nombre,
        productos: `${productosEnCategoria.length} producto${productosEnCategoria.length !== 1 ? 's' : ''}`,
        categoriaData: categoria,
        totalProductos: productosEnCategoria.length
      };
    });

    console.log('Inventario actualizado:', inventarioDataProcessed);
    setInventarioData(inventarioDataProcessed);
  };

  // Función para manejar la creación de una nueva categoría
  const handleCategoriaCreated = (nuevaCategoria: {
    nombre: string;
    descripcion: string;
    color: string;
    productos: IProducto[];
  }) => {
    // Crear nueva categoría con estructura ICategoria
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substr(2, 9);
    const categoriaCompleta: ICategoria = {
      id: timestamp, // ID temporal
      establecimiento_id: 7, // ID del establecimiento
      nombre: nuevaCategoria.nombre,
      descripcion: nuevaCategoria.descripcion || undefined,
      imagen: undefined,
      color: nuevaCategoria.color,
      orden: categorias.length + 1,
      activo: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      identificador: `CAT_${timestamp}_${randomId}`
    };

    // Actualizar productos asignados con el nuevo categoria_id
    const productosActualizados = productos.map(producto => {
      const productoAsignado = nuevaCategoria.productos.find(p => p.id === producto.id);
      if (productoAsignado) {
        return {
          ...producto,
          categoria_id: categoriaCompleta.identificador
        };
      }
      return producto;
    });

    // Actualizar el mapa de productos modificados
    const nuevosProductosModificados = new Map(productosModificados);
    nuevaCategoria.productos.forEach(producto => {
      if (categoriaCompleta.identificador) {
        nuevosProductosModificados.set(producto.id, categoriaCompleta.identificador);
      }
    });
    setProductosModificados(nuevosProductosModificados);

    // Actualizar la lista de categorías
    const nuevasCategorias = [...categorias, categoriaCompleta];
    setCategorias(nuevasCategorias);
    setProductos(productosActualizados);

    // Actualizar los datos de inventario
    updateInventarioData(nuevasCategorias, productosActualizados);

    console.log('Productos modificados:', {
      nuevaCategoria: categoriaCompleta.nombre,
      identificador: categoriaCompleta.identificador,
      productosAsignados: nuevaCategoria.productos.map(p => ({ id: p.id, nombre: p.nombre }))
    });

    console.log('Nueva categoría creada:', {
      categoria: categoriaCompleta,
      productos: nuevaCategoria.productos
    });
  };

  const headers = [
    'Nombre Categoría',
    'Productos',
    'Acciones',
  ];

  // Mostrar loading mientras se cargan los datos
  if (loading || categoriasLoading || productosLoading) {
    return (
      <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: currentTheme.colors.background }}>
        <div className="container mx-auto mb-8">
          <Header
            title="Librería de Categorías"
          />
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: currentTheme.colors.background }}>
      <div className="container mx-auto mb-8">
        <Header
          title="Librería de Categorías"
        />
      </div>
      <ContenedorInventario
        headers={headers}
        data={inventarioData}
        searchPlaceholder="Buscar categorías..."
        createButtonText="Crear Categoría"
        onCreateClick={() => setIsModalOpen(true)}
        onRowClick={(item) => console.log('Categoría seleccionada:', item)}
      />

      {/* Modal de Categorías */}
      {React.createElement(CategoriasModal as any, {
        isOpen: isModalOpen,
        onClose: () => setIsModalOpen(false),
        onCategoriaCreated: handleCategoriaCreated
      })}
    </div>
  );
};

export default Categorias;
