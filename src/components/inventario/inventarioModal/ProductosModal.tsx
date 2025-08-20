import React, { useState } from 'react';
import { useTheme } from '../../../hooks';
import { TextInput, TextArea, Select, Checkbox, FileUpload } from '../../personal/inputsComponentes';
import { PlusIcon } from '../../icons';
import type { IProducto, ICategoria } from '../../../types/database.types';

interface Ingrediente {
  id: number;
  nombre: string;
  cantidad: number;
  unidad: string;
  costo: number;
}

interface ProductosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductoCreated?: (producto: IProducto) => void;
  categorias: ICategoria[];
}

export default function ProductosModal({ isOpen, onClose, onProductoCreated, categorias }: ProductosModalProps) {
  const { currentTheme } = useTheme();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [categoria, setCategoria] = useState('');
  const [impuesto, setImpuesto] = useState('');
  const [disponible, setDisponible] = useState(true);
  const [busquedaIngrediente, setBusquedaIngrediente] = useState('');
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [imagen, setImagen] = useState<File | null>(null);

  if (!isOpen) return null;

  const costoIngredientes = ingredientes.reduce((total, ing) => total + (ing.cantidad * ing.costo), 0);
  const margenBeneficio = precioVenta ? parseFloat(precioVenta) - costoIngredientes : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substr(2, 9);

    const nuevoProducto: IProducto = {
      id: timestamp,
      establecimiento_id: 7, // ID del establecimiento por defecto
      categoria_id: categoria || undefined,
      nombre: nombre,
      descripcion: descripcion || undefined,
      precio: parseFloat(precioVenta) || 0,
      imagen: imagen ? URL.createObjectURL(imagen) : undefined,
      codigo_barras: undefined,
      referencia: undefined,
      tiempo_preparacion: 0,
      unidad_medida: "unidad",
      es_elaborado: false,
      impuesto: impuesto ? parseFloat(impuesto) : undefined,
      stock: 0,
      stock_minimo: 0,
      control_stock: false,
      disponible_carta: disponible,
      disponible_delivery: disponible,
      alergenos: undefined,
      opciones: undefined,
      activo: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      identificador: `PROD_${timestamp}_${randomId}`
    };

    if (onProductoCreated) {
      onProductoCreated(nuevoProducto);
    }

    console.log('Crear producto:', nuevoProducto);

    // Reset form
    setNombre('');
    setDescripcion('');
    setPrecioVenta('');
    setCategoria('');
    setImpuesto('');
    setDisponible(true);
    setBusquedaIngrediente('');
    setIngredientes([]);
    setImagen(null);
    onClose();
  };

  // Convertir categorías a formato de opciones para el Select
  const categoriaOptions = [
    { value: "", label: "Seleccionar categoría" },
    ...categorias.map(cat => ({
      value: cat.identificador || "",
      label: cat.nombre
    }))
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative rounded-xl shadow-2xl p-6 w-full max-w-6xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-hidden"
        style={{
          backgroundColor: currentTheme.colors.background,
          border: `1px solid ${currentTheme.colors.border}`
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2
              className="text-xl font-bold mb-1"
              style={{ color: currentTheme.colors.text }}
            >
              Crear Producto
            </h2>
            <p
              className="text-sm"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              Rellena los detalles. Los productos se añadirán a tu librería global para usarlos en las cartas.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:opacity-80 transition-opacity"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] pr-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100 p-1">
          <form id="product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Columna Izquierda - Imagen y Datos Básicos */}
            <div className="space-y-4">
              {/* Upload de Imagen */}
              <FileUpload
                label="Imagen del Producto"
                description="Selecciona una imagen para el producto (máximo 5MB)"
                currentFile={imagen}
                onFileChange={(file) => setImagen(file)}
                accept="image/*"
                maxSize={5}
              />

              {/* Nombre del Producto */}
              <TextInput
                label="Nombre del Producto"
                value={nombre}
                onChange={setNombre}
                required
                placeholder="Ingresa el nombre del producto"
              />

              {/* Descripción */}
              <TextArea
                label="Descripción"
                value={descripcion}
                onChange={setDescripcion}
                rows={4}
                placeholder="Describe el producto..."
              />

              {/* Precio de Venta e Impuesto */}
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="Precio de Venta (€)"
                  type="number"
                  value={precioVenta}
                  onChange={setPrecioVenta}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  required
                />
                <Select
                  label="Impuesto (%)"
                  value={impuesto}
                  onChange={setImpuesto}
                  options={[
                    { value: "", label: "Sin impuesto" },
                    { value: "21", label: "IVA General (21%)" },
                    { value: "10", label: "IVA Reducido (10%)" },
                    { value: "4", label: "IVA Superreducido (4%)" }
                  ]}
                  required
                />
              </div>

              {/* Categoría */}
              <Select
                label="Categoría"
                value={categoria}
                onChange={setCategoria}
                options={categoriaOptions}
                required
              />

              {/* Disponible para la venta */}
              <Checkbox
                checked={disponible}
                onChange={setDisponible}
                label="Disponible para la venta"
                variant="switch"
              />
            </div>

            {/* Columna Derecha - Receta/Escandallo y Rentabilidad */}
            <div className="space-y-6">
              {/* Receta / Escandallo */}
              <div className="bg-gray-50 rounded-lg p-4" style={{ backgroundColor: currentTheme.colors.background }}>
                <h3 className="text-lg font-semibold mb-2" style={{ color: currentTheme.colors.text }}>Receta / Escandallo</h3>
                <p className="text-sm mb-4" style={{ color: currentTheme.colors.textSecondary }}>Añade los ingredientes necesarios para preparar este producto. El coste se calculará automáticamente.</p>

                {/* Buscador de ingredientes */}
                <TextInput
                  value={busquedaIngrediente}
                  onChange={setBusquedaIngrediente}
                  placeholder="Buscar ingrediente para añadir..."
                  className="mb-4"
                />

                {/* Lista de ingredientes */}
                <div className="text-center py-8" style={{ color: currentTheme.colors.textSecondary }}>
                  <p>Aún no has añadido ingredientes.</p>
                </div>
              </div>

              {/* Rentabilidad (Calculada) */}
              <div className="bg-gray-50 rounded-lg p-4" style={{ backgroundColor: currentTheme.colors.background }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.colors.text }}>Rentabilidad (Calculada)</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span style={{ color: currentTheme.colors.text }}>Precio de Venta:</span>
                    <span style={{ color: currentTheme.colors.text }}>€{precioVenta || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: currentTheme.colors.text }}>Coste de Ingredientes (Escandallo):</span>
                    <span style={{ color: currentTheme.colors.text }}>€{costoIngredientes.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3" style={{ borderColor: currentTheme.colors.border }}>
                    <div className="flex justify-between">
                      <span className="font-semibold" style={{ color: currentTheme.colors.text }}>Margen de Beneficio Bruto:</span>
                      <span className="font-semibold text-purple-600">€{margenBeneficio.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Actions - Fixed outside scroll */}
        <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: currentTheme.colors.border }}>
          <button
            type="button"
            onClick={onClose}
            className="w-24 px-4 py-2 rounded border font-medium hover:opacity-80 transition-all duration-200"
            style={{ color: currentTheme.colors.text, borderColor: currentTheme.colors.border }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="product-form"
            className="w-24 px-4 py-2 rounded font-medium text-white hover:opacity-90 transition-all duration-200"
            style={{ backgroundColor: '#8B5CF6' }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
