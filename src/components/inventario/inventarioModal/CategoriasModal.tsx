import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../hooks';
import { useProductos } from '../../../hooks/useEntities';
import { useAuth } from '../../../hooks/useAuth';
import type { IProducto } from '../../../types/database.types';

interface CategoriasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoriaCreated?: (categoria: {
    nombre: string;
    descripcion: string;
    color: string;
    productos: IProducto[];
  }) => void;
}

interface ProductoModal {
  id: number;
  nombre: string;
  precio: number;
  categoria_actual?: string;
  asignado: boolean;
  productoData: IProducto;
}

export default function CategoriasModal({ isOpen, onClose, onCategoriaCreated }: CategoriasModalProps) {
  const { currentTheme } = useTheme();
  const { user } = useAuth();
  const { productos: productosData } = useProductos(user?.establecimiento_id || 7);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [color, setColor] = useState('#8B5CF6');
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [productos, setProductos] = useState<ProductoModal[]>([]);
  const [loading, setLoading] = useState(false);

  // Cargar productos cuando se abre el modal o cambian los datos
  useEffect(() => {
    if (isOpen && productosData) {
      setLoading(true);
      const productosFormateados: ProductoModal[] = productosData.map((producto: any) => ({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        categoria_actual: undefined, // Se podría obtener de otra fuente
        asignado: false,
        productoData: producto
      }));
      setProductos(productosFormateados);
      setLoading(false);
    }
  }, [isOpen, productosData]);

  if (!isOpen) return null;

  const productosAsignados = productos.filter(p => p.asignado);
  const productosDisponibles = productos.filter(producto => !producto.asignado);

  const toggleProducto = (id: number) => {
    setProductos(productos.map(p =>
      p.id === id ? { ...p, asignado: !p.asignado } : p
    ));
  };

  const agregarProductoSeleccionado = () => {
    if (productoSeleccionado) {
      setLoading(true);
      const productoId = parseInt(productoSeleccionado);
      toggleProducto(productoId);
      setProductoSeleccionado('');
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNombre('');
    setDescripcion('');
    setColor('#8B5CF6');
    setProductoSeleccionado('');
    setProductos(productos.map(p => ({ ...p, asignado: false })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Crear la nueva categoría
    const nuevaCategoria = {
      nombre,
      descripcion,
      color,
      productos: productosAsignados.map(p => p.productoData)
    };

    // Llamar al callback si está definido
    if (onCategoriaCreated) {
      onCategoriaCreated(nuevaCategoria);
    }

    console.log('Crear categoría:', nuevaCategoria);

    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative rounded-xl shadow-2xl p-6 w-full transform transition-all duration-300 scale-100 max-w-6xl"
        style={{
          backgroundColor: currentTheme.colors.background,
          border: `1px solid ${currentTheme.colors.border}`
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2
              className="text-xl font-semibold"
              style={{ color: currentTheme.colors.text }}
            >
              Crear Categoría
            </h2>
            <p
              className="text-sm mt-1"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              Define el nombre para tu categoría y gestiona los productos que pertenecen a ella.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:opacity-80 transition-opacity"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Form Container */}
        <div className="max-h-[calc(90vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100 pr-2 p-1">
          {/* Form */}
          <form id="category-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.colors.text }}
                >
                  Nombre de la Categoría
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  style={{
                    backgroundColor: currentTheme.colors.background,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                  placeholder="Ej: Entrantes, Postres, Vinos..."
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.colors.text }}
                >
                  Color de la Categoría
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-12 h-10 border rounded-lg cursor-pointer"
                    style={{ borderColor: currentTheme.colors.border }}
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    style={{
                      backgroundColor: currentTheme.colors.background,
                      borderColor: currentTheme.colors.border,
                      color: currentTheme.colors.text
                    }}
                    placeholder="#8B5CF6"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: currentTheme.colors.text }}
              >
                Descripción (Opcional)
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                style={{
                  backgroundColor: currentTheme.colors.background,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text
                }}
                placeholder="Describe brevemente qué tipo de productos incluye esta categoría..."
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: currentTheme.colors.text }}
              >
                Productos en esta Categoría
              </label>

              {/* Selector de productos */}
              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                  <span className="ml-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                    Cargando productos...
                  </span>
                </div>
              ) : (
                <div className="flex gap-2 mb-3">
                  <select
                    value={productoSeleccionado}
                    onChange={(e) => setProductoSeleccionado(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    style={{
                      backgroundColor: currentTheme.colors.background,
                      borderColor: currentTheme.colors.border,
                      color: currentTheme.colors.text
                    }}
                    disabled={productosDisponibles.length === 0}
                  >
                    <option value="">
                      {productosDisponibles.length === 0
                        ? "Todos los productos están asignados"
                        : "Seleccionar producto para añadir..."}
                    </option>
                    {productosDisponibles.map(producto => (
                      <option key={producto.id} value={producto.id}>
                        {producto.nombre} - €{producto.precio.toFixed(2)}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={agregarProductoSeleccionado}
                    disabled={!productoSeleccionado || loading}
                    className="px-4 py-2 rounded-md font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    style={{
                      backgroundColor: '#8B5CF6'
                    }}
                  >
                    Añadir
                  </button>
                </div>
              )}

              {/* Lista de productos asignados */}
              <div
                className="border rounded-md p-3 min-h-[200px]"
                style={{
                  backgroundColor: currentTheme.colors.background || currentTheme.colors.background,
                  borderColor: currentTheme.colors.border
                }}
              >
                <div className="mb-2">
                  <span
                    className="text-sm font-medium"
                    style={{ color: currentTheme.colors.text }}
                  >
                    Productos Asignados a esta Categoría ({productosAsignados.length})
                  </span>
                </div>

                {productosAsignados.length === 0 ? (
                  <div className="text-center py-8">
                    <p
                      className="text-sm"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      Aún no hay productos en esta categoría.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {productosAsignados.map((producto) => (
                      <div
                        key={producto.id}
                        className="flex items-center justify-between p-3 rounded-lg border"
                        style={{
                          backgroundColor: currentTheme.colors.background,
                          borderColor: currentTheme.colors.border
                        }}
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className="font-medium"
                              style={{ color: currentTheme.colors.text }}
                            >
                              {producto.nombre}
                            </span>
                            <span
                              className="text-sm font-semibold"
                              style={{ color: currentTheme.colors.text }}
                            >
                              €{producto.precio.toFixed(2)}
                            </span>
                          </div>
                          {producto.productoData.descripcion && (
                            <p
                              className="text-xs mt-1 line-clamp-2"
                              style={{ color: currentTheme.colors.textSecondary }}
                            >
                              {producto.productoData.descripcion}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleProducto(producto.id)}
                          className="ml-3 px-3 py-1 text-xs rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        >
                          Quitar
                        </button>
                      </div>
                    ))}
                  </div>
                )}


              </div>
            </div>

          </form>
        </div>

        {/* Fixed Actions Outside Scroll */}
        <div className="flex gap-3 pt-6 justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="w-24 py-2 rounded-md border font-medium hover:opacity-80 transition-all duration-200"
            style={{
              color: currentTheme.colors.text,
              borderColor: currentTheme.colors.border
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="category-form"
            className="w-24 py-2 rounded-md font-medium text-white hover:opacity-90 transition-all duration-200"
            style={{
              backgroundColor: '#8B5CF6'
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
