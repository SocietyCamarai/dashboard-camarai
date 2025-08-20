import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { EllipsisHorizontalIcon, CirclePlusIcon } from '../icons';
import { Card, CardHeader, CardContent, CardFooter, SecondaryButton } from './shared/UIComponents';

interface Tax {
  id: number;
  name: string;
  percentage: string;
}

interface TaxesTabProps {
  taxes: Tax[];
  onUpdateTaxes: (taxes: Tax[]) => void;
}

export const TaxesTab: React.FC<TaxesTabProps> = ({ taxes, onUpdateTaxes }) => {
  const { currentTheme } = useTheme();
  const [isAddingTax, setIsAddingTax] = useState(false);
  const [newTax, setNewTax] = useState<Omit<Tax, 'id'>>({
    name: '',
    percentage: ''
  });

  // Manejar acciones de impuestos
  const handleTaxAction = (taxId: number) => {
    console.log(`Tax action for: ${taxId}`);
    // Aquí se implementaría la lógica para las acciones de impuestos
  };



  // Sanitizar entrada de texto
  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
  };

  // Validar porcentaje
  const isValidPercentage = (percentage: string): boolean => {
    const percentageRegex = /^[0-9]+(\.[0-9]+)?%?$/;
    if (!percentageRegex.test(percentage)) return false;

    const numValue = parseFloat(percentage.replace('%', ''));
    return numValue >= 0 && numValue <= 100;
  };

  // Manejar añadir nuevo impuesto
  const handleAddTax = () => {
    if (!newTax.name.trim()) {
      alert('El nombre del impuesto es obligatorio');
      return;
    }

    if (!newTax.percentage.trim()) {
      alert('El porcentaje es obligatorio');
      return;
    }

    if (!isValidPercentage(newTax.percentage)) {
      alert('Por favor, introduce un porcentaje válido (0-100)');
      return;
    }

    // Sanitizar datos
    const sanitizedTax: Tax = {
      id: Date.now() + Math.random(),
      name: sanitizeInput(newTax.name),
      percentage: sanitizeInput(newTax.percentage)
    };

    onUpdateTaxes([...taxes, sanitizedTax]);
    setNewTax({ name: '', percentage: '' });
    setIsAddingTax(false);
  };

  // Manejar cambios en el formulario de nuevo impuesto
  const handleNewTaxChange = (field: keyof Omit<Tax, 'id'>, value: string) => {
    setNewTax(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card>
      <CardHeader title="Todos los Impuestos" />
      <CardContent>
        {/* Tabla de impuestos */}
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors" style={{ borderBottomColor: currentTheme.colors.border }}>
                <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0" style={{ color: currentTheme.colors.textSecondary }}>Nombre Impuesto</th>
                <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0" style={{ color: currentTheme.colors.textSecondary }}>Porcentaje</th>
                <th className="h-12 px-4 align-middle font-medium [&:has([role=checkbox])]:pr-0 text-right" style={{ color: currentTheme.colors.textSecondary }}>Acciones</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {taxes.map((tax) => (
                <tr key={tax.id} className="border-b transition-colors" style={{ borderBottomColor: currentTheme.colors.border }}>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium" style={{ color: currentTheme.colors.text }}>{tax.name}</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0" style={{ color: currentTheme.colors.text }}>{tax.percentage}</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 w-10"
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      data-state="closed"
                      onClick={() => handleTaxAction(tax.id)}
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      <EllipsisHorizontalIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Formulario para añadir nuevo impuesto */}
        {isAddingTax && (
          <div className="mt-6 p-4 border rounded-lg" style={{ borderColor: currentTheme.colors.border }}>
            <h4 className="font-semibold mb-4" style={{ color: currentTheme.colors.text }}>Nuevo Impuesto</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: currentTheme.colors.text }}>Nombre del Impuesto</label>
                <input
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                  value={newTax.name}
                  onChange={(e) => handleNewTaxChange('name', e.target.value)}
                  style={{
                    backgroundColor: currentTheme.colors.white,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: currentTheme.colors.text }}>Porcentaje</label>
                <input
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                  value={newTax.percentage}
                  onChange={(e) => handleNewTaxChange('percentage', e.target.value)}
                  placeholder="ej: 21%"
                  style={{
                    backgroundColor: currentTheme.colors.white,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
                onClick={handleAddTax}
                style={{
                  backgroundColor: currentTheme.colors.primary,
                  color: currentTheme.colors.white
                }}
              >
                Guardar Impuesto
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2"
                onClick={() => {
                  setIsAddingTax(false);
                  setNewTax({ name: '', percentage: '' });
                }}
                style={{
                  backgroundColor: currentTheme.colors.white,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Información sobre impuestos */}
        <div className="mt-6 p-4 border rounded-lg" style={{ borderColor: currentTheme.colors.border }}>
          <h4 className="font-semibold mb-2" style={{ color: currentTheme.colors.text }}>Información sobre Impuestos</h4>
          <p className="text-sm mb-3" style={{ color: currentTheme.colors.textSecondary }}>
            Los impuestos configurados se aplicarán automáticamente a todas las transacciones.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-1" style={{ color: currentTheme.colors.text }}>Tipos de Impuestos:</h5>
              <ul className="space-y-1" style={{ color: currentTheme.colors.textSecondary }}>
                <li>• IVA General (21%)</li>
                <li>• IVA Reducido (10%)</li>
                <li>• IVA Superreducido (4%)</li>
                <li>• Exento (0%)</li>
                <li>• Impuestos Especiales</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-1" style={{ color: currentTheme.colors.text }}>Configuración:</h5>
              <ul className="space-y-1" style={{ color: currentTheme.colors.textSecondary }}>
                <li>• Aplicación automática</li>
                <li>• Cálculo en tiempo real</li>
                <li>• Reportes fiscales</li>
                <li>• Cumplimiento legal</li>
                <li>• Actualizaciones automáticas</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {!isAddingTax && (
          <SecondaryButton onClick={() => setIsAddingTax(true)}>
            <CirclePlusIcon />
            Añadir Impuesto
          </SecondaryButton>
        )}
      </CardFooter>
    </Card>
  );
}; 
