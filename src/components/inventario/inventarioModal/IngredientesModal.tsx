import React, { useState } from 'react';
import { useTheme } from '../../../hooks';

interface IngredientesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IngredientesModal({ isOpen, onClose }: IngredientesModalProps) {
  const { currentTheme } = useTheme();
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [costoUnitario, setCostoUnitario] = useState('');
  const [unidadMedida, setUnidadMedida] = useState('');
  const [stockActual, setStockActual] = useState('');
  const [alertaStockMinimo, setAlertaStockMinimo] = useState('');
  const [impuestoAplicable, setImpuestoAplicable] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para crear el ingrediente
    console.log('Crear ingrediente:', { 
      nombre, 
      categoria, 
      costoUnitario, 
      unidadMedida, 
      stockActual, 
      alertaStockMinimo, 
      impuestoAplicable 
    });
    setNombre('');
    setCategoria('');
    setCostoUnitario('');
    setUnidadMedida('');
    setStockActual('');
    setAlertaStockMinimo('');
    setImpuestoAplicable('');
    onClose();
  };

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
        className="relative rounded-xl shadow-2xl p-6 w-full max-w-3xl transform transition-all duration-300 scale-100"
        style={{ 
          backgroundColor: currentTheme.colors.background,
          border: `1px solid ${currentTheme.colors.border}`
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>          <h2 
            className="text-xl font-semibold"
            style={{ color: currentTheme.colors.text }}
          >
            Crear Ingrediente
          </h2>
          <p 
            className="text-sm mt-1"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            Rellena los detalles del ingrediente para tu inventario.
          </p></div>


          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:opacity-80 transition-opacity"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="max-h-[calc(90vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100 pr-2 p-1">
          <form id="ingredient-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: currentTheme.colors.text }}
              >
                Nombre del Ingrediente
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
                required
              />
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: currentTheme.colors.text }}
              >
                Categoría del Ingrediente
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                style={{ 
                backgroundColor: currentTheme.colors.background,
                borderColor: currentTheme.colors.border,
                color: currentTheme.colors.text
              }}
                required
              >
                <option value="">Frutas y Hortalizas</option>
                <option value="frutas-hortalizas">Frutas y Hortalizas</option>
                <option value="cereales-derivados">Cereales y Derivados</option>
                <option value="legumbres">Legumbres</option>
                <option value="proteinas-animales">Proteínas Animales</option>
                <option value="lacteos-derivados">Lácteos y Derivados</option>
                <option value="frutos-secos-semillas">Frutos Secos y Semillas</option>
                <option value="grasas-aceites">Grasas y Aceites</option>
                <option value="bebidas">Bebidas</option>
                <option value="condimentos-especias">Condimentos y Especias</option>
                <option value="alimentos-ultraprocesados">Alimentos Ultraprocesados</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: currentTheme.colors.text }}
              >
                Costo Unitario (€)
              </label>
              <input
                type="number"
                value={costoUnitario}
                onChange={(e) => setCostoUnitario(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                style={{ 
                  backgroundColor: currentTheme.colors.background,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text
                }}
                placeholder="0"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: currentTheme.colors.text }}
              >
                Unidad de Medida
              </label>
              <select
                value={unidadMedida}
                onChange={(e) => setUnidadMedida(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                style={{ 
                  backgroundColor: currentTheme.colors.background,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text
                }}
                required
              >
                <option value="">Unidades (uds)</option>
                <option value="uds">Unidades (uds)</option>
                <option value="g">Gramos (g)</option>
                <option value="kg">Kilos (kg)</option>
                <option value="ml">Mililitros (ml)</option>
                <option value="l">Litros (l)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: currentTheme.colors.text }}
              >
                Stock Actual
              </label>
              <input
                type="number"
                value={stockActual}
                onChange={(e) => setStockActual(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                style={{ 
                  backgroundColor: currentTheme.colors.background,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text
                }}
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: currentTheme.colors.text }}
              >
                Alerta de Stock Mínimo
              </label>
              <input
                type="number"
                value={alertaStockMinimo}
                onChange={(e) => setAlertaStockMinimo(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                style={{ 
                  backgroundColor: currentTheme.colors.background,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text
                }}
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: currentTheme.colors.text }}
            >
              Impuesto Aplicable
            </label>
            <select
              value={impuestoAplicable}
              onChange={(e) => setImpuestoAplicable(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              style={{ 
                  backgroundColor: currentTheme.colors.background,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text
                }}
              required
            >
              <option value="">IVA General</option>
              <option value="iva-general">IVA General</option>
              <option value="iva-reducido">IVA Reducido</option>
              <option value="exento">Exento</option>
            </select>
          </div>

        </form>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-6 justify-end">
          <button
            type="button"
            onClick={onClose}
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
            form="ingredient-form"
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