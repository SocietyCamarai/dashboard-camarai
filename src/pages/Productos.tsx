
import React, { useState, useEffect } from 'react';
import { Header } from '../components';
import { useTheme } from '../hooks';
import ContenedorInventario from '../components/inventario/ContenedorInventario';
import ProductosModal from '../components/inventario/inventarioModal/ProductosModal';
import { useProductos, useCategorias } from '../hooks/useEntities';
import { useAuth } from '../hooks/useAuth';
import type { IProducto, ICategoria } from '../types/database.types';

interface ProductoDisplay {
  producto: string;
  imagen: string;
  categoria: string;
  precioVenta: string;
  costoEscandallo: string;
  margen: string;
  impuesto: string;
  disponible: string;
}

const Productos: React.FC = () => {
  const { currentTheme } = useTheme();
  const { user } = useAuth();
  const { productos: productosData, loading: productosLoading } = useProductos(user?.establecimiento_id || 7);
  const { categorias: categoriasData, loading: categoriasLoading } = useCategorias(user?.establecimiento_id || 7);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productos, setProductos] = useState<IProducto[]>([]);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [inventarioData, setInventarioData] = useState<ProductoDisplay[]>([]);

  const headers = [
    'Producto',
    'Categoría',
    'Precio Venta',
    'Costo Escandallo',
    'Margen',
    'Impuesto',
    'Disponible',
    'Acciones',
  ];

  useEffect(() => {
    if (productosData && categoriasData) {
      setProductos(productosData);
      setCategorias(categoriasData);

      // Procesar datos para mostrar en la tabla
      const processedData = productosData.map((producto: any) => {
        const categoria = categoriasData.find((cat: any) => cat.identificador === producto.categoria_id);
        const costoEscandallo = 0; // Por ahora hardcodeado, se puede calcular después (REVISAR TODO)
        const margen = Number(producto.precio) - Number(costoEscandallo);

        return {
          producto: producto.nombre,
          imagen: producto.imagen || 'https://images.unsplash.com/photo-1549888834-3ec93abae044?w=100&h=100&fit=crop&crop=center',
          categoria: categoria?.nombre || 'Sin categoría',
          precioVenta: `€${Number(producto.precio).toFixed(2)}`,
          costoEscandallo: `€${Number(costoEscandallo).toFixed(2)}`,
          margen: `€${margen.toFixed(2)}`,
          impuesto: producto.impuesto ? `IVA ${producto.impuesto}%` : 'Sin impuesto',
          disponible: producto.disponible_carta ? 'Sí' : 'No'
        };
      });

      setInventarioData(processedData);
      setLoading(false);
    }
  }, [productosData, categoriasData]);

  const handleProductoCreated = (nuevoProducto: IProducto) => {
    setProductos(prev => [...prev, nuevoProducto]);

    // Actualizar inventarioData
    const categoria = categorias.find(cat => cat.identificador === nuevoProducto.categoria_id);
    const costoEscandallo = 0;
    const margen = nuevoProducto.precio - costoEscandallo;

    const nuevoProductoDisplay: ProductoDisplay = {
      producto: nuevoProducto.nombre,
      imagen: nuevoProducto.imagen || 'https://images.unsplash.com/photo-1549888834-3ec93abae044?w=100&h=100&fit=crop&crop=center',
      categoria: categoria?.nombre || 'Sin categoría',
      precioVenta: `€${nuevoProducto.precio.toFixed(2)}`,
      costoEscandallo: `€${costoEscandallo.toFixed(2)}`,
      margen: `€${margen.toFixed(2)}`,
      impuesto: nuevoProducto.impuesto ? `IVA ${nuevoProducto.impuesto}%` : 'Sin impuesto',
      disponible: nuevoProducto.disponible_carta ? 'Sí' : 'No'
    };

    setInventarioData(prev => [...prev, nuevoProductoDisplay]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: currentTheme.colors.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p style={{ color: currentTheme.colors.text }}>Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: currentTheme.colors.background }}>
      <div className="container mx-auto ">
        <div className="mb-8">
          <Header
            title="Librería de Productos"
          />
        </div>
        <ContenedorInventario
          headers={headers}
          data={inventarioData}
          searchPlaceholder="Buscar productos..."
          createButtonText="Crear Producto"
          onCreateClick={() => setIsModalOpen(true)}
          onRowClick={(item) => console.log('Producto seleccionado:', item)}
        />

        {/* Modal de Productos */}
        <ProductosModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onProductoCreated={handleProductoCreated}
          categorias={categorias}
        />
      </div>
    </div>
  );
};

export default Productos;
